import { query, queryOne } from "@/lib/db";
import type {
  CreatorProfile,
  CreatorWithRelations,
  CreatorFilters,
  Sector,
  Province,
  City,
  Work,
  Gender,
  BusinessScale,
  VerificationStatus,
} from "@/lib/types";
 
/**
 * Row shape dari hasil JOIN antara creator_profile + sector + province + city.
 * Semua kolom di-prefix supaya tidak bentrok (cp_, s_, p_, c_).
 */
interface CreatorJoinedRow {
  cp_id: string;
  cp_user_id: string;
  cp_full_name: string;
  cp_slug: string;
  cp_bio: string | null;
  cp_avatar_url: string | null;
  cp_cover_image_url: string | null;
  cp_gender: Gender | null;
  cp_birth_year: number | null;
  cp_is_youth: boolean;
  cp_is_indigenous: boolean;
  cp_ethnic_group: string | null;
  cp_has_disability: boolean;
  cp_sector_id: string;
  cp_sub_sector: string | null;
  cp_tags: string | null;
  cp_business_name: string | null;
  cp_business_scale: BusinessScale;
  cp_year_started: number | null;
  cp_is_formally_registered: boolean;
  cp_legal_entity: string | null;
  cp_monthly_revenue_idr: number | null;
  cp_province_id: string;
  cp_city_id: string;
  cp_address: string | null;
  cp_latitude: number | null;
  cp_longitude: number | null;
  cp_website: string | null;
  cp_instagram: string | null;
  cp_facebook: string | null;
  cp_youtube: string | null;
  cp_tiktok: string | null;
  cp_spotify: string | null;
  cp_whatsapp: string | null;
  cp_verification_status: VerificationStatus;
  cp_is_public: boolean;
  cp_consent_to_share: boolean;
 
  s_id: string;
  s_slug: string;
  s_name_id: string;
  s_name_en: string;
  s_description: string | null;
  s_icon: string | null;
  s_is_ifcd: boolean;
  s_order: number;
 
  p_id: string;
  p_code: string;
  p_name: string;
  p_region: string | null;
  p_latitude: number | null;
  p_longitude: number | null;
 
  c_id: string;
  c_code: string;
  c_name: string;
  c_type: string;
  c_latitude: number | null;
  c_longitude: number | null;
}
 
const SELECT_CREATOR_JOINED = `
  SELECT
    cp.id AS cp_id, cp.user_id AS cp_user_id, cp.full_name AS cp_full_name, cp.slug AS cp_slug,
    cp.bio AS cp_bio, cp.avatar_url AS cp_avatar_url, cp.cover_image_url AS cp_cover_image_url,
    cp.gender AS cp_gender, cp.birth_year AS cp_birth_year, cp.is_youth AS cp_is_youth,
    cp.is_indigenous AS cp_is_indigenous, cp.ethnic_group AS cp_ethnic_group,
    cp.has_disability AS cp_has_disability,
    cp.sector_id AS cp_sector_id, cp.sub_sector AS cp_sub_sector, cp.tags AS cp_tags,
    cp.business_name AS cp_business_name, cp.business_scale AS cp_business_scale,
    cp.year_started AS cp_year_started, cp.is_formally_registered AS cp_is_formally_registered,
    cp.legal_entity AS cp_legal_entity, cp.monthly_revenue_idr AS cp_monthly_revenue_idr,
    cp.province_id AS cp_province_id, cp.city_id AS cp_city_id,
    cp.address AS cp_address, cp.latitude AS cp_latitude, cp.longitude AS cp_longitude,
    cp.website AS cp_website, cp.instagram AS cp_instagram, cp.facebook AS cp_facebook,
    cp.youtube AS cp_youtube, cp.tiktok AS cp_tiktok, cp.spotify AS cp_spotify,
    cp.whatsapp AS cp_whatsapp,
    cp.verification_status AS cp_verification_status,
    cp.is_public AS cp_is_public, cp.consent_to_share AS cp_consent_to_share,
 
    s.id AS s_id, s.slug AS s_slug, s.name_id AS s_name_id, s.name_en AS s_name_en,
    s.description AS s_description, s.icon AS s_icon, s.is_ifcd AS s_is_ifcd, s."order" AS s_order,
 
    p.id AS p_id, p.code AS p_code, p.name AS p_name, p.region AS p_region,
    p.latitude AS p_latitude, p.longitude AS p_longitude,
 
    c.id AS c_id, c.code AS c_code, c.name AS c_name, c.type AS c_type,
    c.latitude AS c_latitude, c.longitude AS c_longitude
  FROM creator_profile cp
  JOIN sector   s ON s.id = cp.sector_id
  JOIN province p ON p.id = cp.province_id
  JOIN city     c ON c.id = cp.city_id
`;
 
function rowToCreator(r: CreatorJoinedRow): CreatorWithRelations {
  const sector: Sector = {
    id: r.s_id,
    slug: r.s_slug,
    nameId: r.s_name_id,
    nameEn: r.s_name_en,
    description: r.s_description,
    icon: r.s_icon,
    isIfcd: r.s_is_ifcd,
    order: r.s_order,
  };
  const province: Province = {
    id: r.p_id,
    code: r.p_code,
    name: r.p_name,
    region: r.p_region,
    latitude: r.p_latitude,
    longitude: r.p_longitude,
  };
  const city: City = {
    id: r.c_id,
    code: r.c_code,
    name: r.c_name,
    type: r.c_type,
    provinceId: r.p_id,
    latitude: r.c_latitude,
    longitude: r.c_longitude,
  };
  return {
    id: r.cp_id,
    userId: r.cp_user_id,
    fullName: r.cp_full_name,
    slug: r.cp_slug,
    bio: r.cp_bio,
    avatarUrl: r.cp_avatar_url,
    coverImageUrl: r.cp_cover_image_url,
    gender: r.cp_gender,
    birthYear: r.cp_birth_year,
    isYouth: r.cp_is_youth,
    isIndigenous: r.cp_is_indigenous,
    ethnicGroup: r.cp_ethnic_group,
    hasDisability: r.cp_has_disability,
    sectorId: r.cp_sector_id,
    subSector: r.cp_sub_sector,
    tags: r.cp_tags,
    businessName: r.cp_business_name,
    businessScale: r.cp_business_scale,
    yearStarted: r.cp_year_started,
    isFormallyRegistered: r.cp_is_formally_registered,
    legalEntity: r.cp_legal_entity,
    monthlyRevenueIDR: r.cp_monthly_revenue_idr,
    provinceId: r.cp_province_id,
    cityId: r.cp_city_id,
    address: r.cp_address,
    latitude: r.cp_latitude,
    longitude: r.cp_longitude,
    website: r.cp_website,
    instagram: r.cp_instagram,
    facebook: r.cp_facebook,
    youtube: r.cp_youtube,
    tiktok: r.cp_tiktok,
    spotify: r.cp_spotify,
    whatsapp: r.cp_whatsapp,
    verificationStatus: r.cp_verification_status,
    isPublic: r.cp_is_public,
    consentToShare: r.cp_consent_to_share,
    sector,
    province,
    city,
  };
}
 
/**
 * Cari kreator dengan filter kombinasi (sektor/provinsi/gender/youth/indigenous/search).
 * Hanya kreator dengan status VERIFIED yang dikembalikan.
 */
export async function findCreators(
  filters: CreatorFilters = {},
): Promise<CreatorWithRelations[]> {
  const where: string[] = [`cp.verification_status = 'VERIFIED'`];
  const params: unknown[] = [];
 
  if (filters.sectorSlug) {
    params.push(filters.sectorSlug);
    where.push(`s.slug = $${params.length}`);
  }
  if (filters.provinceCode) {
    params.push(filters.provinceCode);
    where.push(`p.code = $${params.length}`);
  }
  if (filters.gender) {
    params.push(filters.gender);
    where.push(`cp.gender = $${params.length}::gender_type`);
  }
  if (filters.isYouth) {
    where.push(`cp.is_youth = TRUE`);
  }
  if (filters.isIndigenous) {
    where.push(`cp.is_indigenous = TRUE`);
  }
  if (filters.search) {
    params.push(`%${filters.search}%`);
    where.push(
      `(cp.full_name ILIKE $${params.length} OR cp.bio ILIKE $${params.length} OR cp.business_name ILIKE $${params.length})`,
    );
  }
 
  const limit = filters.limit ?? 200;
  const offset = filters.offset ?? 0;
  params.push(limit, offset);
 
  const sql = `${SELECT_CREATOR_JOINED}
    WHERE ${where.join(" AND ")}
    ORDER BY cp.created_at DESC
    LIMIT $${params.length - 1} OFFSET $${params.length}`;
 
  const rows = await query<CreatorJoinedRow>(sql, params);
  return rows.map(rowToCreator);
}
 
export async function findCreatorBySlug(
  slug: string,
): Promise<(CreatorWithRelations & { works: Work[] }) | null> {
  const row = await queryOne<CreatorJoinedRow>(
    `${SELECT_CREATOR_JOINED} WHERE cp.slug = $1`,
    [slug],
  );
  if (!row) return null;
  const creator = rowToCreator(row);
 
  const workRows = await query<{
    id: string;
    creator_id: string;
    title: string;
    description: string | null;
    year: number | null;
    image_url: string | null;
    external_url: string | null;
  }>(
    `SELECT id, creator_id, title, description, year, image_url, external_url
       FROM work WHERE creator_id = $1 ORDER BY created_at DESC`,
    [creator.id],
  );
  const works: Work[] = workRows.map((w) => ({
    id: w.id,
    creatorId: w.creator_id,
    title: w.title,
    description: w.description,
    year: w.year,
    imageUrl: w.image_url,
    externalUrl: w.external_url,
  }));
 
  return { ...creator, works };
}
 
/** Untuk peta — kreator publik dengan koordinat (provinsi atau city). */
export async function findCreatorsForMap(): Promise<CreatorWithRelations[]> {
  return findCreators({ limit: 500 });
}
 
/** Hitung kreator terverifikasi dengan filter sederhana. */
export async function countCreators(opts: {
  gender?: Gender;
  isYouth?: boolean;
  isIndigenous?: boolean;
} = {}): Promise<number> {
  const where: string[] = [`verification_status = 'VERIFIED'`];
  const params: unknown[] = [];
 
  if (opts.gender) {
    params.push(opts.gender);
    where.push(`gender = $${params.length}::gender_type`);
  }
  if (opts.isYouth) where.push(`is_youth = TRUE`);
  if (opts.isIndigenous) where.push(`is_indigenous = TRUE`);
 
  const row = await queryOne<{ count: string }>(
    `SELECT COUNT(*)::text AS count FROM creator_profile WHERE ${where.join(" AND ")}`,
    params,
  );
  return Number(row?.count ?? 0);
}
 
/** 3 kreator pilihan untuk landing page. */
export async function findFeaturedCreators(): Promise<CreatorWithRelations[]> {
  const rows = await query<CreatorJoinedRow>(
    `${SELECT_CREATOR_JOINED}
      WHERE cp.verification_status = 'VERIFIED' AND cp.is_public = TRUE
      ORDER BY cp.created_at DESC
      LIMIT 6`,
  );
  return rows.map(rowToCreator);
}
 
export type { CreatorProfile };