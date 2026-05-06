
-- 1. Архив на лотах
ALTER TABLE public.lots
  ADD COLUMN IF NOT EXISTS archive_date date,
  ADD COLUMN IF NOT EXISTS archive_results jsonb;

CREATE INDEX IF NOT EXISTS idx_lots_archive_date ON public.lots(archive_date);

-- 2. Призы
CREATE TABLE IF NOT EXISTS public.auction_prizes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  partner text,
  winner_ticket text,
  event_date date,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.auction_prizes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view prizes" ON public.auction_prizes FOR SELECT USING (true);
CREATE POLICY "Admins can manage prizes" ON public.auction_prizes FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 3. Заявки на интерес к лоту
CREATE TABLE IF NOT EXISTS public.lot_interests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lot_id uuid REFERENCES public.lots(id) ON DELETE SET NULL,
  lot_title text NOT NULL,
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  message text,
  status text NOT NULL DEFAULT 'new',
  notified_telegram boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.lot_interests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit lot interest" ON public.lot_interests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view lot interests" ON public.lot_interests FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update lot interests" ON public.lot_interests FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));
