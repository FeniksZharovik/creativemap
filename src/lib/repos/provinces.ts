import { query, queryOne } from "@/lib/db";
import type { Province, City } from "@/lib/types";
 
interface ProvinceRow {
  id: string;
  code: string;
  name: string;
  region: string | null;
  latitude: number | null;
  longitude: number | null;
}
 
interface CityRow {
  id: string;
  code: string;
  name: string;
  type: string;
  province_id: string;
  latitude: number | null;
  longitude: number | null;
}
 
function rowToProvince(r: ProvinceRow): Province {
  return r;
}
 
function rowToCity(r: CityRow): City {
  return {
    id: r.id,
    code: r.code,
    name: r.name,
    type: r.type,
    provinceId: r.province_id,
    latitude: r.latitude,
    longitude: r.longitude,
  };
}
 
export async function findAllProvinces(): Promise<Province[]> {
  const rows = await query<ProvinceRow>(
    `SELECT id, code, name, region, latitude, longitude FROM province ORDER BY name ASC`,
  );
  return rows.map(rowToProvince);
}
 
export async function findProvinceByCode(code: string): Promise<Province | null> {
  const row = await queryOne<ProvinceRow>(
    `SELECT id, code, name, region, latitude, longitude FROM province WHERE code = $1`,
    [code],
  );
  return row ? rowToProvince(row) : null;
}
 
export async function findCityById(id: string): Promise<City | null> {
  const row = await queryOne<CityRow>(
    `SELECT id, code, name, type, province_id, latitude, longitude FROM city WHERE id = $1`,
    [id],
  );
  return row ? rowToCity(row) : null;
}
 
export async function countProvinces(): Promise<number> {
  const row = await queryOne<{ count: string }>(`SELECT COUNT(*)::text AS count FROM province`);
  return Number(row?.count ?? 0);
}