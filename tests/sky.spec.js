import { test, expect } from "@playwright/test";
import { sel } from "./elements.js";

test.describe("Sky / Background", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector(sel.sliderImg);
  });

  test(".sky existe no DOM", async ({ page }) => {
    await expect(page.locator(sel.sky)).toHaveCount(1);
  });

  test(".sky-stars existe no DOM", async ({ page }) => {
    await expect(page.locator(sel.skyStars)).toHaveCount(1);
  });

  test(".aurora-fog existe no DOM", async ({ page }) => {
    await expect(page.locator(sel.auroraFog)).toHaveCount(1);
  });

  test("elementos de fundo não bloqueiam interação com o slider", async ({ page }) => {
    await expect(page.locator(sel.sliderCard)).toBeVisible();
    await page.keyboard.press("ArrowRight");
    await expect(page.locator(sel.sliderCounter)).not.toHaveText("");
  });
});
