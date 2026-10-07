import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { CLOUDPAYMENTS_PUBLIC_ID, loadCloudPaymentsWidget } from "@/lib/cloudpayments";
import { currentUtm } from "@/lib/utm";

export const TRAININGS = [
  { id: "libido", title: "Либидо-фитнес", coach: "с Маргаритой Дмитриевой" },
  { id: "abs", title: "Плоский живот", coach: "с Георгием Какуниным" },
  { id: "bowls", title: "Медитация", coach: "с поющими чашами" },
] as const;

const FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/wellness-register`;
const ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const WELLNESS_PRICE = 440;
const PAY_DESCRIPTION = "Участие в велнес-девичнике «Отражение», 25.10.2026";

const callApi = async (body: Record<string, unknown>) => {
  const res = await fetch(FUNCTION_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok && data.ok, data };
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const inputCls =
  "w-full bg-background border border-border rounded px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 transition-colors";

const CheckRow = ({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
}) => (
  <label className="flex items-start gap-3 cursor-pointer select-none">
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only peer" />
    <span
      className={`mt-0.5 w-5 h-5 shrink-0 rounded border flex items-center justify-center transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-primary ${
        checked ? "bg-primary border-primary" : "bg-background border-border"
      }`}
    >
      {checked && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
    </span>
    <span className="font-body text-xs md:text-sm text-muted-foreground leading-relaxed">{children}</span>
  </label>
);

const WellnessRegistration = () => {
  const [form, setForm] = useState({ full_name: "", telegram: "", email: "", age: "", phone: "", website: "" });
  const [trainings, setTrainings] = useState<string[]>([]);
  const toggleTraining = (id: string) =>
    setTrainings((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  const [consentPd, setConsentPd] = useState(false);
  const [consentAds, setConsentAds] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ position?: number; duplicate?: boolean } | null>(null);
  // регистрация создана, но оплата ещё не подтверждена
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [stage, setStage] = useState<"form" | "paying" | "checking" | "unpaid">("form");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  // Ждём подтверждение от CloudPayments: уведомление приходит на сервер через несколько секунд
  const waitForPayment = async (id: string) => {
    setStage("checking");
    for (let i = 0; i < 10; i++) {
      const { ok, data } = await callApi({ action: "status", id }).catch(() => ({ ok: false, data: {} as any }));
      if (ok && data.status !== "pending") {
        setResult({ position: data.position });
        return;
      }
      await sleep(2000);
    }
    setStage("unpaid");
  };

  const openPayment = async (id: string) => {
    setError(null);
    setStage("paying");
    try {
      await loadCloudPaymentsWidget();
      const widget = new window.cp.CloudPayments({ language: "ru-RU" });
      await widget.start({
        publicTerminalId: CLOUDPAYMENTS_PUBLIC_ID,
        amount: WELLNESS_PRICE,
        currency: "RUB",
        culture: "ru-RU",
        paymentSchema: "Single",
        description: PAY_DESCRIPTION,
        externalId: `wellness-${id}`,
        receiptEmail: form.email,
        userInfo: { fullName: form.full_name, email: form.email, phone: form.phone },
        metadata: { wellness_registration_id: id },
        // онлайн-чек (54-ФЗ): услуга, полный расчёт, без НДС
        receipt: {
          items: [
            {
              label: PAY_DESCRIPTION,
              price: WELLNESS_PRICE,
              quantity: 1,
              amount: WELLNESS_PRICE,
              vat: null,
              method: 4,
              object: 4,
              measurementUnit: "шт",
            },
          ],
          email: form.email,
          phone: form.phone,
          amounts: { electronic: WELLNESS_PRICE, advancePayment: 0, credit: 0, provision: 0 },
        },
        retryPayment: true,
      });
    } catch (e) {
      console.error(e);
    }
    // виджет закрыт — проверяем, пришла ли оплата
    await waitForPayment(id);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!consentPd) {
      setError("Отметьте согласие на обработку персональных данных");
      return;
    }
    setSubmitting(true);
    try {
      const { ok, data } = await callApi({
        ...form,
        age: form.age ? Number(form.age) : undefined,
        trainings,
        consent_pd: consentPd,
        consent_ads: consentAds,
        utm: currentUtm(),
      });
      if (!ok) {
        setError(data.error || "Не удалось отправить регистрацию. Попробуйте ещё раз.");
        return;
      }
      if (data.duplicate) {
        setResult({ duplicate: true });
        return;
      }
      setPendingId(data.id);
      setSubmitting(false);
      await openPayment(data.id);
    } catch {
      setError("Нет связи с сервером. Проверьте интернет и попробуйте ещё раз.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!result && pendingId && stage !== "form") {
    return (
      <div className="bg-card border border-border rounded-lg p-8 md:p-12 text-center">
        {stage === "unpaid" ? (
          <>
            <h3 className="font-display text-3xl md:text-4xl text-foreground mb-4">Оплата не завершена</h3>
            <p className="font-body text-sm md:text-base text-muted-foreground max-w-lg mx-auto mb-8">
              Анкета сохранена, осталось оплатить участие — {WELLNESS_PRICE} ₽. Если вы уже оплатили, подтверждение
              придёт на {form.email} в течение нескольких минут.
            </p>
            <button
              onClick={() => openPayment(pendingId)}
              className="bg-primary text-primary-foreground px-10 py-4 rounded inline-flex items-center justify-center gap-2 text-sm uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
            >
              Оплатить {WELLNESS_PRICE} ₽
            </button>
          </>
        ) : (
          <>
            <Loader2 className="w-8 h-8 mx-auto mb-6 text-primary animate-spin" />
            <h3 className="font-display text-2xl md:text-3xl text-foreground mb-2">
              {stage === "paying" ? "Открываем оплату…" : "Проверяем оплату…"}
            </h3>
            <p className="font-body text-sm text-muted-foreground">Не закрывайте страницу.</p>
          </>
        )}
      </div>
    );
  }

  if (result) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-primary/30 rounded-lg p-8 md:p-12 text-center"
      >
        <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-primary flex items-center justify-center">
          <Check className="w-7 h-7 text-primary-foreground" />
        </div>
        {result.duplicate ? (
          <>
            <h3 className="font-display text-3xl md:text-4xl text-foreground mb-4">Вы уже в списке гостей</h3>
            <p className="font-body text-sm md:text-base text-muted-foreground max-w-lg mx-auto">
              Эта почта уже зарегистрирована и оплачена. Подтверждение мы отправили раньше — проверьте входящие
              и папку «Спам».
            </p>
          </>
        ) : (
          <>
            <h3 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Оплата прошла{result.position ? <span className="text-primary"> · №{result.position}</span> : null}
            </h3>
            {result.position !== undefined && result.position <= 60 && (
              <p className="font-body text-base text-foreground mb-3">
                Вы среди первых 60 гостей — место в лектории за вами гарантировано.
              </p>
            )}
            <p className="font-body text-sm md:text-base text-muted-foreground max-w-lg mx-auto">
              Подтверждение отправили на {form.email}, чек пришлёт CloudPayments. Напомним о девичнике за неделю и накануне. До встречи 25 октября!
            </p>
          </>
        )}
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 md:p-10">
      {/* скрытое поле-ловушка для ботов */}
      <input type="text" name="website" value={form.website} onChange={set("website")} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <input className={`${inputCls} sm:col-span-2`} placeholder="Имя и фамилия*" required maxLength={120} autoComplete="name" value={form.full_name} onChange={set("full_name")} />
        <input className={inputCls} type="email" placeholder="Почта*" required maxLength={200} autoComplete="email" value={form.email} onChange={set("email")} />
        <input className={inputCls} type="tel" placeholder="Телефон*" required maxLength={32} autoComplete="tel" value={form.phone} onChange={set("phone")} />
        <input className={inputCls} placeholder="Ник в Telegram" maxLength={64} value={form.telegram} onChange={set("telegram")} />
        <input className={inputCls} type="number" inputMode="numeric" min={14} max={100} placeholder="Возраст" value={form.age} onChange={set("age")} />
      </div>

      <p className="font-body text-xs uppercase tracking-[0.2em] text-primary mt-8 mb-4">Я иду на тренировки</p>
      <div className="grid sm:grid-cols-3 gap-3 mb-3">
        {TRAININGS.map((t, i) => {
          const active = trainings.includes(t.id);
          return (
            <button
              type="button"
              key={t.id}
              onClick={() => toggleTraining(t.id)}
              aria-pressed={active}
              className={`text-left rounded-lg border p-4 transition-all ${
                active ? "border-primary bg-primary/10" : "border-border bg-background hover:border-primary/40"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-numbers text-sm text-primary">{i + 1}</span>
                <span
                  className={`w-4 h-4 rounded border flex items-center justify-center ${
                    active ? "border-primary bg-primary" : "border-border"
                  }`}
                >
                  {active && <Check className="w-3 h-3 text-primary-foreground" />}
                </span>
              </div>
              <p className="font-display text-lg text-foreground leading-tight">{t.title}</p>
              <p className="font-body text-xs text-muted-foreground">{t.coach}</p>
            </button>
          );
        })}
      </div>
      <p className="font-body text-xs text-muted-foreground/70 mb-8">Можно выбрать одну, две или все три — или ни одной. Нажмите ещё раз, чтобы снять выбор.</p>

      <div className="space-y-3 mb-8">
        <CheckRow checked={consentPd} onChange={setConsentPd}>
          Согласна с{" "}
          <Link to="/privacy" target="_blank" className="text-primary underline underline-offset-2">
            политикой использования персональных данных
          </Link>
          *
        </CheckRow>
        <CheckRow checked={consentAds} onChange={setConsentAds}>
          Согласна с получением рекламных материалов
        </CheckRow>
      </div>

      <p className="font-body text-xs text-muted-foreground/80 mb-6">
        Участие — {WELLNESS_PRICE} ₽. После анкеты откроется защищённая форма оплаты CloudPayments, данные карты
        не хранятся на сайте. Электронный чек придёт на почту.
      </p>

      {error && <p className="font-body text-sm text-destructive mb-4">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full sm:w-auto bg-primary text-primary-foreground px-10 py-4 rounded inline-flex items-center justify-center gap-2 text-sm uppercase tracking-[0.15em] hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
        {submitting ? "Отправляем…" : `Зарегистрироваться и оплатить ${WELLNESS_PRICE} ₽`}
      </button>
    </form>
  );
};

export default WellnessRegistration;
