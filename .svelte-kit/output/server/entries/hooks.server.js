import { a as auth } from "../chunks/auth.js";
const handle = async ({ event, resolve }) => {
  const session = await auth.api.getSession({ headers: event.request.headers });
  event.locals.session = session;
  event.locals.user = session?.user ?? null;
  return resolve(event);
};
export {
  handle
};
