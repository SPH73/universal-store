<template>
  <div class="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
    <header class="border-b bg-[var(--nav-bg)]">
      <nav
        class="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between"
      >
        <NuxtLink to="/" class="font-semibold inline-flex items-center gap-2">
          <Icon name="notes" :size="20" class="text-pink-400" />
          <span>Perfume Inventory</span>
        </NuxtLink>
        <div class="flex gap-4 text-sm">
          <NuxtLink to="/perfumes">Catalog</NuxtLink>
          <NuxtLink to="/admin/perfumes/new">Admin</NuxtLink>
        </div>
      </nav>
    </header>
    <div class="mx-auto max-w-6xl px-4 py-6">
      <BackToCatalogs variant="perfumes" />
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  bodyAttrs: { style: ":root{--bg:#fff7fc;--fg:#1f2937;--nav-bg:#fde2f2}" },
});
</script>
