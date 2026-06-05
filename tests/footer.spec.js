import { test, expect } from "@playwright/test";
import { sel } from "./elements.js";

test.describe("Footer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector(sel.sliderImg);
  });

  test("footer existe e está visível", async ({ page }) => {
    await expect(page.locator(sel.footer)).toBeVisible();
  });

  test("footer contém 'made 4 fun'", async ({ page }) => {
    await expect(page.locator(sel.footer)).toContainText("made 4 fun");
  });

  test("footer tem elemento de coração", async ({ page }) => {
    await expect(page.locator(sel.footerHeart)).toHaveCount(1);
  });

  test("footer vem depois do slider no DOM", async ({ page }) => {
    const sliderBox = await page.locator(sel.sliderSection).boundingBox();
    const footerBox = await page.locator(sel.footer).boundingBox();
    expect(footerBox.y).toBeGreaterThan(sliderBox.y);
  });
});
