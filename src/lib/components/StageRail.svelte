<script lang="ts">
  import { STAGES } from "$lib/lifecycle";

  let {
    reached,
    current,
    next,
  }: { reached: string[]; current: string; next: string | null } = $props();
</script>

<div class="overflow-x-auto">
  <ol class="flex min-w-[680px] items-start gap-0" aria-label="Engagement lifecycle">
    {#each STAGES as stage, i}
      {@const done = reached.includes(stage.key)}
      {@const isCurrent = stage.key === current}
      <li class="relative flex min-w-0 flex-1 flex-col items-center gap-1.5">
        {#if i > 0}
          <span
            class="absolute right-1/2 top-[6px] h-px w-full {done ? 'bg-moss' : 'bg-white/10'}"
            aria-hidden="true"
          ></span>
        {/if}
        <span
          class="relative z-10 h-[13px] w-[13px] rounded-full border-2 {isCurrent
            ? 'border-amber bg-amber'
            : done
              ? 'border-moss bg-moss'
              : 'border-white/15 bg-ink'}"
          aria-hidden="true"
        ></span>
        <span
          class="truncate px-0.5 font-mono text-[9px] uppercase tracking-[0.08em] {done || isCurrent ? 'text-bone/80' : 'text-bone/55'}"
          aria-current={isCurrent ? "step" : undefined}
        >{stage.label}</span>
      </li>
    {/each}
  </ol>
</div>
{#if next}
  <p class="mt-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-amber/80">
    Next · {next}
  </p>
{/if}
