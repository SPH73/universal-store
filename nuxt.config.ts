export default defineNuxtConfig({
  compatibilityDate: "2025-11-09",
  typescript: { strict: true },
  modules: ["@nuxtjs/tailwindcss"],
  tailwindcss: { viewer: false },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  runtimeConfig: {
    baserowBaseUrl: process.env.NUXT_BASEROW_BASE_URL,
    // Hydraulic Components (private)
    baserowTokenHydraulic: process.env.NUXT_BASEROW_TOKEN_HYDRAULIC,
    baserowTableIdHydraulic: process.env.NUXT_BASEROW_TABLE_ID_HYDRAULIC,
    // Perfume-specific (private)
    baserowTokenPerf: process.env.NUXT_BASEROW_TOKEN_PERF,
    baserowTableIdPerf: process.env.NUXT_BASEROW_TABLE_ID_PERF,
    // Bargain Box (private)
    baserowTokenBargain: process.env.NUXT_BASEROW_TOKEN_BARGAIN,
    baserowTableIdBargain: process.env.NUXT_BASEROW_TABLE_ID_BARGAIN,
    // Admin (private)
    adminPassword: process.env.NUXT_ADMIN_PASSWORD,
    public: {
      apiBase: "/api",
    },
  },
  routeRules: {
    "/api/components": { swr: 300 },
    "/api/perfumes": { swr: 300 },
    "/api/bargains": { swr: 300 },
  },
});
