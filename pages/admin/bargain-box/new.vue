<script setup lang="ts">
definePageMeta({
  middleware: "admin",
});

const form = reactive({
  sku: "",
  name: "",
  category: "Clearance",
  description: "",
  originalPrice: 0,
  bargainPrice: 0,
  qty: 0,
  status: "In Stock",
  startsOn: "",
  endsOn: "",
  badges: "",
});
const pending = ref(false);
const ok = ref(false);
const err = ref("");

function parseBadges(s: string) {
  return s
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

async function submit() {
  pending.value = true;
  ok.value = false;
  err.value = "";
  try {
    await $fetch("/api/bargains", {
      method: "POST",
      body: { ...form, badges: parseBadges(form.badges) },
    });
    ok.value = true;
    // Reset form
    Object.assign(form, {
      sku: "",
      name: "",
      category: "Clearance",
      description: "",
      originalPrice: 0,
      bargainPrice: 0,
      qty: 0,
      status: "In Stock",
      startsOn: "",
      endsOn: "",
      badges: "",
    });
  } catch (e: any) {
    err.value = "Failed to save";
  } finally {
    pending.value = false;
  }
}
</script>

<template>
  <main class="mx-auto max-w-3xl p-6 space-y-4">
    <div class="mb-4">
      <NuxtLink to="/admin" class="text-blue-600 hover:text-blue-800"
        >← Back to Admin</NuxtLink
      >
    </div>

    <h1 class="text-xl font-semibold">New Bargain Item</h1>

    <div class="bg-white rounded-2xl border p-6">
      <div class="grid md:grid-cols-2 gap-4">
        <input
          v-model="form.sku"
          placeholder="SKU"
          required
          class="border rounded-lg px-3 py-2"
        />
        <input
          v-model="form.name"
          placeholder="Product Name"
          required
          class="border rounded-lg px-3 py-2"
        />
        <input
          v-model="form.category"
          placeholder="Category"
          class="border rounded-lg px-3 py-2"
        />
        <input
          v-model.number="form.originalPrice"
          type="number"
          step="0.01"
          placeholder="Original Price"
          class="border rounded-lg px-3 py-2"
        />
        <input
          v-model.number="form.bargainPrice"
          type="number"
          step="0.01"
          placeholder="Bargain Price"
          required
          class="border rounded-lg px-3 py-2"
        />
        <input
          v-model.number="form.qty"
          type="number"
          placeholder="Quantity"
          class="border rounded-lg px-3 py-2"
        />
        <select v-model="form.status" class="border rounded-lg px-3 py-2">
          <option>In Stock</option>
          <option>Low Stock</option>
          <option>Sold Out</option>
        </select>
        <input
          v-model="form.startsOn"
          type="date"
          placeholder="Starts On"
          class="border rounded-lg px-3 py-2"
        />
        <input
          v-model="form.endsOn"
          type="date"
          placeholder="Ends On"
          class="border rounded-lg px-3 py-2"
        />
        <input
          v-model="form.badges"
          placeholder="Badges (comma‑separated)"
          class="border rounded-lg px-3 py-2"
        />
        <textarea
          v-model="form.description"
          placeholder="Description"
          rows="3"
          class="border rounded-lg px-3 py-2 md:col-span-2"
        ></textarea>
      </div>

      <button
        :disabled="pending"
        class="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        @click="submit"
      >
        {{ pending ? "Saving…" : "Save Bargain Item" }}
      </button>

      <p v-if="ok" class="text-green-600 text-sm mt-2 text-center">
        ✓ Bargain item saved successfully!
      </p>
      <p v-if="err" class="text-red-600 text-sm mt-2 text-center">{{ err }}</p>
    </div>
  </main>
</template>
