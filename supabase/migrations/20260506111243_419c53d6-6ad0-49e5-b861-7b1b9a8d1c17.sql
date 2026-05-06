UPDATE public.lots SET status = 'active' WHERE archive_date IS NULL AND status = 'draft';

-- Привести image_url к коротким именам, совпадающим с локальными ассетами
UPDATE public.lots SET image_url = 'lot-dinner-sitnikov.jpg' WHERE id = '5568ea58-de18-4f8b-8da8-c05d87b32ee6';
UPDATE public.lots SET image_url = 'lot-biohacking-one.jpg' WHERE id = '8daf3f05-2e37-4e00-b2b4-a67961067811';
UPDATE public.lots SET image_url = 'lot-watch-ballet.jpg' WHERE id = '544d25bf-4e7a-4712-bb68-d122fb47d808';
UPDATE public.lots SET image_url = 'lot-hockey-belov.jpg' WHERE id = 'c7bb6aa0-d865-41ed-ae99-ce586707d82d';
UPDATE public.lots SET image_url = 'lot-smartlife.png' WHERE id = '13713cd3-b04d-4595-8683-cc5901b12e3f';
UPDATE public.lots SET image_url = 'lot-soloviy.jpg' WHERE id = 'aa3af9bb-2563-4d2d-8d85-ba668a4fb528';
UPDATE public.lots SET image_url = 'lot-tsypkin.png', preview_image_url = NULL WHERE id = 'd55af229-2846-473f-b169-e22e7094e6a7';
UPDATE public.lots SET image_url = 'lot-hakamada.jpg' WHERE id = 'e054a246-3b12-4d8f-adf6-cbb242bca007';
UPDATE public.lots SET image_url = 'lot-vase.jpg' WHERE id = 'd9b13fbb-c1b7-4444-ae2a-0c5b84061964';
UPDATE public.lots SET image_url = 'lot-book-sitnikov.jpg' WHERE id = '6b3e3db2-1111-4b4c-b65e-3a6dd29128fd';

-- Привести burunov/shnurov/listovets к коротким именам
UPDATE public.lots SET image_url = 'lot-burunov-tea.jpg' WHERE id = 'ce4e8678-135e-413d-ba7c-d72ec2b984ed';
UPDATE public.lots SET image_url = 'lot-shnurov.jpg' WHERE id = '8d2d99f1-6748-4753-a42b-e7d88935ad8d';
UPDATE public.lots SET image_url = 'lot-listovets.jpg' WHERE id = 'e6803e3c-b7ce-42b8-b6b2-38b2b5999b5e';
