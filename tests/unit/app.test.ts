import { describe, it, expect, vi } from "vitest";

// Stub Nuxt auto-imports so Vitest can parse app.vue
vi.mock("#imports", () => ({ useHead: () => void 0 }));

import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";

// Optional Nuxt runtime stubs (safe)
vi.mock("#app", () => ({
  useHead: vi.fn(),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    currentRoute: { value: { path: "/" } },
  }),
  useFetch: vi.fn(() => ({
    data: { value: null },
    pending: { value: false },
    error: { value: null },
    refresh: vi.fn(),
  })),
  navigateTo: vi.fn(),
}));

const MockNuxtLayout = { template: '<div class="mock-layout"><slot /></div>' };
const MockNuxtPage = { template: '<div class="mock-page">Page Content</div>' };

import AppVue from "../../app.vue";

describe("App.vue", () => {
  it("renders without crashing", () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: "/", component: { template: "<div>Home</div>" } }],
    });

    const wrapper = mount(AppVue, {
      global: {
        plugins: [router],
        components: { NuxtLayout: MockNuxtLayout, NuxtPage: MockNuxtPage },
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(".mock-layout").exists()).toBe(true);
  });

  it("contains NuxtLayout and NuxtPage components", () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: "/", component: { template: "<div>Home</div>" } }],
    });

    const wrapper = mount(AppVue, {
      global: {
        plugins: [router],
        components: { NuxtLayout: MockNuxtLayout, NuxtPage: MockNuxtPage },
      },
    });

    expect(wrapper.findAll(".mock-layout").length).toBe(1);
    expect(wrapper.findAll(".mock-page").length).toBe(1);
  });
});
