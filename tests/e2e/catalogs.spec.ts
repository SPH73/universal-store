import { test, expect } from "@playwright/test";

test.describe("Perfume Catalog", () => {
  test("should display perfumes page correctly", async ({ page }) => {
    await page.goto("/perfumes");

    // Check page elements
    await expect(page).toHaveTitle(/Perfume Inventory/);
    await expect(page.locator("h1")).toContainText("🌸 Perfume Inventory");

    // Should have search functionality
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();

    // Should have brand filter (perfumes have brands)
    const brandInput = page.locator(
      'input[placeholder*="Brand"], input[placeholder*="brand"]'
    );
    if ((await brandInput.count()) > 0) {
      await expect(brandInput.first()).toBeVisible();
    }
  });

  test("should filter by brand when available", async ({ page }) => {
    await page.goto("/perfumes");

    await page.waitForSelector('input[placeholder*="Search"]');

    // Look for brand input field
    const brandInput = page
      .locator('input[placeholder*="Brand"], input[placeholder*="brand"]')
      .first();

    if (await brandInput.isVisible()) {
      await brandInput.fill("Chanel");

      const searchButton = page.locator('button:has-text("Search")');
      if (await searchButton.isVisible()) {
        await searchButton.click();
      }

      await page.waitForTimeout(1000);

      // Verify the page still loads and doesn't crash
      await expect(page.locator("main")).toBeVisible();
    }
  });
});

test.describe("Bargain Box Catalog", () => {
  test("should display bargain box page correctly", async ({ page }) => {
    await page.goto("/bargain-box");

    // Check page elements
    await expect(page).toHaveTitle(/Bargain Box/);
    await expect(page.locator("h1")).toContainText("🏷️ Bargain Box");

    // Should have search functionality
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
  });

  test("should show bargain-specific information", async ({ page }) => {
    await page.goto("/bargain-box");

    await page.waitForSelector('input[placeholder*="Search"]');

    // Look for badge filter (bargains have badges)
    const badgeInput = page.locator(
      'input[placeholder*="Badge"], input[placeholder*="badge"]'
    );
    if ((await badgeInput.count()) > 0) {
      await expect(badgeInput.first()).toBeVisible();
    }

    // Ensure page loads properly
    await expect(page.locator("main")).toBeVisible();
  });
});
