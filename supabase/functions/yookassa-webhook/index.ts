import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// YooKassa notification IP whitelist (per docs)
const YK_ALLOWED_CIDRS = [
  "185.71.76.0/27",
  "185.71.77.0/27",
  "77.75.153.0/25",
  "77.75.156.11/32",
  "77.75.156.35/32",
  "77.75.154.128/25",
  "2a02:5180:0:1509::/64",
  "2a02:5180:0:2655::/64",
  "2a02:5180:0:1533::/64",
  "2a02:5180:0:2669::/64",
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    console.log("[yookassa-webhook] event:", payload.event, "id:", payload.object?.id);

    const event = payload.event as string;
    const obj = payload.object;
    if (!obj?.id) {
      return new Response(JSON.stringify({ ok: false, error: "no object" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

    const ticketRequestId = obj.metadata?.ticket_request_id as string | undefined;

    // Update or insert payment record
    const { data: existing } = await supabase
      .from("payments")
      .select("id, ticket_request_id")
      .eq("yookassa_payment_id", obj.id)
      .maybeSingle();

    if (existing) {
      await supabase
        .from("payments")
        .update({ status: obj.status, metadata: obj })
        .eq("yookassa_payment_id", obj.id);
    } else if (ticketRequestId) {
      await supabase.from("payments").insert({
        ticket_request_id: ticketRequestId,
        yookassa_payment_id: obj.id,
        amount: Number(obj.amount?.value ?? 0),
        provider: "yookassa",
        status: obj.status,
        metadata: obj,
      });
    }

    if (event === "payment.succeeded" && ticketRequestId) {
      // Mark request as paid (idempotent: only if not already paid)
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

        // Send confirmation email to client
        await supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "ticket-paid-confirmation",
            recipientEmail: tr.email,
            idempotencyKey: `ticket-paid-${ticketRequestId}`,
            templateData: {
              name: tr.name,
              ticketType: tr.ticket_type,
              amount: Number(obj.amount?.value ?? 0),
            },
          },
        });

        // Notify organizers
        const recipients = ["gizelatolts@gmail.com", "alexa-ref@list.ru", "vvm1976@gmail.com"];
        for (const recipientEmail of recipients) {
          await supabase.functions.invoke("send-transactional-email", {
            body: {
              templateName: "ticket-paid-notification",
              recipientEmail,
              idempotencyKey: `ticket-paid-notify-${ticketRequestId}-${recipientEmail}`,
              templateData: {
                name: tr.name,
                email: tr.email,
                ticketType: tr.ticket_type,
                amount: Number(obj.amount?.value ?? 0),
                yookassaPaymentId: obj.id,
              },
            },
          });
        }
      }
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("[yookassa-webhook] error:", e);
    // Return 200 to avoid YooKassa retries on parse errors; log for debugging
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
