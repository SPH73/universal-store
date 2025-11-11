export default defineNuxtConfig({
  compatibilityDate: "2025-11-09",
  typescript: { strict: true },

  nitro: {
    future: { nativeSWR: true },
    routeRules: {
      "/api/**": {
        headers: {
          "X-Frame-Options": "DENY",
          "X-Content-Type-Options": "nosniff",
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
      // "Cache-Control" is set via headers or response in routes/middleware
      "/api/components": { isr: 300 },
      "/api/perfumes": { isr: 300 },
      "/api/bargains": { isr: 300 },
    },
  },

  modules: ["@sentry/nuxt/module"],

  runtimeConfig: {
    sentry: {
      sourceMapsUploadOptions: {
        org: "design-develop-host",
        project: "javascript-nuxt",
      },
      autoInjectServerSentry: "top-level-import",
    },
    public: {
      sentry: {
        dsn: process.env.NUXT_PUBLIC_SENTRY_DSN,
      },
    },
  },

  sourcemap: {
    server: true,
    client: "hidden",
  },
});
