
CREATE OR REPLACE VIEW public.lot_reservation_bids
WITH (security_invoker = on) AS
SELECT id, lot_id, bid_amount, created_at
FROM public.lot_reservations
WHERE bid_amount IS NOT NULL;

GRANT SELECT ON public.lot_reservation_bids TO anon, authenticated;

CREATE POLICY "Public can view bid amounts only"
ON public.lot_reservations
FOR SELECT
TO anon, authenticated
USING (bid_amount IS NOT NULL);
