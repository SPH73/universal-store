<template>
  <div>
    <label v-if="label" class="block text-sm font-medium mb-1 text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <select
      :value="modelValue"
      :required="required"
      :disabled="disabled"
      @change="
        $emit('update:modelValue', ($event.target as HTMLSelectElement).value)
      "
      class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
    >
      <option v-if="placeholder" value="" disabled>
        {{ placeholder }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
interface Option {
  label: string;
  value: string;
}

interface Props {
  modelValue?: string;
  label?: string;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

defineProps<Props>();

defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>
