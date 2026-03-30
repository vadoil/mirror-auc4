
-- 1. Create lot_status enum
CREATE TYPE public.lot_status AS ENUM ('draft', 'active', 'ended', 'paid', 'archived');

-- 2. Add new columns to lots table
ALTER TABLE public.lots
  ADD COLUMN IF NOT EXISTS bid_step numeric NOT NULL DEFAULT 1000,
  ADD COLUMN IF NOT EXISTS start_at timestamptz,
  ADD COLUMN IF NOT EXISTS end_at timestamptz,
  ADD COLUMN IF NOT EXISTS status lot_status NOT NULL DEFAULT 'draft',
  ADD COLUMN IF NOT EXISTS delivery_terms text,
  ADD COLUMN IF NOT EXISTS restrictions text;

-- 3. Migrate existing is_active data to status
UPDATE public.lots SET status = 'active' WHERE is_active = true;
UPDATE public.lots SET status = 'draft' WHERE is_active = false;

-- 4. Add user_id to bids table (nullable for backward compat with existing anonymous bids)
ALTER TABLE public.bids
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- 5. Create payments table
CREATE TABLE public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lot_id uuid REFERENCES public.lots(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  amount numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  provider text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Payments RLS: users see own payments, admins see all
CREATE POLICY "Users can view own payments"
  ON public.payments FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all payments"
  ON public.payments FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage payments"
  ON public.payments FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 6. Update bids RLS: drop old policies and create new ones
DROP POLICY IF EXISTS "Anyone can place a bid" ON public.bids;
DROP POLICY IF EXISTS "Admins can view bids" ON public.bids;

CREATE POLICY "Authenticated users can place bids"
  ON public.bids FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view own bids"
  ON public.bids FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all bids"
  ON public.bids FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 7. Anyone can read active lots (keep existing, already allows SELECT for all)
-- Existing policy "Lots are viewable by everyone" stays

-- 8. Create storage bucket for lot images
INSERT INTO storage.buckets (id, name, public) VALUES ('lot-images', 'lot-images', true);

-- Storage policies for lot-images
CREATE POLICY "Anyone can view lot images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'lot-images');

CREATE POLICY "Admins can upload lot images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'lot-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete lot images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'lot-images' AND public.has_role(auth.uid(), 'admin'));

-- 9. Enable realtime for bids
ALTER PUBLICATION supabase_realtime ADD TABLE public.bids;
