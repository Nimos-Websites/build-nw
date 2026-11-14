import { json } from "@sveltejs/kit";
import { q, o as one } from "../../../../chunks/db.js";
const GET = async () => {
  const builds = await q("SELECT * FROM build_projects ORDER BY created_at DESC");
  return json({ builds });
};
const POST = async ({ request }) => {
  const data = await request.json();
  const build = await one(
    `INSERT INTO build_projects (business_name, trade, city, region, contact_phone, contact_email, headline, about, services, proof)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
    [
      data.businessName,
      data.trade,
      data.city,
      data.region || "BC",
      data.phone,
      data.email,
      data.headline,
      data.about,
      JSON.stringify(data.services || []),
      JSON.stringify(data.proof || [])
    ]
  );
  return json({ build });
};
export {
  GET,
  POST
};
