import { json } from "@sveltejs/kit";
import { q, o as one } from "../../../../chunks/db.js";
const GET = async () => {
  const funnels = await q("SELECT * FROM build_funnels ORDER BY created_at DESC");
  return json({ funnels });
};
const POST = async ({ request }) => {
  const data = await request.json();
  const slug = (data.name || "funnel").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const funnel = await one(
    `INSERT INTO build_funnels (name, slug, type, config, status) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [data.name, slug, data.type || "lead", JSON.stringify(data.config || {}), data.status || "draft"]
  );
  return json({ funnel });
};
export {
  GET,
  POST
};
