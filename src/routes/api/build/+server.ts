import { json } from "@sveltejs/kit";
import { buildSite } from "$lib/server/site";
import { deployConfigured, deploySite } from "$lib/server/site-deploy";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  const input = await request.json();

  if (!deployConfigured()) {
    return json({ ok: false, error: "Vercel not configured" }, { status: 503 });
  }

  const files = buildSite(input);
  const slug = (input.businessName || "site")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);

  const r = await deploySite(slug, files);

  return json({
    ok: r.ok,
    url: r.url,
    state: r.state,
    error: r.error,
    files: Object.keys(files).length,
    ms: r.ms,
  });
};

export const GET: RequestHandler = async () => {
  return json({ service: "build.nimoswebsites.com", status: "ok" });
};
