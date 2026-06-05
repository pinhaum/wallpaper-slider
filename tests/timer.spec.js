import { test, expect } from "@playwright/test";
import { sel, AUTO_ADVANCE_MS, FADE_HALF_MS } from "./elements.js";

test.describe("Timer de auto-advance", () => {
  test("slider-timer-bar existe e está visível", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector(sel.sliderImg);
    await expect(page.locator(sel.sliderTimerBar)).toBeVisible();
  });

  test("timer-bar tem --auto-ms definido como 30000ms", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector(sel.sliderImg);
    const autoMs = await page.locator(sel.sliderTimerBar).evaluate((el) =>
      el.style.getPropertyValue("--auto-ms")
    );
    expect(autoMs.trim()).toBe(`${AUTO_ADVANCE_MS + FADE_HALF_MS}ms`);
  });

  test("auto-advance muda o slide após 30s (fake clock)", async ({ page }) => {
    await page.clock.install();
    await page.goto("/");
    await page.waitForSelector(sel.sliderImg);
    const before = await page.locator(sel.sliderCounter).textContent();
    await page.clock.fastForward(AUTO_ADVANCE_MS + FADE_HALF_MS);
    await expect(page.locator(sel.sliderCounter)).not.toHaveText(before);
  });

  test("timer reinicia ao navegar manualmente", async ({ page }) => {
    await page.clock.install();
    await page.goto("/");
    await page.waitForSelector(sel.sliderImg);
    // Navega manualmente e aguarda a animação terminar completamente
    await page.keyboard.press("ArrowRight");
    await page.clock.fastForward(400); // 2 × FADE_HALF (150ms each) + margem
    const afterNav = await page.locator(sel.sliderCounter).textContent();
    // Avança bem menos que 30s — não deve trocar
    await page.clock.fastForward(28_000);
    await expect(page.locator(sel.sliderCounter)).toHaveText(afterNav);
    // Avança além dos 30s — agora deve trocar
    await page.clock.fastForward(3_000);
    await expect(page.locator(sel.sliderCounter)).not.toHaveText(afterNav);
  });
});
