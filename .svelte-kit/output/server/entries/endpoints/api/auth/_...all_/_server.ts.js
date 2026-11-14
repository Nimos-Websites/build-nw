import { a as auth } from "../../../../../chunks/auth.js";
const GET = async ({ request }) => {
  return auth.handler(request);
};
const POST = async ({ request }) => {
  return auth.handler(request);
};
export {
  GET,
  POST
};
