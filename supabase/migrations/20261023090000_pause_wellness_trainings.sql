BEGIN;
ALTER TABLE public.wellness_training_limits ADD COLUMN IF NOT EXISTS registration_open boolean NOT NULL DEFAULT true;
UPDATE public.wellness_training_limits SET registration_open = false WHERE training IN ('libido', 'abs');
COMMIT;
SELECT training,capacity,registration_open FROM public.wellness_training_limits;
