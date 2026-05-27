import { test, expect } from '@playwright/test';
import { sel, CTRL } from './elements.js';

const waitSlide = (page) => page.waitForTimeout(250);

test.describe('Estrutura da página', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector(sel.sliderImg);
  });

  test('título da aba', async ({ page }) => {
    await expect(page).toHaveTitle('wallpaper slider · gcrepho');
  });

  test('nav brand contém gcrepho', async ({ page }) => {
    await expect(page.locator(sel.navBrand)).toContainText('gcrepho');
  });

  test('nav label', async ({ page }) => {
    await expect(page.locator(sel.navLabel)).toHaveText('wallpaper slider');
  });

  test('cursor piscando existe', async ({ page }) => {
    await expect(page.locator(sel.cursorBlink)).toHaveCount(1);
  });

  test('slider card existe', async ({ page }) => {
    await expect(page.locator(sel.sliderCard)).toBeVisible();
  });

  test('footer contém made 4 fun', async ({ page }) => {
    await expect(page.locator(sel.footer)).toContainText('made 4 fun');
  });

  test('6 dots indicadores', async ({ page }) => {
    await expect(page.locator(sel.dotBtn)).toHaveCount(6);
  });

  test('primeiro dot ativo no load', async ({ page }) => {
    await expect(page.locator(sel.dotBtn).nth(0)).toHaveClass(/active/);
  });
});

test.describe('Navegação do slider', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector(sel.sliderImg);
  });

  test('slide inicial é Zebes', async ({ page }) => {
    await expect(page.locator(sel.sliderTitle)).toHaveText('Zebes');
    await expect(page.locator(sel.sliderCounter)).toHaveText('01 / 06');
  });

  test('botão next avança para Aurora', async ({ page }) => {
    await page.locator(sel.ctrlBtn).nth(CTRL.NEXT).click();
    await waitSlide(page);
    await expect(page.locator(sel.sliderTitle)).toHaveText('Aurora');
    await expect(page.locator(sel.sliderCounter)).toHaveText('02 / 06');
  });

  test('botão prev volta para Zebes', async ({ page }) => {
    await page.locator(sel.ctrlBtn).nth(CTRL.NEXT).click();
    await waitSlide(page);
    await page.locator(sel.ctrlBtn).nth(CTRL.PREV).click();
    await waitSlide(page);
    await expect(page.locator(sel.sliderTitle)).toHaveText('Zebes');
    await expect(page.locator(sel.sliderCounter)).toHaveText('01 / 06');
  });

  test('wraparound prev: Zebes → Crateria', async ({ page }) => {
    await page.locator(sel.ctrlBtn).nth(CTRL.PREV).click();
    await waitSlide(page);
    await expect(page.locator(sel.sliderTitle)).toHaveText('Crateria');
    await expect(page.locator(sel.sliderCounter)).toHaveText('06 / 06');
  });

  test('wraparound next: Crateria → Zebes', async ({ page }) => {
    await page.locator(sel.dotBtn).nth(5).click();
    await waitSlide(page);
    await page.locator(sel.ctrlBtn).nth(CTRL.NEXT).click();
    await waitSlide(page);
    await expect(page.locator(sel.sliderTitle)).toHaveText('Zebes');
    await expect(page.locator(sel.sliderCounter)).toHaveText('01 / 06');
  });

  test('dot click navega para Celeste', async ({ page }) => {
    await page.locator(sel.dotBtn).nth(3).click();
    await waitSlide(page);
    await expect(page.locator(sel.sliderTitle)).toHaveText('Celeste');
    await expect(page.locator(sel.sliderCounter)).toHaveText('04 / 06');
    await expect(page.locator(sel.dotBtn).nth(3)).toHaveClass(/active/);
    await expect(page.locator(sel.dotBtn).nth(0)).not.toHaveClass(/active/);
  });

  test('teclado ArrowRight avança para Aurora', async ({ page }) => {
    await page.keyboard.press('ArrowRight');
    await waitSlide(page);
    await expect(page.locator(sel.sliderTitle)).toHaveText('Aurora');
  });

  test('teclado ArrowLeft volta para Zebes', async ({ page }) => {
    await page.keyboard.press('ArrowRight');
    await waitSlide(page);
    await page.keyboard.press('ArrowLeft');
    await waitSlide(page);
    await expect(page.locator(sel.sliderTitle)).toHaveText('Zebes');
  });

  test('teclado wraparound: ArrowLeft em Zebes → Crateria', async ({ page }) => {
    await page.keyboard.press('ArrowLeft');
    await waitSlide(page);
    await expect(page.locator(sel.sliderTitle)).toHaveText('Crateria');
  });
});
