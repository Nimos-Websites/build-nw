import { Pool } from "pg";

/**
 * ONE POOL, ONE DATABASE. The admin reads and writes the same Postgres the
 * product runs on — there is no sync, no replica, no cache of the truth.
 *
 * `NEON_FUNNEL_DB` is the production name. `DATABASE_URL` exists so a local
 * branch can point at a copy without renaming anything.
 */

const raw = process.env.NEON_FUNNEL_DB ?? process.env.DATABASE_URL ?? "";

function clean(url: string): string {
  try {
    const u = new URL(url);
    u.searchParams.delete("sslmode");
    u.searchParams.delete("uselibpqcompat");
    return u.toString();
  } catch {
    return url;
  }
}

const globalForPool = globalThis as unknown as { __nimosAdminPool?: Pool };

function makePool(): Pool {
  if (!raw) throw new Error("NEON_FUNNEL_DB is not set");
  const opts = {
    connectionString: clean(raw),
    max: Number(process.env.PG_POOL_MAX ?? 6),
    idleTimeoutMillis: 20_000,
    connectionTimeoutMillis: 8_000,
    ssl: raw.includes("sslmode=disable") ? undefined : { rejectUnauthorized: false },
  };
  return new Pool(opts);
}

export const pool: Pool = globalForPool.__nimosAdminPool ?? makePool();
if (process.env.NODE_ENV !== "production") globalForPool.__nimosAdminPool = pool;

export async function q<T = Record<string, unknown>>(
  sql: string,
  params: unknown[] = [],
): Promise<T[]> {
  const r = await pool.query(sql, params);
  return r.rows as T[];
}

export async function one<T = Record<string, unknown>>(
  sql: string,
  params: unknown[] = [],
): Promise<T | null> {
  const rows = await q<T>(sql, params);
  return rows[0] ?? null;
}

/** A scalar, for counts and sums. Returns 0 rather than null. */
export async function scalar(sql: string, params: unknown[] = []): Promise<number> {
  const row = await one<{ n: string | number | null }>(sql, params);
  const n = row?.n;
  return typeof n === "number" ? n : Number(n ?? 0);
}
