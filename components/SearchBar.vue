<script setup lang="ts">
const modelValue = defineModel<string>("q");
const brand = defineModel<string>("brand");
const category = defineModel<string>("category");
defineProps<{ showBrand?: boolean }>();
</script>

<template>
  <div :class="`grid grid-cols-1 md:grid-cols-${showBrand ? 4 : 3} gap-3`">
    <div class="relative">
      <Icon
        name="search"
        class="absolute left-3 top-2.5 text-gray-400"
        :size="18"
      />
      <input
        v-model="modelValue"
        placeholder="Search…"
        class="pl-10 border rounded-lg px-3 py-2 w-full"
      />
    </div>
    <input
      v-if="showBrand"
      v-model="brand"
      placeholder="Brand"
      class="border rounded-lg px-3 py-2"
    />
    <input
      v-model="category"
      placeholder="Category"
      class="border rounded-lg px-3 py-2"
    />
    <div class="flex items-center justify-end">
      <slot name="actions">
        <button class="border rounded-lg px-3 py-2">Search</button>
      </slot>
    </div>
  </div>
</template>
