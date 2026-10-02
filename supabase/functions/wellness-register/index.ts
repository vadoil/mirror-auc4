import { createClient } from 'npm:@supabase/supabase-js@2'
import { sendTemplate, notifyOrganizers, escapeHtml } from '../_shared/wellness-mailer.ts'
import { TRAININGS } from '../_shared/transactional-email-templates/wellness-event.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

const str = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max)
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'method not allowed' }, 405)

  const body = await req.json().catch(() => ({} as Record<string, unknown>))

  // Ловушка для ботов: скрытое поле, человек его не заполняет
  if (str(body.website, 100)) return json({ ok: true })

  const full_name = str(body.full_name, 120)
  const email = str(body.email, 200).toLowerCase()
  const phone = str(body.phone, 32)
  const telegram = str(body.telegram, 64).replace(/^https?:\/\/t\.me\//i, '').replace(/^@/, '') || null
  const ageNum = Number(body.age)
  const age = Number.isInteger(ageNum) && ageNum >= 14 && ageNum <= 100 ? ageNum : null
  const training = typeof body.training === 'string' && TRAININGS[body.training] ? body.training : null
  const consent_pd = body.consent_pd === true
  const consent_ads = body.consent_ads === true

  if (full_name.length < 2) return json({ error: 'Укажите имя и фамилию' }, 400)
  if (!EMAIL_RE.test(email)) return json({ error: 'Проверьте адрес почты' }, 400)
  if (phone.replace(/\D/g, '').length < 10) return json({ error: 'Проверьте номер телефона' }, 400)
  if (body.age !== undefined && body.age !== '' && age === null) return json({ error: 'Проверьте возраст' }, 400)
  if (!consent_pd) return json({ error: 'Нужно согласие на обработку персональных данных' }, 400)

  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

  const { data: row, error } = await supabase
    .from('wellness_registrations')
    .insert({
      full_name, email, phone, telegram, age, training, consent_pd, consent_ads,
      utm: typeof body.utm === 'object' && body.utm ? body.utm : null,
    })
    .select('id, created_at')
    .single()

  if (error) {
    if (error.code === '23505') return json({ ok: true, duplicate: true })
    console.error('[wellness-register] insert failed', error)
    return json({ error: 'Не удалось сохранить регистрацию, попробуйте ещё раз' }, 500)
  }

  const { count } = await supabase
    .from('wellness_registrations')
    .select('id', { count: 'exact', head: true })
    .lte('created_at', row.created_at)
  const position = count ?? undefined

  const firstName = full_name.split(/\s+/)[0]
  try {
    await sendTemplate('wellness-registration', email, { name: firstName, training, position })
    await supabase.from('wellness_registrations').update({ confirmation_sent_at: new Date().toISOString() }).eq('id', row.id)
  } catch (e) {
    console.error('[wellness-register] email failed', e)
  }

  await notifyOrganizers(
    `🌸 <b>Регистрация на велнес-девичник</b> · №${position ?? '?'}\n` +
    `━━━━━━━━━━━━━━━━━━\n\n` +
    `👤 <b>${escapeHtml(full_name)}</b>${age ? `, ${age}` : ''}\n` +
    `📞 ${escapeHtml(phone)}\n✉️ ${escapeHtml(email)}\n` +
    (telegram ? `💬 @${escapeHtml(telegram)}\n` : '') +
    (training ? `\n🏃‍♀️ ${escapeHtml(TRAININGS[training])}` : '') +
    (consent_ads ? `\n📨 согласна на рассылку` : ''),
  )

  return json({ ok: true, position })
})
