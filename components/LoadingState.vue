<template>
  <div class="text-center py-8">
    <div class="inline-flex items-center gap-3">
      <div
        class="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"
      ></div>
      <span class="text-gray-600">{{ message }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message?: string;
}

withDefaults(defineProps<Props>(), {
  message: "Loading...",
});
</script>
