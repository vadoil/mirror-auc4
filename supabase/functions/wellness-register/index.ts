// Регистрация на велнес-девичник (платная, 440 ₽).
//   POST {анкета}                 → создаёт регистрацию «ждёт оплаты», возвращает id для виджета CloudPayments
//   POST {action:"status", id}    → статус оплаты (сайт опрашивает после закрытия виджета)
// Письмо гостье и сообщение организаторам уходят после оплаты — из cloudpayments-webhook.
import { createClient } from 'npm:@supabase/supabase-js@2'
import { TRAININGS } from '../_shared/transactional-email-templates/wellness-event.ts'
import { WELLNESS_PRICE } from '../_shared/wellness-payment.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

const str = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max)
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'method not allowed' }, 405)

  const body = await req.json().catch(() => ({} as Record<string, unknown>))
  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

  if (body.action === 'status') {
    const id = str(body.id, 36)
    if (!UUID_RE.test(id)) return json({ error: 'bad id' }, 400)
    const { data: row } = await supabase
      .from('wellness_registrations')
      .select('payment_status, paid_at')
      .eq('id', id)
      .maybeSingle()
    if (!row) return json({ error: 'not found' }, 404)
    let position: number | undefined
    if (row.payment_status === 'paid') {
      const { count } = await supabase
        .from('wellness_registrations')
        .select('id', { count: 'exact', head: true })
        .in('payment_status', ['paid', 'free'])
        .lte('paid_at', row.paid_at)
      position = count ?? undefined
    }
    return json({ ok: true, status: row.payment_status, position })
  }

  // Ловушка для ботов: скрытое поле, человек его не заполняет
  if (str(body.website, 100)) return json({ ok: true, duplicate: true })

  const full_name = str(body.full_name, 120)
  const email = str(body.email, 200).toLowerCase()
  const phone = str(body.phone, 32)
  const telegram = str(body.telegram, 64).replace(/^https?:\/\/t\.me\//i, '').replace(/^@/, '') || null
  const ageNum = Number(body.age)
  const age = Number.isInteger(ageNum) && ageNum >= 14 && ageNum <= 100 ? ageNum : null
  // можно выбрать несколько тренировок; старый формат с одним полем training тоже принимаем
  const rawTrainings = Array.isArray(body.trainings) ? body.trainings : body.training ? [body.training] : []
  const trainings = [...new Set(rawTrainings.filter((t: unknown): t is string => typeof t === 'string' && !!TRAININGS[t]))]
  const consent_pd = body.consent_pd === true
  const consent_ads = body.consent_ads === true

  if (full_name.length < 2) return json({ error: 'Укажите имя и фамилию' }, 400)
  if (!EMAIL_RE.test(email)) return json({ error: 'Проверьте адрес почты' }, 400)
  if (phone.replace(/\D/g, '').length < 10) return json({ error: 'Проверьте номер телефона' }, 400)
  if (body.age !== undefined && body.age !== '' && age === null) return json({ error: 'Проверьте возраст' }, 400)
  if (!consent_pd) return json({ error: 'Нужно согласие на обработку персональных данных' }, 400)

  const fields = {
    full_name, email, phone, telegram, age, trainings, consent_pd, consent_ads,
    utm: typeof body.utm === 'object' && body.utm ? body.utm : null,
  }

  // Уже есть регистрация с этой почтой: оплаченная — повторно не берём; неоплаченная — обновляем и даём оплатить
  const { data: existing } = await supabase
    .from('wellness_registrations')
    .select('id, payment_status')
    .eq('email', email)
    .maybeSingle()

  if (existing && existing.payment_status !== 'pending') return json({ ok: true, duplicate: true })

  if (existing) {
    const { error } = await supabase.from('wellness_registrations').update(fields).eq('id', existing.id)
    if (error) {
      console.error('[wellness-register] update failed', error)
      return json({ error: 'Не удалось сохранить регистрацию, попробуйте ещё раз' }, 500)
    }
    return json({ ok: true, id: existing.id, amount: WELLNESS_PRICE })
  }

  const { data: row, error } = await supabase
    .from('wellness_registrations')
    .insert({ ...fields, payment_status: 'pending' })
    .select('id')
    .single()

  if (error) {
    console.error('[wellness-register] insert failed', error)
    return json({ error: 'Не удалось сохранить регистрацию, попробуйте ещё раз' }, 500)
  }
  return json({ ok: true, id: row.id, amount: WELLNESS_PRICE })
})
