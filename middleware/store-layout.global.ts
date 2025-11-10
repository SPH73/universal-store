export default defineNuxtRouteMiddleware((to) => {
  // force a specific layout by path prefix
  if (
    to.path.startsWith("/inventory") ||
    to.path.startsWith("/admin/inventory")
  ) {
    setPageLayout("hydraulics");
  } else if (
    to.path.startsWith("/perfumes") ||
    to.path.startsWith("/admin/perfumes")
  ) {
    setPageLayout("perfumes");
  } else if (
    to.path.startsWith("/bargain-box") ||
    to.path.startsWith("/admin/bargain-box")
  ) {
    setPageLayout("bargain");
  } else {
    setPageLayout("default");
  }
});
