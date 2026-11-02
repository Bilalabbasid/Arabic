export interface CalculatorSeoMeta {
  slug: string;
  relatedCalculators: Array<{ slug: string; reason: string }>;
  guides: string[];
  intentTags: string[];
  contextualLinks: Array<{ slug: string; anchorText: string }>;
}

export const CALCULATOR_SEO_METADATA: Record<string, CalculatorSeoMeta> = {
  'car-fuel-cost': {
    slug: 'car-fuel-cost',
    relatedCalculators: [
      { slug: 'fuel-prices', reason: 'استعرض أحدث أسعار البنزين والديزل الرسمية المعتمدة محلياً' },
      { slug: 'trip-cost', reason: 'احسب تكلفة السفر البري والمشاوير بين المدن بدقة' },
      { slug: 'fuel-consumption-converter', reason: 'تحويل معدلات الاستهلاك بين لتر/100 كم وميل/جالون' },
      { slug: 'ev-vs-petrol', reason: 'قارن تكلفة الكيلومتر بين السيارات الكهربائية والبنزين' },
      { slug: 'car-affordability', reason: 'قبل التمويل اعرف أقصى سعر سيارة يناسب راتبك' },
    ],
    guides: ['how-to-calculate-car-fuel-cost', 'trip-fuel-cost-guide'],
    intentTags: ['cars', 'running-cost', 'fuel', 'travel'],
    contextualLinks: [
      { slug: 'fuel-prices', anchorText: 'أسعار الوقود الرسمية المحدثة' },
      { slug: 'trip-cost', anchorText: 'حاسبة تكلفة السفر البري بين المدن' },
      { slug: 'fuel-consumption-converter', anchorText: 'تحويل معدل استهلاك الوقود' },
    ],
  },
  'fuel-cost': {
    slug: 'fuel-cost',
    relatedCalculators: [
      { slug: 'fuel-prices', reason: 'استعرض أحدث أسعار البنزين والديزل الرسمية المعتمدة محلياً' },
      { slug: 'trip-cost', reason: 'احسب تكلفة السفر البري والمشاوير بين المدن بدقة' },
      { slug: 'fuel-consumption-converter', reason: 'تحويل معدلات الاستهلاك بين لتر/100 كم وميل/جالون' },
      { slug: 'ev-vs-petrol', reason: 'قارن تكلفة الكيلومتر بين السيارات الكهربائية والبنزين' },
      { slug: 'car-affordability', reason: 'قبل التمويل اعرف أقصى سعر سيارة يناسب ميزانيتك' },
    ],
    guides: ['how-to-calculate-car-fuel-cost', 'trip-fuel-cost-guide'],
    intentTags: ['cars', 'running-cost', 'fuel', 'travel'],
    contextualLinks: [
      { slug: 'fuel-prices', anchorText: 'أسعار الوقود الرسمية' },
      { slug: 'trip-cost', anchorText: 'حساب تكلفة السفر بين المدن' },
      { slug: 'fuel-consumption-converter', anchorText: 'معادلة استهلاك لتر لكل 100 كم' },
    ],
  },
  'fuel-prices': {
    slug: 'fuel-prices',
    relatedCalculators: [
      { slug: 'fuel-cost', reason: 'احسب التكلفة الإجمالية لمشوارك فور تحديث الأسعار' },
      { slug: 'trip-cost', reason: 'تقدير ميزانية السفر بين المدن بالأسعار المعلنة' },
      { slug: 'ev-vs-petrol', reason: 'مقارنة تكلفة تعبئة الوقود بشحن السيارات الكهربائية' },
      { slug: 'fuel-consumption-converter', reason: 'تحويل معدلات الاستهلاك بدقة وفق أسعار اللتر' },
    ],
    guides: ['how-to-calculate-car-fuel-cost'],
    intentTags: ['cars', 'fuel', 'prices', 'running-cost'],
    contextualLinks: [
      { slug: 'fuel-cost', anchorText: 'حاسبة استهلاك الوقود للسيارات' },
      { slug: 'trip-cost', anchorText: 'حاسبة السفر والمشاوير' },
      { slug: 'ev-vs-petrol', anchorText: 'مقارنة السيارات الكهربائية والبنزين' },
    ],
  },
  'car-finance': {
    slug: 'car-finance',
    relatedCalculators: [
      { slug: 'car-affordability', reason: 'اعرف الحد الأقصى لسعر السيارة المناسب لدخلك' },
      { slug: 'lease-vs-buy', reason: 'قارن بين التمويل التأجيري والشراء المباشر' },
      { slug: 'loan-calculator', reason: 'جدول استهلاك القرض وحساب الفوائد التراكمية' },
      { slug: 'car-depreciation', reason: 'احسب انخفاض قيمة السيارة خلال فترة سداد الأقساط' },
    ],
    guides: ['loan-installment-calculation-guide'],
    intentTags: ['cars', 'finance', 'loans', 'installments'],
    contextualLinks: [
      { slug: 'car-affordability', anchorText: 'حاسبة القدرة على شراء سيارة' },
      { slug: 'lease-vs-buy', anchorText: 'المقارنة بين التأجير التمويلي والشراء' },
      { slug: 'car-depreciation', anchorText: 'حساب هبوط وانخفاض قيمة المركبة' },
    ],
  },
  'car-affordability': {
    slug: 'car-affordability',
    relatedCalculators: [
      { slug: 'car-finance', reason: 'حساب جدول أقساط السيارة التي تم اختيارها' },
      { slug: 'lease-vs-buy', reason: 'فحص خيارات التمويل المتاحة لميزانيتك' },
      { slug: 'car-depreciation', reason: 'تقدير القيمة الاستردادية للسيارة بعد سنوات الاستخدام' },
      { slug: 'loan-calculator', reason: 'حساب نسبة الاستقطاع النظامي للتمويل الشخصي' },
    ],
    guides: ['loan-installment-calculation-guide'],
    intentTags: ['cars', 'finance', 'budget', 'buying-car'],
    contextualLinks: [
      { slug: 'car-finance', anchorText: 'حاسبة أقساط التمويل' },
      { slug: 'car-depreciation', anchorText: 'حاسبة استهلاك وهبوط قيمة السيارة' },
      { slug: 'lease-vs-buy', anchorText: 'مقارنة الشراء نقداً والتأجير' },
    ],
  },
  'lease-vs-buy': {
    slug: 'lease-vs-buy',
    relatedCalculators: [
      { slug: 'car-finance', reason: 'حساب تفاصيل التمويل البنكي التقليدي' },
      { slug: 'car-affordability', reason: 'التحقق من ملاءمة الدفعة الشهرية مع دخلك' },
      { slug: 'car-depreciation', reason: 'أثر إهلاك السيارة على قرار التملك أو الإيجار' },
      { slug: 'loan-calculator', reason: 'مقارنة تكلفة الفوائد الإجمالية بين الخيارين' },
    ],
    guides: ['loan-installment-calculation-guide'],
    intentTags: ['cars', 'finance', 'leasing', 'buying-car'],
    contextualLinks: [
      { slug: 'car-finance', anchorText: 'حساب قسط تمويل السيارات' },
      { slug: 'car-depreciation', anchorText: 'معدل انخفاض قيمة المركبة' },
      { slug: 'car-affordability', anchorText: 'سقف التمويل المناسب للدخل' },
    ],
  },
  'car-import-customs': {
    slug: 'car-import-customs',
    relatedCalculators: [
      { slug: 'vehicle-fees', reason: 'رسوم إصدار اللوحات والاستمارة للمركبة المستوردة' },
      { slug: 'vat-calculator', reason: 'احتساب ضريبة القيمة المضافة على قيمة السيارة والرسوم' },
      { slug: 'fuel-cost', reason: 'حساب تكلفة قيادة السيارة بعد استيرادها وترخيصها' },
      { slug: 'traffic-fines', reason: 'الاطلاع على لوائح المخالفات المرورية المعتمدة' },
    ],
    guides: ['vat-calculation-guide'],
    intentTags: ['cars', 'customs', 'import', 'government-fees'],
    contextualLinks: [
      { slug: 'vehicle-fees', anchorText: 'رسوم رخص واستمارة المركبات' },
      { slug: 'vat-calculator', anchorText: 'حساب ضريبة الاستيراد والقيمة المضافة' },
      { slug: 'fuel-cost', anchorText: 'حاسبة تكلفة تشغيل الوقود' },
    ],
  },
  'traffic-fines': {
    slug: 'traffic-fines',
    relatedCalculators: [
      { slug: 'vehicle-fees', reason: 'رسوم تجديد رخصة السير والقيادة بدون غرامات تأخير' },
      { slug: 'car-finance', reason: 'مراعاة الغرامات السنوية ضمن التكاليف التشغيلية للمركبة' },
      { slug: 'fuel-cost', reason: 'إدارة الميزانية الشهرية لمصروفات السيارة العامة' },
      { slug: 'trip-cost', reason: 'الالتزام بالسرعات المقررة على طرق السفر السريعة' },
    ],
    guides: [],
    intentTags: ['cars', 'traffic', 'fines', 'regulations'],
    contextualLinks: [
      { slug: 'vehicle-fees', anchorText: 'رسوم تجديد المركبات ورخص القيادة' },
      { slug: 'fuel-cost', anchorText: 'حاسبة مصاريف الوقود' },
      { slug: 'trip-cost', anchorText: 'تكاليف ومسارات السفر البري' },
    ],
  },
  'vehicle-fees': {
    slug: 'vehicle-fees',
    relatedCalculators: [
      { slug: 'traffic-fines', reason: 'التحقق من عدم وجود مخالفات تعيق تجديد الاستمارة' },
      { slug: 'car-import-customs', reason: 'رسوم التخليص الجمركي وإصدار اللوحات الجديدة' },
      { slug: 'car-depreciation', reason: 'إجمالي تكاليف الملكية والرسوم السنوية التراكمية' },
      { slug: 'fuel-cost', reason: 'تقدير المصاريف التشغيلية السنوية الشاملة' },
    ],
    guides: [],
    intentTags: ['cars', 'registration', 'government-fees', 'licensing'],
    contextualLinks: [
      { slug: 'traffic-fines', anchorText: 'الاستعلام عن المخالفات والغرامات المرورية' },
      { slug: 'car-import-customs', anchorText: 'جمارك السيارات المستوردة' },
      { slug: 'car-depreciation', anchorText: 'حاسبة إهلاك قيمة المركبة' },
    ],
  },
  'fuel-consumption-converter': {
    slug: 'fuel-consumption-converter',
    relatedCalculators: [
      { slug: 'fuel-cost', reason: 'حساب التكلفة الفعلية بعد تحويل معدل الاستهلاك' },
      { slug: 'fuel-prices', reason: 'الاطلاع على أحدث أسعار البنزين لحساب التكلفة بدقة' },
      { slug: 'trip-cost', reason: 'تحديد استهلاك الرحلات بين المدن باللتر والجالون' },
      { slug: 'tire-size', reason: 'تأثير مقاس الإطارات الجديد على قراءة استهلاك الوقود' },
    ],
    guides: ['how-to-calculate-car-fuel-cost'],
    intentTags: ['cars', 'fuel', 'efficiency', 'converter'],
    contextualLinks: [
      { slug: 'fuel-cost', anchorText: 'حاسبة تكلفة الوقود' },
      { slug: 'trip-cost', anchorText: 'حساب تكلفة السفر البري' },
      { slug: 'tire-size', anchorText: 'حاسبة أبعاد ومقاسات الإطارات' },
    ],
  },
  'tire-size': {
    slug: 'tire-size',
    relatedCalculators: [
      { slug: 'fuel-consumption-converter', reason: 'أثر تغير حجم الإطار على قراءة عداد السرعة واستهلاك البنزين' },
      { slug: 'fuel-cost', reason: 'احتساب فارق استهلاك الوقود بعد تعديل مقاس الجنط' },
      { slug: 'length-converter', reason: 'تحويل أبعاد الإطارات بين المليمتر والبوصة' },
      { slug: 'trip-cost', reason: 'دقة حساب مسافات السفر عند تغيير مقاس الوكالة' },
    ],
    guides: ['how-to-calculate-car-fuel-cost'],
    intentTags: ['cars', 'tires', 'wheels', 'maintenance'],
    contextualLinks: [
      { slug: 'length-converter', anchorText: 'تحويل وحدات القياس والبوصة' },
      { slug: 'fuel-cost', anchorText: 'تأثير مقاس الإطار على استهلاك الوقود' },
      { slug: 'fuel-consumption-converter', anchorText: 'حاسبة كفاءة استهلاك الطاقة' },
    ],
  },
  'ev-vs-petrol': {
    slug: 'ev-vs-petrol',
    relatedCalculators: [
      { slug: 'fuel-cost', reason: 'مقارنة تكلفة تعبئة خزان البنزين بتكلفة الشحن الكهربائي' },
      { slug: 'electricity-bill', reason: 'حساب تكلفة الشحن المنزلي وفق شرائح الكهرباء المعتمدة' },
      { slug: 'car-depreciation', reason: 'مقارنة معدلات هبوط أسعار السيارات الكهربائية مقابل التقليدية' },
      { slug: 'car-finance', reason: 'حساب القسط الشهري للسيارة الكهربائية مقابل البنزين' },
    ],
    guides: ['how-to-calculate-car-fuel-cost', 'ac-electricity-consumption-guide'],
    intentTags: ['cars', 'electric-vehicles', 'fuel', 'comparison'],
    contextualLinks: [
      { slug: 'fuel-cost', anchorText: 'حاسبة استهلاك البنزين' },
      { slug: 'electricity-bill', anchorText: 'حاسبة فاتورة الكهرباء والشرائح' },
      { slug: 'car-depreciation', anchorText: 'هبوط القيمة السوقية للسيارات' },
    ],
  },
  'car-depreciation': {
    slug: 'car-depreciation',
    relatedCalculators: [
      { slug: 'car-finance', reason: 'تأثير إهلاك السيارة على قيمة السداد المبكر للتمويل' },
      { slug: 'car-affordability', reason: 'اختيار سيارة تحافظ على قيمتها السوقية عند إعادة البيع' },
      { slug: 'lease-vs-buy', reason: 'مقارنة خسارة القيمة في الشراء مع تكلفة التأجير التمويلي' },
      { slug: 'vehicle-fees', reason: 'إجمالي تكاليف الملكية والرسوم السنوية' },
    ],
    guides: ['loan-installment-calculation-guide'],
    intentTags: ['cars', 'depreciation', 'valuation', 'resale'],
    contextualLinks: [
      { slug: 'car-finance', anchorText: 'حاسبة تمويل السيارات' },
      { slug: 'car-affordability', anchorText: 'القدرة الشرائية للسيارات' },
      { slug: 'lease-vs-buy', anchorText: 'المفاضلة بين الشراء والتأجير' },
    ],
  },
  'trip-cost': {
    slug: 'trip-cost',
    relatedCalculators: [
      { slug: 'fuel-cost', reason: 'حساب التكلفة التفصيلية لاستهلاك الوقود داخل وخارج المدينة' },
      { slug: 'fuel-prices', reason: 'الاطلاع على تسعيرة الوقود الرسمية في محطات الطرق السريعة' },
      { slug: 'fuel-consumption-converter', reason: 'تحديد معدل استهلاك سيارتك على الطرق السريعة' },
      { slug: 'length-converter', reason: 'تحويل المسافات المقطوعة بين الكيلومترات والأميال' },
    ],
    guides: ['trip-fuel-cost-guide', 'how-to-calculate-car-fuel-cost'],
    intentTags: ['cars', 'travel', 'trip', 'running-cost'],
    contextualLinks: [
      { slug: 'fuel-prices', anchorText: 'أسعار الوقود الرسمية المحدثة' },
      { slug: 'fuel-cost', anchorText: 'حاسبة استهلاك الوقود للسيارات' },
      { slug: 'length-converter', anchorText: 'تحويل المسافات بالكيلومتر والميل' },
    ],
  },
  'vat-calculator': {
    slug: 'vat-calculator',
    relatedCalculators: [
      { slug: 'percentage-calculator', reason: 'حساب نسب الخصم والزيادة المئوية بدون ضرائب' },
      { slug: 'zakat-wealth', reason: 'حساب زكاة المال وعروض التجارة وفق الأحكام الشرعية' },
      { slug: 'car-import-customs', reason: 'احتساب ضريبة القيمة المضافة مع الرسوم الجمركية للسيارات' },
      { slug: 'electricity-bill', reason: 'حساب الضريبة المضافة على فواتير الطاقة والخدمات' },
    ],
    guides: ['vat-calculation-guide', 'ecommerce-profit-calculation-guide'],
    intentTags: ['tax', 'vat', 'business', 'shopping'],
    contextualLinks: [
      { slug: 'percentage-calculator', anchorText: 'حساب النسبة المئوية الرياضية' },
      { slug: 'car-import-customs', anchorText: 'جمارك وضريبة استيراد السيارات' },
      { slug: 'electricity-bill', anchorText: 'ضريبة فاتورة الكهرباء' },
    ],
  },
  'loan-calculator': {
    slug: 'loan-calculator',
    relatedCalculators: [
      { slug: 'car-finance', reason: 'حساب قسط تمويل السيارات مع الدفعة الأولى والأخيرة' },
      { slug: 'car-affordability', reason: 'معرفة الحد الأقصى لسعر السيارة المتاح وفق راتبك' },
      { slug: 'lease-vs-buy', reason: 'مقارنة الجدوى المالية بين الشراء نقداً أو الإيجار التمويلي' },
      { slug: 'net-salary', reason: 'التحقق من سقف الاستقطاع البنكي النظامي من راتبك' },
    ],
    guides: ['loan-installment-calculation-guide'],
    intentTags: ['loans', 'finance', 'debt', 'banking'],
    contextualLinks: [
      { slug: 'car-finance', anchorText: 'حاسبة تمويل السيارات' },
      { slug: 'car-affordability', anchorText: 'القدرة على شراء سيارة' },
      { slug: 'net-salary', anchorText: 'صافي الراتب وحد الاستقطاع النظامي' },
    ],
  },
  'end-of-service-reward': {
    slug: 'end-of-service-reward',
    relatedCalculators: [
      { slug: 'net-salary', reason: 'حساب صافي الراتب بعد خصم التأمينات الاجتماعية والضرائب' },
      { slug: 'loan-calculator', reason: 'تخطيط سداد الالتزامات البنكية من مبالغ المكافأة' },
      { slug: 'percentage-calculator', reason: 'حساب نسب الاستحقاق وفق سنوات الخدمة المعتمدة' },
      { slug: 'zakat-wealth', reason: 'حساب زكاة الأموال المدخرة من مستحقات التقاعد' },
    ],
    guides: ['saudi-end-of-service-gratuity-guide'],
    intentTags: ['salary', 'employment', 'labor-law', 'gratuity'],
    contextualLinks: [
      { slug: 'net-salary', anchorText: 'حساب صافي الراتب والبدلات' },
      { slug: 'percentage-calculator', anchorText: 'حساب نسب الاستحقاق النظامية' },
      { slug: 'loan-calculator', anchorText: 'سداد القروض والالتزامات البنكية' },
    ],
  },
  'net-salary': {
    slug: 'net-salary',
    relatedCalculators: [
      { slug: 'end-of-service-reward', reason: 'حساب مستحقات نهاية الخدمة استناداً إلى الراتب الأساسي والفعلي' },
      { slug: 'loan-calculator', reason: 'معرفة الحد الأقصى للاستقطاع البنكي الشهري المسموح به' },
      { slug: 'car-affordability', reason: 'تحديد قسط السيارة المناسب لصافي دخلك الشهري' },
      { slug: 'zakat-wealth', reason: 'تقدير المبالغ الفائضة والمدخرات السنوية الواجب فيها الزكاة' },
    ],
    guides: ['saudi-end-of-service-gratuity-guide'],
    intentTags: ['salary', 'employment', 'income', 'taxes'],
    contextualLinks: [
      { slug: 'end-of-service-reward', anchorText: 'حاسبة مكافأة نهاية الخدمة' },
      { slug: 'loan-calculator', anchorText: 'حاسبة القروض ونسب الاستقطاع' },
      { slug: 'car-affordability', anchorText: 'حاسبة ميزانية شراء السيارة' },
    ],
  },
  'zakat-wealth': {
    slug: 'zakat-wealth',
    relatedCalculators: [
      { slug: 'percentage-calculator', reason: 'حساب نسبة ربع العشر 2.5% من مختلف الأوعية النقدية' },
      { slug: 'vat-calculator', reason: 'التفريق بين الضريبة الإلزامية وفريضة الزكاة الشرعية' },
      { slug: 'net-salary', reason: 'تقدير المدخرات الفائضة عن الحاجة الأصلية من الراتب' },
      { slug: 'ramadan-countdown', reason: 'الاستعداد لإخراج زكاة المال والفطر في شهر رمضان' },
    ],
    guides: ['zakat-wealth-calculation-guide'],
    intentTags: ['zakat', 'islamic-finance', 'charity', 'wealth'],
    contextualLinks: [
      { slug: 'percentage-calculator', anchorText: 'حساب نسبة 2.5% الشرعية' },
      { slug: 'net-salary', anchorText: 'صافي الدخل السنوي والمدخرات' },
      { slug: 'ramadan-countdown', anchorText: 'العد التنازلي لموسم رمضان المبارك' },
    ],
  },
  'electricity-bill': {
    slug: 'electricity-bill',
    relatedCalculators: [
      { slug: 'fuel-cost', reason: 'مقارنة تكاليف الطاقة المنزلية بمصاريف وقود المركبات' },
      { slug: 'percentage-calculator', reason: 'احتساب نسبة مساهمة المكيفات في الفاتورة الإجمالية' },
      { slug: 'vat-calculator', reason: 'حساب ضريبة القيمة المضافة المفروضة على فواتير الخدمات' },
      { slug: 'ev-vs-petrol', reason: 'حساب تكلفة شحن السيارات الكهربائية من عداد المنزل' },
    ],
    guides: ['ac-electricity-consumption-guide', 'ac-sizing-guide'],
    intentTags: ['utilities', 'electricity', 'energy', 'home-cost'],
    contextualLinks: [
      { slug: 'percentage-calculator', anchorText: 'حساب نسبة استهلاك الأجهزة الكهربائية' },
      { slug: 'vat-calculator', anchorText: 'ضريبة فواتير الخدمات العامة' },
      { slug: 'ev-vs-petrol', anchorText: 'تكلفة شحن السيارات الكهربائية' },
    ],
  },
  'bmi-calculator': {
    slug: 'bmi-calculator',
    relatedCalculators: [
      { slug: 'length-converter', reason: 'تحويل الطول بين المتر والسنتيمتر والقدم والبوصة' },
      { slug: 'percentage-calculator', reason: 'حساب نسبة الدهون والتغير في وزن الجسم' },
      { slug: 'time-converter', reason: 'جدولة خطط التمارين وفترات الراحة الأسبوعية' },
    ],
    guides: ['bmi-healthy-weight-guide'],
    intentTags: ['health', 'fitness', 'weight', 'wellness'],
    contextualLinks: [
      { slug: 'length-converter', anchorText: 'تحويل وحدات الطول والقامة' },
      { slug: 'percentage-calculator', anchorText: 'حساب نسبة نزول الوزن' },
      { slug: 'time-converter', anchorText: 'تحويل الساعات والدقائق للتمارين' },
    ],
  },
  'percentage-calculator': {
    slug: 'percentage-calculator',
    relatedCalculators: [
      { slug: 'vat-calculator', reason: 'تطبيق النسبة المئوية على الضرائب والرسوم التجارية' },
      { slug: 'loan-calculator', reason: 'حساب نسبة الفائدة وهوامش الربح المصرفية' },
      { slug: 'net-salary', reason: 'احتساب نسب استقطاع التأمينات والخصومات الشهرية' },
      { slug: 'zakat-wealth', reason: 'حساب نسبة الزكاة الشرعية البالغة 2.5%' },
    ],
    guides: ['ecommerce-profit-calculation-guide'],
    intentTags: ['math', 'percentages', 'business', 'tools'],
    contextualLinks: [
      { slug: 'vat-calculator', anchorText: 'حاسبة ضريبة القيمة المضافة' },
      { slug: 'loan-calculator', anchorText: 'حاسبة نسب فوائد التمويل' },
      { slug: 'zakat-wealth', anchorText: 'حساب زكاة المال النقدية' },
    ],
  },
  'length-converter': {
    slug: 'length-converter',
    relatedCalculators: [
      { slug: 'tire-size', reason: 'تحويل مقاسات الإطارات وأقطار الجنوط بين المليمتر والبوصة' },
      { slug: 'trip-cost', reason: 'حساب المسافات بين المدن بالكيلومتر والميل' },
      { slug: 'time-converter', reason: 'حساب السرعة ومعدل قطع المسافات الزمنية' },
      { slug: 'bmi-calculator', reason: 'تحويل الطول بدقة لحساب كتلة الجسم' },
    ],
    guides: [],
    intentTags: ['units', 'converter', 'distance', 'dimensions'],
    contextualLinks: [
      { slug: 'trip-cost', anchorText: 'حساب مسافات السفر بالكيلومتر' },
      { slug: 'tire-size', anchorText: 'مقاسات أقطار الإطارات بالبوصة' },
      { slug: 'bmi-calculator', anchorText: 'حاسبة مؤشر كتلة الجسم' },
    ],
  },
  'time-converter': {
    slug: 'time-converter',
    relatedCalculators: [
      { slug: 'hijri-converter', reason: 'تحويل التواريخ بين التقويمين الهجري والميلادي' },
      { slug: 'hijri-age', reason: 'حساب العمر الدقيق بالأيام والشهور والسنوات' },
      { slug: 'ramadan-countdown', reason: 'عد الأيام والساعات المتبقية حتى المواسم المباركة' },
      { slug: 'length-converter', reason: 'التحويل بين وحدات القياس الفيزيائية والزمنية' },
    ],
    guides: [],
    intentTags: ['time', 'units', 'converter', 'calendar'],
    contextualLinks: [
      { slug: 'hijri-converter', anchorText: 'التحويل بين التاريخ الهجري والميلادي' },
      { slug: 'hijri-age', anchorText: 'حساب العمر بالتفصيل' },
      { slug: 'ramadan-countdown', anchorText: 'حساب الأيام المتبقية لرمضان' },
    ],
  },
  'hijri-converter': {
    slug: 'hijri-converter',
    relatedCalculators: [
      { slug: 'hijri-age', reason: 'حساب العمر الدقيق بالتقويم الهجري والشمسي الميلادي' },
      { slug: 'ramadan-countdown', reason: 'معرفة موعد دخول شهر رمضان وعيدي الفطر والأضحى' },
      { slug: 'time-converter', reason: 'تحويل الفترات الزمنية بين الأيام والأسابيع والشهور' },
    ],
    guides: [],
    intentTags: ['calendar', 'dates', 'hijri', 'islamic-calendar'],
    contextualLinks: [
      { slug: 'hijri-age', anchorText: 'حاسبة العمر بالهجري والميلادي' },
      { slug: 'ramadan-countdown', anchorText: 'العد التنازلي للمناسبات الإسلامية' },
      { slug: 'time-converter', anchorText: 'تحويل وحدات الزمن والأيام' },
    ],
  },
  'hijri-age': {
    slug: 'hijri-age',
    relatedCalculators: [
      { slug: 'hijri-converter', reason: 'تحويل تاريخ ميلادك بين التقويمين الهجري والميلادي' },
      { slug: 'time-converter', reason: 'حساب عدد الساعات والأيام التي عشتها بالتفصيل' },
      { slug: 'ramadan-countdown', reason: 'معرفة المناسبات الدينية القادمة في عامك الجديد' },
    ],
    guides: [],
    intentTags: ['calendar', 'age', 'hijri', 'birthdays'],
    contextualLinks: [
      { slug: 'hijri-converter', anchorText: 'تحويل تاريخ الميلاد' },
      { slug: 'time-converter', anchorText: 'تحويل وحدات الزمن' },
      { slug: 'ramadan-countdown', anchorText: 'العد التنازلي للمواسم المباركة' },
    ],
  },
  'ramadan-countdown': {
    slug: 'ramadan-countdown',
    relatedCalculators: [
      { slug: 'zakat-wealth', reason: 'إخراج زكاة المال وزكاة الفطر في مواعيدها الشرعية المقررة' },
      { slug: 'hijri-converter', reason: 'متابعة غرة الأشهر الهجرية وشهور الحج والصيام' },
      { slug: 'time-converter', reason: 'تحويل الساعات والدقائق لمواقيت الصيام والإفطار' },
      { slug: 'hijri-age', reason: 'معرفة العمر ومحطات الحياة بالتقويم الهجري المبارك' },
    ],
    guides: ['zakat-wealth-calculation-guide'],
    intentTags: ['calendar', 'ramadan', 'islamic-events', 'countdown'],
    contextualLinks: [
      { slug: 'zakat-wealth', anchorText: 'حاسبة زكاة المال وزكاة الفطر' },
      { slug: 'hijri-converter', anchorText: 'تقويم الشهور الهجرية' },
      { slug: 'time-converter', anchorText: 'تحويل الساعات والدقائق' },
    ],
  },
};

export function getCalculatorSeoMeta(slug: string): CalculatorSeoMeta | undefined {
  const normSlug = slug === 'car-fuel-cost' ? 'fuel-cost' : slug;
  return CALCULATOR_SEO_METADATA[slug] || CALCULATOR_SEO_METADATA[normSlug];
}

