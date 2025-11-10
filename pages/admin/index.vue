<script setup lang="ts">
definePageMeta({
  middleware: "admin",
});

// Simple client-side check - real auth is server-side
const { data: session } = await useFetch("/api/admin/session", {
  server: false,
  default: () => ({ isAdmin: false }),
});

if (!session.value?.isAdmin) {
  await navigateTo("/admin/login");
}

const logout = async () => {
  await $fetch("/api/admin/logout", { method: "POST" });
  await navigateTo("/admin/login");
};
</script>

<template>
  <main class="mx-auto max-w-4xl p-6">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-semibold">Admin Dashboard</h1>
      <button @click="logout" class="text-red-600 hover:text-red-800">
        Logout
      </button>
    </div>

    <div class="grid gap-6 md:grid-cols-3">
      <NuxtLink
        to="/admin/inventory/new"
        class="block border rounded-2xl p-6 hover:shadow"
      >
        <h2 class="font-medium text-lg mb-2">Add Hydraulic Component</h2>
        <p class="text-gray-600">Add new hydraulic components to inventory</p>
      </NuxtLink>

      <NuxtLink
        to="/admin/perfumes/new"
        class="block border rounded-2xl p-6 hover:shadow"
      >
        <h2 class="font-medium text-lg mb-2">Add Perfume</h2>
        <p class="text-gray-600">Add new perfumes to inventory</p>
      </NuxtLink>

      <NuxtLink
        to="/admin/bargain-box/new"
        class="block border rounded-2xl p-6 hover:shadow"
      >
        <h2 class="font-medium text-lg mb-2">Add Bargain Item</h2>
        <p class="text-gray-600">Add new bargain items to clearance store</p>
      </NuxtLink>

      <NuxtLink
        to="/inventory"
        class="block border rounded-2xl p-6 hover:shadow"
      >
        <h2 class="font-medium text-lg mb-2">View Hydraulics</h2>
        <p class="text-gray-600">Browse hydraulic components catalog</p>
      </NuxtLink>

      <NuxtLink
        to="/perfumes"
        class="block border rounded-2xl p-6 hover:shadow"
      >
        <h2 class="font-medium text-lg mb-2">View Perfumes</h2>
        <p class="text-gray-600">Browse perfume inventory</p>
      </NuxtLink>

      <NuxtLink
        to="/bargain-box"
        class="block border rounded-2xl p-6 hover:shadow"
      >
        <h2 class="font-medium text-lg mb-2">View Bargain Box</h2>
        <p class="text-gray-600">Browse clearance and bargain items</p>
      </NuxtLink>
    </div>
  </main>
</template>
