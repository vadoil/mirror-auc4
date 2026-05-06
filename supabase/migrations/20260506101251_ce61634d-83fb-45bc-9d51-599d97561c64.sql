
-- Винтажное колье VintageDream — 550 000, оплачено
UPDATE lots SET archive_results = '[{"price":550000,"paid":true}]'::jsonb
WHERE id = '095fbdd1-cf89-49cd-99a8-f9eed8ce0c0a';

-- Часы «Балет» Чугунова — 300 000, оплачено
UPDATE lots SET archive_results = '[{"price":300000,"paid":true}]'::jsonb
WHERE id = '511e718a-573e-4eed-b050-a8565a5293f6';

-- Фарфоровые вазы «Сказ по краю» (3 шт): 70 000 + 70 000 + 42 000, все оплачены
UPDATE lots SET archive_results = '[{"price":70000,"paid":true},{"price":70000,"paid":true},{"price":42000,"paid":true}]'::jsonb
WHERE id = 'e70eb081-55fb-45dc-8129-b12e970c5c20';

-- Обеды с Ситниковым (2): 140 000 оплачено + 200 000 НЕ оплачено
UPDATE lots SET archive_results = '[{"price":140000,"paid":true},{"price":200000,"paid":false}]'::jsonb
WHERE id = '54a88df9-5f08-4794-b19c-12bc9e6d3874';

-- Обед/хоккей с Беловым — 130 000, оплачено
UPDATE lots SET archive_results = '[{"price":130000,"paid":true}]'::jsonb
WHERE id = '7a7553ee-eb50-4cdf-8819-4389f889dd4a';

-- Обеды с Цыпкиным (2): 450 000 + 450 000, оба оплачены
UPDATE lots SET archive_results = '[{"price":450000,"paid":true},{"price":450000,"paid":true}]'::jsonb
WHERE id = '9eaf0b24-6b25-4512-af83-936745d99252';

-- Хакамада — 300 000, оплачено
UPDATE lots SET archive_results = '[{"price":300000,"paid":true}]'::jsonb
WHERE id = 'ac7e8e40-c7dd-4672-9c75-b1caa86224c0';

-- Marriott — 20 000, оплачено
UPDATE lots SET archive_results = '[{"price":20000,"paid":true}]'::jsonb
WHERE id = '6730abac-5b8b-447a-a97d-3be9ae9cfdfc';

-- Баня «Соловьи» — 40 000, оплачено
UPDATE lots SET archive_results = '[{"price":40000,"paid":true}]'::jsonb
WHERE id = '3f5b893c-09fd-4122-b07e-a321afa56f15';

-- Грудина / ONE — не продан
UPDATE lots SET archive_results = '[]'::jsonb
WHERE id = '530453b6-a9c1-4374-ab46-158d1710efbd';

-- SmartLife — не продан
UPDATE lots SET archive_results = '[]'::jsonb
WHERE id = '8f05196f-46a6-4100-847c-c913a32cd1e9';

-- Книга Ситникова с автографом — 30 000, оплачено
UPDATE lots SET archive_results = '[{"price":30000,"paid":true}]'::jsonb
WHERE id = 'aad7816d-faa0-4750-9a14-f738e6835b06';
