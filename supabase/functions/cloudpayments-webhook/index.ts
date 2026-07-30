import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type, x-content-hmac, content-hmac",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const API_SECRET = Deno.env.get("CLOUDPAYMENTS_API_SECRET")!;

// CloudPayments signs the raw request body with HMAC-SHA256 (base64) using the API secret
async function isValidSignature(rawBody: string, signature: string | null): Promise<boolean> {
  if (!signature || !API_SECRET) return false;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(API_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(rawBody));
  const expected = btoa(String.fromCharCode(...new Uint8Array(mac)));
  return expected === signature;
}

const ok = (body: Record<string, unknown> = { code: 0 }) =>
  new Response(JSON.stringify(body), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405, headers: corsHeaders });

  try {
    const rawBody = await req.text();
    const signature = req.headers.get("content-hmac") ?? req.headers.get("x-content-hmac");
    const valid = await isValidSignature(rawBody, signature);
    if (!valid) {
      console.error("[cloudpayments-webhook] invalid signature");
      return new Response(JSON.stringify({ code: 13 }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // CloudPayments posts application/x-www-form-urlencoded
    const params = new URLSearchParams(rawBody);
    const payload: Record<string, string> = {};
    params.forEach((v, k) => (payload[k] = v));

    const transactionId = payload.TransactionId;
    const amount = Number(payload.Amount ?? 0);
    const status = (payload.Status ?? "Completed").toLowerCase();
    let data: Record<string, unknown> = {};
    try {
      data = payload.Data ? JSON.parse(payload.Data) : {};
    } catch (_) { /* ignore */ }
    const ticketRequestId = (data.ticket_request_id as string | undefined) ?? undefined;

    console.log("[cloudpayments-webhook] tx:", transactionId, "status:", status, "req:", ticketRequestId);

    const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

    const { data: existing } = await supabase
      .from("payments")
      .select("id")
      .eq("yookassa_payment_id", String(transactionId))
      .maybeSingle();

    if (existing) {
      await supabase
        .from("payments")
        .update({ status, metadata: payload })
        .eq("yookassa_payment_id", String(transactionId));
    } else {
      await supabase.from("payments").insert({
        ticket_request_id: ticketRequestId ?? null,
        yookassa_payment_id: String(transactionId),
        amount,
        provider: "cloudpayments",
        status,
        metadata: payload,
      });
    }

    const succeeded = status === "completed" || status === "authorized";
    if (succeeded && ticketRequestId) {
      const { data: tr } = await supabase
        .from("ticket_requests")
        .select("id, name, email, ticket_type, status")
        .eq("id", ticketRequestId)
        .maybeSingle();

      if (tr && tr.status !== "paid") {
        await supabase
          .from("ticket_requests")
          .update({ status: "paid", paid_at: new Date().toISOString() })
          .eq("id", ticketRequestId);

        await supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "ticket-paid-confirmation",
            recipientEmail: tr.email,
            idempotencyKey: `ticket-paid-${ticketRequestId}`,
            templateData: { name: tr.name, ticketType: tr.ticket_type, amount },
          },
        });

        for (const recipientEmail of ["gizelatolts@gmail.com", "alexa-ref@list.ru", "vvm1976@gmail.com"]) {
          await supabase.functions.invoke("send-transactional-email", {
            body: {
              templateName: "ticket-paid-notification",
              recipientEmail,
              idempotencyKey: `ticket-paid-notify-${ticketRequestId}-${recipientEmail}`,
              templateData: {
                name: tr.name,
                email: tr.email,
                ticketType: tr.ticket_type,
                amount,
                yookassaPaymentId: String(transactionId),
              },
            },
          });
        }

        try {
          await supabase.functions.invoke("notify-telegram", {
            body: {
              event: "payment_succeeded",
              data: {
                name: tr.name,
                email: tr.email,
                ticket_type: tr.ticket_type,
                amount,
                yookassa_payment_id: String(transactionId),
              },
            },
          });
        } catch (e) {
          console.error("[cloudpayments-webhook] notify-telegram failed:", e);
        }
      }
    }

    return ok();
  } catch (e) {
    console.error("[cloudpayments-webhook] error:", e);
    return ok({ code: 0 });
  }
});
