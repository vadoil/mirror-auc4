
-- Add fields to payments
ALTER TABLE public.payments
  ADD COLUMN IF NOT EXISTS ticket_request_id uuid REFERENCES public.ticket_requests(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS yookassa_payment_id text UNIQUE,
  ADD COLUMN IF NOT EXISTS metadata jsonb,
  ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone NOT NULL DEFAULT now();

-- Make lot_id nullable since ticket payments are not tied to a lot
ALTER TABLE public.payments ALTER COLUMN lot_id DROP NOT NULL;

CREATE INDEX IF NOT EXISTS idx_payments_ticket_request ON public.payments(ticket_request_id);
CREATE INDEX IF NOT EXISTS idx_payments_yookassa_id ON public.payments(yookassa_payment_id);

-- Trigger to update updated_at on payments
DROP TRIGGER IF EXISTS update_payments_updated_at ON public.payments;
CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add paid_at to ticket_requests
ALTER TABLE public.ticket_requests
  ADD COLUMN IF NOT EXISTS paid_at timestamp with time zone;

-- RLS: service role can insert/update payments (for edge functions using service key)
DROP POLICY IF EXISTS "Service role can insert payments" ON public.payments;
CREATE POLICY "Service role can insert payments"
  ON public.payments
  FOR INSERT
  TO public
  WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role can update payments" ON public.payments;
CREATE POLICY "Service role can update payments"
  ON public.payments
  FOR UPDATE
  TO public
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- RLS: service role can update ticket_requests (to mark as paid)
DROP POLICY IF EXISTS "Service role can update ticket requests" ON public.ticket_requests;
CREATE POLICY "Service role can update ticket requests"
  ON public.ticket_requests
  FOR UPDATE
  TO public
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- RLS: service role can read ticket_requests (for webhook to fetch data before sending email)
DROP POLICY IF EXISTS "Service role can read ticket requests" ON public.ticket_requests;
CREATE POLICY "Service role can read ticket requests"
  ON public.ticket_requests
  FOR SELECT
  TO public
  USING (auth.role() = 'service_role');
