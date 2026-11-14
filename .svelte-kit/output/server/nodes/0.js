import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.DYN467oH.js","_app/immutable/chunks/Co3n1Ine.js","_app/immutable/chunks/C8NIZyMb.js","_app/immutable/chunks/hODBqNV9.js","_app/immutable/chunks/DrzJB6E-.js"];
export const stylesheets = [];
export const fonts = [];
