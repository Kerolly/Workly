INSERT INTO activities (id, activity_name)
VALUES
(1, 'Course'),
(2, 'Demo'),
(3, 'Meeting'),
(4, 'Make-up lesson'),
(5, 'Other')

ON CONFLICT (id) DO NOTHING;