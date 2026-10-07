// Рассылки «Игристого со стилистом». Только с ключом сервиса:
//   {"kind":"reminder"} — напоминание накануне всем записавшимся (cron 23.10)
//   {"kind":"invite"}   — приглашение гостьям девичника, согласившимся на рассылку
//   {"dryRun":true}     — только посчитать, кому уйдёт
// Повторный запуск никому не дублирует письмо.
import { createClient } from 'npm:@supabase/supabase-js@2'
import { sendTemplate, notifyOrganizers } from '../_shared/wellness-mailer.ts'

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

Deno.serve(async (req) => {
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  if (req.headers.get('authorization') !== `Bearer ${key}`) return json({ error: 'forbidden' }, 403)
  const body = await req.json().catch(() => ({} as Record<string, unknown>))
  const kind = body.kind === 'invite' ? 'invite' : body.kind === 'reminder' ? 'reminder' : null
  if (!kind) return json({ error: 'kind must be reminder or invite' }, 400)
  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, key)

  const table = kind === 'invite' ? 'wellness_registrations' : 'stylist_registrations'
  const column = kind === 'invite' ? 'igristoe_invite_sent_at' : 'reminder_sent_at'
  let q = supabase.from(table).select('id, full_name, email').is(column, null).order('created_at')
  if (kind === 'invite') q = q.eq('consent_ads', true).in('payment_status', ['paid', 'free'])
  const { data: rows, error } = await q
  if (error) return json({ error: error.message }, 500)

  // гостьи девичника, которые уже записались на игристое, приглашение не получают
  let list = rows ?? []
  if (kind === 'invite' && list.length) {
    const { data: already } = await supabase.from('stylist_registrations').select('email')
    const taken = new Set((already ?? []).map((r) => r.email.toLowerCase()))
    list = list.filter((r) => !taken.has(r.email.toLowerCase()))
  }
  if (body.dryRun) return json({ kind, pending: list.length, emails: list.map((r) => r.email) })

  let sent = 0
  const failed: string[] = []
  for (const r of list) {
    try {
      await sendTemplate('igristoe', r.email, { name: r.full_name.split(/\s+/)[0], kind })
      await supabase.from(table).update({ [column]: new Date().toISOString() }).eq('id', r.id)
      sent++
    } catch (e) {
      console.error('[igristoe-send] failed', r.email, e)
      failed.push(r.email)
    }
    await new Promise((res) => setTimeout(res, 1500))
  }
  await notifyOrganizers(`🥂 Игристое со стилистом: ${kind === 'invite' ? 'приглашения гостьям девичника' : 'напоминание накануне'} — отправлено ${sent}${failed.length ? `, ошибки: ${failed.length}` : ''}`)
  return json({ kind, sent, failed })
})
