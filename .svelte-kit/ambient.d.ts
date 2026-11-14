
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/private';
 * 
 * console.log(ENVIRONMENT); // => "production"
 * console.log(PUBLIC_BASE_URL); // => throws error during build
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/private' {
	export const ADMIN_EMAILS: string;
	export const BETTER_AUTH_SECRET: string;
	export const BETTER_AUTH_URL: string;
	export const NEON_FUNNEL_DB: string;
	export const NX_DAEMON: string;
	export const TURBO_CACHE: string;
	export const TURBO_DOWNLOAD_LOCAL_ENABLED: string;
	export const TURBO_REMOTE_ONLY: string;
	export const TURBO_RUN_SUMMARY: string;
	export const VERCEL: string;
	export const VERCEL_ENV: string;
	export const VERCEL_GIT_COMMIT_AUTHOR_LOGIN: string;
	export const VERCEL_GIT_COMMIT_AUTHOR_NAME: string;
	export const VERCEL_GIT_COMMIT_MESSAGE: string;
	export const VERCEL_GIT_COMMIT_REF: string;
	export const VERCEL_GIT_COMMIT_SHA: string;
	export const VERCEL_GIT_PREVIOUS_SHA: string;
	export const VERCEL_GIT_PROVIDER: string;
	export const VERCEL_GIT_PULL_REQUEST_ID: string;
	export const VERCEL_GIT_REPO_ID: string;
	export const VERCEL_GIT_REPO_OWNER: string;
	export const VERCEL_GIT_REPO_SLUG: string;
	export const VERCEL_OIDC_TOKEN: string;
	export const VERCEL_TARGET_ENV: string;
	export const VERCEL_TEAM_ID: string;
	export const VERCEL_TOKEN: string;
	export const VERCEL_TOKEN_ADMIN: string;
	export const VERCEL_URL: string;
	export const SVELTEKIT_FORK: string;
	export const NODE_ENV: string;
	export const EDITOR: string;
	export const NIMOS_OPS_TOKEN: string;
	export const HOSTTYPE: string;
	export const WSL2_GUI_APPS_ENABLED: string;
	export const INIT_CWD: string;
	export const HOMEBREW_REPOSITORY: string;
	export const SANITY_API_DATASET: string;
	export const npm_config_global_prefix: string;
	export const NVM_CD_FLAGS: string;
	export const SENTRY_ORG: string;
	export const npm_execpath: string;
	export const FZF_DEFAULT_COMMAND: string;
	export const PWD: string;
	export const npm_config_init_module: string;
	export const npm_config_globalconfig: string;
	export const DOCUMENSO_API_TOKEN: string;
	export const EXPO_TOKEN: string;
	export const npm_lifecycle_event: string;
	export const NIMOS_API_URL: string;
	export const npm_lifecycle_script: string;
	export const LS_COLORS: string;
	export const LANG: string;
	export const DISPLAY: string;
	export const RESEND_API_KEY: string;
	export const WT_SESSION: string;
	export const NEXT_PUBLIC_SANITY_PROJECT_ID: string;
	export const npm_package_name: string;
	export const SANITY_API_READ_TOKEN: string;
	export const XDG_DATA_DIRS: string;
	export const LESSOPEN: string;
	export const NVM_INC: string;
	export const NO_PROXY: string;
	export const PATH: string;
	export const HOME: string;
	export const HOMEBREW_PREFIX: string;
	export const WSL_INTEROP: string;
	export const npm_config_npm_version: string;
	export const NVM_DIR: string;
	export const npm_config_noproxy: string;
	export const BROWSER: string;
	export const npm_node_execpath: string;
	export const npm_package_version: string;
	export const FZF_DEFAULT_OPTS: string;
	export const npm_config_allow_scripts: string;
	export const SENTRY_PROJECT: string;
	export const GITHUB_TOKEN: string;
	export const SHELL: string;
	export const npm_config_node_gyp: string;
	export const NEXT_PUBLIC_SANITY_DATASET: string;
	export const META_ACCESS_TOKEN: string;
	export const NIMOS_TOKEN: string;
	export const NODE: string;
	export const npm_config_userconfig: string;
	export const USER: string;
	export const FZF_CTRL_T_COMMAND: string;
	export const PULSE_SERVER: string;
	export const NVM_BIN: string;
	export const STRIPE_SECRET_KEY: string;
	export const SANITY_API_WRITE_TOKEN: string;
	export const OLDPWD: string;
	export const npm_package_json: string;
	export const no_proxy: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const WSLENV: string;
	export const AGENT: string;
	export const SHLVL: string;
	export const WT_PROFILE_ID: string;
	export const SENTRY_AUTH_TOKEN: string;
	export const COLOR: string;
	export const BUN_INSTALL: string;
	export const npm_config_local_prefix: string;
	export const TELEGRAM_BOT_TOKEN: string;
	export const WSL_DISTRO_NAME: string;
	export const WAYLAND_DISPLAY: string;
	export const INFOPATH: string;
	export const npm_command: string;
	export const SANITY_STUDIO_PROJECT_ID: string;
	export const LOGNAME: string;
	export const npm_config_user_agent: string;
	export const SANITY_API_PROJECT_ID: string;
	export const SANITY_STUDIO_DATASET: string;
	export const _: string;
	export const NAME: string;
	export const npm_config_prefix: string;
	export const OPENCODE_SESSION_ID: string;
	export const OPENCODE_TERMINAL: string;
	export const TERM: string;
	export const AI_AGENT: string;
	export const npm_config_cache: string;
	export const OPENCODE: string;
	export const TELEGRAM_CHAT_ID: string;
	export const XDG_RUNTIME_DIR: string;
	export const BAT_THEME: string;
	export const LESSCLOSE: string;
	export const HOMEBREW_CELLAR: string;
}

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/public';
 * 
 * console.log(ENVIRONMENT); // => throws error during build
 * console.log(PUBLIC_BASE_URL); // => "http://site.com"
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * 
 * console.log(env.ENVIRONMENT); // => "production"
 * console.log(env.PUBLIC_BASE_URL); // => undefined
 * ```
 */
declare module '$env/dynamic/private' {
	export const env: {
		ADMIN_EMAILS: string;
		BETTER_AUTH_SECRET: string;
		BETTER_AUTH_URL: string;
		NEON_FUNNEL_DB: string;
		NX_DAEMON: string;
		TURBO_CACHE: string;
		TURBO_DOWNLOAD_LOCAL_ENABLED: string;
		TURBO_REMOTE_ONLY: string;
		TURBO_RUN_SUMMARY: string;
		VERCEL: string;
		VERCEL_ENV: string;
		VERCEL_GIT_COMMIT_AUTHOR_LOGIN: string;
		VERCEL_GIT_COMMIT_AUTHOR_NAME: string;
		VERCEL_GIT_COMMIT_MESSAGE: string;
		VERCEL_GIT_COMMIT_REF: string;
		VERCEL_GIT_COMMIT_SHA: string;
		VERCEL_GIT_PREVIOUS_SHA: string;
		VERCEL_GIT_PROVIDER: string;
		VERCEL_GIT_PULL_REQUEST_ID: string;
		VERCEL_GIT_REPO_ID: string;
		VERCEL_GIT_REPO_OWNER: string;
		VERCEL_GIT_REPO_SLUG: string;
		VERCEL_OIDC_TOKEN: string;
		VERCEL_TARGET_ENV: string;
		VERCEL_TEAM_ID: string;
		VERCEL_TOKEN: string;
		VERCEL_TOKEN_ADMIN: string;
		VERCEL_URL: string;
		SVELTEKIT_FORK: string;
		NODE_ENV: string;
		EDITOR: string;
		NIMOS_OPS_TOKEN: string;
		HOSTTYPE: string;
		WSL2_GUI_APPS_ENABLED: string;
		INIT_CWD: string;
		HOMEBREW_REPOSITORY: string;
		SANITY_API_DATASET: string;
		npm_config_global_prefix: string;
		NVM_CD_FLAGS: string;
		SENTRY_ORG: string;
		npm_execpath: string;
		FZF_DEFAULT_COMMAND: string;
		PWD: string;
		npm_config_init_module: string;
		npm_config_globalconfig: string;
		DOCUMENSO_API_TOKEN: string;
		EXPO_TOKEN: string;
		npm_lifecycle_event: string;
		NIMOS_API_URL: string;
		npm_lifecycle_script: string;
		LS_COLORS: string;
		LANG: string;
		DISPLAY: string;
		RESEND_API_KEY: string;
		WT_SESSION: string;
		NEXT_PUBLIC_SANITY_PROJECT_ID: string;
		npm_package_name: string;
		SANITY_API_READ_TOKEN: string;
		XDG_DATA_DIRS: string;
		LESSOPEN: string;
		NVM_INC: string;
		NO_PROXY: string;
		PATH: string;
		HOME: string;
		HOMEBREW_PREFIX: string;
		WSL_INTEROP: string;
		npm_config_npm_version: string;
		NVM_DIR: string;
		npm_config_noproxy: string;
		BROWSER: string;
		npm_node_execpath: string;
		npm_package_version: string;
		FZF_DEFAULT_OPTS: string;
		npm_config_allow_scripts: string;
		SENTRY_PROJECT: string;
		GITHUB_TOKEN: string;
		SHELL: string;
		npm_config_node_gyp: string;
		NEXT_PUBLIC_SANITY_DATASET: string;
		META_ACCESS_TOKEN: string;
		NIMOS_TOKEN: string;
		NODE: string;
		npm_config_userconfig: string;
		USER: string;
		FZF_CTRL_T_COMMAND: string;
		PULSE_SERVER: string;
		NVM_BIN: string;
		STRIPE_SECRET_KEY: string;
		SANITY_API_WRITE_TOKEN: string;
		OLDPWD: string;
		npm_package_json: string;
		no_proxy: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		WSLENV: string;
		AGENT: string;
		SHLVL: string;
		WT_PROFILE_ID: string;
		SENTRY_AUTH_TOKEN: string;
		COLOR: string;
		BUN_INSTALL: string;
		npm_config_local_prefix: string;
		TELEGRAM_BOT_TOKEN: string;
		WSL_DISTRO_NAME: string;
		WAYLAND_DISPLAY: string;
		INFOPATH: string;
		npm_command: string;
		SANITY_STUDIO_PROJECT_ID: string;
		LOGNAME: string;
		npm_config_user_agent: string;
		SANITY_API_PROJECT_ID: string;
		SANITY_STUDIO_DATASET: string;
		_: string;
		NAME: string;
		npm_config_prefix: string;
		OPENCODE_SESSION_ID: string;
		OPENCODE_TERMINAL: string;
		TERM: string;
		AI_AGENT: string;
		npm_config_cache: string;
		OPENCODE: string;
		TELEGRAM_CHAT_ID: string;
		XDG_RUNTIME_DIR: string;
		BAT_THEME: string;
		LESSCLOSE: string;
		HOMEBREW_CELLAR: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://example.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.ENVIRONMENT); // => undefined, not public
 * console.log(env.PUBLIC_BASE_URL); // => "http://example.com"
 * ```
 * 
 * ```
 * 
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
