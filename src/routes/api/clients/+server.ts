import { json } from "@sveltejs/kit";
import { q, one } from "$lib/server/db";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
  const clients = await q("SELECT * FROM build_clients ORDER BY created_at DESC");
  return json({ clients });
};

export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const client = await one(
    `INSERT INTO build_clients (name, email, phone, company, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [data.name, data.email, data.phone, data.company, data.notes],
  );
  return json({ client });
};
