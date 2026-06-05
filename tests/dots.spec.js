import { test, expect } from "@playwright/test";
import { sel } from "./elements.js";

test.describe("Dots", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector(sel.sliderImg);
  });

  test("container de dots existe", async ({ page }) => {
    await expect(page.locator(sel.dots)).toHaveCount(1);
  });

  test("exatamente 1 dot tem classe active", async ({ page }) => {
    await expect(page.locator(sel.dotActive)).toHaveCount(1);
  });

  test("dot ativo muda ao navegar com ArrowRight", async ({ page }) => {
    const activeBefore = await page.locator(sel.dotActive).getAttribute("aria-label");
    await page.keyboard.press("ArrowRight");
    await expect(page.locator(sel.dotActive)).not.toHaveAttribute("aria-label", activeBefore);
  });

  test("dot ativo muda ao navegar com ArrowLeft", async ({ page }) => {
    await page.keyboard.press("ArrowRight");
    const activeBefore = await page.locator(sel.dotActive).getAttribute("aria-label");
    // Aguarda o dot ativo mudar antes de pressionar ArrowLeft,
    // garantindo que o lock da animação foi liberado
    await expect(page.locator(sel.dotActive)).not.toHaveAttribute("aria-label", activeBefore);
    const activeAfterRight = await page.locator(sel.dotActive).getAttribute("aria-label");
    await page.keyboard.press("ArrowLeft");
    await expect(page.locator(sel.dotActive)).not.toHaveAttribute("aria-label", activeAfterRight);
  });

  test("clicar em outro dot muda o dot ativo", async ({ page }) => {
    const dots = page.locator(sel.dotBtn);
    const count = await dots.count();
    const target = count > 2 ? 2 : 1;
    const targetLabel = await dots.nth(target).getAttribute("aria-label");
    await dots.nth(target).click();
    await expect(page.locator(sel.dotActive)).toHaveAttribute("aria-label", targetLabel);
  });

  test("clicar no dot já ativo não muda o contador", async ({ page }) => {
    const before = await page.locator(sel.sliderCounter).textContent();
    const activeLabel = await page.locator(sel.dotActive).getAttribute("aria-label");
    await page.locator(`[aria-label="${activeLabel}"]`).first().click();
    await expect(page.locator(sel.sliderCounter)).toHaveText(before);
  });

  test("todos os dots têm aria-label", async ({ page }) => {
    const dots = page.locator(sel.dotBtn);
    const count = await dots.count();
    for (let i = 0; i < count; i++) {
      await expect(dots.nth(i)).toHaveAttribute("aria-label", /Ir para imagem \d+/);
    }
  });
});
