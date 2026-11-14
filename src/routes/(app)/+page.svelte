<script lang="ts">
  let { data } = $props();
  let builds = $state(data.builds || []);
  let clients = $state(data.clients || []);
  let funnels = $state(data.funnels || []);
  let engines = $state(data.engines || []);
  let tab = $state("builds");
  let showForm = $state(false);
  let loading = $state(false);

  const STAGES = ["intake", "design", "build", "qa", "deployed", "launched", "handover"];
  const STAGE_LABELS: Record<string, string> = {
    intake: "Intake", design: "Design", build: "Build", qa: "QA",
    deployed: "Deployed", launched: "Launched", handover: "Handover",
  };

  let newBuild = $state({ businessName: "", trade: "", city: "", region: "BC", phone: "", email: "", headline: "", about: "", services: [{ label: "", detail: "" }] });
  let newClient = $state({ name: "", email: "", phone: "", company: "", notes: "" });
  let newFunnel = $state({ name: "", type: "lead", status: "draft" });
  let newEngine = $state({ name: "", type: "build", status: "active" });

  async function createBuild() {
    loading = true;
    try {
      const res = await fetch("/api/builds", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ businessName: newBuild.businessName, trade: newBuild.trade, city: newBuild.city, region: newBuild.region, phone: newBuild.phone, email: newBuild.email, headline: newBuild.headline, about: newBuild.about, services: newBuild.services.filter((s: any) => s.label) }) });
      const d = await res.json();
      if (d.build) { builds = [d.build, ...builds]; showForm = false; newBuild = { businessName: "", trade: "", city: "", region: "BC", phone: "", email: "", headline: "", about: "", services: [{ label: "", detail: "" }] }; }
    } finally { loading = false; }
  }

  async function createClient() {
    loading = true;
    try {
      const res = await fetch("/api/clients", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newClient) });
      const d = await res.json();
      if (d.client) { clients = [d.client, ...clients]; showForm = false; newClient = { name: "", email: "", phone: "", company: "", notes: "" }; }
    } finally { loading = false; }
  }

  async function createFunnel() {
    loading = true;
    try {
      const res = await fetch("/api/funnels", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newFunnel) });
      const d = await res.json();
      if (d.funnel) { funnels = [d.funnel, ...funnels]; showForm = false; newFunnel = { name: "", type: "lead", status: "draft" }; }
    } finally { loading = false; }
  }

  async function createEngine() {
    loading = true;
    try {
      const res = await fetch("/api/engines", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newEngine) });
      const d = await res.json();
      if (d.engine) { engines = [d.engine, ...engines]; showForm = false; newEngine = { name: "", type: "build", status: "active" }; }
    } finally { loading = false; }
  }

  async function advanceStage(build: any) {
    const idx = STAGES.indexOf(build.stage);
    if (idx >= STAGES.length - 1) return;
    const res = await fetch(`/api/builds/${build.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ stage: STAGES[idx + 1] }) });
    const d = await res.json();
    if (d.build) builds = builds.map((b: any) => b.id === build.id ? d.build : b);
  }

  async function runBuild(build: any) {
    const res = await fetch(`/api/builds/${build.id}`, { method: "POST" });
    const d = await res.json();
    if (d.ok) builds = builds.map((b: any) => b.id === build.id ? { ...b, vercel_url: d.url, stage: "build" } : b);
    return d;
  }

  function buildsByStage(stage: string) { return builds.filter((b: any) => b.stage === stage); }
</script>

<svelte:head><title>Nimos Build — Platform</title></svelte:head>

<div class="min-h-screen bg-background text-foreground">
  <header class="border-b border-line px-6 py-4 flex items-center justify-between">
    <div>
      <h1 class="text-xl font-semibold tracking-tight">Nimos Build</h1>
      <p class="text-muted-foreground text-sm mt-0.5">Creator & manager of all systems, funnels, and engines</p>
    </div>
    <button onclick={() => showForm = !showForm} class="px-4 py-2 bg-primary text-primary-foreground rounded font-semibold hover:opacity-90">
      {showForm ? "Cancel" : "+ Create"}
    </button>
  </header>

  <!-- Tabs -->
  <div class="border-b border-line px-6 flex gap-6">
    {#each ["builds", "clients", "funnels", "engines"] as t}
      <button onclick={() => { tab = t; showForm = false; }} class="py-3 text-sm font-medium border-b-2 transition-colors {tab === t ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}">
        {t.charAt(0).toUpperCase() + t.slice(1)}
        <span class="ml-1 text-xs text-muted-foreground">({t === 'builds' ? builds.length : t === 'clients' ? clients.length : t === 'funnels' ? funnels.length : engines.length})</span>
      </button>
    {/each}
  </div>

  <main class="p-6">
    <!-- Builds tab -->
    {#if tab === "builds"}
      {#if showForm}
        <div class="border border-line rounded-lg p-6 mb-6 bg-card">
          <h2 class="text-lg font-semibold mb-4">New Build</h2>
          <form onsubmit={(e) => { e.preventDefault(); createBuild(); }} class="space-y-3">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input placeholder="Business name *" bind:value={newBuild.businessName} required class="px-3 py-2 rounded border border-input bg-secondary text-foreground" />
              <input placeholder="Trade *" bind:value={newBuild.trade} required class="px-3 py-2 rounded border border-input bg-secondary text-foreground" />
              <input placeholder="City *" bind:value={newBuild.city} required class="px-3 py-2 rounded border border-input bg-secondary text-foreground" />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input placeholder="Region" bind:value={newBuild.region} class="px-3 py-2 rounded border border-input bg-secondary text-foreground" />
              <input placeholder="Phone" bind:value={newBuild.phone} class="px-3 py-2 rounded border border-input bg-secondary text-foreground" />
              <input placeholder="Email" bind:value={newBuild.email} class="px-3 py-2 rounded border border-input bg-secondary text-foreground" />
            </div>
            <input placeholder="Headline" bind:value={newBuild.headline} class="w-full px-3 py-2 rounded border border-input bg-secondary text-foreground" />
            <textarea placeholder="About" bind:value={newBuild.about} class="w-full px-3 py-2 rounded border border-input bg-secondary text-foreground" rows="2"></textarea>
            <div>
              <h3 class="font-medium mb-1 text-foreground text-sm">Services</h3>
              {#each newBuild.services as svc}
                <div class="grid grid-cols-2 gap-2 mb-1">
                  <input placeholder="Service" bind:value={svc.label} class="px-3 py-2 rounded border border-input bg-secondary text-foreground text-sm" />
                  <input placeholder="Description" bind:value={svc.detail} class="px-3 py-2 rounded border border-input bg-secondary text-foreground text-sm" />
                </div>
              {/each}
              <button type="button" onclick={() => newBuild.services = [...newBuild.services, {label:"",detail:""}]} class="text-xs text-ring">+ Add service</button>
            </div>
            <button type="submit" disabled={loading} class="w-full py-2 bg-primary text-primary-foreground rounded font-semibold hover:opacity-90 disabled:opacity-50">
              {loading ? "Creating..." : "Create Build"}
            </button>
          </form>
        </div>
      {/if}
      <div class="grid grid-cols-7 gap-3 overflow-x-auto">
        {#each STAGES as stage}
          <div class="min-w-[160px]">
            <div class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
              {STAGE_LABELS[stage]} ({builds.filter((b: any) => b.stage === stage).length})
            </div>
            <div class="space-y-2">
              {#each builds.filter((b: any) => b.stage === stage) as build}
                <div class="bg-card border border-line rounded p-3">
                  <h4 class="font-medium text-sm">{build.business_name}</h4>
                  <p class="text-muted-foreground text-xs mt-1">{build.trade} · {build.city}</p>
                  {#if build.vercel_url}
                    <a href={build.vercel_url} target="_blank" class="text-ring text-xs mt-1 block">Preview →</a>
                  {/if}
                  <div class="flex gap-1 mt-2 flex-wrap">
                    {#if stage === "intake"}
                      <button onclick={() => advanceStage(build)} class="text-xs px-2 py-1 bg-primary text-primary-foreground rounded hover:opacity-90">Start Design</button>
                    {:else if stage === "design"}
                      <button onclick={() => runBuild(build).then(() => advanceStage(build))} class="text-xs px-2 py-1 bg-primary text-primary-foreground rounded hover:opacity-90">Build & Deploy</button>
                    {:else if stage === "build"}
                      <button onclick={() => advanceStage(build)} class="text-xs px-2 py-1 bg-primary text-primary-foreground rounded hover:opacity-90">QA Pass</button>
                    {:else if stage === "qa"}
                      <button onclick={() => advanceStage(build)} class="text-xs px-2 py-1 bg-primary text-primary-foreground rounded hover:opacity-90">Launch</button>
                    {:else if stage === "deployed"}
                      <button onclick={() => advanceStage(build)} class="text-xs px-2 py-1 bg-primary text-primary-foreground rounded hover:opacity-90">Handover</button>
                    {/if}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    {/if}

    <!-- Clients tab -->
    {#if tab === "clients"}
      {#if showForm}
        <div class="border border-line rounded-lg p-6 mb-6 bg-card max-w-2xl">
          <h2 class="text-lg font-semibold mb-4">New Client</h2>
          <form onsubmit={(e) => { e.preventDefault(); createClient(); }} class="space-y-3">
            <input placeholder="Name *" bind:value={newClient.name} required class="w-full px-3 py-2 rounded border border-input bg-secondary text-foreground" />
            <div class="grid grid-cols-2 gap-3">
              <input placeholder="Email" bind:value={newClient.email} class="px-3 py-2 rounded border border-input bg-secondary text-foreground" />
              <input placeholder="Phone" bind:value={newClient.phone} class="px-3 py-2 rounded border border-input bg-secondary text-foreground" />
            </div>
            <input placeholder="Company" bind:value={newClient.company} class="w-full px-3 py-2 rounded border border-input bg-secondary text-foreground" />
            <textarea placeholder="Notes" bind:value={newClient.notes} class="w-full px-3 py-2 rounded border border-input bg-secondary text-foreground" rows="2"></textarea>
            <button type="submit" disabled={loading} class="w-full py-2 bg-primary text-primary-foreground rounded font-semibold hover:opacity-90 disabled:opacity-50">
              {loading ? "Creating..." : "Create Client"}
            </button>
          </form>
        </div>
      {/if}
      <div class="space-y-2">
        {#each clients as client}
          <div class="bg-card border border-line rounded p-4">
            <h4 class="font-medium">{client.name}</h4>
            <p class="text-muted-foreground text-sm">{client.company || "—"} · {client.email || "—"} · {client.phone || "—"}</p>
            {#if client.notes}<p class="text-muted-foreground text-xs mt-1">{client.notes}</p>{/if}
          </div>
        {/each}
        {#if clients.length === 0}<p class="text-muted-foreground text-center py-12">No clients yet.</p>{/if}
      </div>
    {/if}

    <!-- Funnels tab -->
    {#if tab === "funnels"}
      {#if showForm}
        <div class="border border-line rounded-lg p-6 mb-6 bg-card max-w-lg">
          <h2 class="text-lg font-semibold mb-4">New Funnel</h2>
          <form onsubmit={(e) => { e.preventDefault(); createFunnel(); }} class="space-y-3">
            <input placeholder="Funnel name *" bind:value={newFunnel.name} required class="w-full px-3 py-2 rounded border border-input bg-secondary text-foreground" />
            <div class="grid grid-cols-2 gap-3">
              <select bind:value={newFunnel.type} class="px-3 py-2 rounded border border-input bg-secondary text-foreground">
                <option value="lead">Lead capture</option>
                <option value="sales">Sales</option>
                <option value="onboarding">Onboarding</option>
              </select>
              <select bind:value={newFunnel.status} class="px-3 py-2 rounded border border-input bg-secondary text-foreground">
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
              </select>
            </div>
            <button type="submit" disabled={loading} class="w-full py-2 bg-primary text-primary-foreground rounded font-semibold hover:opacity-90 disabled:opacity-50">
              {loading ? "Creating..." : "Create Funnel"}
            </button>
          </form>
        </div>
      {/if}
      <div class="space-y-2">
        {#each funnels as funnel}
          <div class="bg-card border border-line rounded p-4 flex items-center justify-between">
            <div>
              <h4 class="font-medium">{funnel.name}</h4>
              <p class="text-muted-foreground text-sm">{funnel.type} · /{funnel.slug} · {funnel.status}</p>
            </div>
            <span class="px-2 py-0.5 text-xs rounded bg-secondary text-muted-foreground">{funnel.status}</span>
          </div>
        {/each}
        {#if funnels.length === 0}<p class="text-muted-foreground text-center py-12">No funnels yet.</p>{/if}
      </div>
    {/if}

    <!-- Engines tab -->
    {#if tab === "engines"}
      {#if showForm}
        <div class="border border-line rounded-lg p-6 mb-6 bg-card max-w-lg">
          <h2 class="text-lg font-semibold mb-4">New Engine</h2>
          <form onsubmit={(e) => { e.preventDefault(); createEngine(); }} class="space-y-3">
            <input placeholder="Engine name *" bind:value={newEngine.name} required class="w-full px-3 py-2 rounded border border-input bg-secondary text-foreground" />
            <div class="grid grid-cols-2 gap-3">
              <select bind:value={newEngine.type} class="px-3 py-2 rounded border border-input bg-secondary text-foreground">
                <option value="build">Build</option>
                <option value="deploy">Deploy</option>
                <option value="qa">QA</option>
                <option value="domain">Domain</option>
                <option value="content">Content</option>
              </select>
              <select bind:value={newEngine.status} class="px-3 py-2 rounded border border-input bg-secondary text-foreground">
                <option value="active">Active</option>
                <option value="paused">Paused</option>
              </select>
            </div>
            <button type="submit" disabled={loading} class="w-full py-2 bg-primary text-primary-foreground rounded font-semibold hover:opacity-90 disabled:opacity-50">
              {loading ? "Creating..." : "Create Engine"}
            </button>
          </form>
        </div>
      {/if}
      <div class="space-y-2">
        {#each engines as engine}
          <div class="bg-card border border-line rounded p-4 flex items-center justify-between">
            <div>
              <h4 class="font-medium">{engine.name}</h4>
              <p class="text-muted-foreground text-sm">{engine.type} · {engine.status}</p>
            </div>
            <span class="px-2 py-0.5 text-xs rounded {engine.status === 'active' ? 'bg-green-900 text-green-300' : 'bg-gray-800 text-gray-400'}">{engine.status}</span>
          </div>
        {/each}
        {#if engines.length === 0}<p class="text-muted-foreground text-center py-12">No engines yet.</p>{/if}
      </div>
    {/if}
  </main>
</div>
