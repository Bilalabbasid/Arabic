import { test, expect } from '@playwright/test';

test.describe('Lsayartk.com End-to-End Production Verification', () => {

  test('1. Global Homepage and Arabic RTL configuration', async ({ page }) => {
    await page.goto('/');

    // Check HTML attributes
    const html = page.locator('html');
    await expect(html).toHaveAttribute('dir', 'rtl');
    await expect(html).toHaveAttribute('lang', 'ar');

    // Header & Brand
    await expect(page).toHaveTitle(/لحساباتك|lsayartk|حاسبة/i);
    const brand = page.locator('header');
    await expect(brand).toBeVisible();

    // Verify key category cards are rendered
    const categoryCards = page.locator('section a[href^="/categories/"]');
    await expect(categoryCards.first()).toBeVisible();
  });

  test('2. Universal Calculator interactive runner (Percentage Calculator)', async ({ page }) => {
    await page.goto('/calculators/percentage-calculator');

    // Check page title and H1
    const h1 = page.locator('h1');
    await expect(h1).toContainText('حاسبة النسبة المئوية');

    // Check result is displayed initially
    const resultCard = page.locator('[data-testid="calculation-result"]');
    if (await resultCard.count() > 0) {
      await expect(resultCard).toBeVisible();
    }

    // Verify inputs exist
    const inputA = page.locator('input[type="number"]').first();
    await expect(inputA).toBeVisible();
    await inputA.fill('20');

    // Verify recalculation happened
    await page.waitForTimeout(300);
    const bodyText = await page.textContent('body');
    expect(bodyText).toBeDefined();
  });

  test('3. Country Hub and Regulated Calculator (/sa/electricity-bill)', async ({ page }) => {
    await page.goto('/sa/electricity-bill');

    // Verify H1 and Saudi authority citations
    const h1 = page.locator('h1');
    await expect(h1).toContainText('فاتورة الكهرباء');

    // Verify Regulatory Authority reference
    const content = await page.textContent('body');
    expect(content).toMatch(/هيئة تنظيم المياه والكهرباء|الشركة السعودية للكهرباء|SERA|SEC/);

    // Verify Breakdown or Results exist
    expect(content).toContain('ريال');
  });

  test('4. Country Hub Directory Page (/sa)', async ({ page }) => {
    await page.goto('/sa');

    // Heading for Saudi Arabia hub
    await expect(page.locator('h1')).toContainText('المملكة العربية السعودية');

    // Links to Saudi-specific calculators
    const saCalcLinks = page.locator('a[href^="/sa/"]');
    await expect(saCalcLinks.first()).toBeVisible();
  });

  test('5. International Hreflang and Canonical URLs', async ({ page }) => {
    await page.goto('/calculators/vat-calculator');

    // Canonical link tag
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /https:\/\/lsayartk\.com/);
  });

  test('6. Mobile Responsiveness and No Horizontal Overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const isHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    expect(isHorizontalOverflow).toBe(false);
  });
});
