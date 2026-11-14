<script lang="ts">
  import { enhance } from "$app/forms";

  let {
    action,
    fields = {},
    label,
    pending = "Working…",
    confirm = null,
    primary = false,
    quiet = false,
    title = undefined,
  }: {
    action: string;
    fields?: Record<string, string | number>;
    label: string;
    pending?: string;
    confirm?: string | null;
    primary?: boolean;
    quiet?: boolean;
    title?: string;
  } = $props();

  let busy = $state(false);
  let armed = $state(false);

  function arm(e: MouseEvent) {
    if (!confirm) return;
    if (!armed) {
      e.preventDefault();
      armed = true;
      setTimeout(() => (armed = false), 4000);
    }
  }
</script>

<form
  method="POST"
  {action}
  use:enhance={() => {
    busy = true;
    return async ({ update }) => {
      await update();
      busy = false;
      armed = false;
    };
  }}
  class="inline-flex"
>
  {#each Object.entries(fields) as [k, v]}
    <input type="hidden" name={k} value={v} />
  {/each}
  <button
    type="submit"
    class="btn"
    class:btn-primary={primary}
    class:btn-quiet={quiet}
    class:border-rust={armed}
    class:text-rust={armed}
    disabled={busy}
    title={title}
    onclick={arm}
  >
    {#if busy}
      <span class="inline-block h-2 w-2 animate-pulse rounded-full bg-current"></span>
      {pending}
    {:else if armed}
      Confirm — {label}
    {:else}
      {label}
    {/if}
  </button>
</form>
