
-- User roles enum and table
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Admins can view roles" ON public.user_roles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Lots table
CREATE TABLE public.lots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  starting_price INTEGER NOT NULL DEFAULT 0,
  current_price INTEGER NOT NULL DEFAULT 0,
  category TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.lots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lots are viewable by everyone" ON public.lots
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert lots" ON public.lots
  FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update lots" ON public.lots
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete lots" ON public.lots
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- Ticket requests table
CREATE TABLE public.ticket_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  ticket_type TEXT NOT NULL DEFAULT 'standard',
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.ticket_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit ticket request" ON public.ticket_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view ticket requests" ON public.ticket_requests
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update ticket requests" ON public.ticket_requests
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- Bids table
CREATE TABLE public.bids (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lot_id UUID NOT NULL REFERENCES public.lots(id) ON DELETE CASCADE,
  bidder_name TEXT NOT NULL,
  bidder_email TEXT NOT NULL,
  bidder_phone TEXT,
  amount INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.bids ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can place a bid" ON public.bids
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view bids" ON public.bids
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Update timestamp function and triggers
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_lots_updated_at
  BEFORE UPDATE ON public.lots
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
