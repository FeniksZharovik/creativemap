-- pgcrypto menyediakan gen_random_uuid() untuk default UUID
CREATE EXTENSION IF NOT EXISTS pgcrypto;
 
-- ---------- Drop semua tabel & enum (idempotent untuk re-run) -----------
DROP TABLE IF EXISTS audit_log CASCADE;
DROP TABLE IF EXISTS testimonial CASCADE;
DROP TABLE IF EXISTS impact_metric CASCADE;
DROP TABLE IF EXISTS forum_comment CASCADE;
DROP TABLE IF EXISTS forum_post CASCADE;
DROP TABLE IF EXISTS training_record CASCADE;
DROP TABLE IF EXISTS course_enrollment CASCADE;
DROP TABLE IF EXISTS course_module CASCADE;
DROP TABLE IF EXISTS course CASCADE;
DROP TABLE IF EXISTS work CASCADE;
DROP TABLE IF EXISTS creator_profile CASCADE;
DROP TABLE IF EXISTS city CASCADE;
DROP TABLE IF EXISTS province CASCADE;
DROP TABLE IF EXISTS sector CASCADE;
DROP TABLE IF EXISTS app_user CASCADE;
 
DROP TYPE IF EXISTS user_role;
DROP TYPE IF EXISTS gender_type;
DROP TYPE IF EXISTS business_scale;
DROP TYPE IF EXISTS verification_status;
DROP TYPE IF EXISTS course_level;
 
-- ---------- Enum types -----------
CREATE TYPE user_role           AS ENUM ('ADMIN', 'CREATOR', 'PARTNER', 'RESEARCHER');
CREATE TYPE gender_type         AS ENUM ('FEMALE', 'MALE', 'NON_BINARY', 'PREFER_NOT_TO_SAY');
CREATE TYPE business_scale      AS ENUM ('INDIVIDUAL', 'MICRO', 'SMALL', 'MEDIUM', 'COOPERATIVE');
CREATE TYPE verification_status AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');
CREATE TYPE course_level        AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');
 
-- =====================================================================
-- USER (nama "user" reserved di PostgreSQL → pakai "app_user")
-- =====================================================================
CREATE TABLE app_user (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email           TEXT NOT NULL UNIQUE,
  password_hash   TEXT NOT NULL,
  name            TEXT NOT NULL,
  role            user_role NOT NULL DEFAULT 'CREATOR',
  email_verified  TIMESTAMPTZ,
  image           TEXT,
  bio             TEXT,
  phone           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
 
-- =====================================================================
-- MASTER DATA: SEKTOR & LOKASI
-- =====================================================================
CREATE TABLE sector (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT NOT NULL UNIQUE,
  name_id     TEXT NOT NULL,
  name_en     TEXT NOT NULL,
  description TEXT,
  icon        TEXT,
  is_ifcd     BOOLEAN NOT NULL DEFAULT FALSE,
  "order"     INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
 
CREATE TABLE province (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code      TEXT NOT NULL UNIQUE,
  name      TEXT NOT NULL UNIQUE,
  region    TEXT,
  latitude  DOUBLE PRECISION,
  longitude DOUBLE PRECISION
);
 
CREATE TABLE city (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code        TEXT NOT NULL UNIQUE,
  name        TEXT NOT NULL,
  type        TEXT NOT NULL,
  province_id UUID NOT NULL REFERENCES province(id) ON DELETE RESTRICT,
  latitude    DOUBLE PRECISION,
  longitude   DOUBLE PRECISION
);
CREATE INDEX idx_city_province ON city(province_id);
 
-- =====================================================================
-- CREATOR PROFILE (inti pemetaan)
-- =====================================================================
CREATE TABLE creator_profile (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                 UUID NOT NULL UNIQUE REFERENCES app_user(id) ON DELETE CASCADE,
 
  full_name               TEXT NOT NULL,
  slug                    TEXT NOT NULL UNIQUE,
  bio                     TEXT,
  avatar_url              TEXT,
  cover_image_url         TEXT,
 
  -- demografi (kunci untuk evaluasi UNESCO)
  gender                  gender_type,
  birth_year              INTEGER,
  is_youth                BOOLEAN NOT NULL DEFAULT FALSE,
  is_indigenous           BOOLEAN NOT NULL DEFAULT FALSE,
  ethnic_group            TEXT,
  has_disability          BOOLEAN NOT NULL DEFAULT FALSE,
 
  -- klasifikasi
  sector_id               UUID NOT NULL REFERENCES sector(id) ON DELETE RESTRICT,
  sub_sector              TEXT,
  tags                    TEXT,
 
  -- bisnis
  business_name           TEXT,
  business_scale          business_scale NOT NULL DEFAULT 'INDIVIDUAL',
  year_started            INTEGER,
  is_formally_registered  BOOLEAN NOT NULL DEFAULT FALSE,
  legal_entity            TEXT,
  tax_id                  TEXT,
  monthly_revenue_idr     INTEGER,
 
  -- lokasi
  province_id             UUID NOT NULL REFERENCES province(id) ON DELETE RESTRICT,
  city_id                 UUID NOT NULL REFERENCES city(id) ON DELETE RESTRICT,
  address                 TEXT,
  latitude                DOUBLE PRECISION,
  longitude               DOUBLE PRECISION,
 
  -- online presence
  website                 TEXT,
  instagram               TEXT,
  facebook                TEXT,
  youtube                 TEXT,
  tiktok                  TEXT,
  spotify                 TEXT,
  whatsapp                TEXT,
 
  -- dampak
  exports_to_countries    TEXT,
  employee_count          INTEGER,
  women_employees_pct     INTEGER,
 
  -- status
  verification_status     verification_status NOT NULL DEFAULT 'PENDING',
  verified_at             TIMESTAMPTZ,
  is_public               BOOLEAN NOT NULL DEFAULT TRUE,
  consent_to_share        BOOLEAN NOT NULL DEFAULT FALSE,
 
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_creator_sector              ON creator_profile(sector_id);
CREATE INDEX idx_creator_province            ON creator_profile(province_id);
CREATE INDEX idx_creator_city                ON creator_profile(city_id);
CREATE INDEX idx_creator_gender              ON creator_profile(gender);
CREATE INDEX idx_creator_is_youth            ON creator_profile(is_youth);
CREATE INDEX idx_creator_verification_status ON creator_profile(verification_status);
 
-- portofolio karya
CREATE TABLE work (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id   UUID NOT NULL REFERENCES creator_profile(id) ON DELETE CASCADE,
  title        TEXT NOT NULL,
  description  TEXT,
  year         INTEGER,
  image_url    TEXT,
  external_url TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_work_creator ON work(creator_id);
 
-- =====================================================================
-- CAPACITY BUILDING (LMS Sederhana)
-- =====================================================================
CREATE TABLE course (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug           TEXT NOT NULL UNIQUE,
  title          TEXT NOT NULL,
  description    TEXT NOT NULL,
  thumbnail      TEXT,
  level          course_level NOT NULL DEFAULT 'BEGINNER',
  duration_min   INTEGER,
  language       TEXT NOT NULL DEFAULT 'id',
  sector_id      UUID REFERENCES sector(id) ON DELETE SET NULL,
  for_women      BOOLEAN NOT NULL DEFAULT FALSE,
  for_youth      BOOLEAN NOT NULL DEFAULT FALSE,
  for_indigenous BOOLEAN NOT NULL DEFAULT FALSE,
  is_published   BOOLEAN NOT NULL DEFAULT FALSE,
  published_at   TIMESTAMPTZ,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_course_sector ON course(sector_id);
 
CREATE TABLE course_module (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id   UUID NOT NULL REFERENCES course(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  content_md  TEXT NOT NULL,
  video_url   TEXT,
  "order"     INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_course_module_course ON course_module(course_id);
 
CREATE TABLE course_enrollment (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
  course_id    UUID NOT NULL REFERENCES course(id) ON DELETE CASCADE,
  progress     INTEGER NOT NULL DEFAULT 0,
  completed_at TIMESTAMPTZ,
  enrolled_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);
CREATE INDEX idx_enrollment_user   ON course_enrollment(user_id);
CREATE INDEX idx_enrollment_course ON course_enrollment(course_id);
 
CREATE TABLE training_record (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id      UUID NOT NULL REFERENCES creator_profile(id) ON DELETE CASCADE,
  course_id       UUID REFERENCES course(id) ON DELETE SET NULL,
  title           TEXT NOT NULL,
  organizer       TEXT,
  city            TEXT,
  start_date      TIMESTAMPTZ NOT NULL,
  end_date        TIMESTAMPTZ,
  hours_total     INTEGER,
  certificate_url TEXT,
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_training_creator ON training_record(creator_id);
 
-- =====================================================================
-- FORUM
-- =====================================================================
CREATE TABLE forum_post (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id  UUID NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
  title      TEXT NOT NULL,
  body       TEXT NOT NULL,
  category   TEXT NOT NULL DEFAULT 'general',
  is_pinned  BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_forum_post_author   ON forum_post(author_id);
CREATE INDEX idx_forum_post_category ON forum_post(category);
 
CREATE TABLE forum_comment (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id    UUID NOT NULL REFERENCES forum_post(id) ON DELETE CASCADE,
  author_id  UUID NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
  body       TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_forum_comment_post   ON forum_comment(post_id);
CREATE INDEX idx_forum_comment_author ON forum_comment(author_id);
 
-- =====================================================================
-- IMPACT TRACKING & TESTIMONIAL
-- =====================================================================
CREATE TABLE impact_metric (
  id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  metric   TEXT NOT NULL,
  value    INTEGER NOT NULL,
  category TEXT,
  notes    TEXT
);
CREATE INDEX idx_impact_metric_date ON impact_metric(metric, date);
 
CREATE TABLE testimonial (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id    UUID REFERENCES app_user(id) ON DELETE SET NULL,
  author_name  TEXT NOT NULL,
  author_role  TEXT,
  quote        TEXT NOT NULL,
  image_url    TEXT,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
 
-- =====================================================================
-- AUDIT LOG (akuntabilitas IFCD)
-- =====================================================================
CREATE TABLE audit_log (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES app_user(id) ON DELETE SET NULL,
  action      TEXT NOT NULL,
  entity_type TEXT,
  entity_id   TEXT,
  metadata    JSONB,
  ip_address  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_audit_log_user    ON audit_log(user_id);
CREATE INDEX idx_audit_log_action  ON audit_log(action);
CREATE INDEX idx_audit_log_created ON audit_log(created_at);