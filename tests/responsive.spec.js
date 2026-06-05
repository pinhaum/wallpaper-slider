import { test, expect } from "@playwright/test";
import { sel } from "./elements.js";

test.describe("Responsividade — desktop", () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector(sel.sliderImg);
  });

  test("botões mobile estão ocultos no desktop", async ({ page }) => {
    const display = await page
      .locator(sel.ctrlBtnMobile)
      .first()
      .evaluate((el) => window.getComputedStyle(el).display);
    expect(display).toBe("none");
  });

  test("nav label está visível no desktop", async ({ page }) => {
    await expect(page.locator(sel.navLabel)).toBeVisible();
  });
});

test.describe("Responsividade — mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector(sel.sliderImg);
  });

  test("botões mobile estão visíveis no mobile", async ({ page }) => {
    const buttons = page.locator(sel.ctrlBtnMobile);
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const display = await buttons
        .nth(i)
        .evaluate((el) => window.getComputedStyle(el).display);
      expect(display).not.toBe("none");
    }
  });

  test("nav label está oculta no mobile", async ({ page }) => {
    const display = await page
      .locator(sel.navLabel)
      .evaluate((el) => window.getComputedStyle(el).display);
    expect(display).toBe("none");
  });

  test("slider card está visível no mobile", async ({ page }) => {
    await expect(page.locator(sel.sliderCard)).toBeVisible();
  });
});
