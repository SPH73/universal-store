import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "#imports": fileURLToPath(
        new URL("./tests/shims/nuxt-imports.ts", import.meta.url)
      ),
    },
  },
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/unit/**/*.test.ts", "tests/unit/**/*.spec.ts"],
    exclude: ["tests/e2e/**", "node_modules/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "coverage/**",
        "dist/**",
        "**/*.d.ts",
        "cypress/**",
        "tests/e2e/**",
        "playwright.config.ts",
        ".nuxt/**",
        "server/api/**/*.get.ts",
        "server/api/**/*.post.ts",
      ],
      thresholds: {
        global: { branches: 80, functions: 80, lines: 80, statements: 80 },
      },
    },
  },
});
