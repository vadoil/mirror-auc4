-- Add bid_amount and request_type to lot_reservations
ALTER TABLE public.lot_reservations 
  ADD COLUMN IF NOT EXISTS bid_amount integer,
  ADD COLUMN IF NOT EXISTS request_type text NOT NULL DEFAULT 'bid';

-- Forum registrations table
CREATE TABLE IF NOT EXISTS public.forum_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  city text,
  message text,
  status text NOT NULL DEFAULT 'new',
  notified_telegram boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.forum_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit forum registration"
  ON public.forum_registrations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view forum registrations"
  ON public.forum_registrations FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update forum registrations"
  ON public.forum_registrations FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));