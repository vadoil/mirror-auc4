CREATE POLICY "Anyone can view bids"
ON public.bids
FOR SELECT
TO public
USING (true);

DELETE FROM public.bids WHERE bidder_email = 'vvm1976@gmail.com';