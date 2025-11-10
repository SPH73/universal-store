<script setup lang="ts">
const page = defineModel<number>("page", { default: 1 });
defineProps<{ hasNext?: boolean }>();
</script>

<template>
  <footer class="flex items-center justify-end gap-2 mt-4">
    <button
      class="border rounded-lg px-3 py-1 inline-flex items-center gap-1"
      @click="page = Math.max(1, page - 1)"
    >
      <Icon name="prev" :size="16" />
      Prev
    </button>
    <span>Page {{ page }}</span>
    <button
      class="border rounded-lg px-3 py-1 inline-flex items-center gap-1"
      @click="page = page + 1"
    >
      Next
      <Icon name="next" :size="16" />
    </button>
  </footer>
</template>
