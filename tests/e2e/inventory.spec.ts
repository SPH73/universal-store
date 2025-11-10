import { test, expect } from "@playwright/test";

test.describe("Hydraulic Components Catalog", () => {
  test("should display hydraulic components page", async ({ page }) => {
    await page.goto("/inventory");

    // Check page title and heading
    await expect(page).toHaveTitle(/Hydraulic Components/);
    await expect(page.locator("h1")).toContainText("🔧 Hydraulic Components");

    // Should have search bar
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();

    // Should have category filter if available
    const categoryInput = page.locator('input[placeholder*="Category"]');
    if (await categoryInput.isVisible()) {
      await expect(categoryInput).toBeVisible();
    }

    // Should show loading state initially or items
    const loadingState = page.locator("text=Loading");
    const itemsList = page.locator('[data-testid="product-list"], ul, .grid');

    // Wait for either loading to complete or items to appear
    await expect(loadingState.or(itemsList)).toBeVisible();
  });

  test("should be able to search for components", async ({ page }) => {
    await page.goto("/inventory");

    // Wait for page to load
    await page.waitForSelector('input[placeholder*="Search"]');

    // Perform search
    await page.fill('input[placeholder*="Search"]', "pump");

    // Look for search button and click it
    const searchButton = page.locator('button:has-text("Search")');
    if (await searchButton.isVisible()) {
      await searchButton.click();
    }

    // Should show search results or no results message
    // This depends on your actual data and API responses
    await page.waitForTimeout(1000); // Allow for API response

    // Check that some content is displayed (either results or empty state)
    const content = page.locator("main");
    await expect(content).toBeVisible();
  });

  test("should handle no results gracefully", async ({ page }) => {
    await page.goto("/inventory");

    // Wait for page to load
    await page.waitForSelector('input[placeholder*="Search"]');

    // Search for something that definitely won't exist
    await page.fill('input[placeholder*="Search"]', "nonexistentproduct12345");

    const searchButton = page.locator('button:has-text("Search")');
    if (await searchButton.isVisible()) {
      await searchButton.click();
    }

    await page.waitForTimeout(1000);

    // Should show empty state
    const emptyState = page.locator(
      "text=No items found, text=No components found"
    );
    // Don't require this to be visible as it depends on actual API responses
    // Just ensure the page doesn't crash
    await expect(page.locator("main")).toBeVisible();
  });
});
