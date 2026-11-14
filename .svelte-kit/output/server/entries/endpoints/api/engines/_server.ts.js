import { json } from "@sveltejs/kit";
import { q, o as one } from "../../../../chunks/db.js";
const GET = async () => {
  const engines = await q("SELECT * FROM build_engines ORDER BY created_at DESC");
  return json({ engines });
};
const POST = async ({ request }) => {
  const data = await request.json();
  const engine = await one(
    `INSERT INTO build_engines (name, type, config, status) VALUES ($1, $2, $3, $4) RETURNING *`,
    [data.name, data.type, JSON.stringify(data.config || {}), data.status || "active"]
  );
  return json({ engine });
};
export {
  GET,
  POST
};
