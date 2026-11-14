<script lang="ts">
  /**
   * The class control.
   *
   * A row is a client, a demo, or a test — and nobody can tell from a name, which is why the
   * old regex produced a $23,000 pipeline over a business with no clients. So the three
   * answers are here as buttons, one form each, and the state is whatever a person last said.
   *
   * Deliberately not a select-plus-save: judging a row should be one click, because forty
   * rows of two clicks is a task nobody comes back to.
   */
  let {
    subject,
    id,
    current = "unknown",
    compact = false,
  }: {
    subject: "briefs" | "contact_messages" | "crm_funnel";
    id: string;
    current?: string;
    compact?: boolean;
  } = $props();

  const OPTIONS = [
    { value: "client", label: "Client" },
    { value: "demo", label: "Demo" },
    { value: "test", label: "Test" },
  ];
</script>

<div class="flex flex-wrap items-center gap-1">
  {#if !compact}
    <span class="label mr-0.5">Class</span>
  {/if}
  {#each OPTIONS as o (o.value)}
    <form method="POST" action="?/class_set">
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="subject" value={subject} />
      <input type="hidden" name="class" value={o.value} />
      <button
        type="submit"
        class="h-6 rounded border px-1.5 font-mono text-[9.5px] uppercase tracking-[0.08em] transition-colors
          {current === o.value
            ? 'border-amber/50 bg-amber/12 text-amber'
            : 'border-white/12 text-bone/45 hover:border-white/30 hover:text-bone/80'}"
        aria-pressed={current === o.value}
      >{o.label}</button>
    </form>
  {/each}
  {#if current !== "unknown" && current !== "client" && current !== "demo" && current !== "test"}
    <span class="chip chip-warn">{current}</span>
  {/if}
</div>
