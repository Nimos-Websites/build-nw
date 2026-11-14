<script lang="ts">
  type ReceiptShape = {
    ok: boolean;
    summary: string;
    detail?: string | null;
    vendor?: string | null;
    ms?: number | null;
    href?: string | null;
  };

  let { form }: { form: { receipt?: ReceiptShape; error?: string } | null } = $props();
</script>

{#if form?.receipt}
  <div class="receipt {form.receipt.ok ? 'receipt-ok' : 'receipt-bad'} rise">
    <span class="mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full" class:bg-moss={form.receipt.ok} class:bg-rust={!form.receipt.ok}></span>
    <div class="min-w-0">
      <p class="font-medium text-bone/90">{form.receipt.summary}</p>
      {#if form.receipt.detail}<p class="mt-0.5 font-mono text-[11px] leading-relaxed text-bone/55">{form.receipt.detail}</p>{/if}
      {#if form.receipt.href}
        <a class="mt-1 inline-block font-mono text-[11px] text-amber underline decoration-amber/30 underline-offset-2" href={form.receipt.href} target="_blank" rel="noreferrer">Open ↗</a>
      {/if}
      {#if form.receipt.ms != null}
        <span class="mt-1 block font-mono text-[10px] text-bone/55">{form.receipt.vendor ?? ""} · {form.receipt.ms} ms</span>
      {/if}
    </div>
  </div>
{:else if form?.error}
  <div class="receipt receipt-bad rise">
    <span class="mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full bg-rust"></span>
    <p class="text-bone/85">{form.error}</p>
  </div>
{/if}
