import type { YookassaPayment } from './yookassa-types.ts'
/** Only an API-verified status can authorize fulfillment, never the notification's event field. */
export function verifiedPaymentEvent(payment: YookassaPayment): string | null {
  if (payment.status === 'succeeded' && payment.paid && payment.amount.currency === 'RUB') return 'payment.succeeded'
  if (payment.status === 'canceled') return 'payment.canceled'
  return null
}
