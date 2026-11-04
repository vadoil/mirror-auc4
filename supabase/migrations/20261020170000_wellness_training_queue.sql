-- Seats are allocated by confirmed registration time; pending forms do not reserve places.
-- Capacity remains unlimited until configured by the organisers.
BEGIN;
CREATE TABLE IF NOT EXISTS public.wellness_training_limits (
  training text PRIMARY KEY CHECK (training IN ('libido', 'abs')),
  capacity integer CHECK (capacity >= 0)
);
INSERT INTO public.wellness_training_limits(training) VALUES ('libido'), ('abs') ON CONFLICT DO NOTHING;
UPDATE public.wellness_training_limits SET capacity = 25 WHERE training = 'abs';
ALTER TABLE public.wellness_training_limits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins view training limits" ON public.wellness_training_limits FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));
GRANT SELECT ON public.wellness_training_limits TO authenticated, service_role;
GRANT ALL ON public.wellness_training_limits TO service_role;
CREATE OR REPLACE VIEW public.wellness_training_places WITH (security_invoker = true) AS
WITH ranked AS (
  SELECT r.id AS registration_id, t.training, l.capacity,
    row_number() OVER (PARTITION BY t.training ORDER BY coalesce(r.paid_at, r.created_at), r.created_at, r.id) AS position
  FROM public.wellness_registrations r
  CROSS JOIN LATERAL unnest(r.trainings) t(training)
  JOIN public.wellness_training_limits l ON l.training = t.training
  WHERE r.payment_status IN ('paid', 'free')
)
SELECT *, CASE WHEN capacity IS NOT NULL AND position > capacity THEN 'waitlisted' ELSE 'confirmed' END AS status,
  CASE WHEN capacity IS NOT NULL AND position > capacity THEN position - capacity ELSE NULL END AS queue_position
FROM ranked;
GRANT SELECT ON public.wellness_training_places TO authenticated, service_role;
CREATE OR REPLACE FUNCTION public.wellness_training_availability()
RETURNS TABLE(training text, capacity integer, remaining bigint)
LANGUAGE sql STABLE SECURITY INVOKER SET search_path = public AS $$
  SELECT l.training, l.capacity,
    CASE WHEN l.capacity IS NULL THEN NULL ELSE greatest(l.capacity::bigint - count(p.registration_id), 0) END
  FROM public.wellness_training_limits l LEFT JOIN public.wellness_training_places p ON p.training = l.training
  GROUP BY l.training, l.capacity;
$$;
REVOKE ALL ON FUNCTION public.wellness_training_availability() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.wellness_training_availability() TO service_role;
COMMIT;
