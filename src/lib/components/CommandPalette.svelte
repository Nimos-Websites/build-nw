<script lang="ts">
  import { goto } from "$app/navigation";
  import { tick } from "svelte";

  let { open = $bindable(false) }: { open?: boolean } = $props();

  type Item = { group: string; label: string; sub?: string; href: string };

  const DEFAULT: Item[] = [
    { group: "Go", label: "Control", sub: "The whole business, and the queue", href: "/" },
    { group: "Go", label: "Catalogue", sub: "91 parts · what we can deliver", href: "/catalogue" },
    { group: "Go", label: "Map", sub: "Verticals, the build, the layers, the estate", href: "/map" },
    { group: "Go", label: "Desk", sub: "Messages, briefs, bookings", href: "/desk" },
    { group: "Go", label: "Pipeline", sub: "Deals, leads, demos", href: "/pipeline" },
    { group: "Go", label: "Delivery", sub: "Builds, workstreams, handover", href: "/delivery" },
    { group: "Go", label: "Sites", sub: "Deployments, domains, DNS", href: "/sites" },
    { group: "Go", label: "Money", sub: "Payments, contracts, subscriptions", href: "/money" },
    { group: "Go", label: "Clients", sub: "Accounts and portal seats", href: "/clients" },
    { group: "Go", label: "Growth", sub: "Traffic, research, email", href: "/growth" },
    { group: "Go", label: "Fleet", sub: "Cron, jobs, model spend", href: "/fleet" },
    { group: "Go", label: "Compliance", sub: "Consent, requests, evidence", href: "/compliance" },
    { group: "Go", label: "Vendors", sub: "The stack, probed", href: "/vendors" },
    { group: "Go", label: "Audit", sub: "Every verb, with its receipt", href: "/audit" },
    { group: "Go", label: "Settings", sub: "Access, security, environment", href: "/settings" },
  ];

  let q = $state("");
  let items = $state<Item[]>(DEFAULT);
  let idx = $state(0);
  let loading = $state(false);
  let input = $state<HTMLInputElement | null>(null);
  let list = $state<HTMLElement | null>(null);

  function reset() {
    q = "";
    items = DEFAULT;
    idx = 0;
    void tick().then(() => input?.focus());
  }

  function close() {
    open = false;
  }

  function go(item: Item) {
    open = false;
    void goto(item.href);
  }

  function onkey(e: KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      idx = Math.min(items.length - 1, idx + 1);
      scroll();
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      idx = Math.max(0, idx - 1);
      scroll();
      return;
    }
    if (e.key === "Enter" && items[idx]) {
      e.preventDefault();
      go(items[idx]);
    }
  }

  function scroll() {
    void tick().then(() => {
      list?.querySelector<HTMLElement>(`[data-i="${idx}"]`)?.scrollIntoView({ block: "nearest" });
    });
  }

  $effect(() => {
    if (open) reset();
  });

  $effect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        open = !open;
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  $effect(() => {
    if (!open) return;
    const term = q.trim();
    if (term.length < 2) {
      items = DEFAULT;
      idx = 0;
      return;
    }
    let cancelled = false;
    loading = true;
    const t = setTimeout(async () => {
      try {
        const r = await fetch(`/api/search?q=${encodeURIComponent(term)}`);
        const j = (await r.json()) as { items?: Item[] };
        if (!cancelled) {
          items = j.items?.length ? j.items : DEFAULT;
          idx = 0;
        }
      } catch {
        if (!cancelled) items = DEFAULT;
      } finally {
        if (!cancelled) loading = false;
      }
    }, 110);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  });

  let lastGroup = $derived("");
</script>

{#if open}
  <div class="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[10vh]">
    <button type="button" class="absolute inset-0 bg-black/65 backdrop-blur-[3px]" aria-label="Close search" onclick={close}></button>
    <div
      class="relative w-full max-w-[640px] overflow-hidden rounded-xl border border-line2 bg-panel shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      tabindex="-1"
    >
      <div class="flex items-center gap-3 border-b border-line px-4">
        <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.5" class="shrink-0 text-bone/55"><circle cx="8.6" cy="8.6" r="5.1" /><path d="m12.6 12.6 4 4" /></svg>
        <input
          bind:this={input}
          bind:value={q}
          onkeydown={onkey}
          class="h-[52px] w-full bg-transparent text-[15px] text-bone outline-none placeholder:text-bone/55"
          placeholder="Search a client, a site, a payment — or jump"
          aria-label="Search"
          autocomplete="off"
          spellcheck="false"
        />
        {#if loading}<span class="font-mono text-[10px] text-bone/55">…</span>{/if}
        <button type="button" class="kbd" onclick={close}>esc</button>
      </div>

      <ul bind:this={list} class="max-h-[52vh] overflow-y-auto py-1.5" role="listbox" aria-label="Results">
        {#each items as item, i (item.href + item.label)}
          {@const showGroup = item.group !== lastGroup}
          {lastGroup = item.group}
          {#if showGroup}
            <li class="label px-4 pb-1 pt-3" role="presentation">{item.group}</li>
          {/if}
          <li role="option" aria-selected={i === idx} data-i={i}>
            <button
              type="button"
              class="flex w-full items-center gap-3 px-4 py-2 text-left {i === idx ? 'bg-[#ffffff0c]' : ''}"
              onmouseenter={() => (idx = i)}
              onclick={() => go(item)}
            >
              <span class="min-w-0 flex-1">
                <span class="block truncate text-[13.5px] text-bone/92">{item.label}</span>
                {#if item.sub}<span class="block truncate font-mono text-[10.5px] text-bone/55">{item.sub}</span>{/if}
              </span>
              {#if i === idx}<span class="font-mono text-[10px] text-bone/55">↵</span>{/if}
            </button>
          </li>
        {/each}
      </ul>

      <div class="flex items-center gap-4 border-t border-line px-4 py-2">
        <span class="font-mono text-[10px] text-bone/55">↑↓ move</span>
        <span class="font-mono text-[10px] text-bone/55">↵ open</span>
        <span class="font-mono text-[10px] text-bone/55">esc close</span>
        <span class="ml-auto font-mono text-[10px] text-bone/55">{items.length} result{items.length === 1 ? "" : "s"}</span>
      </div>
    </div>
  </div>
{/if}
