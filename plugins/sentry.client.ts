import * as Sentry from "@sentry/vue";

export default defineNuxtPlugin(() => {
  if (process.env.NUXT_SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.NUXT_SENTRY_DSN,
      environment: process.env.NODE_ENV || "development",
      tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
      beforeSend(event) {
        if (event.request?.url?.includes("/api/health")) return null;
        return event;
      },
    });
  }
});
