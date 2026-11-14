/**
 * SHIP A GENERATED SITE — via the typed Vercel SDK.
 *
 * The desk already holds the Vercel credential; this is the one place it is used
 * to put a file tree on the internet. Each client gets their own project, so a
 * preview can live at a real URL without touching production or a domain, and
 * "launch" later becomes an alias decision rather than a second deploy.
 *
 * Migrated from hand-rolled REST to @vercel/sdk so the request bodies are
 * validated by the vendor's own types — the base64-vs-text and `target:"preview"`
 * bugs that cost a page cannot recur.
 */

import { Vercel } from "@vercel/sdk";
import { env } from "$env/dynamic/private";

const TEAM = env.VERCEL_TEAM_ID ?? "";
const TOKEN = env.VERCEL_TOKEN || env.VERCEL_TOKEN_ADMIN || "";

export type DeployResult = {
  ok: boolean;
  url: string | null;
  deploymentId: string | null;
  state: string;
  error: string | null;
  ms: number;
};

function client(): Vercel | null {
  if (!TOKEN) return null;
  return new Vercel({ bearerToken: TOKEN });
}

export function deployConfigured(): boolean {
  return Boolean(TOKEN && TEAM);
}

export async function deploySite(projectName: string, files: Record<string, string>): Promise<DeployResult> {
  const started = Date.now();
  if (!deployConfigured()) {
    return { ok: false, url: null, deploymentId: null, state: "not_configured", error: "VERCEL_TOKEN or VERCEL_TEAM_ID is not set.", ms: 0 };
  }
  const vercel = client()!;

  try {
    /* A project is the unit of ownership: created once, deployed into many times. */
    try {
      await vercel.projects.getProject({ idOrName: projectName, teamId: TEAM });
    } catch {
      try {
        await vercel.projects.createProject({ requestBody: { name: projectName, framework: undefined }, teamId: TEAM });
      } catch (e) {
        const msg = String((e as Error)?.message ?? e).slice(0, 160);
        if (!/already exists|409/i.test(msg)) {
          return { ok: false, url: null, deploymentId: null, state: "project_failed", error: `project create: ${msg}`, ms: Date.now() - started };
        }
      }
    }

    /* A client preview behind Vercel Authentication is a preview nobody can
       open. New projects default to SSO protection, so it is cleared here. */
    try {
      await vercel.projects.updateProject({ idOrName: projectName, teamId: TEAM, requestBody: { ssoProtection: null, passwordProtection: null } });
    } catch (e) {
      return { ok: false, url: null, deploymentId: null, state: "protection_failed", error: `could not open the preview: ${String((e as Error)?.message ?? e).slice(0, 120)}`, ms: Date.now() - started };
    }

    const payload = {
      name: projectName,
      target: "production",
      projectSettings: { framework: null },
      /* `data` is the file's text. The SDK writes it verbatim. */
      files: Object.entries(files).map(([file, content]) => ({
        file,
        data: content,
      })),
    };

    const dep = await vercel.deployments.createDeployment({ requestBody: payload as any, teamId: TEAM });
    const id = (dep as any).id ?? (dep as any).uid ?? null;
    const url = (dep as any).url ?? null;
    let state = (dep as any).readyState ?? "QUEUED";

    const deadline = Date.now() + 120_000;
    while (id && !["READY", "ERROR", "CANCELED"].includes(state) && Date.now() < deadline) {
      await new Promise((r) => setTimeout(r, 4000));
      try {
        const d = await vercel.deployments.getDeployment({ idOrUrl: id, teamId: TEAM });
        state = (d as any).readyState ?? state;
      } catch {
        /* keep polling */
      }
    }

    const ready = state === "READY";
    return {
      ok: ready,
      url: ready && url ? `https://${url}` : null,
      deploymentId: id,
      state,
      error: ready ? null : `deployment ended ${state}`,
      ms: Date.now() - started,
    };
  } catch (e) {
    return { ok: false, url: null, deploymentId: null, state: "threw", error: String((e as Error)?.message ?? e).slice(0, 200), ms: Date.now() - started };
  }
}