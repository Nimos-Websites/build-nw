export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.a4SF1_l3.js",app:"_app/immutable/entry/app.BdIGrsc8.js",imports:["_app/immutable/entry/start.a4SF1_l3.js","_app/immutable/chunks/C8NIZyMb.js","_app/immutable/chunks/D23ldFlg.js","_app/immutable/chunks/DwMZhTn2.js","_app/immutable/entry/app.BdIGrsc8.js","_app/immutable/chunks/C8NIZyMb.js","_app/immutable/chunks/DT4V89z7.js","_app/immutable/chunks/Co3n1Ine.js","_app/immutable/chunks/DwMZhTn2.js","_app/immutable/chunks/D02GngWx.js","_app/immutable/chunks/DrzJB6E-.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/(app)",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/api/auth/[...all]",
				pattern: /^\/api\/auth(?:\/([^]*))?\/?$/,
				params: [{"name":"all","optional":false,"rest":true,"chained":true}],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/auth/_...all_/_server.ts.js'))
			},
			{
				id: "/api/builds",
				pattern: /^\/api\/builds\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/builds/_server.ts.js'))
			},
			{
				id: "/api/builds/[id]",
				pattern: /^\/api\/builds\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/builds/_id_/_server.ts.js'))
			},
			{
				id: "/api/build",
				pattern: /^\/api\/build\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/build/_server.ts.js'))
			},
			{
				id: "/api/clients",
				pattern: /^\/api\/clients\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/clients/_server.ts.js'))
			},
			{
				id: "/api/engines",
				pattern: /^\/api\/engines\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/engines/_server.ts.js'))
			},
			{
				id: "/api/funnels",
				pattern: /^\/api\/funnels\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/funnels/_server.ts.js'))
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
