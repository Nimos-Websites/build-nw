import { betterAuth } from "better-auth";
import { twoFactor } from "better-auth/plugins/two-factor";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";
import { pool } from "./db";

/**
 * THE DOOR.
 *
 * Better Auth, on the same Postgres as the product, with its own signing secret
 * so a session minted by the marketing site cannot be replayed here and a
 * session minted here means nothing to the marketing site. The cookie is
 * host-only on admin.nimoswebsites.com, httpOnly, SameSite=Lax, Secure in
 * production.
 *
 * Eight hours, refreshed on activity, cached in a signed cookie for five
 * minutes so a page render does not hit the database to answer "who is this".
 * Two-factor is installed and ready; the Settings page says whether it is on.
 */

const secret = process.env.BETTER_AUTH_SECRET;
if (!secret && process.env.NODE_ENV === "production") {
  throw new Error("BETTER_AUTH_SECRET must be set in production");
}

const baseURL = process.env.BETTER_AUTH_URL || undefined;

export const auth = betterAuth({
  database: pool,
  ...(baseURL ? { baseURL } : {}),
  secret: secret ?? "dev-only-secret-not-for-production-0000000000",
  trustedOrigins: [
    "https://build.nimoswebsites.com",
    "http://localhost:3200",
    "http://127.0.0.1:3200",
  ],
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 200,
    autoSignIn: false,
  },
  session: {
    expiresIn: 60 * 60 * 8,
    updateAge: 60 * 15,
    cookieCache: { enabled: true, maxAge: 5 * 60 },
  },
  user: {
    changeEmail: { enabled: false },
    deleteUser: { enabled: false },
  },
  rateLimit: {
    enabled: true,
    window: 60,
    max: 40,
    customRules: {
      "/sign-in/email": { window: 60, max: 6 },
      "/two-factor/verify-totp": { window: 60, max: 6 },
    },
  },
  advanced: {
    defaultCookieAttributes: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    },
  },
  databaseHooks: {
    session: {
      create: {
        after: async (session) => {
          try {
            await pool.query(
              `insert into events (kind, summary, payload, room, visibility, actor_kind, actor_email, target)
               values ('auth.login','Signed in to the admin','{}'::jsonb,'ops','studio','studio',
                       (select email from "user" where id = $1), $1)`,
              [session.userId],
            );
          } catch {
            /* A login must not fail because the ledger did. */
          }
        },
      },
    },
  },
  plugins: [
    twoFactor({ issuer: "Nimos Websites" }),
    // Must be last: it copies Better Auth's Set-Cookie headers into SvelteKit's
    // cookie API so a server-side call can sign a browser in.
    sveltekitCookies(getRequestEvent),
  ],
});

export type SessionUser = { id: string; email: string; name: string | null };
