<template>
  <NuxtLink
    :to="to"
    class="block border rounded-2xl p-6 hover:shadow-md transition-shadow duration-200 bg-white hover:bg-gray-50"
  >
    <h2 class="font-semibold text-lg mb-2">{{ title }}</h2>
    <p class="text-sm text-gray-600 leading-relaxed">{{ description }}</p>
    <div v-if="meta" class="mt-3 text-xs text-gray-500">
      {{ meta }}
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  description: string;
  to: string;
  meta?: string;
}

defineProps<Props>();
</script>
