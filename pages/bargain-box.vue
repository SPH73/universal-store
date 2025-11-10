<script setup lang="ts">
const route = useRoute();
const q = ref<string>((route.query.q as string) || "");
const category = ref<string>((route.query.category as string) || "");
const badge = ref<string>((route.query.badge as string) || "");
const page = ref<number>(Number(route.query.page || 1));

const { data, pending, error, refresh } = await useFetch("/api/bargains", {
  query: { q, category, badge, page },
});
watch([q, category, badge, page], () => refresh(), { deep: true });

useHead({
  title: "🏷️ Bargain Box",
});
</script>

<template>
  <main class="mx-auto max-w-6xl p-6 space-y-6">
    <h1 class="text-2xl font-semibold mb-6 text-green-600">🏷️ Bargain Box</h1>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
      <div class="relative">
        <Icon
          name="search"
          class="absolute left-3 top-2.5 text-gray-400"
          :size="18"
        />
        <input
          v-model="q"
          placeholder="Search name or SKU"
          class="pl-10 border rounded-lg px-3 py-2 w-full"
        />
      </div>
      <input
        v-model="category"
        placeholder="Category"
        class="border rounded-lg px-3 py-2 bg-white text-gray-900"
      />
      <input
        v-model="badge"
        placeholder="Badge (e.g., Last Units)"
        class="border rounded-lg px-3 py-2 bg-white text-gray-900"
      />
      <div class="flex items-center justify-end">
        <button
          class="border rounded-lg px-3 py-2 bg-white text-gray-900"
          @click="page = 1"
        >
          Search
        </button>
      </div>
    </div>

    <LoadingState v-if="pending" message="Loading bargains…" />
    <ErrorState v-else-if="error" />

    <section v-else class="text-gray-900">
      <EmptyState
        v-if="!data || !('items' in data) || !data.items?.length"
        title="No bargains found"
        message="Check back soon for new deals and clearance items."
      />
      <ul v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <li v-for="item in data.items" :key="item.id">
          <article class="border rounded-2xl p-4 flex gap-4 bg-white">
            <img
              v-if="item.photos?.[0] && (item.photos[0] as any)?.url"
              :src="(item.photos[0] as any).url"
              alt=""
              class="w-24 h-24 object-cover rounded-lg"
            />
            <div class="min-w-0">
              <h3 class="font-medium truncate">{{ item.name }}</h3>
              <p
                class="text-sm text-gray-600 truncate inline-flex items-center gap-1"
              >
                <Icon name="discount" :size="16" class="text-green-600" />
                SKU: {{ item.sku }} · {{ item.category }}
              </p>
              <div class="mt-2 flex gap-3 text-sm">
                <span
                  class="line-through text-gray-500"
                  v-if="item.originalPrice"
                  >R {{ item.originalPrice }}</span
                >
                <span class="font-semibold">R {{ item.bargainPrice }}</span>
                <span
                  v-if="item.discountPct"
                  class="text-green-700 inline-flex items-center gap-1"
                >
                  <Icon name="lightning" :size="14" />
                  -{{ Math.round(item.discountPct) }}%
                </span>
              </div>
              <p
                class="text-sm text-gray-600 inline-flex items-center gap-1"
                v-if="item.badges && Array.isArray(item.badges) && (item.badges as any[]).length"
              >
                <Icon name="bundle" :size="16" class="text-gray-500" />
                Badges: {{ (item.badges as any[]).join(", ") }}
              </p>
              <p
                class="text-xs text-gray-500 inline-flex items-center gap-1"
                v-if="item.startsOn || item.endsOn"
              >
                <Icon name="timer" :size="14" class="text-gray-400" />
                Valid {{ item.startsOn ? `from ${item.startsOn}` : "" }}
                {{ item.endsOn ? `to ${item.endsOn}` : "" }}
              </p>
            </div>
          </article>
        </li>
      </ul>

      <Pagination v-model:page="page" />
    </section>
  </main>
</template>
