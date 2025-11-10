<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
  meta?: string;
  metaIcon?: string;
  price?: string | number;
  qty?: number;
  status?: string;
  img?: string;
}>();
</script>

<template>
  <article class="border rounded-2xl p-4 flex gap-4 bg-white">
    <img
      v-if="img"
      :src="img"
      alt=""
      class="w-24 h-24 object-cover rounded-lg"
    />
    <div class="min-w-0">
      <h3 class="font-medium truncate">{{ title }}</h3>
      <p v-if="subtitle" class="text-sm text-gray-600 truncate">
        {{ subtitle }}
      </p>
      <p
        v-if="meta"
        class="text-sm text-gray-600 truncate inline-flex items-center gap-1"
      >
        <Icon :name="metaIcon ?? 'status'" :size="16" class="text-gray-500" />
        {{ meta }}
      </p>
      <div class="mt-2 flex flex-wrap items-center gap-3 text-sm">
        <span v-if="typeof price !== 'undefined'" class="font-semibold"
          >R {{ price }}</span
        >
        <span
          v-if="typeof qty !== 'undefined'"
          class="text-gray-600 inline-flex items-center gap-1"
        >
          <Icon name="status" :size="16" class="text-gray-500" /> Qty: {{ qty }}
        </span>
        <span
          v-if="status"
          class="text-gray-600 inline-flex items-center gap-1"
        >
          <Icon name="status" :size="16" class="text-gray-500" /> Status:
          {{ status }}
        </span>
      </div>
    </div>
  </article>
</template>
