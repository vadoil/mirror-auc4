import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { createYookassaPayment, yookassaEnabled } from "../_shared/yookassa.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

    if (!yookassaEnabled()) {
      return new Response(JSON.stringify({ error: "ЮKassa не подключена" }), {
        status: 503,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    let ykData;
    try {
      ykData = await createYookassaPayment({ amount, description, returnUrl, metadata: { ticket_request_id: ticketRequestId }, email });
    } catch (e) {
      console.error("YooKassa error:", e);
      return new Response(JSON.stringify({ error: "YooKassa error" }), {
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
