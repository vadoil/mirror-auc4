const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function escapeHtml(s: string): string {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

function fmt(label: string, value: unknown): string {
  if (value === undefined || value === null || value === "") return "";
  return `<b>${label}:</b> ${escapeHtml(String(value))}\n`;
}

function buildText(event: string, data: Record<string, unknown>): string {
  switch (event) {
    case "ticket_request": {
      return (
        `<b>🎟 Новая заявка на билет</b>\n\n` +
        fmt("Тип", data.ticket_type) +
        fmt("Имя", data.name) +
        fmt("Email", data.email) +
        fmt("Телефон", data.phone) +
        fmt("Промокод", data.promo_code) +
        (data.message ? `\n<i>${escapeHtml(String(data.message))}</i>` : "")
      );
    }
    case "payment_succeeded": {
      return (
        `<b>💳 Оплата получена</b>\n\n` +
        fmt("Сумма", `${data.amount} ₽`) +
        fmt("Тип", data.ticket_type) +
        fmt("Имя", data.name) +
        fmt("Email", data.email) +
        fmt("YooKassa ID", data.yookassa_payment_id)
      );
    }
    case "promo_registration": {
      return (
        `<b>🎁 Регистрация по промокоду</b>\n\n` +
        fmt("Промокод", data.promo_code) +
        fmt("Имя", data.name) +
        fmt("Email", data.email) +
        fmt("Телефон", data.phone)
      );
    }
    case "new_bid": {
      return (
        `<b>🔨 Новая ставка на аукционе</b>\n\n` +
        fmt("Лот", data.lot_title) +
        fmt("Сумма", `${data.amount} ₽`) +
        fmt("Имя", data.bidder_name) +
        fmt("Email", data.bidder_email) +
        fmt("Телефон", data.bidder_phone)
      );
    }
    case "lot_interest":
    case "lot_bid_request": {
      const amount = data.amount ? `${Number(data.amount).toLocaleString("ru-RU")} ₽` : "—";
      return (
        `🔨 <b>Новая ставка на лот</b>\n` +
        `━━━━━━━━━━━━━━━━━━\n\n` +
        `🎁 <b>Лот:</b> ${escapeHtml(String(data.lot_title ?? ""))}\n` +
        `💰 <b>Ставка:</b> ${amount}\n\n` +
        `👤 <b>${escapeHtml(String(data.name ?? ""))}</b>\n` +
        `📞 <a href="tel:${escapeHtml(String(data.phone ?? ""))}">${escapeHtml(String(data.phone ?? ""))}</a>` +
        (data.email ? `\n✉️ ${escapeHtml(String(data.email))}` : "") +
        (data.message ? `\n\n💬 <i>${escapeHtml(String(data.message))}</i>` : "") +
        `\n\n<i>Свяжитесь с участником для подтверждения ставки.</i>`
      );
    }
    case "lot_buy_request": {
      return (
        `🛒 <b>Заявка на покупку лота</b>\n` +
        `━━━━━━━━━━━━━━━━━━\n\n` +
        `🎁 <b>Лот:</b> ${escapeHtml(String(data.lot_title ?? ""))}\n\n` +
        `👤 <b>${escapeHtml(String(data.name ?? ""))}</b>\n` +
        `📞 <a href="tel:${escapeHtml(String(data.phone ?? ""))}">${escapeHtml(String(data.phone ?? ""))}</a>` +
        (data.email ? `\n✉️ ${escapeHtml(String(data.email))}` : "") +
        (data.message ? `\n\n💬 <i>${escapeHtml(String(data.message))}</i>` : "") +
        `\n\n<i>Участник хочет купить лот напрямую — свяжитесь для оформления.</i>`
      );
    }
    case "forum_registration": {
      return (
        `🌿 <b>Заявка на форум «Отражение»</b>\n` +
        `━━━━━━━━━━━━━━━━━━\n\n` +
        `👤 <b>${escapeHtml(String(data.name ?? ""))}</b>\n` +
        (data.phone ? `📞 <a href="tel:${escapeHtml(String(data.phone))}">${escapeHtml(String(data.phone))}</a>\n` : "") +
        (data.email ? `✉️ ${escapeHtml(String(data.email))}\n` : "") +
        (data.city ? `📍 ${escapeHtml(String(data.city))}\n` : "") +
        (data.message ? `\n💬 <i>${escapeHtml(String(data.message))}</i>` : "")
      );
    }
    default: {
      return `<b>📣 Событие: ${escapeHtml(event)}</b>\n\n<pre>${escapeHtml(JSON.stringify(data, null, 2))}</pre>`;
    }
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({} as any));
    const event = String(body.event ?? "").trim();
    const data = (body.data ?? {}) as Record<string, unknown>;

    if (!event) {
      return new Response(JSON.stringify({ error: "event is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const token = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const chatId = Deno.env.get("TELEGRAM_CHAT_ID");
    if (!token || !chatId) {
      console.warn("[notify-telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set");
      return new Response(JSON.stringify({ ok: false, skipped: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const text = buildText(event, data);

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
    });
    const json = await res.json();
    if (!res.ok || !json?.ok) {
      console.error("[notify-telegram] failed", res.status, json);
      return new Response(JSON.stringify({ ok: false, error: json }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("[notify-telegram] error", e);
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
