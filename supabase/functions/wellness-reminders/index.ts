// Напоминания гостьям девичника. Вызывается cron-ом с сервера:
//   POST {"kind":"week"|"day","dryRun"?:true}, Authorization: Bearer <SERVICE_ROLE_KEY>
// Повторный вызов безопасен: кому уже отправлено, тому не шлём.
import { createClient } from 'npm:@supabase/supabase-js@2'
import { sendTemplate, notifyOrganizers } from '../_shared/wellness-mailer.ts'

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

Deno.serve(async (req) => {
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  if (req.headers.get('authorization') !== `Bearer ${serviceKey}`) return json({ error: 'forbidden' }, 403)

  const body = await req.json().catch(() => ({} as Record<string, unknown>))
  const kind = body.kind === 'day' ? 'day' : body.kind === 'week' ? 'week' : null
  if (!kind) return json({ error: 'kind must be week or day' }, 400)
  const column = kind === 'day' ? 'reminder_day_sent_at' : 'reminder_week_sent_at'

  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, serviceKey)
  const { data: rows, error } = await supabase
    .from('wellness_registrations')
    .select('id, full_name, email, trainings')
    .is(column, null)
    .in('payment_status', ['paid', 'free'])
    .order('created_at')
  if (error) return json({ error: error.message }, 500)

  if (body.dryRun) return json({ kind, pending: rows.length })

  let sent = 0
  const failed: string[] = []
  for (const r of rows) {
    try {
      await sendTemplate('wellness-reminder', r.email, { name: r.full_name.split(/\s+/)[0], trainings: r.trainings, kind })
      await supabase.from('wellness_registrations').update({ [column]: new Date().toISOString() }).eq('id', r.id)
      sent++
    } catch (e) {
      console.error('[wellness-reminders] failed', r.email, e)
      failed.push(r.email)
    }
    await new Promise((res) => setTimeout(res, 1500)) // не упираемся в лимиты SMTP
  }

  await notifyOrganizers(
    `📬 Девичник: напоминание «${kind === 'day' ? 'накануне' : 'за неделю'}» — отправлено ${sent}` +
    (failed.length ? `, ошибки: ${failed.length}` : ''),
  )
  return json({ kind, sent, failed })
})
