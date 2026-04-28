import { query } from "@/lib/db";
 
export interface SectorCount {
  sectorId: string;
  sectorSlug: string;
  sectorName: string;
  count: number;
}
 
export interface ProvinceCount {
  provinceId: string;
  provinceCode: string;
  provinceName: string;
  count: number;
}
 
export interface MetricPoint {
  date: string;
  value: number;
}
 
export async function countCreatorsBySector(): Promise<SectorCount[]> {
  const rows = await query<{
    sector_id: string;
    slug: string;
    name_id: string;
    count: string;
  }>(
    `SELECT s.id AS sector_id, s.slug, s.name_id, COUNT(cp.id)::text AS count
       FROM sector s
       LEFT JOIN creator_profile cp
              ON cp.sector_id = s.id AND cp.verification_status = 'VERIFIED'
       GROUP BY s.id, s.slug, s.name_id, s."order"
       ORDER BY s."order" ASC`,
  );
  return rows.map((r) => ({
    sectorId: r.sector_id,
    sectorSlug: r.slug,
    sectorName: r.name_id,
    count: Number(r.count),
  }));
}
 
export async function countCreatorsByProvince(
  limit = 10,
): Promise<ProvinceCount[]> {
  const rows = await query<{
    province_id: string;
    code: string;
    name: string;
    count: string;
  }>(
    `SELECT p.id AS province_id, p.code, p.name, COUNT(cp.id)::text AS count
       FROM province p
       LEFT JOIN creator_profile cp
              ON cp.province_id = p.id AND cp.verification_status = 'VERIFIED'
       GROUP BY p.id, p.code, p.name
       HAVING COUNT(cp.id) > 0
       ORDER BY COUNT(cp.id) DESC
       LIMIT $1`,
    [limit],
  );
  return rows.map((r) => ({
    provinceId: r.province_id,
    provinceCode: r.code,
    provinceName: r.name,
    count: Number(r.count),
  }));
}
 
export async function getCreatorsRegistrationTrend(
  metric = "creators_registered",
): Promise<MetricPoint[]> {
  const rows = await query<{ date: Date; value: number }>(
    `SELECT date, value FROM impact_metric
       WHERE metric = $1
       ORDER BY date ASC`,
    [metric],
  );
  return rows.map((r) => ({
    date: r.date.toISOString(),
    value: Number(r.value),
  }));
}