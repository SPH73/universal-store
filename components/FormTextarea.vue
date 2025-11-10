<template>
  <div>
    <label v-if="label" class="block text-sm font-medium mb-1 text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :rows="rows"
      :disabled="disabled"
      @input="
        $emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)
      "
      class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  rows: 3,
});

defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>
