import { h as head, b as attr } from "../../../chunks/index.js";
import { e as escape_html } from "../../../chunks/escaping.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let email = "";
    let password = "";
    let loading = false;
    head("1x05zx6", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Sign in — Nimos Build</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen flex items-center justify-center bg-background"><div class="w-full max-w-sm p-8 bg-card border border-line rounded-lg"><h1 class="text-xl font-semibold mb-6 text-center tracking-tight">Nimos Build</h1> <form class="space-y-4"><input type="email" placeholder="Email"${attr("value", email)} required="" class="w-full px-3 py-2 rounded border border-input bg-secondary text-foreground"/> <input type="password" placeholder="Password"${attr("value", password)} required="" class="w-full px-3 py-2 rounded border border-input bg-secondary text-foreground"/> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <button type="submit"${attr("disabled", loading, true)} class="w-full py-2 rounded bg-primary text-primary-foreground font-semibold hover:opacity-90 disabled:opacity-50">${escape_html("Sign in")}</button></form></div></div>`);
  });
}
export {
  _page as default
};
