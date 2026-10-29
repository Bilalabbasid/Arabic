# GOOGLE 2026 SEARCH POLICIES — APPLICATION & SITE INVENTORY
**فهرس الجرد الشامل للبنية التحتية، المسارات، والحاسبات المنشورة**

**Platform:** `lsayartk.com`  
**Framework:** Next.js 15 (App Router, SSG)  
**Hosting:** Vercel (Edge Network)  
**Database:** None (Zero Database, In-Memory Regulatory Resolvers)  
**Language:** Arabic-first (RTL, BCP-47 `ar`)  
**Audit Reference Date:** October 2026

---

## 1. CALCULATOR INVENTORY

### Published & Functioning Calculators (8 Total)
| Slug | Arabic Name | Category | Country Mode | Jurisdictions / Coverage | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `car-fuel-cost` | حاسبة تكلفة الوقود واستهلاك البنزين | `cars-transportation` | `COUNTRY_CONFIGURABLE` | All 22 Arab Countries (Official tariffs in SA, AE, KW, QA, BH, OM, EG) | **PUBLISHED** |
| `vat-calculator` | حاسبة ضريبة القيمة المضافة (VAT) | `taxation` | `COUNTRY_CONFIGURABLE` | All 22 Arab Countries (15% SA, 5% AE/OM/BH, 14% EG) | **PUBLISHED** |
| `loan-calculator` | حاسبة القروض والتمويل والسيارات | `finance-investment` | `COUNTRY_CONFIGURABLE` | All 22 Arab Countries (SAMA, CBUAE, CBE banking formulas) | **PUBLISHED** |
| `end-of-service-reward` | حاسبة مكافأة نهاية الخدمة | `salary-employment` | `COUNTRY_REGULATED` | Saudi Arabia (Labor Law 84/85), UAE (Decree 33/2021), Egypt | **PUBLISHED** |
| `zakat-wealth` | حاسبة زكاة المال وعروض التجارة | `taxation` | `UNIVERSAL` | Universal Fiqh (AAOIFI Standard 35, 85g gold nisab) | **PUBLISHED** |
| `electricity-bill` | حاسبة فاتورة الكهرباء والشرائح | `energy-utilities` | `COUNTRY_REGULATED` | Saudi Arabia (SERA), UAE (DEWA), Egypt (EgyptERA) | **PUBLISHED** |
| `bmi-calculator` | حاسبة مؤشر كتلة الجسم والوزن المثالي | `health-fitness` | `UNIVERSAL` | Universal WHO Standards (BMI 18.5 - 24.9) | **PUBLISHED** |
| `percentage-calculator` | حاسبة النسبة المئوية الشاملة | `mathematics-percentages` | `UNIVERSAL` | Universal Mathematical Theorems (3 modes) | **PUBLISHED** |

### Planned Master Inventory (244 Calculators)
- Documented in `docs/calculators/master-inventory.md`.
- Unimplemented calculators are strictly prevented from generating empty, placeholder, or thin pages. They return 404 until fully coded, mathematically tested, and officially source-verified.

---

## 2. CATEGORIES INVENTORY (18 CATEGORIES)

1. `cars-transportation`: حاسبات السيارات وتكلفة التنقل والوقود
2. `finance-savings`: التمويل والاستثمار والادخار
3. `loans-installments`: القروض والأقساط والتمويل العقاري
4. `salary-employment`: الرواتب والموظفين ونهاية الخدمة
5. `taxation`: الضرائب والرسوم والزكاة
6. `energy-utilities`: الطاقة وفواتير الكهرباء والمياه
7. `shipping-customs`: الشحن والجمارك والتجارة
8. `ecommerce-marketing`: التجارة الإلكترونية والتسويق الرقمي
9. `business-accounting`: إدارة الأعمال والمحاسبة المالية
10. `construction-realestate`: العقارات والبناء والتشييد
11. `health-fitness`: الصحة واللياقة البدنية والسعرات
12. `mathematics-percentages`: الرياضيات والنسب المئوية
13. `family-personal`: الأسرة والميزانية الشخصية
14. `education-gpa`: التعليم والدرجات والمعدل التراكمي
15. `time-dates`: الوقت والتواريخ والتقويم
16. `agriculture-livestock`: الزراعة والمواشي والري
17. `travel-tourism`: السفر والسياحة وتكاليف الرحلات
18. `converters-units`: محولات الوحدات والقياسات الدولية

---

## 3. IN-DEPTH EDITORIAL GUIDES INVENTORY (8 ARTICLES)

Each guide contains over 400 words of authentic, expert Arabic explanations, legal analysis, worked steps, and calculations:
1. `/guides/how-to-calculate-car-fuel-cost`: دليل حساب استهلاك وقود السيارة وتكلفة السفر والمشاوير بدقة
2. `/guides/saudi-end-of-service-gratuity-guide`: الدليل الشامل لمكافأة نهاية الخدمة وفق المادتين 84 و 85 من نظام العمل السعودي
3. `/guides/ac-electricity-consumption-guide`: كيف تحسب استهلاك المكيف للكهرباء وتكلفة تشغيله شهرياً؟
4. `/guides/ac-sizing-guide`: كيف تختار حجم المكيف المناسب للغرفة (حساب أطنان التبريد و BTU)؟
5. `/guides/trip-fuel-cost-guide`: كيف تحسب تكلفة البنزين للرحلات والسفر البري بين المدن؟
6. `/guides/ecommerce-profit-calculation-guide`: طريقة حساب ربح المتجر الإلكتروني بعد الإعلانات وبوابات الدفع
7. `/guides/loan-installment-calculation-guide`: كيف تحسب القسط الشهري والفوائد البنكية (فائدة متناقصة مقابل ثابتة)؟
8. `/guides/vat-calculation-guide`: دليل حساب ضريبة القيمة المضافة 15% و 5% وطريقة استخراج أصل المبلغ

---

## 4. REGIONAL & COUNTRY PAGE ARCHITECTURE

### Arab Countries Configured (22 Countries)
- GCC: SA, AE, KW, QA, BH, OM
- Levant: JO, LB, SY, PS, IQ
- North Africa: EG, SD, LY, TN, DZ, MA, MR
- Horn of Africa & Comoros: YE, SO, DJ, KM

### Static Page Prerendering Breakdown (110 Total SSG Pages)
- **Static Core Utility Pages (10):**
  - `/` (الرئيسية العامة)
  - `/calculators/` (دليل كافة الحاسبات)
  - `/categories/` (دليل التصنيفات)
  - `/guides/` (دليل المقالات والأدلة الإرشادية)
  - `/methodology/` (المنهجية العلمية والتحقق الحسابي)
  - `/sources/` (المصادر والجهات الحكومية المعتمدة)
  - `/about/` (عن المنصة)
  - `/contact/` (اتصل بنا)
  - `/privacy/` (سياسة الخصوصية)
  - `/terms/` (شروط الاستخدام)
- **Category Pages (18):** `/categories/[slug]`
- **Universal & Global Calculator Pages (8):** `/calculators/[slug]`
- **Country Hub Pages (22):** `/[country]` (e.g. `/sa`, `/ae`, `/eg`, etc.)
- **Verified Country Calculator Pages (39):**
  - SA (5): `car-fuel-cost`, `vat-calculator`, `loan-calculator`, `end-of-service-reward`, `electricity-bill`
  - AE (5): `car-fuel-cost`, `vat-calculator`, `loan-calculator`, `end-of-service-reward`, `electricity-bill`
  - EG (5): `car-fuel-cost`, `vat-calculator`, `loan-calculator`, `end-of-service-reward`, `electricity-bill`
  - KW, QA, BH, OM, JO, MA, DZ, TN (3 each = 24): `car-fuel-cost`, `vat-calculator`, `loan-calculator`
- **Guides & Articles (8):** `/guides/[slug]`
- **Total Indexable SSG Static Pages:** **105 URLs in sitemap + 5 utility routes = 110 pages**.

---

## 5. TECHNICAL SEO & POLICY SAFETY ARCHITECTURE

1. **Robots.txt (`src/app/robots.ts`):**
   - User-agent `*` allowed on `/`.
   - Disallow `/api/`.
   - Explicit sitemap reference: `https://lsayartk.com/sitemap.xml`.
2. **Sitemap (`src/app/sitemap.ts`):**
   - Fully synchronized with static routes.
   - Contains 105 canonical URLs with valid priorities and daily/weekly change frequencies.
   - Strictly excludes any 404, unpublished, or unverified regulatory combinations.
3. **Canonicals & Hreflangs (`src/lib/seo/metadata.ts`):**
   - Universal calculators have self-referential canonicals at `/calculators/[slug]` with `x-default` and `ar` language tags.
   - Regional calculators have self-referential canonicals at `/[country]/[slug]` with reciprocal BCP-47 hreflang links (`ar-SA`, `ar-AE`, `ar-EG`, etc.) and `x-default` pointing to `/calculators/[slug]`.
4. **Structured Data:**
   - `WebApplication`: Operating system agnostic, free of charge, Arabic language tagged.
   - `BreadcrumbList`: Complete hierarchical breadcrumbs.
   - `FAQPage`: Rich snippet FAQ markup on all calculator pages.
5. **No Geo-Blocking of Crawlers:**
   - Zero IP redirection middleware.
   - Googlebot can crawl any country page regardless of crawler egress IP location.
