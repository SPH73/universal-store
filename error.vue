<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-50"
  >
    <div class="max-w-lg w-full mx-auto px-4 py-8 text-center">
      <h1 class="text-6xl font-bold text-gray-800 mb-4">
        {{ error?.statusCode || "500" }}
      </h1>

      <div class="text-xl text-gray-600 mb-8">
        {{ errorMessage }}
      </div>

      <button
        @click="handleError"
        class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        Try Again
      </button>

      <div class="mt-8">
        <NuxtLink to="/" class="text-blue-600 hover:text-blue-700 underline">
          Return Home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface NuxtError {
  statusCode?: number;
  statusMessage?: string;
  message?: string;
}

const props = defineProps<{
  error: NuxtError;
}>();

const errorMessage = computed(() => {
  if (props.error?.statusCode === 404) {
    return "Page not found";
  } else if (props.error?.statusCode === 429) {
    return "Too many requests - please try again later";
  } else if (props.error?.statusCode && props.error.statusCode >= 500) {
    return "Something went wrong on our end";
  } else {
    return (
      props.error?.statusMessage ||
      props.error?.message ||
      "An unexpected error occurred"
    );
  }
});

const handleError = () => clearError({ redirect: "/" });
</script>
