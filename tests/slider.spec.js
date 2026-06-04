import { test, expect } from "@playwright/test";
import { sel } from "./elements.js";

test.describe("Estrutura da página", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector(sel.sliderImg);
  });

  test("título da aba", async ({ page }) => {
    await expect(page).toHaveTitle("wallpaper slider · gcrepho");
  });

  test("nav brand contém gcrepho", async ({ page }) => {
    await expect(page.locator(sel.navBrand)).toContainText("gcrepho");
  });

  test("nav label", async ({ page }) => {
    await expect(page.locator(sel.navLabel)).toHaveText("wallpaper slider");
  });

  test("cursor piscando existe", async ({ page }) => {
    await expect(page.locator(sel.cursorBlink)).toHaveCount(1);
  });

  test("slider card existe", async ({ page }) => {
    await expect(page.locator(sel.sliderCard)).toBeVisible();
  });

  test("footer contém made 4 fun", async ({ page }) => {
    await expect(page.locator(sel.footer)).toContainText("made 4 fun");
  });

  test("dots indicadores existem", async ({ page }) => {
    const count = await page.locator(sel.dotBtn).count();
    expect(count).toBeGreaterThan(0);
  });

  test("exatamente 1 dot ativo no load", async ({ page }) => {
    await expect(page.locator(sel.dotActive)).toHaveCount(1);
  });

  test("imagem tem src não vazio", async ({ page }) => {
    const src = await page.locator(sel.sliderImg).getAttribute("src");
    expect(src).toBeTruthy();
  });

  test("imagem tem alt não vazio", async ({ page }) => {
    const alt = await page.locator(sel.sliderImg).getAttribute("alt");
    expect(alt).toBeTruthy();
  });

  test("overlay está visível sobre o card", async ({ page }) => {
    await expect(page.locator(sel.sliderOverlay)).toBeVisible();
  });

  test("contador exibe formato XX / YY", async ({ page }) => {
    await expect(page.locator(sel.sliderCounter)).toHaveText(/\d{2} \/ \d{2}/);
  });
});

test.describe("Navegação do slider", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector(sel.sliderImg);
  });

  test("ArrowRight avança o contador", async ({ page }) => {
    const before = await page.locator(sel.sliderCounter).textContent();
    await page.keyboard.press("ArrowRight");
    await expect(page.locator(sel.sliderCounter)).not.toHaveText(before);
  });

  test("ArrowRight e ArrowLeft retornam ao ponto de origem", async ({ page }) => {
    const origin = await page.locator(sel.sliderCounter).textContent();
    await page.keyboard.press("ArrowRight");
    await expect(page.locator(sel.sliderCounter)).not.toHaveText(origin);
    await page.locator(sel.sliderCard).click({ position: { x: 10, y: 10 } });
    await page.keyboard.press("ArrowLeft");
    await expect(page.locator(sel.sliderCounter)).toHaveText(origin);
  });

  test("wraparound prev: slide 01 → último", async ({ page }) => {
    await page.locator('[aria-label="Ir para imagem 1"]').first().click();
    await expect(page.locator(sel.sliderCounter)).toContainText("01 /");
    // Foca o card para garantir que o keydown vai ao window listener
    await page.locator(sel.sliderCard).click({ position: { x: 10, y: 10 } });
    await page.keyboard.press("ArrowLeft");
    await expect(page.locator(sel.sliderCounter)).not.toContainText("01 /");
    const counter = await page.locator(sel.sliderCounter).textContent();
    const [cur, total] = counter.trim().split("/").map((s) => s.trim());
    expect(cur).toBe(total);
  });

  test("wraparound next: último slide → 01", async ({ page }) => {
    const counter = await page.locator(sel.sliderCounter).textContent();
    const [, tot] = counter.trim().split("/").map((s) => s.trim());
    const lastLabel = `Ir para imagem ${tot}`;
    const lastDot = page.locator(`[aria-label="${lastLabel}"]`).first();
    if (await lastDot.count()) await lastDot.click();
    await expect(page.locator(sel.sliderCounter)).toContainText(`${tot} /`);
    await page.keyboard.press("ArrowRight");
    await expect(page.locator(sel.sliderCounter)).toContainText("01 /");
  });

  test("clicar em dot navega para o índice correto", async ({ page }) => {
    const dots = page.locator(sel.dotBtn);
    const count = await dots.count();
    const target = count > 3 ? 2 : 1;
    const targetLabel = await dots.nth(target).getAttribute("aria-label");
    await dots.nth(target).click();
    await expect(page.locator(sel.dotActive)).toHaveAttribute("aria-label", targetLabel);
  });

  test("contador e título atualizam juntos ao navegar", async ({ page }) => {
    const titleBefore = await page.locator(sel.sliderTitle).textContent();
    const counterBefore = await page.locator(sel.sliderCounter).textContent();
    await page.keyboard.press("ArrowRight");
    await expect(page.locator(sel.sliderTitle)).not.toHaveText(titleBefore);
    await expect(page.locator(sel.sliderCounter)).not.toHaveText(counterBefore);
  });
});
