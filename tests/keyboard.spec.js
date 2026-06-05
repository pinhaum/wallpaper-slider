import { test, expect } from "@playwright/test";
import { sel } from "./elements.js";

test.describe("Teclado", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector(sel.sliderImg);
  });

  test("ArrowRight avança para o próximo slide", async ({ page }) => {
    const before = await page.locator(sel.sliderCounter).textContent();
    await page.keyboard.press("ArrowRight");
    await expect(page.locator(sel.sliderCounter)).not.toHaveText(before);
  });

  test("ArrowLeft volta para o slide anterior", async ({ page }) => {
    await page.keyboard.press("ArrowRight");
    const afterNext = await page.locator(sel.sliderCounter).textContent();
    await page.keyboard.press("ArrowLeft");
    await expect(page.locator(sel.sliderCounter)).not.toHaveText(afterNext);
  });

  test("ArrowLeft na 1ª imagem vai para a última (wraparound)", async ({ page }) => {
    const firstDot = page.locator('[aria-label="Ir para imagem 1"]').first();
    if (await firstDot.count()) {
      await firstDot.click();
    }
    await expect(page.locator(sel.sliderCounter)).toContainText("01 /");
    await page.locator(sel.sliderCard).click({ position: { x: 10, y: 10 } });
    await page.keyboard.press("ArrowLeft");
    await expect(page.locator(sel.sliderCounter)).not.toContainText("01 /");
    const counter = await page.locator(sel.sliderCounter).textContent();
    const [cur, total] = counter.trim().split("/").map((s) => s.trim());
    expect(cur).toBe(total);
  });

  test("ArrowRight na última imagem vai para a 1ª (wraparound)", async ({ page }) => {
    const counter = await page.locator(sel.sliderCounter).textContent();
    const [, tot] = counter.trim().split("/").map((s) => s.trim());
    const lastDot = page.locator(`[aria-label="Ir para imagem ${tot}"]`).first();
    if (await lastDot.count()) {
      await lastDot.click();
    }
    await expect(page.locator(sel.sliderCounter)).toContainText(`${tot} /`);
    await page.locator(sel.sliderCard).click({ position: { x: 10, y: 10 } });
    await page.keyboard.press("ArrowRight");
    await expect(page.locator(sel.sliderCounter)).toContainText("01 /");
  });

  test("teclas durante animação não saltam dois slides (lock)", async ({ page }) => {
    const before = await page.locator(sel.sliderCounter).textContent();
    const [startCur] = before.trim().split("/").map((s) => s.trim());
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(400);
    const finalCounter = await page.locator(sel.sliderCounter).textContent();
    const [finalCur] = finalCounter.trim().split("/").map((s) => s.trim());
    expect(parseInt(finalCur)).toBeLessThanOrEqual(parseInt(startCur) + 1);
  });
});
