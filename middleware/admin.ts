export default defineNuxtRouteMiddleware(async () => {
  try {
    const { isAdmin } = await $fetch("/api/admin/session", {
      credentials: "include",
    });
    if (!isAdmin) return navigateTo("/admin/login");
  } catch {
    return navigateTo("/admin/login");
  }
});
