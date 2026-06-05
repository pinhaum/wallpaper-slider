import { test, expect } from "@playwright/test";
import { sel } from "./elements.js";

test.describe("Acessibilidade", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector(sel.sliderImg);
  });

  test("botão prev tem aria-label 'Anterior'", async ({ page }) => {
    await expect(page.locator('[aria-label="Anterior"]').first()).toBeAttached();
  });

  test("botão next tem aria-label 'Próximo'", async ({ page }) => {
    await expect(page.locator('[aria-label="Próximo"]').first()).toBeAttached();
  });

  test("imagem tem atributo alt não vazio", async ({ page }) => {
    const alt = await page.locator(sel.sliderImg).getAttribute("alt");
    expect(alt).toBeTruthy();
    expect(alt.length).toBeGreaterThan(0);
  });

  test("todos os dots têm aria-label", async ({ page }) => {
    const dots = page.locator(sel.dotBtn);
    const count = await dots.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const label = await dots.nth(i).getAttribute("aria-label");
      expect(label).toBeTruthy();
    }
  });

  test("todos os botões interativos têm label acessível", async ({ page }) => {
    const buttons = page.locator("button");
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      const btn = buttons.nth(i);
      const ariaLabel = await btn.getAttribute("aria-label");
      const text = await btn.textContent();
      expect(ariaLabel || text.trim()).toBeTruthy();
    }
  });
});
