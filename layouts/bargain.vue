<template>
  <div class="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
    <header class="border-b bg-[var(--nav-bg)]">
      <nav
        class="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between"
      >
        <NuxtLink to="/" class="font-semibold inline-flex items-center gap-2">
          <Icon name="discount" :size="20" class="text-green-400" />
          <span>Bargain Box</span>
        </NuxtLink>
        <div class="flex gap-4 text-sm">
          <NuxtLink to="/bargain-box">Deals</NuxtLink>
          <NuxtLink to="/admin/bargain-box/new">Admin</NuxtLink>
        </div>
      </nav>
    </header>
    <main class="mx-auto max-w-6xl px-4 py-6">
      <BackToCatalogs variant="bargain" />
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
useHead({
  bodyAttrs: { style: ":root{--bg:#0a0f0a;--fg:#ecfdf5;--nav-bg:#052e16}" },
});
</script>
