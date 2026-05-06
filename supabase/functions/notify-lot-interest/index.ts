import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Payload {
  lot_id?: string | null;
  lot_title: string;
  name: string;
  phone: string;
  email?: string | null;
  message?: string | null;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = (await req.json()) as Payload;
    if (!body?.name?.trim() || !body?.phone?.trim() || !body?.lot_title?.trim()) {
      return new Response(JSON.stringify({ error: "name, phone, lot_title are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Save interest in DB (admin can review)
    const { data: inserted, error: insertErr } = await supabase
      .from("lot_interests")
      .insert({
        lot_id: body.lot_id ?? null,
        lot_title: body.lot_title,
        name: body.name.trim(),
        phone: body.phone.trim(),
        email: body.email?.trim() || null,
        message: body.message?.trim() || null,
      })
      .select("id")
      .single();
    if (insertErr) throw insertErr;

    // Try sending to Telegram
    const token = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const chatId = Deno.env.get("TELEGRAM_CHAT_ID");
    let notified = false;

    if (token && chatId) {
      const text =
        `<b>🔔 Заявка на лот «Отражение добра»</b>\n\n` +
        `<b>Лот:</b> ${escapeHtml(body.lot_title)}\n` +
        `<b>Имя:</b> ${escapeHtml(body.name)}\n` +
        `<b>Телефон:</b> ${escapeHtml(body.phone)}\n` +
        (body.email ? `<b>Email:</b> ${escapeHtml(body.email)}\n` : "") +
        (body.message ? `\n<i>${escapeHtml(body.message)}</i>` : "");

      const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
      });
      const tgJson = await tgRes.json();
      if (tgRes.ok && tgJson?.ok) {
        notified = true;
        await supabase.from("lot_interests").update({ notified_telegram: true }).eq("id", inserted.id);
      } else {
        console.error("Telegram send failed", tgRes.status, tgJson);
      }
    } else {
      console.warn("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set — skipping notification");
    }

    return new Response(JSON.stringify({ ok: true, id: inserted.id, notified }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("notify-lot-interest error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
