<script setup lang="ts">
const password = ref("");
const error = ref("");
const loading = ref(false);

const login = async () => {
  loading.value = true;
  error.value = "";
  try {
    await $fetch("/api/admin/login", {
      method: "POST",
      body: { password: password.value },
    });
    await navigateTo("/admin");
  } catch (err: any) {
    error.value = "Invalid password";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <main class="mx-auto max-w-md p-6 mt-16">
    <div class="bg-white rounded-2xl border p-8">
      <h1 class="text-2xl font-semibold mb-6 text-center">Admin Login</h1>

      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full border rounded-lg px-3 py-2"
            placeholder="Enter admin password"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {{ loading ? "Logging in..." : "Login" }}
        </button>

        <p v-if="error" class="text-red-600 text-sm text-center">{{ error }}</p>
      </form>
    </div>
  </main>
</template>
