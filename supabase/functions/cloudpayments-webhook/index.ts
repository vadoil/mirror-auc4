import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type, x-content-hmac, content-hmac",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const API_SECRET = Deno.env.get("CLOUDPAYMENTS_API_SECRET")!;

function parseAmount(value: string | null): number {
  if (!value) return 0;
  const normalized = value.replace(/\s/g, "").replace(",", ".");
  const n = parseFloat(normalized);
  return Number.isFinite(n) ? n : 0;
}

async function hmacSha256Base64(body: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(API_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body));
  return btoa(String.fromCharCode(...new Uint8Array(mac)));
}

async function isValidSignature(
  rawBody: string,
  contentHmac: string | null,
  xContentHmac: string | null,
): Promise<boolean> {
  if (!API_SECRET) return false;

  const expectedContent = await hmacSha256Base64(rawBody);
  if (contentHmac && expectedContent === contentHmac) return true;

  // X-Content-HMAC is computed over URL-decoded parameters.
  const params = new URLSearchParams(rawBody);
  const decodedParts: string[] = [];
  for (const [k, v] of params) {
    decodedParts.push(`${k}=${v}`);
  }
  const decodedBody = decodedParts.join("&");
  const expectedDecoded = await hmacSha256Base64(decodedBody);
  if (xContentHmac && expectedDecoded === xContentHmac) return true;

  return false;
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
    const contentHmac = req.headers.get("content-hmac");
    const xContentHmac = req.headers.get("x-content-hmac");

    const valid = await isValidSignature(rawBody, contentHmac, xContentHmac);
    if (!valid) {
      console.error("[cloudpayments-webhook] invalid signature", { contentHmac, xContentHmac });
      return ok({ code: 13 });
    }

    // CloudPayments posts application/x-www-form-urlencoded
    const params = new URLSearchParams(rawBody);
    const payload: Record<string, string> = {};
    params.forEach((v, k) => (payload[k] = v));

    const transactionId = payload.TransactionId;
    const amount = parseAmount(payload.Amount);
    const status = (payload.Status ?? "").toLowerCase();

    let data: Record<string, unknown> = {};
    try {
      data = payload.Data ? JSON.parse(payload.Data) : {};
    } catch (_) {
      data = {};
    }

    const ticketRequestId = (data.ticket_request_id as string | undefined) || payload.InvoiceId || undefined;

    console.log("[cloudpayments-webhook] tx:", transactionId, "status:", status, "req:", ticketRequestId);

    const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

    const { data: existing } = await supabase
      .from("payments")
      .select("id")
      .eq("provider", "cloudpayments")
      .eq("yookassa_payment_id", String(transactionId))
      .maybeSingle();

    if (existing) {
      await supabase
        .from("payments")
        .update({ status, metadata: payload, amount })
        .eq("provider", "cloudpayments")
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

        const tasks = [
          supabase.functions.invoke("send-email-smtp", {
            body: {
              templateName: "ticket-paid-confirmation",
              recipientEmail: tr.email,
              idempotencyKey: `ticket-paid-${ticketRequestId}`,
              templateData: { name: tr.name, ticketType: tr.ticket_type, amount },
            },
          }),
          ...["gizelatolts@gmail.com", "alexa-ref@list.ru", "vvm1976@gmail.com"].map((recipientEmail) =>
            supabase.functions.invoke("send-email-smtp", {
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
            })
          ),
          fetch(`${SUPABASE_URL}/functions/v1/notify-telegram`, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${SERVICE_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              event: "payment_succeeded",
              data: {
                name: tr.name,
                email: tr.email,
                ticket_type: tr.ticket_type,
                amount,
                yookassa_payment_id: String(transactionId),
              },
            }),
          }),

        ];

        const results = await Promise.allSettled(tasks);
        results.forEach((r, i) => {
          if (r.status === "rejected") {
            console.error(`[cloudpayments-webhook] task ${i} failed:`, r.reason);
          }
        });

      }
    }

    return ok();
  } catch (e) {
    console.error("[cloudpayments-webhook] error:", e);
    return ok({ code: 0 });
  }
});
