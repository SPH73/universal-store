<template>
  <div class="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
    <header class="border-b bg-[var(--nav-bg)]">
      <nav
        class="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between"
      >
        <NuxtLink to="/" class="font-semibold inline-flex items-center gap-2">
          <Icon name="cylinder" :size="20" class="text-blue-400" />
          <span>Hydraulic Components</span>
        </NuxtLink>
        <div class="flex gap-4 text-sm">
          <NuxtLink to="/inventory">Inventory</NuxtLink>
          <NuxtLink to="/admin/inventory/new">Admin</NuxtLink>
        </div>
      </nav>
    </header>
    <main class="mx-auto max-w-6xl px-4 py-6">
      <BackToCatalogs variant="hydraulics" />
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
useHead({
  bodyAttrs: { style: ":root{--bg:#0b1220;--fg:#e6f0ff;--nav-bg:#0f172a}" },
});
</script>
