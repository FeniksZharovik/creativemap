import { query, queryOne } from "@/lib/db";
import type {
  Course,
  CourseLevel,
  CourseModule,
  CourseWithRelations,
  Sector,
} from "@/lib/types";
 
interface CourseRow {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string | null;
  level: CourseLevel;
  duration_min: number | null;
  language: string;
  sector_id: string | null;
  for_women: boolean;
  for_youth: boolean;
  for_indigenous: boolean;
  is_published: boolean;
  published_at: Date | null;
}
 
interface CourseJoinedRow extends CourseRow {
  s_id: string | null;
  s_slug: string | null;
  s_name_id: string | null;
  s_name_en: string | null;
  s_description: string | null;
  s_icon: string | null;
  s_is_ifcd: boolean | null;
  s_order: number | null;
}
 
interface ModuleRow {
  id: string;
  course_id: string;
  title: string;
  content_md: string;
  video_url: string | null;
  order: number;
}
 
function rowToCourse(r: CourseRow): Course {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    description: r.description,
    thumbnail: r.thumbnail,
    level: r.level,
    durationMin: r.duration_min,
    language: r.language,
    sectorId: r.sector_id,
    forWomen: r.for_women,
    forYouth: r.for_youth,
    forIndigenous: r.for_indigenous,
    isPublished: r.is_published,
    publishedAt: r.published_at,
  };
}
 
function rowToModule(r: ModuleRow): CourseModule {
  return {
    id: r.id,
    courseId: r.course_id,
    title: r.title,
    contentMd: r.content_md,
    videoUrl: r.video_url,
    order: r.order,
  };
}
 
function rowToCourseWithRelations(
  r: CourseJoinedRow,
  modules: CourseModule[],
  enrollmentCount: number,
): CourseWithRelations {
  const sector: Sector | null = r.s_id
    ? {
        id: r.s_id,
        slug: r.s_slug as string,
        nameId: r.s_name_id as string,
        nameEn: r.s_name_en as string,
        description: r.s_description,
        icon: r.s_icon,
        isIfcd: r.s_is_ifcd as boolean,
        order: r.s_order as number,
      }
    : null;
  return { ...rowToCourse(r), sector, modules, enrollmentCount };
}
 
const SELECT_COURSE_JOINED = `
  SELECT
    co.id, co.slug, co.title, co.description, co.thumbnail, co.level,
    co.duration_min, co.language, co.sector_id,
    co.for_women, co.for_youth, co.for_indigenous,
    co.is_published, co.published_at,
    s.id AS s_id, s.slug AS s_slug, s.name_id AS s_name_id, s.name_en AS s_name_en,
    s.description AS s_description, s.icon AS s_icon, s.is_ifcd AS s_is_ifcd, s."order" AS s_order
  FROM course co
  LEFT JOIN sector s ON s.id = co.sector_id
`;
 
export async function findAllCourses(): Promise<CourseWithRelations[]> {
  const rows = await query<CourseJoinedRow>(
    `${SELECT_COURSE_JOINED}
       WHERE co.is_published = TRUE
       ORDER BY co.created_at DESC`,
  );
  if (rows.length === 0) return [];
 
  const courseIds = rows.map((r) => r.id);
  const enrollmentCounts = await query<{ course_id: string; count: string }>(
    `SELECT course_id, COUNT(*)::text AS count
       FROM course_enrollment
       WHERE course_id = ANY($1::uuid[])
       GROUP BY course_id`,
    [courseIds],
  );
  const countMap = new Map(enrollmentCounts.map((e) => [e.course_id, Number(e.count)]));
 
  return rows.map((r) => rowToCourseWithRelations(r, [], countMap.get(r.id) ?? 0));
}
 
export async function findCourseBySlug(
  slug: string,
): Promise<CourseWithRelations | null> {
  const row = await queryOne<CourseJoinedRow>(
    `${SELECT_COURSE_JOINED} WHERE co.slug = $1`,
    [slug],
  );
  if (!row) return null;
 
  const moduleRows = await query<ModuleRow>(
    `SELECT id, course_id, title, content_md, video_url, "order"
       FROM course_module
       WHERE course_id = $1
       ORDER BY "order" ASC`,
    [row.id],
  );
 
  const enrollmentRow = await queryOne<{ count: string }>(
    `SELECT COUNT(*)::text AS count FROM course_enrollment WHERE course_id = $1`,
    [row.id],
  );
 
  return rowToCourseWithRelations(
    row,
    moduleRows.map(rowToModule),
    Number(enrollmentRow?.count ?? 0),
  );
}