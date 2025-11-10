<script setup lang="ts">
import { useHead } from "#imports";
useHead({
  titleTemplate: (title) =>
    title ? `${title} · Universal Store` : "Universal Store",
  htmlAttrs: {
    lang: "en",
  },
  meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      name: "description",
      content:
        "Multi-store online marketplace for hydraulic components, perfumes, and bargain items",
    },
    { name: "format-detection", content: "telephone=no" },
    { name: "msapplication-TileColor", content: "#3b82f6" },
    { name: "theme-color", content: "#3b82f6" },
  ],
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
