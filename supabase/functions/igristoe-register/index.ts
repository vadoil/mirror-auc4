// Запись на «Игристое со стилистом» (24.10, Voluminous). Бесплатно.
import { createClient } from 'npm:@supabase/supabase-js@2'
import { sendTemplate, notifyOrganizers, escapeHtml } from '../_shared/wellness-mailer.ts'

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
  if (str(body.website, 100)) return json({ ok: true }) // ловушка для ботов

  const full_name = str(body.full_name, 120)
  const email = str(body.email, 200).toLowerCase()
  const phone = str(body.phone, 32)
  const consent_pd = body.consent_pd === true
  const consent_ads = body.consent_ads === true
  const source = str(body.source, 40) || 'site'

  if (full_name.length < 2) return json({ error: 'Укажите имя' }, 400)
  if (!EMAIL_RE.test(email)) return json({ error: 'Проверьте адрес почты' }, 400)
  if (phone.replace(/\D/g, '').length < 10) return json({ error: 'Проверьте номер телефона' }, 400)
  if (!consent_pd) return json({ error: 'Нужно согласие на обработку персональных данных' }, 400)

  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  const { data: row, error } = await supabase
    .from('stylist_registrations')
    .insert({ full_name, email, phone, consent_pd, consent_ads, source })
    .select('id')
    .single()
  if (error) {
    if (error.code === '23505') return json({ ok: true, duplicate: true })
    console.error('[igristoe-register] insert failed', error)
    return json({ error: 'Не удалось сохранить запись, попробуйте ещё раз' }, 500)
  }

  try {
    await sendTemplate('igristoe', email, { name: full_name.split(/\s+/)[0], kind: 'confirm' })
    await supabase.from('stylist_registrations').update({ confirmation_sent_at: new Date().toISOString() }).eq('id', row.id)
  } catch (e) {
    console.error('[igristoe-register] email failed', e)
  }

  const { count } = await supabase.from('stylist_registrations').select('id', { count: 'exact', head: true })
  await notifyOrganizers(
    `🥂 <b>Игристое со стилистом · запись №${count ?? '?'}</b>\n` +
    `━━━━━━━━━━━━━━━━━━\n\n` +
    `👤 <b>${escapeHtml(full_name)}</b>\n📞 ${escapeHtml(phone)}\n✉️ ${escapeHtml(email)}` +
    (consent_ads ? `\n📨 согласна на рассылку` : '') +
    (source !== 'site' ? `\n🔗 ${escapeHtml(source)}` : ''),
  )
  return json({ ok: true })
})
