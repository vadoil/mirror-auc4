CREATE TABLE public.auction_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  contact TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  notified_telegram BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.auction_reviews TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.auction_reviews TO authenticated;
GRANT ALL ON public.auction_reviews TO service_role;

ALTER TABLE public.auction_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit review"
  ON public.auction_reviews
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view published reviews"
  ON public.auction_reviews
  FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can view all reviews"
  ON public.auction_reviews
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update reviews"
  ON public.auction_reviews
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete reviews"
  ON public.auction_reviews
  FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));