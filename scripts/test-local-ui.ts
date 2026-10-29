import { chromium } from 'playwright';

async function testLocalUI() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 375, height: 800 } });

  console.log('Testing localhost:3000 UI...');

  // 1. Mobile Menu test
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  const menuBtn = page.locator('button[aria-label="القائمة"]');
  await menuBtn.click();
  await page.waitForTimeout(200);
  const mobileNav = page.locator('header a[href^="/"]');
  console.log('Mobile nav links count:', await mobileNav.count());

  // 2. Search Modal test
  const searchBtn = page.locator('button[aria-label="البحث في الحاسبات"]').first();
  await searchBtn.click();
  await page.waitForTimeout(200);
  const searchInput = page.locator('input[placeholder*="ابحث"]');
  const isSearchVisible = await searchInput.isVisible();
  console.log('Search modal input visible:', isSearchVisible);

  if (isSearchVisible) {
    await searchInput.fill('بنزين');
    await page.waitForTimeout(300);
    const searchBody = await page.textContent('body');
    console.log('Search finds results:', searchBody?.includes('وقود') || searchBody?.includes('بنزين'));
    // Close search modal
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
  }

  // 3. Calculator Interactive test
  await page.goto('http://localhost:3000/calculators/car-fuel-cost', { waitUntil: 'networkidle' });
  const numInputs = page.locator('input[type="number"]');
  console.log('Calculator inputs count:', await numInputs.count());
  if ((await numInputs.count()) > 0) {
    await numInputs.first().fill('1000');
    await page.waitForTimeout(300);
    const bodyText = (await page.textContent('body')) || '';
    console.log('Calculation reactive update:', bodyText.includes('1,000') || bodyText.includes('1000'));
  }

  // 4. Country Selector on Localhost
  await page.goto('http://localhost:3000/sa/electricity-bill', { waitUntil: 'networkidle' });
  const pageText = (await page.textContent('body')) || '';
  console.log('Saudi electricity loads SERA rules:', pageText.includes('تنظيم المياه والكهرباء') || pageText.includes('SERA'));

  await browser.close();
  console.log('✅ Localhost UI tests completed successfully!');
}

testLocalUI().catch(err => {
  console.error('Error during local UI test:', err);
  process.exit(1);
});

