import * as server from '../entries/pages/(app)/_layout.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(app)/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/(app)/+layout.server.ts";
export const imports = ["_app/immutable/nodes/2.CoTURchJ.js","_app/immutable/chunks/Co3n1Ine.js","_app/immutable/chunks/C8NIZyMb.js","_app/immutable/chunks/DT4V89z7.js","_app/immutable/chunks/hODBqNV9.js","_app/immutable/chunks/DrzJB6E-.js"];
export const stylesheets = [];
export const fonts = [];
