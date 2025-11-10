<script setup lang="ts">
const route = useRoute();
const q = ref<string>((route.query.q as string) || "");
const category = ref<string>((route.query.category as string) || "");
const page = ref<number>(Number(route.query.page || 1));

const { data, pending, error, refresh } = await useFetch("/api/components", {
  query: { q, category, page },
});

watch([q, category, page], () => refresh(), { deep: true });
</script>

<template>
  <main class="mx-auto max-w-6xl p-6 space-y-6">
    <h1 class="text-2xl font-semibold mb-6">Hydraulic Components</h1>

    <SearchBar v-model:q="q" v-model:category="category" :show-brand="false">
      <template #actions>
        <button class="border rounded-lg px-3 py-2" @click="page = 1">
          Search
        </button>
      </template>
    </SearchBar>

    <LoadingState v-if="pending" message="Loading inventory…" />
    <ErrorState v-else-if="error" />

    <section v-else>
      <EmptyState
        v-if="!data?.items?.length"
        title="No items found"
        message="Try adjusting your search or filter criteria."
      />
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProductCard
          v-for="item in data.items"
          :key="item.id"
          :title="item.name"
          :subtitle="`SKU: ${item.sku} · OEM: ${item.oemPartNumber}`"
          :meta="`Category: ${item.category}`"
          meta-icon="cylinder"
          :price="item.targetPrice"
          :qty="item.qty"
          :status="item.status"
          :img="item.photos?.[0]?.url"
        />
      </div>

      <Pagination v-model:page="page" />
    </section>
  </main>
</template>
