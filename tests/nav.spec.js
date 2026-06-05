import { test, expect } from "@playwright/test";
import { sel } from "./elements.js";

test.describe("Nav", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector(sel.sliderImg);
  });

  test("nav existe e está visível", async ({ page }) => {
    await expect(page.locator(sel.navBrand)).toBeVisible();
  });

  test("nav brand contém gcrepho", async ({ page }) => {
    await expect(page.locator(sel.navBrand)).toContainText("gcrepho");
  });

  test("nav brand tem ponto decorativo", async ({ page }) => {
    await expect(page.locator(sel.navBrandDot)).toHaveCount(1);
  });

  test("nav label tem texto 'wallpaper slider'", async ({ page }) => {
    await expect(page.locator(sel.navLabel)).toHaveText("wallpaper slider");
  });

  test("cursor piscante existe", async ({ page }) => {
    await expect(page.locator(sel.cursorBlink)).toHaveCount(1);
  });

  test("nav permanece visível após scroll", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 500));
    await expect(page.locator(sel.navBrand)).toBeVisible();
  });

  test("nav tem posição sticky", async ({ page }) => {
    const position = await page
      .locator(".nav")
      .evaluate((el) => window.getComputedStyle(el).position);
    expect(position).toBe("sticky");
  });
});
