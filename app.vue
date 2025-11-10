<script setup lang="ts">
import { useHead } from "#imports";
useHead({
  titleTemplate: (title) =>
    title ? `${title} · Universal Store` : "Universal Store",
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
