<template>
  <div class="mb-6">
    <NuxtLink to="/" :class="buttonClasses"> ← All Catalogs </NuxtLink>
  </div>
</template>

<script setup lang="ts">
interface Props {
  variant?: "hydraulics" | "perfumes" | "bargain";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "hydraulics",
});

const buttonClasses = computed(() => {
  const baseClasses =
    "inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md";

  const variants = {
    hydraulics:
      "text-cyan-100 bg-gradient-to-r from-blue-900 to-indigo-800 hover:from-blue-800 hover:to-indigo-700 border border-blue-700",
    perfumes:
      "text-rose-900 bg-gradient-to-r from-pink-200 to-rose-100 hover:from-pink-300 hover:to-rose-200 border border-pink-300",
    bargain:
      "text-emerald-100 bg-gradient-to-r from-green-800 to-emerald-900 hover:from-green-700 hover:to-emerald-800 border border-green-600",
  };

  return `${baseClasses} ${variants[props.variant]}`;
});
</script>
