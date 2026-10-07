import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Check, Loader2 } from "lucide-react";
import { currentUtm } from "@/lib/utm";

// Запись на «Игристое со стилистом» (24.10) — бесплатно, письмо-приглашение приходит сразу.
const FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/igristoe-register`;
const ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const inputCls =
  "w-full bg-white/95 border border-cream/20 rounded-full px-5 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/60";

const Tick = ({ checked, onChange, children }: { checked: boolean; onChange: (v: boolean) => void; children: React.ReactNode }) => (
  <label className="flex items-start gap-3 cursor-pointer select-none">
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only peer" />
    <span
      className={`mt-0.5 w-5 h-5 shrink-0 rounded border flex items-center justify-center transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-primary ${
        checked ? "bg-primary border-primary" : "bg-transparent border-cream/40"
      }`}
    >
      {checked && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
    </span>
    <span className="font-body text-xs text-cream/70 leading-relaxed">{children}</span>
  </label>
);

const IgristoeSignup = () => {
  const [form, setForm] = useState({ full_name: "", phone: "", email: "", website: "" });
  const [consentPd, setConsentPd] = useState(false);
  const [consentAds, setConsentAds] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<null | "ok" | "duplicate">(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!consentPd) {
      setError("Отметьте согласие на обработку персональных данных");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` },
        body: JSON.stringify({
          ...form,
          consent_pd: consentPd,
          consent_ads: consentAds,
          source: currentUtm().utm_source || "site",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setError(data.error || "Не удалось записаться. Попробуйте ещё раз.");
        return;
      }
      setDone(data.duplicate ? "duplicate" : "ok");
    } catch {
      setError("Нет связи с сервером. Проверьте интернет и попробуйте ещё раз.");
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="text-center py-4">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary flex items-center justify-center">
          <Check className="w-6 h-6 text-primary-foreground" />
        </div>
        <p className="font-display text-2xl md:text-3xl text-cream mb-2">
          {done === "duplicate" ? "Вы уже в списке гостей" : "Вы записаны!"}
        </p>
        <p className="font-body text-sm text-cream/70">
          {done === "duplicate"
            ? "Эта почта уже записана на 24 октября — приглашение мы отправили раньше."
            : `Приглашение отправили на ${form.email}. Ждём вас 24 октября с 14:00 до 19:00.`}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      <input type="text" name="website" value={form.website} onChange={set("website")} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid sm:grid-cols-3 gap-3 mb-4">
        <input className={inputCls} placeholder="Имя*" required maxLength={120} autoComplete="name" value={form.full_name} onChange={set("full_name")} />
        <input className={inputCls} type="tel" placeholder="Телефон*" required maxLength={32} autoComplete="tel" value={form.phone} onChange={set("phone")} />
        <input className={inputCls} type="email" placeholder="Почта*" required maxLength={200} autoComplete="email" value={form.email} onChange={set("email")} />
      </div>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="space-y-2">
          <Tick checked={consentPd} onChange={setConsentPd}>
            Согласна с{" "}
            <Link to="/privacy" target="_blank" className="text-primary underline underline-offset-2">
              политикой использования персональных данных
            </Link>
            *
          </Tick>
          <Tick checked={consentAds} onChange={setConsentAds}>
            Согласна с получением рекламных материалов
          </Tick>
        </div>
        <button
          type="submit"
          disabled={busy}
          className="shrink-0 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full text-xs uppercase tracking-[0.18em] font-body hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {busy && <Loader2 className="w-4 h-4 animate-spin" />}
          {busy ? "Записываем…" : "Записаться бесплатно"}
        </button>
      </div>
      {error && <p className="font-body text-sm text-primary mt-3">{error}</p>}
    </form>
  );
};

export default IgristoeSignup;
