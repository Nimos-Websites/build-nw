<script lang="ts">
  import { authClient } from "$lib/auth-client";

  let { enabled }: { enabled: boolean } = $props();

  let password = $state("");
  let busy = $state(false);
  let error = $state("");
  let result = $state<{ totpURI?: string; backupCodes?: string[] } | null>(null);

  const secret = $derived(
    result?.totpURI ? new URL(result.totpURI).searchParams.get("secret") : null,
  );

  async function enable(e: SubmitEvent) {
    e.preventDefault();
    busy = true;
    error = "";
    try {
      const res = await authClient.twoFactor.enable({ password });
      if (res.error) {
        error = res.error.message ?? "That did not work.";
        return;
      }
      result = res.data as { totpURI?: string; backupCodes?: string[] };
    } catch (err) {
      error = (err as Error).message.slice(0, 180);
    } finally {
      busy = false;
    }
  }
</script>

{#if enabled}
  <div class="flex items-center gap-2">
    <span class="chip chip-ok">Two-factor on</span>
    <span class="font-mono text-[10px] text-bone/55">TOTP · codes rotate every 30s</span>
  </div>
{:else if result}
  <div class="rounded-md border border-line bg-[#ffffff04] p-4">
    <p class="text-[13px] text-bone/75">Add this secret to an authenticator, then sign in with the code.</p>
    {#if secret}
      <p class="mt-2 select-all font-mono text-[15px] tracking-[0.18em] text-amber">{secret}</p>
    {/if}
    {#if result.backupCodes?.length}
      <p class="label mt-4">Backup codes — store these now, they are shown once</p>
      <div class="mt-1.5 grid grid-cols-2 gap-1 font-mono text-[11.5px] text-bone/60">
        {#each result.backupCodes as code}
          <span class="select-all">{code}</span>
        {/each}
      </div>
    {/if}
  </div>
{:else}
  <form onsubmit={enable} class="flex flex-wrap items-end gap-2">
    <label class="min-w-[200px] flex-1">
      <span class="label">Confirm with your password</span>
      <input class="field mt-1.5" type="password" bind:value={password} autocomplete="current-password" required />
    </label>
    <button class="btn" type="submit" disabled={busy}>{busy ? "Enrolling…" : "Enable 2FA"}</button>
  </form>
  {#if error}<p class="mt-2 font-mono text-[11px] text-rust">{error}</p>{/if}
{/if}
