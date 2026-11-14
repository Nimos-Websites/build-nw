
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/(app)" | "/" | "/api" | "/api/auth" | "/api/auth/[...all]" | "/api/builds" | "/api/builds/[id]" | "/api/build" | "/api/clients" | "/api/content" | "/api/engines" | "/api/funnels" | "/(app)/builds" | "/(app)/builds/[id]" | "/login";
		RouteParams(): {
			"/api/auth/[...all]": { all: string };
			"/api/builds/[id]": { id: string };
			"/(app)/builds/[id]": { id: string }
		};
		LayoutParams(): {
			"/(app)": { id?: string | undefined };
			"/": { all?: string | undefined; id?: string | undefined };
			"/api": { all?: string | undefined; id?: string | undefined };
			"/api/auth": { all?: string | undefined };
			"/api/auth/[...all]": { all: string };
			"/api/builds": { id?: string | undefined };
			"/api/builds/[id]": { id: string };
			"/api/build": Record<string, never>;
			"/api/clients": Record<string, never>;
			"/api/content": Record<string, never>;
			"/api/engines": Record<string, never>;
			"/api/funnels": Record<string, never>;
			"/(app)/builds": { id?: string | undefined };
			"/(app)/builds/[id]": { id: string };
			"/login": Record<string, never>
		};
		Pathname(): "/" | `/api/auth/${string}` & {} | "/api/builds" | `/api/builds/${string}` & {} | "/api/build" | "/api/clients" | "/api/engines" | "/api/funnels" | "/login";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): string & {};
	}
}