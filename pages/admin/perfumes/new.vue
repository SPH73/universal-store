<script setup lang="ts">
definePageMeta({
  middleware: "admin",
});

const form = ref({
  sku: "",
  name: "",
  brand: "",
  category: "Eau de Parfum",
  notes: "",
  volume: 100,
  condition: "New",
  qty: 0,
  sellingPrice: 0,
  supplier: "",
  arrivalDate: "",
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
    await $fetch("/api/perfumes", {
      method: "POST",
      body: form.value,
    });
    success.value = true;
    // Reset form
    form.value = {
      sku: "",
      name: "",
      brand: "",
      category: "Eau de Parfum",
      notes: "",
      volume: 100,
      condition: "New",
      qty: 0,
      sellingPrice: 0,
      supplier: "",
      arrivalDate: "",
      status: "In Stock",
    };
  } catch (err: any) {
    error.value = err?.data?.message || "Failed to create perfume";
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

    <h1 class="text-2xl font-semibold mb-6">Add New Perfume</h1>

    <form
      @submit.prevent="submitForm"
      class="bg-white rounded-2xl border p-6 space-y-4"
    >
      <div class="grid md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">SKU</label>
          <input
            v-model="form.sku"
            type="text"
            required
            class="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Product Name</label>
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Brand</label>
          <input
            v-model="form.brand"
            type="text"
            required
            class="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Category</label>
          <select
            v-model="form.category"
            class="w-full border rounded-lg px-3 py-2"
          >
            <option>Eau de Parfum</option>
            <option>Eau de Toilette</option>
            <option>Eau de Cologne</option>
            <option>Parfum</option>
          </select>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Fragrance Notes</label>
        <textarea
          v-model="form.notes"
          rows="3"
          placeholder="e.g. Bergamot|Jasmine|Sandalwood"
          class="w-full border rounded-lg px-3 py-2"
        ></textarea>
      </div>

      <div class="grid md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Volume (ml)</label>
          <input
            v-model.number="form.volume"
            type="number"
            min="0"
            class="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Condition</label>
          <select
            v-model="form.condition"
            class="w-full border rounded-lg px-3 py-2"
          >
            <option>New</option>
            <option>Tester</option>
            <option>Used</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Quantity</label>
          <input
            v-model.number="form.qty"
            type="number"
            min="0"
            class="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Selling Price</label>
          <input
            v-model.number="form.sellingPrice"
            type="number"
            step="0.01"
            min="0"
            class="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Supplier</label>
          <input
            v-model="form.supplier"
            type="text"
            class="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Arrival Date</label>
          <input
            v-model="form.arrivalDate"
            type="date"
            class="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Status</label>
          <select
            v-model="form.status"
            class="w-full border rounded-lg px-3 py-2"
          >
            <option>In Stock</option>
            <option>Out of Stock</option>
            <option>Discontinued</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {{ loading ? "Creating..." : "Create Perfume" }}
      </button>

      <div v-if="success" class="text-green-600 text-center">
        ✓ Perfume created successfully!
      </div>

      <div v-if="error" class="text-red-600 text-center">
        {{ error }}
      </div>
    </form>
  </main>
</template>
