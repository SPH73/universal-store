<template>
  <div class="min-h-screen bg-white text-gray-900">
    <header class="border-b bg-white">
      <nav class="mx-auto max-w-6xl px-4 py-3 flex gap-6 items-center">
        <NuxtLink to="/" class="font-semibold">Catalogs</NuxtLink>
        <NuxtLink to="/inventory" class="inline-flex items-center gap-1">
          <Icon name="cylinder" :size="16" class="text-blue-600" />
          Hydraulics
        </NuxtLink>
        <NuxtLink to="/perfumes" class="inline-flex items-center gap-1">
          <Icon name="notes" :size="16" class="text-pink-600" />
          Perfumes
        </NuxtLink>
        <NuxtLink to="/bargain-box" class="inline-flex items-center gap-1">
          <Icon name="discount" :size="16" class="text-green-600" />
          Bargain Box
        </NuxtLink>
      </nav>
    </header>
    <div class="mx-auto max-w-6xl px-4 py-6">
      <slot />
    </div>
  </div>
</template>
