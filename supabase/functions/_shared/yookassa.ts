// ЮKassa: ключи магазина в secrets.env — YOOKASSA_SHOP_ID и YOOKASSA_SECRET_KEY.
// Пока ключей нет, сайт принимает оплату через CloudPayments (см. payment-provider).
// Чек 54-ФЗ: YOOKASSA_RECEIPT=1 включает передачу чека, YOOKASSA_VAT_CODE — ставка НДС (1 = без НДС).
const SHOP_ID = Deno.env.get('YOOKASSA_SHOP_ID') ?? ''
const SECRET_KEY = Deno.env.get('YOOKASSA_SECRET_KEY') ?? ''
const SEND_RECEIPT = Deno.env.get('YOOKASSA_RECEIPT') === '1'
const VAT_CODE = Number(Deno.env.get('YOOKASSA_VAT_CODE') ?? '1')

export const yookassaEnabled = () => Boolean(SHOP_ID && SECRET_KEY)
const authHeader = () => `Basic ${btoa(`${SHOP_ID}:${SECRET_KEY}`)}`

export type YookassaPayment = {
  id: string
  status: 'pending' | 'waiting_for_capture' | 'succeeded' | 'canceled'
  paid: boolean
  amount: { value: string; currency: string }
  metadata?: Record<string, string>
  confirmation?: { confirmation_url?: string }
}

export async function createYookassaPayment(p: {
  amount: number
  description: string
  returnUrl: string
  metadata: Record<string, string>
  email?: string
  idempotenceKey?: string
}): Promise<YookassaPayment> {
  const value = p.amount.toFixed(2)
  const body: Record<string, unknown> = {
    amount: { value, currency: 'RUB' },
    capture: true,
    confirmation: { type: 'redirect', return_url: p.returnUrl },
    description: p.description.slice(0, 128),
    metadata: p.metadata,
  }
  if (SEND_RECEIPT && p.email) {
    body.receipt = {
      customer: { email: p.email },
      items: [{
        description: p.description.slice(0, 128),
        quantity: '1.00',
        amount: { value, currency: 'RUB' },
        vat_code: VAT_CODE,
        payment_subject: 'service',
        payment_mode: 'full_payment',
      }],
    }
  }
  const res = await fetch('https://api.yookassa.ru/v3/payments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Idempotence-Key': p.idempotenceKey ?? crypto.randomUUID(),
      Authorization: authHeader(),
    },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(`YooKassa ${res.status}: ${JSON.stringify(data)}`)
  return data as YookassaPayment
}

/** Статус платежа из ЮKassa — уведомлениям не доверяем, перепроверяем по API */
export async function getYookassaPayment(id: string): Promise<YookassaPayment> {
  const res = await fetch(`https://api.yookassa.ru/v3/payments/${encodeURIComponent(id)}`, {
    headers: { Authorization: authHeader() },
  })
  const data = await res.json()
  if (!res.ok) throw new Error(`YooKassa ${res.status}: ${JSON.stringify(data)}`)
  return data as YookassaPayment
}
