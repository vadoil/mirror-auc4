BEGIN;
UPDATE public.wellness_training_limits SET capacity = CASE training WHEN 'libido' THEN 29 WHEN 'abs' THEN 25 END, registration_open = true WHERE training IN ('libido', 'abs');
COMMIT;
