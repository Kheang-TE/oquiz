BEGIN;

ALTER TABLE "user" ADD "role" VARCHAR(255) DEFAULT 'member';

COMMIT;