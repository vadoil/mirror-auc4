// Какая платёжная система сейчас подключена (ЮKassa — если на сервере заданы её ключи, иначе CloudPayments)
export type PaymentProvider = "yookassa" | "cloudpayments";

const API = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;
const ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const apiHeaders = { "Content-Type": "application/json", apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` };

let cached: Promise<PaymentProvider> | null = null;

export const getPaymentProvider = (): Promise<PaymentProvider> => {
  cached ??= fetch(`${API}/payment-provider`, { headers: apiHeaders })
    .then((r) => r.json())
    .then((d) => (d.provider === "yookassa" ? "yookassa" : "cloudpayments") as PaymentProvider)
    .catch(() => "cloudpayments" as PaymentProvider);
  return cached;
};

/** ЮKassa: создать платёж за регистрацию на девичник и вернуть ссылку на оплату */
export const createWellnessYookassaPayment = async (registrationId: string) => {
  const res = await fetch(`${API}/wellness-pay`, { method: "POST", headers: apiHeaders, body: JSON.stringify({ id: registrationId }) });
  const data = await res.json().catch(() => ({}));
  return data as { ok?: boolean; confirmationUrl?: string; alreadyPaid?: boolean; error?: string };
};
