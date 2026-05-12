
DROP POLICY IF EXISTS "Public can view bid amounts only" ON public.lot_reservations;

DROP VIEW IF EXISTS public.lot_reservation_bids;
CREATE VIEW public.lot_reservation_bids AS
SELECT id, lot_id, bid_amount, created_at
FROM public.lot_reservations
WHERE bid_amount IS NOT NULL;

GRANT SELECT ON public.lot_reservation_bids TO anon, authenticated;
