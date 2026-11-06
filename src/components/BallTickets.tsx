import { FormEvent, useEffect, useState } from "react";
import { currentUtm } from "@/lib/utm";

type Order = { id: string; token: string; ticket: "single" | "pair"; seats: number; amount: number; status: string; number: string | null; lotCredit: number; test: boolean; confirmationUrl?: string };
const store = "otrazis-ball-order";
async function api(action: string, body?: unknown) {
  const r = await fetch(`/api/ball.php?action=${action}`, body ? { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) } : undefined);
  const data = await r.json().catch(() => ({}));
  if (!r.ok || !data.ok) throw new Error(data.error || "Сервис билетов временно недоступен. Свяжитесь с организатором.");
  return data;
}
const money = (n: number) => `${n.toLocaleString("ru-RU")} ₽`;
export default function BallTickets() {
  const [ticket, setTicket] = useState<"single" | "pair">("single");
  const [enabled, setEnabled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [test, setTest] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [requestId, setRequestId] = useState(() => sessionStorage.getItem("ball-request") || crypto.randomUUID());
  const [promo, setPromo] = useState("");
  useEffect(() => {
    api("config").then(d => { setEnabled(d.enabled); setTest(d.test); }).catch(() => setEnabled(false)).finally(() => setLoaded(true));
    const q = new URLSearchParams(location.search);
    let saved: { id: string; token: string } | null = null;
    try { saved = JSON.parse(sessionStorage.getItem(store) || "null"); } catch { /* no saved order */ }
    const id = q.get("order");
    if (id) {
      q.delete("order"); history.replaceState(null, "", location.pathname + (q.size ? `?${q}` : "") + "#tickets");
      if (!saved || saved.id !== id) { saved = null; setError("Для проверки заказа вернитесь в браузер, где оформляли билет, или свяжитесь с организатором. Не оплачивайте повторно."); }
    }
    if (saved) api("status", saved).then(d => setOrder(d.order)).catch(e => setError(e.message));
  }, []);
  async function check() {
    if (!order) return;
    setBusy(true); setError("");
    try { const d = await api("status", { id: order.id, token: order.token }); setOrder(d.order); } catch (e) { setError((e as Error).message); } finally { setBusy(false); }
  }
  async function pay(o: Order) {
    const d = await api("pay", { id: o.id, token: o.token }); setOrder(d.order);
    if (d.order.confirmationUrl) window.location.assign(d.order.confirmationUrl);
  }
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setError("");
    const form = new FormData(e.currentTarget);
    sessionStorage.setItem("ball-request", requestId);
    try {
      const d = await api("create", { requestId, ticket, name: form.get("name"), guest: form.get("guest") || "", email: form.get("email"), phone: form.get("phone"), promo, consent: form.get("consent") === "on", website: form.get("website"), utm: currentUtm() });
      const o: Order = d.order; setOrder(o); sessionStorage.setItem(store, JSON.stringify({ id: o.id, token: o.token }));
      if (o.status === "pending") await pay(o);
    } catch (e) { setError((e as Error).message); } finally { setBusy(false); }
  }
  function reset() { sessionStorage.removeItem(store); sessionStorage.removeItem("ball-request"); setOrder(null); setRequestId(crypto.randomUUID()); setError(""); setPromo(""); }
  function download() {
    if (!order) return;
    const text = `${order.test ? "ТЕСТ — не является билетом\n" : ""}Отражение добра — Предновогодний благотворительный бал\n11 декабря 2026, Санкт-Петербург\nТелеграф, Почтамтская улица, 15\nБилет: ${order.number}\nГостей: ${order.seats}\n${order.status === "free" ? "Приглашение друга" : `Оплачено: ${money(order.amount)}`}\nЗачёт при покупке лота: ${money(order.lotCredit)}\nКонтакт организатора: +7 (985) 809-53-70\n`;
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" })); const a = document.createElement("a"); a.href = url; a.download = `${order.number}.txt`; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  const input = "block w-full mt-2 p-3 border border-border rounded-lg bg-background focus-visible:outline-primary";
  return <section id="tickets" className="section-padding py-16 md:py-24 scroll-mt-20"><div className="max-w-5xl mx-auto">
    <h2 className="font-display text-4xl md:text-5xl mb-7">Ваш билет на бал</h2>
    <div className="bg-primary text-white rounded-2xl p-6 md:p-9 mb-8">
      <p className="font-display text-2xl md:text-4xl leading-tight">При покупке лота стоимость вашего билета вычитается из его цены.</p>
      <p className="font-body mt-4 text-base md:text-lg">35 000 ₽ — за билет на одного. 50 000 ₽ — за билет «1+1».</p>
    </div>
    {(test || order?.test) && <p role="status" className="bg-yellow-100 p-4 mb-5 text-black">Тестовый режим: билеты для входа не выдаются.</p>}
    {error && <p role="alert" className="text-red-800 bg-red-50 border border-red-200 rounded-lg p-4 mb-5">{error}</p>}
    {order ? <div className="border border-primary/30 rounded-2xl p-6 md:p-9" aria-live="polite">
      <h3 className="font-display text-2xl mb-4">{order.status === "paid" ? "Оплата подтверждена" : order.status === "free" ? "Приглашение друга оформлено" : order.status === "canceled" ? "Платёж отменён" : order.status === "refunded" ? "По платежу оформлен возврат" : "Заказ ожидает оплаты"}</h3>
      <p className="font-body mb-3">{order.seats === 2 ? "Билет «1+1» — два гостя" : "Билет на одного гостя"} · {money(order.amount)}</p>
      {order.number && <p className="font-numbers text-2xl mb-4 break-all">{order.number}</p>}
      {["paid", "free"].includes(order.status) ? <><p className="font-body mb-5">Сохраните номер билета или скачайте подтверждение. На входе назовите имя и номер билета.{order.status === "free" && " По бесплатному приглашению сумма к зачёту при покупке лота — 0 ₽."}</p><button onClick={download} className="btn-primary">Скачать подтверждение</button></> : order.status === "pending" ? <div className="space-y-4"><p className="font-body">Если вы уже оплатили, нажмите «Проверить оплату». Возвращение из ЮKassa само по себе не подтверждает платёж.</p><div className="flex gap-3 flex-wrap"><button disabled={busy} onClick={check} className="btn-primary disabled:opacity-50">{busy ? "Проверяем…" : "Проверить оплату"}</button><button disabled={busy || !enabled} onClick={async () => { setBusy(true); setError(""); try { await pay(order); } catch (e) { setError((e as Error).message); } finally { setBusy(false); } }} className="border border-primary p-3 rounded disabled:opacity-50">Продолжить оплату</button></div></div> : <p>Свяжитесь с организатором для уточнения заказа.</p>}
      {order.status !== "pending" && <button onClick={reset} className="block mt-6 underline underline-offset-4">Оформить ещё один билет</button>}
    </div> : <form onSubmit={submit} className="font-body">
      <fieldset disabled={busy}><legend className="mb-4 text-lg">Выберите билет</legend><div className="grid sm:grid-cols-2 gap-4 mb-8">{([['single', 'На одного', 35000], ['pair', '1+1 · на двоих', 50000]] as const).map(([id, title, price]) => <label key={id} className={`cursor-pointer rounded-xl border-2 p-6 ${ticket === id ? "border-primary bg-primary/5" : "border-border"}`}><span className="flex gap-3 items-center"><input type="radio" name="ticket" value={id} checked={ticket === id} onChange={() => setTicket(id)} className="accent-primary" />{title}</span><span className="block font-numbers text-4xl text-primary mt-4">{money(price)}</span></label>)}</div>
      <div className="grid md:grid-cols-2 gap-5">
        <label>Ваше имя и фамилия<input name="name" required minLength={2} maxLength={160} autoComplete="name" className={input} /></label>
        {ticket === "pair" && <label>Имя и фамилия второго гостя<input name="guest" required minLength={2} maxLength={160} className={input} /></label>}
        <label>Email<input name="email" type="email" required maxLength={254} autoComplete="email" className={input} /></label>
        <label>Телефон<input name="phone" type="tel" required minLength={7} maxLength={40} autoComplete="tel" className={input} /></label>
        <label>Код друга, если есть<input name="promo" value={promo} onChange={e => setPromo(e.target.value)} maxLength={80} autoComplete="off" className={input} /><span className="text-xs text-muted-foreground">Одноразовый код даёт бесплатный билет выбранного типа. Применится при оформлении.</span></label>
      </div>
      <div hidden aria-hidden="true"><label>Сайт<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="flex gap-3 items-start mt-6 text-sm"><input name="consent" type="checkbox" required className="mt-1 accent-primary" /><span>Согласен с <a className="underline" href="/ball-terms" target="_blank" rel="noopener noreferrer">условиями приобретения билета</a> и <a className="underline" href="/privacy" target="_blank" rel="noopener noreferrer">обработкой персональных данных</a>.</span></label>
      {loaded && !enabled && <p role="status" className="mt-5 p-4 bg-card rounded-lg">Онлайн-продажа готовится к открытию. По вопросам билетов: <a className="underline" href="https://t.me/jiselle_tolts">Гизела Тольц</a>.</p>}
      <button disabled={busy || !enabled} className="btn-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed">{busy ? "Оформляем…" : promo.trim() ? "Применить код и оформить" : `Перейти к оплате ${money(ticket === "pair" ? 50000 : 35000)}`}</button>
      </fieldset>
    </form>}
  </div></section>;
}
