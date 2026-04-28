import { Pool, type QueryResult, type QueryResultRow } from "pg";

/**
 * Connection pool PostgreSQL — singleton untuk seluruh aplikasi.
 * Menggunakan global supaya hot-reload Next.js tidak membuat banyak pool.
 */
const globalForDb = globalThis as unknown as { pgPool: Pool | undefined };

export const pool: Pool =
  globalForDb.pgPool ??
  new Pool({
    connectionString:
      process.env.DATABASE_URL ??
      "postgresql://postgres:devpass@127.0.0.1:5432/creativemap?schema=public",
    max: 10,
    idleTimeoutMillis: 30_000,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.pgPool = pool;
}

/**
 * Helper query: jalankan SQL parameterized, kembalikan rows bertipe T.
 * Selalu pakai placeholder $1, $2 dst — JANGAN string-concat (SQL injection).
 *
 * @example
 * const rows = await query<{ id: string; name: string }>(
 *   "SELECT id, name FROM sector WHERE slug = $1",
 *   [slug],
 * );
 */
export async function query<T extends QueryResultRow = QueryResultRow>(
  sql: string,
  params: ReadonlyArray<unknown> = [],
): Promise<T[]> {
  const result: QueryResult<T> = await pool.query<T>(sql, params as unknown[]);
  return result.rows;
}

/** Variant yang mengembalikan baris pertama (atau null kalau kosong). */
export async function queryOne<T extends QueryResultRow = QueryResultRow>(
  sql: string,
  params: ReadonlyArray<unknown> = [],
): Promise<T | null> {
  const rows = await query<T>(sql, params);
  return rows[0] ?? null;
}
