<template>
  <div>
    <label v-if="label" class="block text-sm font-medium mb-1 text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string | number;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  type: "text",
});

defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>
