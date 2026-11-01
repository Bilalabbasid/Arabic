# دليل تحديث اللوائح والأسعار ونسب الضرائب (Operational Rules Update Guide)

يحدد هذا المستند الإجراءات التشغيلية الدقيقة لتحديث أي قيمة تنظيمية، أو سعر وقود، أو نسبة ضريبية، أو تعرفة كهرباء على منصة لِسيارتك (`lsayartk.com`). تتبع المنصة معيار **المصدر الموحد للحقيقة (Single Source of Truth)** بحيث تُعرف جميع القيم التنظيمية حصراً داخل المجلد `src/data/rules/`.

---

## 1. جدول مواعيد مراجعة وتحديث القيم (Update Schedule)

| المجال | الدولة | دورية التحديث | الجهة الرسمية المصدرة |
| :--- | :--- | :--- | :--- |
| **أسعار الوقود** | الإمارات العربية المتحدة | شهرياً (في اليوم الأول من كل شهر ميلادي) | لجنة متابعة أسعار الوقود / وزارة الطاقة والبنية التحتية |
| **أسعار الوقود** | قطر | شهرياً (اليوم الأخير من كل شهر للعمل به في الشهر التالي) | قطر للطاقة (QatarEnergy) |
| **أسعار الوقود** | سلطنة عُمان | شهرياً (في اليوم الأول من كل شهر) | وزارة الطاقة والمعادن (مع سقف حكومي لبنزين 91) |
| **أسعار الوقود** | المملكة العربية السعودية | شهرياً / عند المراجعة الدورية | وزارة الطاقة / شركة أرامكو السعودية (سقف رسمي معتمد) |
| **أسعار الوقود** | البحرين، الكويت، مصر | دورية / ربع سنوية حسب لجان التسعير التلقائي | بابكو (البحرين)، البترول الوطنية (الكويت)، لجنة التسعير التلقائي (مصر) |
| **ضريبة القيمة المضافة (VAT)** | جميع الدول | عند صدور مرسوم ملكي أو رئاسي أو قانون برلماني | الهيئات الضريبية الرسمية (ZATCA، FTA، مصلحة الضرائب المصرية...) |
| **مكافأة نهاية الخدمة** | السعودية، الإمارات، مصر | عند تعديل أنظمة العمل الرسمية | وزارة الموارد البشرية والتنمية الاجتماعية، وزارة الموارد البشرية الإماراتية |
| **تعرفة الكهرباء** | السعودية، الإمارات، مصر | عند صدور قرارات تنظيمية من هيئات الكهرباء | هيئة تنظيم المياه والكهرباء (السعودية)، ديوا / إيمار (الإمارات)، مرفق الكهرباء وحماية المستهلك (مصر) |

---

## 2. المصادر الرسمية المعتمدة وروابط التحقق (Official Sources Directory)

| الدولة | القطاع | الجهة الرسمية | رابط المصدر الرسمي المباشر |
| :--- | :--- | :--- | :--- |
| **السعودية** | ضريبة القيمة المضافة | هيئة الزكاة والضريبة والجمارك (ZATCA) | [https://zatca.gov.sa/ar/RulesRegulations/Taxes/Pages/VAT_Rules.aspx](https://zatca.gov.sa/ar/RulesRegulations/Taxes/Pages/VAT_Rules.aspx) |
| **السعودية** | أسعار الوقود | أرامكو السعودية / وزارة الطاقة | [https://www.aramco.com/ar/creating-value/products/retail-fuels](https://www.aramco.com/ar/creating-value/products/retail-fuels) |
| **السعودية** | نظام العمل (مكافأة الخدمة) | وزارة الموارد البشرية والتنمية الاجتماعية | [https://hrsd.gov.sa/knowledge-centre/decisions-and-regulations/labor-law](https://hrsd.gov.sa/knowledge-centre/decisions-and-regulations/labor-law) |
| **السعودية** | تعرفة الكهرباء | هيئة تنظيم المياه والكهرباء (SERA) | [https://sera.gov.sa/ar/Regulations/Tariff](https://sera.gov.sa/ar/Regulations/Tariff) |
| **الإمارات** | ضريبة القيمة المضافة | الهيئة الاتحادية للضرائب (FTA) | [https://tax.gov.ae/ar/taxes/vat](https://tax.gov.ae/ar/taxes/vat) |
| **الإمارات** | أسعار الوقود الشهرية | وزارة الطاقة والبنية التحتية | [https://www.moei.gov.ae/ar/media-centre/fuel-prices.aspx](https://www.moei.gov.ae/ar/media-centre/fuel-prices.aspx) |
| **الإمارات** | قانون العمل الجديد | وزارة الموارد البشرية والتوطين (MOHRE) | [https://www.mohre.gov.ae/ar/laws-and-regulations/labour-law.aspx](https://www.mohre.gov.ae/ar/laws-and-regulations/labour-law.aspx) |
| **مصر** | ضريبة القيمة المضافة | مصلحة الضرائب المصرية | [https://www.eta.gov.eg](https://www.eta.gov.eg) |
| **مصر** | أسعار المنتجات البترولية | وزارة البترول والثروة المعدنية | [https://www.petroleum.gov.eg](https://www.petroleum.gov.eg) |
| **الكويت** | أسعار الوقود | شركة البترول الوطنية الكويتية (KNPC) | [https://www.knpc.com](https://www.knpc.com) |
| **قطر** | أسعار الوقود | قطر للطاقة (QatarEnergy) | [https://www.qatarenergy.qa](https://www.qatarenergy.qa) |
| **البحرين** | ضريبة القيمة المضافة | الجهاز الوطني للإيرادات (NBR) | [https://www.nbr.gov.bh](https://www.nbr.gov.bh) |
| **سلطنة عُمان** | ضريبة القيمة المضافة | جهاز الضرائب العُماني (OTA) | [https://tms.taxoman.gov.om](https://tms.taxoman.gov.om) |

---

## 3. الملفات المعنية بالتعديل عند تغير أي قيمة (Files to Edit)

توجد قاعدة تنظيمية لكل دولة في مجلد `src/data/rules/`:
- للسعودية: `src/data/rules/sa.ts`
- للإمارات: `src/data/rules/ae.ts`
- لمصر: `src/data/rules/eg.ts`
- للكويت: `src/data/rules/kw.ts`
- لقطر: `src/data/rules/qa.ts`
- للبحرين: `src/data/rules/bh.ts`
- لعُمان: `src/data/rules/om.ts`
- للأردن: `src/data/rules/jo.ts`
- للمغرب: `src/data/rules/ma.ts`
- للجزائر: `src/data/rules/dz.ts`
- لتونس: `src/data/rules/tn.ts`
- للبنان: `src/data/rules/lb.ts`

**ملاحظة هامة:**
لا تقم أبداً بتعديل أي نسبة أو سعر داخل ملفات محركات الحساب (`src/lib/calculators/`) أو ملفات واجهة المستخدم؛ فجميع الحاسبات تشتق قيمها تلقائياً من `ALL_COUNTRY_LEGAL_RULES`.

---

## 4. قائمة التحقق قبل الاعتماد والنشر (Verification & Deployment Checklist)

عند تحديث أي قيمة، اتبع الخطوات التالية بدقة:

1. **تحديث ملف الدولة في `src/data/rules/{country}.ts`**:
   - قم بتحديث القيمة العددية (`value`).
   - قم بتحديث تاريخ التحقق (`checkedAt: 'YYYY-MM-DD'`).
   - تأكد من صحة رابط المصدر الرسمي (`sourceUrl`).
2. **تشغيل اختبارات الوحدة الآلية**:
   ```bash
   npm test
   ```
   تأكد من نجاح كافة الاختبارات بدون أي خطأ.
3. **التحقق من صحة البناء البرمجي والأنواع (TypeScript Compilation)**:
   ```bash
   npm run build
   ```
   تأكد من اكتمال الإنتاج بدون أي أخطاء من Next.js.
4. **فحص صفحة الدولة المتأثرة محلياً**:
   - افتح الصفحة المخصصة للدولة (مثال: `/{country}/car-fuel-cost` أو `/{country}/vat-calculator`).
   - تأكد من ظهور السعر أو النسبة الجديدة كقيمة افتراضية عند تحميل الصفحة بدون الحاجة لأي تدخل من المستخدم.
5. **إنشاء التزام git ونشره**:
   ```bash
   git add src/data/rules/
   git commit -m "fix(rules): update fuel prices for {country} as of YYYY-MM-DD"
   git push origin main
   ```
