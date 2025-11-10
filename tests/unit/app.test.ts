import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";

// Mock Nuxt composables
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

// Mock components
const MockNuxtLayout = {
  template: '<div class="mock-layout"><slot /></div>',
};

const MockNuxtPage = {
  template: '<div class="mock-page">Page Content</div>',
};

// Import the component to test
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
        components: {
          NuxtLayout: MockNuxtLayout,
          NuxtPage: MockNuxtPage,
        },
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
        components: {
          NuxtLayout: MockNuxtLayout,
          NuxtPage: MockNuxtPage,
        },
      },
    });

    expect(wrapper.findComponent({ name: "NuxtLayout" }).exists()).toBe(false); // Because it's mocked
    expect(wrapper.find(".mock-layout").exists()).toBe(true);
    expect(wrapper.find(".mock-page").exists()).toBe(true);
  });
});
