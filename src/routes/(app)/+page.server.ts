import { q } from "$lib/server/db";

export const load = async () => {
  const [builds, clients, funnels, engines] = await Promise.all([
    q("SELECT * FROM build_projects ORDER BY created_at DESC"),
    q("SELECT * FROM build_clients ORDER BY created_at DESC"),
    q("SELECT * FROM build_funnels ORDER BY created_at DESC"),
    q("SELECT * FROM build_engines ORDER BY created_at DESC"),
  ]);
  return { builds, clients, funnels, engines };
};
