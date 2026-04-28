import { query, queryOne } from "@/lib/db";
import type { Sector } from "@/lib/types";
 
interface SectorRow {
  id: string;
  slug: string;
  name_id: string;
  name_en: string;
  description: string | null;
  icon: string | null;
  is_ifcd: boolean;
  order: number;
}
 
function rowToSector(r: SectorRow): Sector {
  return {
    id: r.id,
    slug: r.slug,
    nameId: r.name_id,
    nameEn: r.name_en,
    description: r.description,
    icon: r.icon,
    isIfcd: r.is_ifcd,
    order: r.order,
  };
}
 
export async function findAllSectors(): Promise<Sector[]> {
  const rows = await query<SectorRow>(
    `SELECT id, slug, name_id, name_en, description, icon, is_ifcd, "order"
       FROM sector
       ORDER BY "order" ASC`,
  );
  return rows.map(rowToSector);
}
 
export async function findSectorBySlug(slug: string): Promise<Sector | null> {
  const row = await queryOne<SectorRow>(
    `SELECT id, slug, name_id, name_en, description, icon, is_ifcd, "order"
       FROM sector WHERE slug = $1`,
    [slug],
  );
  return row ? rowToSector(row) : null;
}
 
export async function countSectors() {
  const row = await queryOne<{ count: string }>(
    `SELECT COUNT(*)::text AS count FROM sector`
  );
  return Number(row?.count ?? 0);
}