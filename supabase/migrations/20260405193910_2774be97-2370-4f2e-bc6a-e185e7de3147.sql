
CREATE TABLE public.lot_reservations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lot_id UUID NOT NULL REFERENCES public.lots(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  ticket_request_id UUID REFERENCES public.ticket_requests(id),
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.lot_reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create reservation"
ON public.lot_reservations FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Admins can view all reservations"
ON public.lot_reservations FOR SELECT
TO public
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update reservations"
ON public.lot_reservations FOR UPDATE
TO public
USING (has_role(auth.uid(), 'admin'::app_role));
