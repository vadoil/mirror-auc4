// Оплата регистрации на девичник через ЮKassa: создаёт платёж и возвращает ссылку на оплату.
// Подтверждение приходит в yookassa-webhook (metadata.wellness_registration_id).
import { createClient } from 'npm:@supabase/supabase-js@2'
import { createYookassaPayment, yookassaEnabled } from '../_shared/yookassa.ts'
import { WELLNESS_PRICE } from '../_shared/wellness-payment.ts'

const SITE = 'https://xn--80aodvkjc9f.xn--p1ai'
const DESCRIPTION = 'Велнес-девичник «Отражение», 25.10 — средства будут направлены в поддержку фонда «Не напрасно»'
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (!yookassaEnabled()) return json({ error: 'ЮKassa не подключена' }, 503)
  const { id } = await req.json().catch(() => ({} as Record<string, unknown>))
  if (typeof id !== 'string' || !UUID_RE.test(id)) return json({ error: 'bad id' }, 400)

  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  const { data: reg } = await supabase.from('wellness_registrations').select('id, email, payment_status').eq('id', id).maybeSingle()
  if (!reg) return json({ error: 'not found' }, 404)
  if (reg.payment_status !== 'pending') return json({ ok: true, alreadyPaid: true })

  try {
    const p = await createYookassaPayment({
      amount: WELLNESS_PRICE,
      description: DESCRIPTION,
      returnUrl: `${SITE}/wellness?payment=${id}#registration`,
      metadata: { wellness_registration_id: id },
      email: reg.email,
    })
    await supabase.from('payments').upsert(
      { ticket_request_id: null, yookassa_payment_id: p.id, amount: WELLNESS_PRICE, provider: 'yookassa', status: p.status, metadata: p },
      { onConflict: 'yookassa_payment_id' },
    )
    return json({ ok: true, confirmationUrl: p.confirmation?.confirmation_url })
  } catch (e) {
    console.error('[wellness-pay]', e)
    return json({ error: 'Не удалось создать платёж, попробуйте ещё раз' }, 502)
  }
})
