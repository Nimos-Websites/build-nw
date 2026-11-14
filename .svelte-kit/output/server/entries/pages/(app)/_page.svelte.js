import { h as head, e as ensure_array_like, a as attr_class, b as attr } from "../../../chunks/index.js";
import { e as escape_html } from "../../../chunks/escaping.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let builds = data.builds || [];
    let clients = data.clients || [];
    let funnels = data.funnels || [];
    let engines = data.engines || [];
    let tab = "builds";
    const STAGES = [
      "intake",
      "design",
      "build",
      "qa",
      "deployed",
      "launched",
      "handover"
    ];
    const STAGE_LABELS = {
      intake: "Intake",
      design: "Design",
      build: "Build",
      qa: "QA",
      deployed: "Deployed",
      launched: "Launched",
      handover: "Handover"
    };
    head("h7bcrl", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Nimos Build — Platform</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen bg-background text-foreground"><header class="border-b border-line px-6 py-4 flex items-center justify-between"><div><h1 class="text-xl font-semibold tracking-tight">Nimos Build</h1> <p class="text-muted-foreground text-sm mt-0.5">Creator &amp; manager of all systems, funnels, and engines</p></div> <button class="px-4 py-2 bg-primary text-primary-foreground rounded font-semibold hover:opacity-90">${escape_html("+ Create")}</button></header> <div class="border-b border-line px-6 flex gap-6"><!--[-->`);
    const each_array = ensure_array_like(["builds", "clients", "funnels", "engines"]);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let t = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`py-3 text-sm font-medium border-b-2 transition-colors ${tab === t ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`)}>${escape_html(t.charAt(0).toUpperCase() + t.slice(1))} <span class="ml-1 text-xs text-muted-foreground">(${escape_html(t === "builds" ? builds.length : t === "clients" ? clients.length : t === "funnels" ? funnels.length : engines.length)})</span></button>`);
    }
    $$renderer2.push(`<!--]--></div> <main class="p-6">`);
    {
      $$renderer2.push("<!--[0-->");
      {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <div class="grid grid-cols-7 gap-3 overflow-x-auto"><!--[-->`);
      const each_array_2 = ensure_array_like(STAGES);
      for (let $$index_3 = 0, $$length = each_array_2.length; $$index_3 < $$length; $$index_3++) {
        let stage = each_array_2[$$index_3];
        $$renderer2.push(`<div class="min-w-[160px]"><div class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">${escape_html(STAGE_LABELS[stage])} (${escape_html(builds.filter((b) => b.stage === stage).length)})</div> <div class="space-y-2"><!--[-->`);
        const each_array_3 = ensure_array_like(builds.filter((b) => b.stage === stage));
        for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
          let build = each_array_3[$$index_2];
          $$renderer2.push(`<div class="bg-card border border-line rounded p-3"><h4 class="font-medium text-sm">${escape_html(build.business_name)}</h4> <p class="text-muted-foreground text-xs mt-1">${escape_html(build.trade)} · ${escape_html(build.city)}</p> `);
          if (build.vercel_url) {
            $$renderer2.push(`<!--[0--><a${attr("href", build.vercel_url)} target="_blank" class="text-ring text-xs mt-1 block">Preview →</a>`);
          } else {
            $$renderer2.push("<!--[-1-->");
          }
          $$renderer2.push(`<!--]--> <div class="flex gap-1 mt-2 flex-wrap">`);
          if (stage === "intake") {
            $$renderer2.push(`<!--[0--><button class="text-xs px-2 py-1 bg-primary text-primary-foreground rounded hover:opacity-90">Start Design</button>`);
          } else if (stage === "design") {
            $$renderer2.push(`<!--[1--><button class="text-xs px-2 py-1 bg-primary text-primary-foreground rounded hover:opacity-90">Build &amp; Deploy</button>`);
          } else if (stage === "build") {
            $$renderer2.push(`<!--[2--><button class="text-xs px-2 py-1 bg-primary text-primary-foreground rounded hover:opacity-90">QA Pass</button>`);
          } else if (stage === "qa") {
            $$renderer2.push(`<!--[3--><button class="text-xs px-2 py-1 bg-primary text-primary-foreground rounded hover:opacity-90">Launch</button>`);
          } else if (stage === "deployed") {
            $$renderer2.push(`<!--[4--><button class="text-xs px-2 py-1 bg-primary text-primary-foreground rounded hover:opacity-90">Handover</button>`);
          } else {
            $$renderer2.push("<!--[-1-->");
          }
          $$renderer2.push(`<!--]--></div></div>`);
        }
        $$renderer2.push(`<!--]--></div></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></main></div>`);
  });
}
export {
  _page as default
};
