import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SHOP_ID = Deno.env.get("YOOKASSA_SHOP_ID")!;
const SECRET_KEY = Deno.env.get("YOOKASSA_SECRET_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

interface RequestBody {
  ticketRequestId: string;
  amount: number;
  description: string;
  email: string;
  returnUrl: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = (await req.json()) as RequestBody;
    const { ticketRequestId, amount, description, email, returnUrl } = body;

    if (!ticketRequestId || !amount || !email || !returnUrl) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

    // Verify ticket_request exists
    const { data: ticketReq, error: trErr } = await supabase
      .from("ticket_requests")
      .select("id, status")
      .eq("id", ticketRequestId)
      .maybeSingle();
    if (trErr || !ticketReq) {
      return new Response(JSON.stringify({ error: "Ticket request not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (ticketReq.status === "paid") {
      return new Response(JSON.stringify({ error: "Already paid" }), {
        status: 409,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const idempotenceKey = crypto.randomUUID();
    const auth = btoa(`${SHOP_ID}:${SECRET_KEY}`);

    const ykPayload = {
      amount: { value: amount.toFixed(2), currency: "RUB" },
      capture: true,
      confirmation: { type: "redirect", return_url: returnUrl },
      description,
      metadata: { ticket_request_id: ticketRequestId },
      receipt: {
        customer: { email },
        items: [
          {
            description: description.slice(0, 128),
            quantity: "1.00",
            amount: { value: amount.toFixed(2), currency: "RUB" },
            vat_code: 1,
            payment_subject: "service",
            payment_mode: "full_prepayment",
          },
        ],
      },
    };

    const ykResp = await fetch("https://api.yookassa.ru/v3/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotence-Key": idempotenceKey,
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify(ykPayload),
    });

    const ykData = await ykResp.json();
    if (!ykResp.ok) {
      console.error("YooKassa error:", ykData);
      return new Response(JSON.stringify({ error: "YooKassa error", details: ykData }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Save payment record
    await supabase.from("payments").insert({
      ticket_request_id: ticketRequestId,
      yookassa_payment_id: ykData.id,
      amount,
      provider: "yookassa",
      status: ykData.status, // 'pending'
      metadata: ykData,
    });

    return new Response(
      JSON.stringify({
        paymentId: ykData.id,
        confirmationUrl: ykData.confirmation?.confirmation_url,
        status: ykData.status,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("create-yookassa-payment error:", e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
