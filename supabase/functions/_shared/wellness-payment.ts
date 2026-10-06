// Платная регистрация на велнес-девичник: цена и подтверждение оплаты.
import type { SupabaseClient } from 'npm:@supabase/supabase-js@2'
import { sendTemplate, notifyOrganizers, escapeHtml } from './wellness-mailer.ts'
import { TRAININGS } from './transactional-email-templates/wellness-event.ts'

export const WELLNESS_PRICE = 440
// InvoiceId в CloudPayments: «wellness-<uuid регистрации>»
export const WELLNESS_INVOICE_PREFIX = 'wellness-'

export const wellnessIdFromInvoice = (invoiceId?: string | null) =>
  invoiceId && invoiceId.startsWith(WELLNESS_INVOICE_PREFIX) ? invoiceId.slice(WELLNESS_INVOICE_PREFIX.length) : null

/** Отмечает регистрацию оплаченной и отправляет письмо и уведомление. Повторный вызов ничего не дублирует. */
export async function confirmWellnessPayment(
  supabase: SupabaseClient,
  registrationId: string,
  payment: { amount: number; transactionId: string },
) {
  if (payment.amount < WELLNESS_PRICE) {
    console.error('[wellness-payment] сумма меньше цены', registrationId, payment.amount)
    return { ok: false, reason: 'amount' }
  }

  // атомарно: переводим в paid только из pending — второе уведомление сюда не пройдёт
  const { data: row } = await supabase
    .from('wellness_registrations')
    .update({ payment_status: 'paid', paid_at: new Date().toISOString(), amount: payment.amount, transaction_id: payment.transactionId })
    .eq('id', registrationId)
    .eq('payment_status', 'pending')
    .select('id, full_name, email, phone, telegram, age, trainings, consent_ads, paid_at')
    .maybeSingle()
  if (!row) return { ok: true, already: true }

  const { count } = await supabase
    .from('wellness_registrations')
    .select('id', { count: 'exact', head: true })
    .in('payment_status', ['paid', 'free'])
    .lte('paid_at', row.paid_at)
  const position = count ?? undefined

  try {
    await sendTemplate('wellness-registration', row.email, {
      name: row.full_name.split(/\s+/)[0], trainings: row.trainings, position, amount: payment.amount,
    })
    await supabase.from('wellness_registrations').update({ confirmation_sent_at: new Date().toISOString() }).eq('id', row.id)
  } catch (e) {
    console.error('[wellness-payment] email failed', e)
  }

  await notifyOrganizers(
    `🌸 <b>Девичник: оплачено ${payment.amount} ₽</b> · №${position ?? '?'}\n` +
    `━━━━━━━━━━━━━━━━━━\n\n` +
    `👤 <b>${escapeHtml(row.full_name)}</b>${row.age ? `, ${row.age}` : ''}\n` +
    `📞 ${escapeHtml(row.phone)}\n✉️ ${escapeHtml(row.email)}\n` +
    (row.telegram ? `💬 @${escapeHtml(row.telegram)}\n` : '') +
    ((row.trainings ?? []) as string[]).map((t) => `\n🏃‍♀️ ${escapeHtml(TRAININGS[t] ?? t)}`).join('') +
    (row.consent_ads ? `\n📨 согласна на рассылку` : '') +
    `\n\n💳 CloudPayments #${escapeHtml(payment.transactionId)}`,
  )
  return { ok: true, position }
}
