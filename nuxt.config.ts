export default defineNuxtConfig({
  compatibilityDate: "2025-11-09",
  typescript: { strict: true },
  modules: [
    "@nuxtjs/tailwindcss",
    ...(process.env.NUXT_SENTRY_DSN ? ["@sentry/nuxt/module"] : []),
  ],
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
    // Sentry (private - optional)
    sentryDsn: process.env.NUXT_SENTRY_DSN,
    public: {
      apiBase: "/api",
    },
  },

  nitro: {
    routeRules: {
      "/api/**": {
        headers: {
          "X-Frame-Options": "DENY",
          "X-Content-Type-Options": "nosniff",
          "X-XSS-Protection": "1; mode=block",
          "Referrer-Policy": "strict-origin-when-cross-origin",
          "Permissions-Policy":
            "camera=(), microphone=(), payment=(), geolocation=()",
          "Cache-Control": "public, max-age=300, s-maxage=300",
        },
      },
      "/api/health": {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      },
    },
  },

  routeRules: {
    "/api/components": { swr: 300 },
    "/api/perfumes": { swr: 300 },
    "/api/bargains": { swr: 300 },
  },
});
