<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="$emit('click')"
  >
    <div v-if="loading" class="inline-flex items-center gap-2">
      <div
        class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"
      ></div>
      {{ loadingText }}
    </div>
    <span v-else>{{ text }}</span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  text: string;
  loadingText?: string;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  loadingText: "Loading...",
  variant: "primary",
  size: "md",
  type: "button",
  fullWidth: true,
});

defineEmits<{
  click: [];
}>();

const buttonClasses = computed(() => {
  const baseClasses =
    "font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  const width = props.fullWidth ? "w-full" : "";

  return `${baseClasses} ${variants[props.variant]} ${
    sizes[props.size]
  } ${width}`;
});
</script>
