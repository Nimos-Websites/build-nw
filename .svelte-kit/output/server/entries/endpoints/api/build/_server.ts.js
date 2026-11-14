import { json } from "@sveltejs/kit";
import { d as deployConfigured, b as buildSite, a as deploySite } from "../../../../chunks/site-deploy.js";
const POST = async ({ request }) => {
  const input = await request.json();
  if (!deployConfigured()) {
    return json({ ok: false, error: "Vercel not configured" }, { status: 503 });
  }
  const files = buildSite(input);
  const slug = (input.businessName || "site").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 50);
  const r = await deploySite(slug, files);
  return json({
    ok: r.ok,
    url: r.url,
    state: r.state,
    error: r.error,
    files: Object.keys(files).length,
    ms: r.ms
  });
};
const GET = async () => {
  return json({ service: "build.nimoswebsites.com", status: "ok" });
};
export {
  GET,
  POST
};
