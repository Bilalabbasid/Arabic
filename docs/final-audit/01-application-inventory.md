# المرحلة 1: جرد وتوثيق مكونات التطبيق الشامل
**Phase 1: Complete Application Discovery & Codebase Inventory**

- **المشروع:** منصة لِسيارتك للحاسبات العربية (`https://lsayartk.com`)
- **تاريخ الجرد والتدقيق:** 29 أكتوبر 2026
- **فريق التدقيق:** فريق الهندسة والبرمجيات والجودة والسيو الدولي

---

## 1. البنية التقنية وإصدارات الحزم (Framework & Runtime Stack)

| المكون التقني | الإصدار المعتمد | الملاحظات والامتثال |
|---|---|---|
| **إطار العمل (Framework)** | Next.js 15.2.1 (Runtime: 15.5.28) | App Router مع توليد استاتيكي مسبق بالكامل (Static Site Generation). |
| **مكتبة الواجهة (UI)** | React 19.0.0 & React-DOM 19.0.0 | React Server Components (RSC) لسرعة التحميل، مع عملاء تفاعليين للحاسبات. |
| **لغة البرمجة (Language)** | TypeScript 5.7.3 | الوضع الصارم (`strict: true`) لضمان سلامة الأنواع ومنع أخطاء runtime. |
| **مكتبة التصميم (CSS)** | Tailwind CSS 3.4.17 + PostCSS 8.5.3 | دعم كامل لاتجاه RTL مع فئات التباعد البصري (`ms-`, `me-`). |
| **الأيقونات (Icons)** | Lucide-React 1.16.0 | أيقونات SVG خفيفة متوافقة مع إمكانية الوصول. |
| **التحقق من البيانات (Schema)**| Zod 3.24.2 | حزم تحقق قوية للمدخلات. |
| **إطار الاختبارات (Testing)** | Vitest 3.0.7 + @playwright/test 1.50.1 | فحص الوحدات والانحدار وفحص التفاعل الحقيقي عبر المتصفح. |
| **بيئة الاستضافة (Hosting)** | Vercel Edge CDN | متوافق 100% مع البناء الاستاتيكي والخوادم الطرفية. |
| **قواعد البيانات (Database)** | **غير مستخدمة نهائياً (NO DATABASE)** | **صفر قواعد بيانات** (لا وجود لـ PostgreSQL, MongoDB, Redis, Prisma). |

---

## 2. جدول الإحصائيات العددية المدققة للتطبيق (Actual Quantitative Inventory)

| العنصر | العدد الفعلي المسجل | الملاحظات والبيانات التفصيلية |
|---|:---:|---|
| **الحاسبات المخططة في المخزون العام (Master Inventory)** | **244** حاسبة | موثقة في `docs/calculators/master-inventory.md` ومصنفة عبر 18 قطاعاً. |
| **الحاسبات المنفذة في المحركات البرمجية** | **8** حاسبات | محركات حسابية منفذة ومختبرة في `src/lib/calculators/`. |
| **الحاسبات المنشورة في الموقع العام (Published)** | **8** حاسبات | منشورة بكافة ميتاداتا السيو وواجهة المستخدم التفاعلية. |
| **الحاسبات العامة الموحدة (Universal Calculators)** | **3** حاسبات | النسبة المئوية، مؤشر كتلة الجسم، وزكاة المال (مسارها الموحد فقط `/calculators/[slug]`). |
| **الحاسبات القابلة للتخصيص حسب الدول (Configurable)** | **3** حاسبات | تكلفة الوقود، ضريبة القيمة المضافة، والقروض والتمويل. |
| **الحاسبات الخاضعة للوائح الدول (Regulated)** | **2** حاسبات | فاتورة الكهرباء بالشرائح، ومكافأة نهاية الخدمة. |
| **الدول العربية المهيئة في المنصة** | **22** دولة | جميع الدول العربية مسجلة في `src/data/countries.ts` بالعملات والأعلام والمدن. |
| **الدول ذات اللوائح التنظيمية المعتمدة رسمياً** | **3** دول | السعودية (SA)، الإمارات (AE)، ومصر (EG) بقواعد نظامية كاملة. |
| **القواعد واللوائح التنظيمية المعتمدة في السجل** | **15** قاعدة | موثقة في `src/countries/` ومعتمدة بحالة `APPROVED`. |
| **المصادر والجهات الحكومية الموثقة** | **15** مصدراً | جهات حكومية رسمية مسجلة في `src/data/sources.ts` بروابطها المباشرة. |
| **التصنيفات العامة للمنصة (Categories)** | **18** تصنيفاً | تغطي الرياضيات، السيارات، الطاقة، العمل، والضرائب وغيرها. |
| **المقالات والأدلة الإرشادية التفصيلية (Guides)** | **8** أدلة | مقالات أصلية في `src/data/guides.ts` تشرح الاستهلاك والتكاليف والحسابات. |
| **إجمالي الصفحات المولدة مسبقاً (SSG Prerendered Pages)**| **110** صفحة | صفحة رئيسية، 22 بوابة دولة، 39 صفحة حاسبة موطنة، 8 حاسبات عامة، 18 تصنيفاً، 8 أدلة، و 6 صفحات ثابتة. |
| **اختبارات الفحص الآلي للوحدات والانحدار (Vitest)** | **53** اختباراً | 15 اختبار استقلالية، 21 اختبار معادلات، و 17 اختبار انحدار لـ 9 دول. |
| **سكريبتات التدقيق الآلي الداخلي (Audit Scripts)** | **9** سكريبتات | تدقيق الحاسبات، اللوائح، المصادر، السيو، المحتوى، التدقيق اللغوي، التوطين، والمتانة الرياضية. |

---

## 3. هيكل المسارات وبنية الروابط (URL Route Map)

1. **الصفحة الرئيسية:** `https://lsayartk.com/`
2. **فهرس الحاسبات العام:** `https://lsayartk.com/calculators/`
3. **صفحات الحاسبات العامة الموحدة:**
   - `https://lsayartk.com/calculators/percentage-calculator/`
   - `https://lsayartk.com/calculators/bmi-calculator/`
   - `https://lsayartk.com/calculators/zakat-wealth/`
   - `https://lsayartk.com/calculators/car-fuel-cost/`
   - `https://lsayartk.com/calculators/vat-calculator/`
   - `https://lsayartk.com/calculators/loan-calculator/`
   - `https://lsayartk.com/calculators/electricity-bill/`
   - `https://lsayartk.com/calculators/end-of-service-reward/`
4. **بوابات الدول الـ 22:** `https://lsayartk.com/[country]/` (مثل `/sa/`, `/ae/`, `/eg/`, `/kw/`, إلخ).
5. **صفحات الحاسبات الموطنة إقليمياً:** `https://lsayartk.com/[country]/[calculator]/` (39 صفحة تم توليدها حصرياً للدول ذات اللوائح أو الأسعار المعتمدة).
6. **فهرس التصنيفات والتصنيفات الفرعية:** `https://lsayartk.com/categories/` و `https://lsayartk.com/categories/[slug]/` (18 تصنيفاً).
7. **مركز الأدلة والمقالات:** `https://lsayartk.com/guides/` و `https://lsayartk.com/guides/[slug]/` (8 مقالات إرشادية).
8. **الصفحات المنهجية والمؤسسية:** `/methodology/`, `/sources/`, `/about/`, `/contact/`, `/privacy/`, `/terms/`.

---

## 4. مكونات البنية التحتية البرمجية

- **آلية تحديد الدولة:** تنفذ عبر [`src/lib/storage/country.ts`](file:///c:/Users/bilal.abbasi/Desktop/Arabic/src/lib/storage/country.ts) وفق أسبقية صارمة:
  1. مسار الرابط الصريح (URL Path).
  2. التفضيل المخزن محلياً في المتصفح (`localStorage`).
  3. ترويسة الموقع الجغرافي الطرفي (Vercel Geolocation Header).
  4. الدولة الافتراضية العامة (المملكة العربية السعودية).
- **محرك حل اللوائح التنظيمية (Rule Resolver):** [`src/lib/rules/rule-resolver.ts`](file:///c:/Users/bilal.abbasi/Desktop/Arabic/src/lib/rules/rule-resolver.ts) يعزل الولايات القضائية عزلاً باتاً ويمنع اختلاط القوانين بين الدول.
- **توليد السيو والـ Hreflang:** [`src/lib/seo/metadata.ts`](file:///c:/Users/bilal.abbasi/Desktop/Arabic/src/lib/seo/metadata.ts) يولد ميتاداتا مخصصة ووسوم hreflang تبادلية 100% مطابقة لـ Google Search Central.
- **العزل البصري للـ RTL:** تطبيق وسوم `<bdi>` و `dir="ltr"` في مكونات العرض لحماية المعادلات الجبرية والأرقام والنسب المئوية من الانقلاب.
