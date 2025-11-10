# Testing Guide - Universal Store

## 🧪 Testing Stack

This project uses a comprehensive testing setup:

- **Vitest** - Unit and component testing
- **Playwright** - End-to-end testing
- **MSW** - API mocking for tests
- **@vue/test-utils** - Vue component testing utilities
- **happy-dom** - Lightweight DOM environment for tests

## 🚀 Quick Start

```bash
# Run all tests
npm run test:all

# Unit tests (with watch mode)
npm run test

# Unit tests with UI
npm run test:ui

# Coverage report
npm run test:coverage

# E2E tests
npm run test:e2e

# E2E tests with UI
npm run test:e2e:ui
```

## 📁 Test Structure

```text
tests/
├── setup.ts           # Global test setup (MSW)
├── mocks/
│   ├── server.ts      # MSW server setup
│   └── handlers.ts    # API mock handlers
├── unit/
│   ├── app.test.ts    # Component tests
│   ├── api.test.ts    # API logic tests
│   └── validators.test.ts  # Validation tests
└── e2e/
    ├── homepage.spec.ts     # Homepage E2E tests
    ├── inventory.spec.ts    # Inventory catalog tests
    └── catalogs.spec.ts     # All catalog tests
```

## 🎯 Coverage Targets

- **80%** minimum coverage for branches, functions, lines, and statements
- Core utilities and validators require high coverage
- API handlers are excluded from coverage (integration tested)

## 🔧 Configuration Files

- `vitest.config.ts` - Vitest configuration with Nuxt integration
- `playwright.config.ts` - Playwright E2E test configuration
- `tests/setup.ts` - Global test setup with MSW
- `.github/workflows/ci.yml` - CI pipeline with all tests

## 🏗️ CI Pipeline

GitHub Actions automatically runs:

1. **Type checking** (`npm run typecheck`)
2. **Unit tests with coverage** (`npm run test:coverage`)
3. **E2E tests** (`npm run test:e2e`)
4. **Build verification** (`npm run build`)

## 🎭 Mock API Data

MSW provides realistic mock data for testing:

- **Hydraulic Components** - Pumps, cylinders, etc.
- **Perfumes** - Brands, categories, pricing
- **Bargain Items** - Clearance deals, badges, discounts
- **Admin Authentication** - Session management

## 📝 Writing Tests

### Unit Tests (Vitest)

```typescript
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

describe("MyComponent", () => {
  it("should render correctly", () => {
    const wrapper = mount(MyComponent);
    expect(wrapper.text()).toContain("Expected text");
  });
});
```

### E2E Tests (Playwright)

```typescript
import { test, expect } from "@playwright/test";

test("should load page correctly", async ({ page }) => {
  await page.goto("/inventory");
  await expect(page.locator("h1")).toContainText("Hydraulic Components");
});
```

## 🔍 Best Practices

1. **Test user flows** - Focus on what users actually do
2. **Mock external APIs** - Use MSW for consistent test data
3. **Test error states** - Ensure graceful error handling
4. **Maintain coverage** - Keep above 80% threshold
5. **Fast feedback** - Unit tests should run quickly

## 🐛 Debugging Tests

```bash
# Run tests in debug mode
npm run test -- --inspect-brk

# Run specific test file
npm run test -- tests/unit/validators.test.ts

# Run E2E tests with browser UI
npm run test:e2e:ui

# Generate and view coverage report
npm run test:coverage && open coverage/index.html
```

## 📊 Reports

- **Coverage Report**: `coverage/index.html`
- **Playwright Report**: `playwright-report/index.html`
- **CI Artifacts**: Available in GitHub Actions

This testing setup ensures high-quality, reliable code with comprehensive coverage across unit, integration, and end-to-end scenarios.
