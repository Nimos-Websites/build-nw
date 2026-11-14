import { auth } from "$lib/server/auth";

export const handle = async ({ event, resolve }) => {
  const session = await auth.api.getSession({ headers: event.request.headers });
  event.locals.session = session;
  event.locals.user = session?.user ?? null;
  return resolve(event);
};
