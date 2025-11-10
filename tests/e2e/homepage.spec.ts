import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load homepage and show store options", async ({ page }) => {
    await page.goto("/");

    // Check if the page loads
    await expect(page).toHaveTitle(/Universal Store/);

    // Should show navigation or store selection
    // Note: Update these selectors based on your actual homepage content
    await expect(page.locator("body")).toBeVisible();
  });

  test("should navigate to different store catalogs", async ({ page }) => {
    await page.goto("/");

    // Test navigation to different stores
    // These routes should exist based on your pages structure
    const stores = [
      { path: "/inventory", name: "Hydraulic Components" },
      { path: "/perfumes", name: "Perfume Inventory" },
      { path: "/bargain-box", name: "Bargain Box" },
    ];

    for (const store of stores) {
      await page.goto(store.path);

      // Should load the store page
      await expect(page.locator("h1")).toContainText(store.name);

      // Should have search functionality
      await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
    }
  });
});
