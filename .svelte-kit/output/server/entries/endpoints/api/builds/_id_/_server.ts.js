import { json } from "@sveltejs/kit";
import { q, o as one } from "../../../../../chunks/db.js";
import { d as deployConfigured, b as buildSite, a as deploySite } from "../../../../../chunks/site-deploy.js";
const GET = async ({ params }) => {
  const build = await one("SELECT * FROM build_projects WHERE id = $1", [params.id]);
  if (!build) return json({ error: "Not found" }, { status: 404 });
  return json({ build });
};
const PATCH = async ({ params, request }) => {
  const data = await request.json();
  const sets = [];
  const vals = [params.id];
  let i = 2;
  const fieldMap = {
    businessName: "business_name",
    trade: "trade",
    city: "city",
    region: "region",
    phone: "contact_phone",
    email: "contact_email",
    clientEmail: "client_email",
    headline: "headline",
    about: "about",
    services: "services",
    proof: "proof",
    stage: "stage",
    domain: "domain",
    notes: "notes",
    vercelUrl: "vercel_url",
    vercelProject: "vercel_project"
  };
  for (const [key, col] of Object.entries(fieldMap)) {
    if (data[key] !== void 0) {
      sets.push(`${col} = $${i}`);
      vals.push(typeof data[key] === "object" ? JSON.stringify(data[key]) : data[key]);
      i++;
    }
  }
  if (data.stage) {
    const tsMap = {
      design: "design_started_at",
      build: "build_started_at",
      qa: "qa_passed_at",
      deployed: "deployed_at",
      launched: "launched_at",
      handover: "handover_at"
    };
    if (tsMap[data.stage]) {
      sets.push(`${tsMap[data.stage]} = COALESCE(${tsMap[data.stage]}, now())`);
    }
  }
  if (sets.length === 0) return json({ error: "No fields to update" }, { status: 400 });
  sets.push("updated_at = now()");
  const build = await one(
    `UPDATE build_projects SET ${sets.join(", ")} WHERE id = $1 RETURNING *`,
    vals
  );
  return json({ build });
};
const DELETE = async ({ params }) => {
  await q("DELETE FROM build_projects WHERE id = $1", [params.id]);
  return json({ ok: true });
};
const POST = async ({ params }) => {
  const build = await one("SELECT * FROM build_projects WHERE id = $1", [params.id]);
  if (!build) return json({ error: "Not found" }, { status: 404 });
  if (!deployConfigured()) {
    return json({ ok: false, error: "Vercel not configured" }, { status: 503 });
  }
  const input = {
    businessName: build.business_name,
    trade: build.trade,
    city: build.city,
    region: build.region,
    phone: build.contact_phone,
    email: build.contact_email,
    headline: build.headline,
    about: build.about,
    services: build.services || [],
    proof: build.proof || [],
    domain: build.domain
  };
  const files = buildSite(input);
  const slug = (build.business_name || "site").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 50);
  const r = await deploySite(slug, files);
  if (r.ok) {
    await q(
      `UPDATE build_projects SET vercel_url = $2, vercel_project = $3, stage = 'built', build_started_at = COALESCE(build_started_at, now()), updated_at = now() WHERE id = $1`,
      [params.id, r.url, slug]
    );
  }
  return json({
    ok: r.ok,
    url: r.url,
    state: r.state,
    error: r.error,
    files: Object.keys(files).length,
    ms: r.ms
  });
};
export {
  DELETE,
  GET,
  PATCH,
  POST
};
