import { Pool } from "pg";
const raw = process.env.NEON_FUNNEL_DB ?? process.env.DATABASE_URL ?? "";
function clean(url) {
  try {
    const u = new URL(url);
    u.searchParams.delete("sslmode");
    u.searchParams.delete("uselibpqcompat");
    return u.toString();
  } catch {
    return url;
  }
}
const globalForPool = globalThis;
function makePool() {
  if (!raw) throw new Error("NEON_FUNNEL_DB is not set");
  const opts = {
    connectionString: clean(raw),
    max: Number(process.env.PG_POOL_MAX ?? 6),
    idleTimeoutMillis: 2e4,
    connectionTimeoutMillis: 8e3,
    ssl: raw.includes("sslmode=disable") ? void 0 : { rejectUnauthorized: false }
  };
  return new Pool(opts);
}
const pool = globalForPool.__nimosAdminPool ?? makePool();
if (process.env.NODE_ENV !== "production") globalForPool.__nimosAdminPool = pool;
async function q(sql, params = []) {
  const r = await pool.query(sql, params);
  return r.rows;
}
async function one(sql, params = []) {
  const rows = await q(sql, params);
  return rows[0] ?? null;
}
export {
  one as o,
  pool as p,
  q
};
