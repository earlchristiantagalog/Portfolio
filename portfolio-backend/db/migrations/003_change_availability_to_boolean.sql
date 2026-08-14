-- Change hero.availability from VARCHAR to BOOLEAN
-- Run: psql $DATABASE_URL -f db/migrations/003_change_availability_to_boolean.sql

UPDATE hero SET availability = CASE WHEN availability = 'Available for work' THEN 'true' ELSE 'false' END WHERE id = 'hero';
ALTER TABLE hero ALTER COLUMN availability DROP DEFAULT;
ALTER TABLE hero ALTER COLUMN availability TYPE BOOLEAN USING availability::BOOLEAN;
ALTER TABLE hero ALTER COLUMN availability SET DEFAULT true;
