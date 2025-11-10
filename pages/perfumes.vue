<script setup lang="ts">
const route = useRoute();
const q = ref<string>((route.query.q as string) || "");
const category = ref<string>((route.query.category as string) || "");
const brand = ref<string>((route.query.brand as string) || "");
const page = ref<number>(Number(route.query.page || 1));

const { data, pending, error, refresh } = await useFetch("/api/perfumes", {
  query: { q, category, brand, page },
});

watch([q, category, brand, page], () => refresh(), { deep: true });
</script>

<template>
  <main class="mx-auto max-w-6xl p-6 space-y-6">
    <h1 class="text-2xl font-semibold mb-6">Perfume Inventory</h1>

    <SearchBar
      v-model:q="q"
      v-model:category="category"
      v-model:brand="brand"
      :show-brand="true"
    >
      <template #actions>
        <button class="border rounded-lg px-3 py-2" @click="page = 1">
          Search
        </button>
      </template>
    </SearchBar>

    <LoadingState v-if="pending" message="Loading perfumes…" />
    <ErrorState v-else-if="error" />

    <section v-else>
      <EmptyState
        v-if="!data?.items?.length"
        title="No perfumes found"
        message="Try adjusting your search or filter criteria."
      />
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProductCard
          v-for="item in data.items"
          :key="item.id"
          :title="item.name"
          :subtitle="`Brand: ${item.brand} · SKU: ${item.sku}`"
          :meta="`Category: ${item.category} · Volume: ${item.volume} ml`"
          meta-icon="notes"
          :price="item.sellingPrice"
          :qty="item.qty"
          :status="item.status"
          :img="item.photos?.[0]?.url"
        />
      </div>

      <Pagination v-model:page="page" />
    </section>
  </main>
</template>
