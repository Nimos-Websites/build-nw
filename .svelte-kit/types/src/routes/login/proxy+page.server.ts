// @ts-nocheck
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = async ({ locals, url }: Parameters<PageServerLoad>[0]) => {
  if (locals.user) {
    const next = url.searchParams.get("next");
    redirect(303, next && next.startsWith("/") ? next : "/");
  }
  return { next: url.searchParams.get("next") ?? "/" };
};
