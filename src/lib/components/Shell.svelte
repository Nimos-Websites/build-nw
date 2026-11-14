<script lang="ts">
  import { page } from "$app/state";
  import CommandPalette from "./CommandPalette.svelte";

  let {
    user,
    attention = { money: 0, blocked: 0 },
    children,
  }: {
    user: { email: string; name: string | null };
    attention?: { money: number; blocked: number };
    children: import("svelte").Snippet;
  } = $props();

  let paletteOpen = $state(false);
  let mobileOpen = $state(false);

  const NAV = [
    { href: "/", label: "Control", icon: "today", key: "control" },
    { href: "/map", label: "Map", icon: "map", key: "map" },
    { href: "/catalogue", label: "Catalogue", icon: "layers", key: "catalogue" },
    { href: "/desk", label: "Desk", icon: "inbox", key: "desk" },
    { href: "/work", label: "Work", icon: "globe", key: "work" },
    { href: "/build", label: "Build", icon: "layers", key: "build" },
    { href: "/content", label: "Content", icon: "layers", key: "content" },
    { href: "/pipeline", label: "Pipeline", icon: "funnel", key: "pipeline" },
    { href: "/delivery", label: "Delivery", icon: "layers", key: "delivery" },
    { href: "/sites", label: "Sites", icon: "globe", key: "sites" },
    { href: "/demos", label: "Demos", icon: "globe", key: "demos" },
    { href: "/money", label: "Money", icon: "money", key: "money" },
    { href: "/clients", label: "Clients", icon: "people", key: "clients" },
    { href: "/crm", label: "CRM", icon: "people", key: "crm" },
    { href: "/growth", label: "Growth", icon: "trend", key: "growth" },
    { href: "/fleet", label: "Fleet", icon: "cpu", key: "fleet" },
    { href: "/compliance", label: "Compliance", icon: "shield", key: "compliance" },
    { href: "/vendors", label: "Vendors", icon: "plug", key: "vendors" },
    { href: "/audit", label: "Audit", icon: "list", key: "audit" },
    { href: "/settings", label: "Settings", icon: "sliders", key: "settings" },
  ];

  const path = $derived(page.url.pathname);
  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));
  const here = $derived(NAV.find((n) => active(n.href))?.label ?? "Admin");
  const initials = $derived(
    (user.name ?? user.email)
      .split(/[\s@.]/)
      .filter(Boolean)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase())
      .join(""),
  );
</script>

{#snippet icon(name: string)}
  <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    {#if name === "today"}
      <circle cx="10" cy="10" r="7" /><path d="M10 6v4.2l2.8 1.7" />
    {:else if name === "briefcase"}
      <rect x="2.5" y="6.5" width="15" height="10" rx="1.6" /><path d="M7 6.5V5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 13 5v1.5M2.5 10.5h15" />
    {:else if name === "globe"}
      <circle cx="10" cy="10" r="7" /><path d="M3 10h14M10 3c2.2 2.4 2.2 11.6 0 14M10 3c-2.2 2.4-2.2 11.6 0 14" />
    {:else if name === "money"}
      <rect x="2" y="5.5" width="16" height="9" rx="1.5" /><circle cx="10" cy="10" r="2.2" /><path d="M5 8.2v3.6M15 8.2v3.6" />
    {:else if name === "people"}
      <circle cx="7.5" cy="7" r="2.6" /><path d="M2.8 16c.5-2.6 2.4-4 4.7-4s4.2 1.4 4.7 4" /><circle cx="14" cy="7.6" r="2.1" /><path d="M13 12.2c2 .1 3.4 1.4 3.8 3.5" />
    {:else if name === "plug"}
      <path d="M7 2.5v4M13 2.5v4M5 6.5h10v2a5 5 0 0 1-5 5 5 5 0 0 1-5-5z" /><path d="M10 13.5v4" />
    {:else if name === "list"}
      <path d="M7 5h10M7 10h10M7 15h10" /><circle cx="3.4" cy="5" r=".9" fill="currentColor" stroke="none" /><circle cx="3.4" cy="10" r=".9" fill="currentColor" stroke="none" /><circle cx="3.4" cy="15" r=".9" fill="currentColor" stroke="none" />
    {:else if name === "inbox"}
      <path d="M2.5 5.5h15v9a1.5 1.5 0 0 1-1.5 1.5H4a1.5 1.5 0 0 1-1.5-1.5z" /><path d="M2.5 10.5h4l1.2 2h4.6l1.2-2h4" />
    {:else if name === "funnel"}
      <path d="M2.6 3.5h14.8l-5.6 6.6v5.2l-3.6 1.7v-6.9z" />
    {:else if name === "map"}
      <path d="M3 5.2 7.7 3.4l4.6 1.8L17 3.4v11.4l-4.7 1.8-4.6-1.8L3 16.6z" /><path d="M7.7 3.4v11.4M12.3 5.2v11.4" />
    {:else if name === "layers"}
      <path d="m10 2.8 7 3.6-7 3.6-7-3.6z" /><path d="m3 10.4 7 3.6 7-3.6" /><path d="m3 14 7 3.6 7-3.6" />
    {:else if name === "trend"}
      <path d="M3 14.5 7.4 9l3.2 3 5.4-6.5" /><path d="M13 5.5h3.5V9" />
    {:else if name === "cpu"}
      <rect x="6" y="6" width="8" height="8" rx="1.2" /><path d="M9 2.5v2M11 2.5v2M9 15.5v2M11 15.5v2M2.5 9h2M2.5 11h2M15.5 9h2M15.5 11h2" />
    {:else if name === "shield"}
      <path d="M10 2.5 16 5v5c0 3.6-2.4 6.4-6 7.5-3.6-1.1-6-3.9-6-7.5V5z" /><path d="m7.4 9.8 1.9 1.9 3.4-3.6" />
    {:else if name === "sliders"}
      <path d="M3 6h9M15 6h2M3 14h3M9 14h8" /><circle cx="13.2" cy="6" r="1.9" /><circle cx="7" cy="14" r="1.9" />
    {/if}
  </svg>
{/snippet}

<!-- Mobile top bar -->
<header class="sticky top-0 z-40 flex h-12 items-center gap-3 border-b border-line bg-ink/92 px-4 backdrop-blur lg:hidden">
  <button
    type="button"
    class="btn btn-quiet -ml-2 px-2"
    aria-label="Open navigation"
    aria-expanded={mobileOpen}
    onclick={() => (mobileOpen = !mobileOpen)}
  >
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 5.5h14M3 10h14M3 14.5h14" /></svg>
  </button>
  <span class="font-mono text-[11px] uppercase tracking-[0.18em] text-bone/55">{here}</span>
  <button type="button" class="btn btn-quiet ml-auto px-2" aria-label="Search" onclick={() => (paletteOpen = true)}>
    <svg viewBox="0 0 20 20" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8.6" cy="8.6" r="5.1" /><path d="m12.6 12.6 4 4" /></svg>
  </button>
</header>

<div class="lg:grid lg:min-h-dvh lg:grid-cols-[236px_minmax(0,1fr)]">
  <!-- Rail -->
  <aside
    class="fixed inset-y-0 left-0 z-50 flex w-[252px] flex-col border-r border-line bg-panel px-4 py-5 transition-transform duration-200 lg:sticky lg:top-0 lg:h-dvh lg:w-auto lg:translate-x-0 lg:bg-transparent lg:transition-none"
    class:-translate-x-full={!mobileOpen}
  >
    <a href="/" class="mb-7 flex items-center gap-2.5 px-1" onclick={() => (mobileOpen = false)}>
      <span class="flex h-[30px] w-[30px] items-center justify-center rounded-[7px] border border-line2 bg-[#ffffff06]">
        <svg viewBox="0 0 32 32" width="17" height="17" aria-hidden="true"><path d="M9 24V8h3.4l7.2 10.4V8H23v16h-3.4L12.4 13.6V24H9z" fill="#E0A860" /></svg>
      </span>
      <span class="leading-none">
        <span class="block font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone/85">Nimos</span>
        <span class="mt-1 block font-mono text-[9.5px] uppercase tracking-[0.2em] text-bone/55">Operations desk</span>
      </span>
    </a>

    <nav class="flex flex-col gap-0.5" aria-label="Primary">
      {#each NAV as item}
        <a href={item.href} class="rail-link" aria-current={active(item.href) ? "page" : undefined} onclick={() => (mobileOpen = false)}>
          {@render icon(item.icon)}
          <span>{item.label}</span>
          {#if item.key === "today" && (attention.money > 0 || attention.blocked > 0)}
            <span class="rail-count text-amber">{attention.money + attention.blocked}</span>
          {/if}
        </a>
      {/each}
    </nav>

    <div class="mt-auto pt-6">
      <button type="button" class="flex w-full items-center justify-between rounded-md border border-line bg-[#ffffff04] px-2.5 py-2 text-left transition-colors hover:border-line2" onclick={() => { mobileOpen = false; paletteOpen = true; }}>
        <span class="label">Search</span>
        <span class="kbd">⌘K</span>
      </button>

      <div class="mt-4 border-t border-line pt-4">
        <div class="flex items-center gap-2.5 px-1">
          <span class="flex h-7 w-7 items-center justify-center rounded-full border border-line2 bg-[#ffffff08] font-mono text-[10.5px] text-bone/75">{initials}</span>
          <span class="min-w-0 leading-tight">
            <span class="block truncate text-[12.5px] text-bone/85">{user.name ?? "Operator"}</span>
            <span class="block truncate font-mono text-[10px] text-bone/55">{user.email}</span>
          </span>
        </div>
        <div class="mt-3 flex items-center justify-between px-1">
          <span class="chip chip-ok">Production</span>
          <form method="POST" action="/logout">
            <button class="btn btn-quiet h-7 px-1.5 text-[11.5px]" type="submit">Sign out</button>
          </form>
        </div>
        <p class="mt-3 px-1 font-mono text-[9.5px] leading-relaxed tracking-[0.1em] text-bone/55">
          admin.nimoswebsites.com<br />v1.0 · single operator
        </p>
      </div>
    </div>
  </aside>

  {#if mobileOpen}
    <button type="button" class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" aria-label="Close navigation" onclick={() => (mobileOpen = false)}></button>
  {/if}

  <!-- Main -->
  <div class="min-w-0">
    <div class="sticky top-0 z-30 hidden h-12 items-center gap-4 border-b border-line bg-ink/88 px-8 backdrop-blur lg:flex">
      <span class="font-mono text-[10.5px] uppercase tracking-[0.18em] text-bone/55">{here}</span>
      <span class="h-3 w-px bg-line2"></span>
      <span class="font-mono text-[10.5px] uppercase tracking-[0.14em] text-bone/55">Operations desk</span>
      <button type="button" class="ml-auto flex items-center gap-2 rounded-md border border-line px-2.5 py-1 text-[12px] text-bone/55 transition-colors hover:border-line2 hover:text-bone/80" onclick={() => (paletteOpen = true)}>
        <svg viewBox="0 0 20 20" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8.6" cy="8.6" r="5.1" /><path d="m12.6 12.6 4 4" /></svg>
        Search
        <span class="kbd ml-1">⌘K</span>
      </button>
      <span class="chip chip-ok">Production</span>
    </div>

    <main class="mx-auto w-full max-w-[1240px] px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pt-9">
      {@render children()}
    </main>
  </div>
</div>

<CommandPalette bind:open={paletteOpen} />
