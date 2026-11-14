<script lang="ts">
  let { data } = $props();
  let email = $state("");
  let password = $state("");
  let error = $state("");
  let loading = $state(false);

  async function submit(e: Event) {
    e.preventDefault();
    loading = true;
    error = "";
    try {
      const res = await fetch("/api/auth/sign-in/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const d = await res.json();
        error = d.message || "Sign in failed";
      } else {
        window.location.href = data.next || "/";
      }
    } catch (e) {
      error = String(e);
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head><title>Sign in — Nimos Build</title></svelte:head>

<div class="min-h-screen flex items-center justify-center bg-background">
  <div class="w-full max-w-sm p-8 bg-card border border-line rounded-lg">
    <h1 class="text-xl font-semibold mb-6 text-center tracking-tight">Nimos Build</h1>
    <form onsubmit={submit} class="space-y-4">
      <input type="email" placeholder="Email" bind:value={email} required class="w-full px-3 py-2 rounded border border-input bg-secondary text-foreground" />
      <input type="password" placeholder="Password" bind:value={password} required class="w-full px-3 py-2 rounded border border-input bg-secondary text-foreground" />
      {#if error}
        <p class="text-destructive text-sm">{error}</p>
      {/if}
      <button type="submit" disabled={loading} class="w-full py-2 rounded bg-primary text-primary-foreground font-semibold hover:opacity-90 disabled:opacity-50">
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  </div>
</div>
