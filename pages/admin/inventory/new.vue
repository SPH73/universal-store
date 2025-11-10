<script setup lang="ts">
definePageMeta({
  middleware: "admin",
});

const form = ref({
  sku: "",
  name: "",
  oemPartNumber: "",
  category: "",
  specs: "",
  condition: "New",
  qty: 0,
  targetPrice: 0,
  storageLocation: "",
  supplier: "",
  purchaseDate: "",
  status: "In Stock",
});

const success = ref(false);
const error = ref("");
const loading = ref(false);

const submitForm = async () => {
  loading.value = true;
  error.value = "";
  success.value = false;

  try {
    await $fetch("/api/components", {
      method: "POST",
      body: form.value,
    });
    success.value = true;
    // Reset form
    form.value = {
      sku: "",
      name: "",
      oemPartNumber: "",
      category: "",
      specs: "",
      condition: "New",
      qty: 0,
      targetPrice: 0,
      storageLocation: "",
      supplier: "",
      purchaseDate: "",
      status: "In Stock",
    };
  } catch (err: any) {
    error.value = err?.data?.message || "Failed to create component";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <main class="mx-auto max-w-2xl p-6">
    <div class="mb-4">
      <NuxtLink to="/admin" class="text-blue-600 hover:text-blue-800"
        >← Back to Admin</NuxtLink
      >
    </div>

    <h1 class="text-2xl font-semibold mb-6">Add New Hydraulic Component</h1>

    <form
      @submit.prevent="submitForm"
      class="bg-white rounded-2xl border p-6 space-y-4"
    >
      <div class="grid md:grid-cols-2 gap-4">
        <FormInput v-model="form.sku" label="SKU" required />
        <FormInput v-model="form.name" label="Part Name" required />
      </div>

      <div class="grid md:grid-cols-2 gap-4">
        <FormInput v-model="form.oemPartNumber" label="OEM P/N" />
        <FormInput v-model="form.category" label="Category" />
      </div>

      <FormTextarea v-model="form.specs" label="Specifications" :rows="3" />

      <div class="grid md:grid-cols-3 gap-4">
        <FormSelect
          v-model="form.condition"
          label="Condition"
          :options="[
            { label: 'New', value: 'New' },
            { label: 'Used', value: 'Used' },
            { label: 'Refurbished', value: 'Refurbished' },
          ]"
        />
        <FormInput
          v-model.number="form.qty"
          label="Quantity"
          type="number"
          min="0"
        />
        <FormInput
          v-model.number="form.targetPrice"
          label="Target Price"
          type="number"
          step="0.01"
          min="0"
        />
      </div>

      <div class="grid md:grid-cols-2 gap-4">
        <FormInput v-model="form.storageLocation" label="Storage Location" />
        <FormInput v-model="form.supplier" label="Supplier" />
      </div>

      <div class="grid md:grid-cols-2 gap-4">
        <FormInput
          v-model="form.purchaseDate"
          label="Purchase Date"
          type="date"
        />
        <FormSelect
          v-model="form.status"
          label="Status"
          :options="[
            { label: 'In Stock', value: 'In Stock' },
            { label: 'Out of Stock', value: 'Out of Stock' },
            { label: 'Discontinued', value: 'Discontinued' },
          ]"
        />
      </div>

      <SubmitButton
        text="Create Component"
        loading-text="Creating..."
        :loading="loading"
        type="submit"
      />

      <div v-if="success" class="text-green-600 text-center font-medium">
        ✓ Component created successfully!
      </div>

      <ErrorState v-if="error" :message="error" />
    </form>
  </main>
</template>
