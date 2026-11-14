export const load = async ({ locals }) => {
  if (!locals.user) {
    const { redirect } = await import("@sveltejs/kit");
    throw redirect(303, "/login");
  }
  return { user: locals.user };
};
