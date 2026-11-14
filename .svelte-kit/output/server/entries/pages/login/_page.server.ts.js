import { redirect } from "@sveltejs/kit";
const load = async ({ locals, url }) => {
  if (locals.user) {
    const next = url.searchParams.get("next");
    redirect(303, next && next.startsWith("/") ? next : "/");
  }
  return { next: url.searchParams.get("next") ?? "/" };
};
export {
  load
};
