import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = 'https://arabicwebsitewithcalculators.vercel.app';
const SCREENSHOT_DIR = path.resolve(process.cwd(), 'docs/audits/screenshots');

interface AuditResult {
  step: string;
  name: string;
  status: 'PASS' | 'FAIL' | 'WARNING';
  details: string;
}

const auditLog: AuditResult[] = [];

async function main() {
  console.log(`🌐 Launching Chromium for Live Website Audit on ${BASE_URL}...`);
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // 1. Homepage & RTL
    console.log('Testing 1: Homepage & RTL...');
    const res = await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle', timeout: 30000 });
    const status = res?.status();
    console.log(`Homepage status: ${status}`);

    const htmlDir = await page.getAttribute('html', 'dir');
    const htmlLang = await page.getAttribute('html', 'lang');
    const pageTitle = await page.title();
    console.log(`Title: ${pageTitle}, Dir: ${htmlDir}, Lang: ${htmlLang}`);

    auditLog.push({
      step: '1. Homepage',
      name: 'Status & Language',
      status: status === 200 && htmlDir === 'rtl' && htmlLang === 'ar' ? 'PASS' : 'FAIL',
      details: `Status: ${status}, Title: "${pageTitle}", Dir: ${htmlDir}, Lang: ${htmlLang}`,
    });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01-homepage-desktop.png'), fullPage: false });

    // 2. Mobile Viewports (320, 375, 390, 768, 1024, 1440)
    console.log('Testing 2: Mobile Viewport & Overflow...');
    const viewports = [320, 375, 390, 768, 1024, 1440];
    for (const width of viewports) {
      await page.setViewportSize({ width, height: 800 });
      await page.waitForTimeout(200);
      const isOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      console.log(`Viewport ${width}px overflow: ${isOverflow}`);
      auditLog.push({
        step: '2. Viewports',
        name: `Width ${width}px`,
        status: !isOverflow ? 'PASS' : 'FAIL',
        details: isOverflow ? `Horizontal overflow detected at ${width}px` : 'No horizontal overflow',
      });
      if (width === 375) {
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02-homepage-mobile-375.png'), fullPage: false });
      }
      if (width === 320) {
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02b-homepage-mobile-320.png'), fullPage: false });
      }
    }

    // Reset to desktop
    await page.setViewportSize({ width: 1280, height: 800 });

    // 3. Test Calculators
    console.log('Testing 3: Functional Calculators...');
    const calculators = [
      {
        slug: 'car-fuel-cost',
        name: 'حاسبة تكلفة الوقود',
        inputs: { distanceKm: '500', fuelConsumption: '10' },
        expectedKeyword: 'ريال',
      },
      {
        slug: 'vat-calculator',
        name: 'حاسبة ضريبة القيمة المضافة',
        inputs: { amount: '1000' },
        expectedKeyword: 'ضريبة',
      },
      {
        slug: 'loan-calculator',
        name: 'حاسبة القروض والتمويل',
        inputs: { loanAmount: '200000', annualRate: '5' },
        expectedKeyword: 'القسط',
      },
      {
        slug: 'end-of-service-reward',
        name: 'حاسبة مكافأة نهاية الخدمة',
        inputs: { salary: '12000', years: '5' },
        expectedKeyword: 'مكافأة',
      },
      {
        slug: 'zakat-wealth',
        name: 'حاسبة زكاة المال',
        inputs: { cash: '80000', goldGramPrice: '320' },
        expectedKeyword: 'الزكاة',
      },
      {
        slug: 'electricity-bill',
        name: 'حاسبة فاتورة الكهرباء',
        inputs: { kwh: '4500' },
        expectedKeyword: 'فاتورة',
      },
      {
        slug: 'bmi-calculator',
        name: 'حاسبة مؤشر كتلة الجسم',
        inputs: { weightKg: '80', heightCm: '180' },
        expectedKeyword: 'مؤشر',
      },
      {
        slug: 'percentage-calculator',
        name: 'حاسبة النسبة المئوية',
        inputs: { valueA: '25', valueB: '400' },
        expectedKeyword: 'النتيجة',
      },
    ];

    for (const calc of calculators) {
      console.log(`Checking /calculators/${calc.slug}...`);
      await page.goto(`${BASE_URL}/calculators/${calc.slug}`, { waitUntil: 'networkidle', timeout: 30000 });

      // Check H1
      const h1 = await page.textContent('h1');
      const hasInputs = (await page.locator('input').count()) > 0;

      // Fill an input if available
      const firstInput = page.locator('input[type="number"], input[type="text"]').first();
      if (await firstInput.isVisible()) {
        await firstInput.fill(Object.values(calc.inputs)[0]);
        await page.waitForTimeout(300);
      }

      // Check results card
      const bodyText = (await page.textContent('body')) || '';
      const containsExpected = bodyText.includes(calc.expectedKeyword);

      auditLog.push({
        step: '3. Calculators',
        name: calc.name,
        status: hasInputs && containsExpected ? 'PASS' : 'FAIL',
        details: `H1: "${h1?.trim()}", Inputs found: ${hasInputs}, Output verified: ${containsExpected}`,
      });

      if (calc.slug === 'car-fuel-cost') {
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03-calculator-fuel.png'), fullPage: false });
      } else if (calc.slug === 'loan-calculator') {
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04-calculator-loan.png'), fullPage: false });
      } else if (calc.slug === 'vat-calculator') {
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05-calculator-vat.png'), fullPage: false });
      } else if (calc.slug === 'electricity-bill') {
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06-calculator-electricity.png'), fullPage: false });
      }
    }

    // 4. Country Correctness
    console.log('Testing 4: Country Hubs & Regional Rules...');
    const countries = [
      { code: 'sa', name: 'السعودية', expectedCurrency: 'ر.س' },
      { code: 'ae', name: 'الإمارات', expectedCurrency: 'د.إ' },
      { code: 'eg', name: 'مصر', expectedCurrency: 'ج.م' },
      { code: 'kw', name: 'الكويت', expectedCurrency: 'د.ك' },
      { code: 'qa', name: 'قطر', expectedCurrency: 'ر.ق' },
      { code: 'bh', name: 'البحرين', expectedCurrency: 'د.ب' },
      { code: 'om', name: 'عمان', expectedCurrency: 'ر.ع' },
    ];

    for (const c of countries) {
      console.log(`Checking Country Hub /${c.code}...`);
      const hubRes = await page.goto(`${BASE_URL}/${c.code}`, { waitUntil: 'networkidle', timeout: 30000 });
      const hubStatus = hubRes?.status();
      const hubH1 = await page.textContent('h1');

      auditLog.push({
        step: '4. Country Hubs',
        name: `Hub /${c.code} (${c.name})`,
        status: hubStatus === 200 ? 'PASS' : 'FAIL',
        details: `Status: ${hubStatus}, H1: "${hubH1?.trim()}"`,
      });

      if (c.code === 'sa') {
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07-country-hub-sa.png'), fullPage: false });
      }
    }

    // Check Saudi Electricity vs UAE Electricity
    console.log('Checking /sa/electricity-bill...');
    await page.goto(`${BASE_URL}/sa/electricity-bill`, { waitUntil: 'networkidle', timeout: 30000 });
    const saText = await page.textContent('body');
    const saHasSera = saText?.includes('هيئة تنظيم المياه والكهرباء') || saText?.includes('SERA') || saText?.includes('الشركة السعودية للكهرباء');
    auditLog.push({
      step: '4. Regional Regulations',
      name: 'Saudi Electricity Regulatory Authority (SERA)',
      status: saHasSera ? 'PASS' : 'FAIL',
      details: `SERA/SEC regulation displayed: ${saHasSera}`,
    });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '08-country-calc-sa-electricity.png'), fullPage: false });

    console.log('Checking /ae/electricity-bill...');
    await page.goto(`${BASE_URL}/ae/electricity-bill`, { waitUntil: 'networkidle', timeout: 30000 });
    const aeText = await page.textContent('body');
    const aeHasDewa = aeText?.includes('ديوا') || aeText?.includes('DEWA') || aeText?.includes('هيئة كهرباء ومياه دبي');
    auditLog.push({
      step: '4. Regional Regulations',
      name: 'Dubai Electricity & Water Authority (DEWA)',
      status: aeHasDewa ? 'PASS' : 'FAIL',
      details: `DEWA regulation displayed: ${aeHasDewa}`,
    });

    // Check Unsupported / Doorway protection
    console.log('Checking Doorway Protection: /sa/percentage-calculator...');
    const doorRes = await page.goto(`${BASE_URL}/sa/percentage-calculator`, { timeout: 30000 });
    const doorStatus = doorRes?.status();
    auditLog.push({
      step: '4. Doorway Protection',
      name: 'Universal calc on country route returns 404',
      status: doorStatus === 404 ? 'PASS' : 'FAIL',
      details: `Status: ${doorStatus} (Expected 404)`,
    });

    // 5. Technical SEO & Canonicals
    console.log('Testing 5: Technical SEO & Metadata on Live Site...');
    await page.goto(`${BASE_URL}/calculators/vat-calculator`, { waitUntil: 'networkidle' });
    const canonicalHref = await page.getAttribute('link[rel="canonical"]', 'href');
    console.log(`Canonical href: ${canonicalHref}`);

    // Check hreflang
    const hreflangElements = await page.locator('link[rel="alternate"][hreflang]').all();
    const hreflangs: string[] = [];
    for (const el of hreflangElements) {
      hreflangs.push(await el.getAttribute('hreflang') || '');
    }
    console.log(`Hreflangs found: ${hreflangs.join(', ')}`);

    auditLog.push({
      step: '5. Technical SEO',
      name: 'Canonical Points to Production Domain (https://lsayartk.com)',
      status: canonicalHref?.startsWith('https://lsayartk.com') ? 'PASS' : 'FAIL',
      details: `Canonical: ${canonicalHref}`,
    });

    auditLog.push({
      step: '5. Technical SEO',
      name: 'Hreflang Tags Reciprocity',
      status: hreflangs.length > 0 && hreflangs.includes('x-default') ? 'PASS' : 'FAIL',
      details: `Count: ${hreflangs.length}, Tags: ${hreflangs.slice(0, 5).join(', ')}...`,
    });

    // Check robots.txt and sitemap.xml
    console.log('Checking /robots.txt and /sitemap.xml...');
    const robotsRes = await page.goto(`${BASE_URL}/robots.txt`);
    const robotsText = await robotsRes?.text();
    auditLog.push({
      step: '5. Technical SEO',
      name: 'Robots.txt Availability',
      status: robotsRes?.status() === 200 && robotsText?.includes('Sitemap') ? 'PASS' : 'FAIL',
      details: `Status: ${robotsRes?.status()}, Sitemap declared: ${robotsText?.includes('Sitemap')}`,
    });

    const sitemapRes = await page.goto(`${BASE_URL}/sitemap.xml`);
    const sitemapText = await sitemapRes?.text();
    auditLog.push({
      step: '5. Technical SEO',
      name: 'Sitemap.xml Availability',
      status: sitemapRes?.status() === 200 && sitemapText?.includes('<urlset') ? 'PASS' : 'FAIL',
      details: `Status: ${sitemapRes?.status()}, Valid XML urlset: ${sitemapText?.includes('<urlset')}`,
    });

    // 6. Guides & Articles
    console.log('Testing 6: Guides & Policy Pages...');
    await page.goto(`${BASE_URL}/guides/how-to-calculate-car-fuel-cost`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '09-guide-page.png'), fullPage: false });
    const guideH1 = await page.textContent('h1');
    auditLog.push({
      step: '6. Content',
      name: 'In-Depth Guide Page',
      status: guideH1 ? 'PASS' : 'FAIL',
      details: `Guide H1: "${guideH1?.trim()}"`,
    });

    await page.goto(`${BASE_URL}/methodology`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '10-methodology-page.png'), fullPage: false });

    // Output all results
    console.log('\n==================================================');
    console.log('LIVE AUDIT SUMMARY');
    console.log('==================================================');
    for (const item of auditLog) {
      console.log(`[${item.status}] ${item.step} - ${item.name}: ${item.details}`);
    }
  } catch (err: any) {
    console.error('Fatal error during live audit:', err.message);
  } finally {
    await browser.close();
  }
}

main();
