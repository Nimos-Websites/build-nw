import { json } from "@sveltejs/kit";
import { q, one } from "$lib/server/db";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
  const engines = await q("SELECT * FROM build_engines ORDER BY created_at DESC");
  return json({ engines });
};

export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const engine = await one(
    `INSERT INTO build_engines (name, type, config, status) VALUES ($1, $2, $3, $4) RETURNING *`,
    [data.name, data.type, JSON.stringify(data.config || {}), data.status || "active"],
  );
  return json({ engine });
};
