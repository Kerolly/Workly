INSERT INTO hourlyrates (user_id, activity_id, hourly_rate_gross)
VALUES
(28, 1, 90),
(28, 2, 60),
(28, 3, 30),
(28, 4, 30),
(28, 5, 50)

ON CONFLICT (user_id, activity_id) DO NOTHING

UPDATE hourlyrates
SET hourly_rate_gross = 45
WHERE user_id = 28 and activity_id = 1;