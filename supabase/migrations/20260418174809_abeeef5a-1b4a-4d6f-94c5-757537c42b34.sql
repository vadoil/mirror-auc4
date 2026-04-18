CREATE TABLE public.utm_visits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  landing_page TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.utm_visits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can log a visit"
ON public.utm_visits
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view utm visits"
ON public.utm_visits
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX idx_utm_visits_created_at ON public.utm_visits (created_at DESC);
CREATE INDEX idx_utm_visits_source ON public.utm_visits (utm_source);