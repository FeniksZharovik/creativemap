import { query } from "@/lib/db";
import type { Testimonial } from "@/lib/types";
 
interface Row {
  id: string;
  author_id: string | null;
  author_name: string;
  author_role: string | null;
  quote: string;
  image_url: string | null;
  is_published: boolean;
}
 
export async function findPublishedTestimonials(limit = 3): Promise<Testimonial[]> {
  const rows = await query<Row>(
    `SELECT id, author_id, author_name, author_role, quote, image_url, is_published
       FROM testimonial WHERE is_published = TRUE
       ORDER BY created_at DESC LIMIT $1`,
    [limit],
  );
  return rows.map((r) => ({
    id: r.id,
    authorId: r.author_id,
    authorName: r.author_name,
    authorRole: r.author_role,
    quote: r.quote,
    imageUrl: r.image_url,
    isPublished: r.is_published,
  }));
}