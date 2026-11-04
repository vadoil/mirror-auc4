export type YookassaPayment = {
  id: string
  status: 'pending' | 'waiting_for_capture' | 'succeeded' | 'canceled'
  paid: boolean
  amount: { value: string; currency: string }
  metadata?: Record<string, string>
  confirmation?: { confirmation_url?: string }
}
