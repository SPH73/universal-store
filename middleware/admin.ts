export default defineNuxtRouteMiddleware(async () => {
  try {
    const { ok } = await $fetch("/api/admin/session", {
      credentials: "include",
    });
    if (!ok) return navigateTo("/admin/login");
  } catch {
    return navigateTo("/admin/login");
  }
});
