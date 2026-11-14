<script lang="ts">
  let { data, children } = $props();
</script>

<div class="min-h-screen bg-gray-950 text-gray-100">
  <nav class="border-b border-gray-800 px-6 py-3 flex items-center justify-between">
    <a href="/" class="font-bold text-lg">Nimos Build</a>
    <div class="flex items-center gap-4">
      <span class="text-sm text-gray-400">{data.user?.email}</span>
      <a href="/login" class="text-sm text-gray-400 hover:text-white">Sign out</a>
    </div>
  </nav>
  <main class="p-6">
    {@render children()}
  </main>
</div>
