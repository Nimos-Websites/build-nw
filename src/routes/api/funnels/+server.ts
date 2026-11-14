import { json } from "@sveltejs/kit";
import { q, one } from "$lib/server/db";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
  const funnels = await q("SELECT * FROM build_funnels ORDER BY created_at DESC");
  return json({ funnels });
};

export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const slug = (data.name || "funnel").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const funnel = await one(
    `INSERT INTO build_funnels (name, slug, type, config, status) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [data.name, slug, data.type || "lead", JSON.stringify(data.config || {}), data.status || "draft"],
  );
  return json({ funnel });
};
