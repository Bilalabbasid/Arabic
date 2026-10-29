import { CalculatorDefinition } from '@/types/calculator';
import { calculateCarFuelCost } from '@/lib/calculators/cars';
import { calculateVat, calculateZakatWealth } from '@/lib/calculators/tax';
import { calculateLoan } from '@/lib/calculators/finance';
import { calculateEndOfService } from '@/lib/calculators/salary';
import { calculateElectricityBill } from '@/lib/calculators/electricity';
import { calculateBmi } from '@/lib/calculators/health';
import { calculatePercentage } from '@/lib/calculators/math';

export const ALL_CALCULATORS: CalculatorDefinition[] = [
  {
    id: 'car-fuel-cost',
    slug: 'car-fuel-cost',
    nameAr: 'حاسبة تكلفة الوقود واستهلاك البنزين',
    nameEn: 'Car Fuel Cost & Consumption Calculator',
    shortNameAr: 'حساب تكلفة البنزين',
    category: 'cars-transportation',
    subcategory: 'تكلفة الوقود والرحلات',
    descriptionAr: 'احسب كمية البنزين المطلوبة وتكلفة المشوار أو السفر بالكيلومتر بالريال والدرهم والجنيه مع خيارات أسعار الوقود المعتمدة في دولتك.',
    metaTitle: 'حاسبة تكلفة الوقود واستهلاك البنزين – حساب سعر المشوار والرحلات',
    metaDescription: 'أداة مجانية لحساب تكلفة وقود السيارة بناءً على المسافة المقطوعة ومعدل استهلاك اللترات لكل 100 كم، مع أسعار الوقود في السعودية والدول العربية.',
    h1: 'حاسبة تكلفة وقود السيارة واستهلاك البنزين',
    searchKeywords: [
      'حاسبة البنزين',
      'حساب تكلفة الوقود',
      'استهلاك البنزين لكل 100 كم',
      'تكلفة السفر بالسيارة',
      'حساب بنزين المشوار',
    ],
    countryMode: 'COUNTRY_CONFIGURABLE',
    supportedCountries: ['*'],
    supportedJurisdictions: ['GCC', 'North Africa', 'Levant'],
    sourceIds: [],
    ruleVersion: '2026.1',
    verificationStatus: 'VERIFIED',
    publicationStatus: 'PUBLISHED',
    lastReviewedAt: '2026-10-20',
    calculationEngineId: 'cars.calculateCarFuelCost',
    calculate: calculateCarFuelCost,
    inputs: [
      {
        id: 'distanceKm',
        label: 'المسافة المقطوعة (كم)',
        type: 'number',
        defaultValue: 250,
        min: 1,
        max: 50000,
        step: 10,
        unit: 'كم',
        required: true,
        helpText: 'المسافة الإجمالية لرحلتك أو مشوارك بالكيلومتر ذهاباً فقط أو ذهاباً وعودة.',
        exampleValue: 250,
      },
      {
        id: 'fuelConsumption',
        label: 'معدل استهلاك السيارة (لتر / 100 كم)',
        type: 'decimal',
        defaultValue: 8.5,
        min: 2,
        max: 40,
        step: 0.1,
        unit: 'لتر/100كم',
        required: true,
        helpText: 'معدل استهلاك سيارتك القياسي (عادة بين 6 و 9 لتر لسيارات السيدان، و 11 إلى 16 لتر للسيارات العائلية والدفع الرباعي).',
        exampleValue: 8.5,
      },
      {
        id: 'fuelType',
        label: 'نوع الوقود',
        type: 'select',
        defaultValue: 'octane91',
        options: [
          { value: 'octane91', label: 'بنزين 91 ممتاز' },
          { value: 'octane95', label: 'بنزين 95 سوبر' },
          { value: 'diesel', label: 'ديزل' },
        ],
      },
      {
        id: 'country',
        label: 'الدولة لتطبيق تسعيرة الوقود الرسمية',
        type: 'country',
        defaultValue: 'SA',
        options: [
          { value: 'SA', label: 'المملكة العربية السعودية (ر.س)' },
          { value: 'AE', label: 'الإمارات العربية المتحدة (د.إ)' },
          { value: 'KW', label: 'الكويت (د.ك)' },
          { value: 'QA', label: 'قطر (ر.ق)' },
          { value: 'BH', label: 'البحرين (د.ب)' },
          { value: 'OM', label: 'سلطنة عُمان (ر.ع)' },
          { value: 'EG', label: 'مصر (ج.م)' },
          { value: 'JO', label: 'الأردن (د.أ)' },
          { value: 'MA', label: 'المغرب (د.م)' },
          { value: 'DZ', label: 'الجزائر (د.ج)' },
          { value: 'TN', label: 'تونس (د.ت)' },
        ],
      },
      {
        id: 'customPricePerLiter',
        label: 'سعر مخصص للتر الوقود (اختياري)',
        type: 'decimal',
        defaultValue: 0,
        min: 0,
        max: 100,
        step: 0.01,
        helpText: 'اتركه صفراً لتطبيق التسعيرة الرسمية التلقائية لدولتك، أو أدخل سعراً يدوياً دقيقاً.',
      },
    ],
    formula: 'تكلفة الوقود = (المسافة بالكم × معدل الاستهلاك لكل 100 كم ÷ 100) × سعر لتر الوقود',
    formulaExplanation: 'يتم احتساب إجمالي لترات البنزين اللازمة بقسمة المسافة المقطوعة على 100 ثم ضربها في معدل استهلاك المحرك، ثم ضرب الناتج في سعر اللتر المعلن.',
    workedExamples: [
      {
        title: 'مثال: السفر بين الرياض والقصيم (350 كم) بسيارة كامري',
        description: 'سيارة سيدان تستهلك 7.5 لتر/100 كم، ونوع الوقود بنزين 91 بسعر 2.18 ر.س للتر.',
        inputs: { distanceKm: 350, fuelConsumption: 7.5, fuelType: 'octane91', country: 'SA' },
        steps: [
          'كمية الوقود = (350 × 7.5) ÷ 100 = 26.25 لتر',
          'التكلفة الإجمالية = 26.25 لتر × 2.18 ر.س = 57.23 ر.س',
        ],
        resultSummary: '26.25 لتر بتكلفة 57.23 ريال سعودي',
      },
    ],
    faqs: [
      {
        question: 'كيف أعرف معدل استهلاك سيارتي للوقود لكل 100 كم؟',
        answer: 'يمكنك معرفة ذلك من شاشة معلومات الرحلة في طبلون السيارة، أو عبر بطاقة كفاءة الطاقة الملصقة على زجاج المركبة، أو بقسمة كمية اللترات التي ملأت بها الخزان على المسافة المقطوعة وضربها في 100.',
      },
      {
        question: 'هل يختلف استهلاك البنزين مع تشغيل المكيف؟',
        answer: 'نعم، تشغيل مكيف السيارة في درجات الحرارة المرتفعة يزيد من استهلاك الوقود بنسبة تتراوح بين 10% إلى 20% خاصة في القيادة داخل المدينة والازدحامات المرورية.',
      },
    ],
    relatedCalculatorIds: ['loan-calculator', 'electricity-bill', 'vat-calculator'],
  },
  {
    id: 'vat-calculator',
    slug: 'vat-calculator',
    nameAr: 'حاسبة ضريبة القيمة المضافة (VAT)',
    nameEn: 'Value Added Tax (VAT) Calculator',
    shortNameAr: 'حساب القيمة المضافة',
    category: 'taxation',
    subcategory: 'ضريبة القيمة المضافة (VAT)',
    descriptionAr: 'احسب ضريبة القيمة المضافة أو استخرج المبلغ الأساسي قبل الضريبة لجميع الدول العربية (السعودية 15%، الإمارات 5%، مصر 14%، وغيرها).',
    metaTitle: 'حاسبة ضريبة القيمة المضافة – حساب واستخراج الضريبة 15% و 5% و 14%',
    metaDescription: 'أداة احترافية لحساب ضريبة القيمة المضافة وإضافتها على السعر الصافي، أو استخراج أصل المبلغ والضريبة من الفاتورة الإجمالية بدقة متناهية.',
    h1: 'حاسبة ضريبة القيمة المضافة المعتمدة',
    searchKeywords: [
      'حاسبة الضريبة',
      'حساب ضريبة القيمة المضافة',
      'حساب الضريبة 15 بالمية',
      'استخراج الضريبة من المبلغ الإجمالي',
      'حاسبة VAT',
    ],
    countryMode: 'COUNTRY_CONFIGURABLE',
    supportedCountries: ['*'],
    supportedJurisdictions: ['ZATCA', 'FTA', 'ETA'],
    sourceIds: ['zatca-sa', 'fta-ae', 'eta-eg'],
    ruleVersion: '2026.1',
    verificationStatus: 'VERIFIED',
    publicationStatus: 'PUBLISHED',
    lastReviewedAt: '2026-10-15',
    calculationEngineId: 'tax.calculateVat',
    calculate: calculateVat,
    inputs: [
      {
        id: 'amount',
        label: 'المبلغ المالي',
        type: 'currency',
        defaultValue: 1000,
        min: 0.01,
        max: 1000000000,
        step: 10,
        required: true,
        helpText: 'المبلغ المراد احتساب الضريبة له أو استخراجها منه.',
        exampleValue: 1000,
      },
      {
        id: 'calculationType',
        label: 'طريقة الحساب',
        type: 'radio',
        defaultValue: 'add',
        options: [
          { value: 'add', label: 'إضافة الضريبة (المبلغ غير شامل الضريبة)' },
          { value: 'extract', label: 'استخراج الضريبة (المبلغ شامل الضريبة)' },
        ],
      },
      {
        id: 'country',
        label: 'الدولة ونسبة الضريبة الرسمية',
        type: 'country',
        defaultValue: 'SA',
        options: [
          { value: 'SA', label: 'السعودية (15%)' },
          { value: 'AE', label: 'الإمارات (5%)' },
          { value: 'BH', label: 'البحرين (10%)' },
          { value: 'OM', label: 'سلطنة عُمان (5%)' },
          { value: 'EG', label: 'مصر (14%)' },
          { value: 'JO', label: 'الأردن (16%)' },
          { value: 'MA', label: 'المغرب (20%)' },
          { value: 'DZ', label: 'الجزائر (19%)' },
          { value: 'TN', label: 'تونس (19%)' },
          { value: 'LB', label: 'لبنان (11%)' },
        ],
      },
      {
        id: 'customRate',
        label: 'نسبة ضريبة مخصصة (اختياري)',
        type: 'percentage',
        defaultValue: 0,
        min: 0,
        max: 100,
        step: 0.5,
        unit: '%',
        helpText: 'اتركه صفراً لتطبيق النسبة الرسمية للدولة المختارة.',
      },
    ],
    formula: 'إضافة الضريبة: الإجمالي = الأساسي × (1 + النسبة ÷ 100) | استخراج الضريبة: الأساسي = الإجمالي ÷ (1 + النسبة ÷ 100)',
    formulaExplanation: 'عند إضافة الضريبة، تضرب القيمة الأساسية في نسبة الضريبة. أما عند استخراجها من فاتورة شاملة، تقسم الفاتورة على (1 + نسبة الضريبة مئوياً).',
    workedExamples: [
      {
        title: 'مثال: فاتورة بقيمة 1,150 ريال شاملة الضريبة في السعودية',
        description: 'استخراج أصل المبلغ ومقدار الضريبة عند نسبة 15%.',
        inputs: { amount: 1150, calculationType: 'extract', country: 'SA' },
        steps: [
          'المبلغ قبل الضريبة = 1150 ÷ 1.15 = 1,000 ر.س',
          'قيمة الضريبة = 1150 - 1000 = 150 ر.س',
        ],
        resultSummary: 'الأصل: 1,000 ريال، والضريبة: 150 ريال',
      },
    ],
    faqs: [
      {
        question: 'كيف أستخرج الضريبة من فاتورة شاملة الضريبة؟',
        answer: 'إذا كانت الفاتورة في السعودية بنسبة 15%، قسّم المبلغ الإجمالي على 1.15 لمعرفة المبلغ الأصلي، ثم اطرح الناتج من الإجمالي لمعرفة قيمة الضريبة.',
      },
      {
        question: 'هل تخضع جميع السلع والخدمات لضريبة القيمة المضافة؟',
        answer: 'لا، هناك سلع وخدمات معفاة أو خاضعة لنسبة الصفر (مثل بعض الخدمات المالية والصحية والتعليمية وتصدير السلع لخارج الدولة) وفقاً للوائح كل دولة.',
      },
    ],
    relatedCalculatorIds: ['zakat-wealth', 'loan-calculator', 'car-fuel-cost'],
  },
  {
    id: 'loan-calculator',
    slug: 'loan-calculator',
    nameAr: 'حاسبة القروض والتمويل الشخصي والأقساط',
    nameEn: 'Personal & Auto Loan Calculator',
    shortNameAr: 'حساب القسط الشهري',
    category: 'loans-installments',
    subcategory: 'القروض الشخصية',
    descriptionAr: 'احسب القسط الشهري للتمويل الشخصي أو قرض السيارة أو التمويل العقاري مع إجمالي الفوائد وجدول السداد التفصيلي المعتمد.',
    metaTitle: 'حاسبة القروض والأقساط الشهرية – حساب التمويل الشخصي والسيارات',
    metaDescription: 'احسب قسطك الشهري بدقة وإجمالي الأرباح المستحقة لتمويلك وفق معادلة الأقساط البنكية المتناقصة أو المرابحة الثابتة مع جدول الإهلاك الكامل.',
    h1: 'حاسبة القروض والتمويل وجدول سداد الأقساط',
    searchKeywords: [
      'حاسبة القروض',
      'حساب القسط الشهري',
      'حاسبة التمويل الشخصي',
      'حاسبة قسط السيارة',
      'جدول سداد القرض',
    ],
    countryMode: 'COUNTRY_CONFIGURABLE',
    supportedCountries: ['*'],
    supportedJurisdictions: ['SAMA', 'CBE', 'Central Banks'],
    sourceIds: ['sama-sa', 'cbe-eg'],
    ruleVersion: '2026.1',
    verificationStatus: 'VERIFIED',
    publicationStatus: 'PUBLISHED',
    lastReviewedAt: '2026-10-18',
    calculationEngineId: 'finance.calculateLoan',
    calculate: calculateLoan,
    inputs: [
      {
        id: 'loanAmount',
        label: 'مبلغ التمويل / القرض المطلوب',
        type: 'currency',
        defaultValue: 100000,
        min: 1000,
        max: 10000000,
        step: 5000,
        required: true,
        helpText: 'أصل مبلغ القرض الذي تود الحصول عليه من البنك أو جهة التمويل.',
        exampleValue: 100000,
      },
      {
        id: 'annualRate',
        label: 'معدل الفائدة / الربح السنوي (APR)',
        type: 'percentage',
        defaultValue: 4.5,
        min: 0,
        max: 50,
        step: 0.1,
        unit: '%',
        required: true,
        helpText: 'النسبة السنوية للربح المقدمة من جهة التمويل.',
        exampleValue: 4.5,
      },
      {
        id: 'termYears',
        label: 'مدة التمويل (بالسنوات)',
        type: 'select',
        defaultValue: '5',
        options: [
          { value: '1', label: 'سنة واحدة (12 شهراً)' },
          { value: '2', label: 'سنتان (24 شهراً)' },
          { value: '3', label: '3 سنوات (36 شهراً)' },
          { value: '4', label: '4 سنوات (48 شهراً)' },
          { value: '5', label: '5 سنوات (60 شهراً - التمويل الشخصي القياسي)' },
          { value: '10', label: '10 سنوات (120 شهراً)' },
          { value: '15', label: '15 سنة (180 شهراً)' },
          { value: '20', label: '20 سنة (240 شهراً - التمويل العقاري)' },
        ],
      },
      {
        id: 'rateType',
        label: 'نوع احتساب الفائدة',
        type: 'radio',
        defaultValue: 'reducing',
        options: [
          { value: 'reducing', label: 'فائدة متناقصة بنكية (معيار البنوك المركزية)' },
          { value: 'flat', label: 'مرابحة ثابتة (Flat Rate على كامل المبلغ)' },
        ],
      },
    ],
    formula: 'القسط الشهري = [أصل القرض × (المعدل الشهري × (1 + المعدل الشهري)^الأشهر)] ÷ [((1 + المعدل الشهري)^الأشهر) - 1]',
    formulaExplanation: 'تعتمد البنوك الرسمية صيغة القسط المتساوي الثابت (Annuity Formula) مع رصيد الفائدة المتناقص حيث تنخفض حصة الفائدة شهرياً وترتفع حصة سداد أصل الدين.',
    workedExamples: [
      {
        title: 'مثال: تمويل شخصي بمبلغ 100,000 ريال على 5 سنوات بنسبة 4.5%',
        description: 'سداد على 60 شهراً بفائدة بنكية متناقصة.',
        inputs: { loanAmount: 100000, annualRate: 4.5, termYears: '5', rateType: 'reducing' },
        steps: [
          'القسط الشهري الثابت = 1,864.30 ر.س',
          'إجمالي الأرباح المدفوعة = 11,858.00 ر.س',
          'إجمالي ما يتم سداده = 111,858.00 ر.س',
        ],
        resultSummary: 'قسط شهري: 1,864.30 ريال، إجمالي الأرباح: 11,858 ريال',
      },
    ],
    faqs: [
      {
        question: 'ما هو الفرق بين الفائدة المتناقصة والفائدة الثابتة؟',
        answer: 'الفائدة المتناقصة تُحسب فقط على الرصيد المتبقي من القرض بعد كل قسط شهري، بينما الفائدة الثابتة تحسب على كامل مبلغ التمويل الأصلي طوال مدة القرض، مما يجعل التكلفة الفعلية للفائدة الثابتة أعلى تقريباً بمقدار الضعف مقارنة بنفس النسبة المتناقصة.',
      },
      {
        question: 'ما هو الحد الأقصى لنسبة الاستقطاع الشهري من الراتب؟',
        answer: 'تحدد معظم البنوك المركزية (مثل ساما في السعودية) الحد الأقصى للاستقطاع الشهري بـ 33.33% للتمويل الشخصي، ويرتفع إلى 45% أو 65% عند شمول التمويل العقاري أو للمتقاعدين وفق ضوابط التمويل المسؤول.',
      },
    ],
    relatedCalculatorIds: ['car-fuel-cost', 'vat-calculator', 'end-of-service-reward'],
  },
  {
    id: 'end-of-service-reward',
    slug: 'end-of-service-reward',
    nameAr: 'حاسبة مكافأة نهاية الخدمة للقطاع الخاص',
    nameEn: 'End of Service Gratuity Calculator',
    shortNameAr: 'مكافأة نهاية الخدمة',
    category: 'salary-employment',
    subcategory: 'مكافأة نهاية الخدمة',
    descriptionAr: 'احسب مستحقات مكافأة نهاية الخدمة بدقة متناهية وفق نظام العمل السعودي (المادتين 84 و 85) وقانون العمل الإماراتي الجديد لجميع حالات إنهاء العقد والاستقالة.',
    metaTitle: 'حاسبة مكافأة نهاية الخدمة – حساب مستحقات العمل في السعودية والإمارات',
    metaDescription: 'احسب مكافأة نهاية الخدمة بدقة وفق المادتين 84 و 85 من نظام العمل السعودي وقانون العمل الإماراتي مع مراعاة سنوات الخدمة وحالات الاستقالة وإنهاء العقد.',
    h1: 'حاسبة مكافأة نهاية الخدمة النظامية',
    searchKeywords: [
      'حاسبة مكافأة نهاية الخدمة',
      'حساب مكافأة نهاية الخدمة السعودية',
      'المادة 84 نظام العمل',
      'المادة 85 الاستقالة',
      'مستحقات نهاية الخدمة في الإمارات',
    ],
    countryMode: 'COUNTRY_REGULATED',
    supportedCountries: ['SA', 'AE', 'KW', 'QA', 'BH', 'OM'],
    supportedJurisdictions: ['HRSD', 'MoHRE'],
    sourceIds: ['hrsd-sa', 'mohre-ae'],
    ruleVersion: '2026.1',
    verificationStatus: 'VERIFIED',
    publicationStatus: 'PUBLISHED',
    lastReviewedAt: '2026-10-10',
    calculationEngineId: 'salary.calculateEndOfService',
    calculate: calculateEndOfService,
    inputs: [
      {
        id: 'salary',
        label: 'الراتب الشهري الأخير',
        type: 'currency',
        defaultValue: 8000,
        min: 500,
        max: 500000,
        step: 500,
        required: true,
        helpText: 'الراتب الفعلي الأخير (في السعودية يشمل الأساسي والبدلات الثابتة، وفي الإمارات الراتب الأساسي فقط).',
        exampleValue: 8000,
      },
      {
        id: 'years',
        label: 'عدد سنوات الخدمة',
        type: 'number',
        defaultValue: 6,
        min: 0,
        max: 60,
        step: 1,
        unit: 'سنة',
        required: true,
      },
      {
        id: 'months',
        label: 'عدد الأشهر الإضافية',
        type: 'number',
        defaultValue: 0,
        min: 0,
        max: 11,
        step: 1,
        unit: 'شهر',
      },
      {
        id: 'terminationReason',
        label: 'سبب انتهاء العلاقة التعاقدية',
        type: 'select',
        defaultValue: 'employer_end',
        options: [
          { value: 'employer_end', label: 'إنهاء العقد من صاحب العمل / انتهاء مدة العقد (استحقاق كامل 100%)' },
          { value: 'resignation', label: 'استقالة بمبادرة من العامل (تخضع لنسب المادة 85)' },
        ],
      },
      {
        id: 'country',
        label: 'الدولة لتطبيق نظام العمل',
        type: 'country',
        defaultValue: 'SA',
        options: [
          { value: 'SA', label: 'المملكة العربية السعودية (نظام العمل م/51)' },
          { value: 'AE', label: 'دولة الإمارات (المرسوم بقانون 33 لسنة 2021)' },
        ],
      },
    ],
    formula: 'السعودية: نصف شهر عن كل سنة من الـ 5 الأولى + شهر عن كل سنة تالية (مع تطبيق نسب الاستقالة إن وجدت)',
    formulaExplanation: 'يستحق العامل أجر نصف شهر عن كل سنة من السنوات الخمس الأولى، وأجر شهر كامل عن كل سنة تالية، وتحسب كسور السنة بنسبة ما قضاه العامل منها في العمل.',
    workedExamples: [
      {
        title: 'مثال: موظف في السعودية خدم 6 سنوات براتب 8,000 ريال وقدم استقالته',
        description: 'تطبيق المادة 84 لاحتساب المكافأة الأصلية ثم المادة 85 للاستقالة بين 5 و 10 سنوات (ثلثي المكافأة).',
        inputs: { salary: 8000, years: 6, months: 0, terminationReason: 'resignation', country: 'SA' },
        steps: [
          'مكافأة أول 5 سنوات = 5 × (8,000 ÷ 2) = 20,000 ر.س',
          'مكافأة السنة السادسة = 1 × 8,000 = 8,000 ر.س',
          'إجمالي المكافأة الكاملة = 28,000 ر.س',
          'نسبة استحقاق الاستقالة (خدمة بين 5 و 10 سنوات) = الثلثان (66.67%)',
          'المكافأة المستحقة = 28,000 × (2 ÷ 3) = 18,666.67 ر.س',
        ],
        resultSummary: '18,666.67 ريال سعودي مستحقة الصرف',
      },
    ],
    faqs: [
      {
        question: 'هل يحق للمستقيل الحصول على مكافأة نهاية الخدمة؟',
        answer: 'نعم بموجب المادة 85 من نظام العمل السعودي: إذا استقال العامل وكانت خدمته من سنتين إلى أقل من 5 سنوات يستحق ثلث المكافأة، ومن 5 إلى أقل من 10 سنوات يستحق ثلثي المكافأة، وإذا بلغت خدمته 10 سنوات فأكثر يستحق المكافأة كاملة.',
      },
      {
        question: 'هل يدخل بدل السكن والمواصلات في حساب المكافأة بالسعودية؟',
        answer: 'نعم، نص نظام العمل السعودي على أن المكافأة تحسب على أساس "الأجر الفعلي الأخير"، وهو يشمل الأجر الأساسي وجميع الزيادات والبدلات الثابتة المقررة للعامل كبدل السكن والنقل.',
      },
    ],
    relatedCalculatorIds: ['loan-calculator', 'vat-calculator', 'zakat-wealth'],
  },
  {
    id: 'zakat-wealth',
    slug: 'zakat-wealth',
    nameAr: 'حاسبة زكاة المال وعروض التجارة',
    nameEn: 'Zakat on Wealth & Commercial Goods Calculator',
    shortNameAr: 'حساب زكاة المال',
    category: 'taxation',
    subcategory: 'زكاة المال والأسهم',
    descriptionAr: 'احسب زكاة أموالك، الأرصدة البنكية، عروض التجارة، والأسهم، مع التحقق التلقائي من بلوغ النصاب الشرعي (85 غرام ذهب عيار 24).',
    metaTitle: 'حاسبة زكاة المال وعروض التجارة – حساب النصاب الشرعي 2.5%',
    metaDescription: 'أداة شرعية دقيقة لحساب زكاة المال والأرصدة النقدية وعروض التجارة بنسبة 2.5% للسنة الهجرية أو 2.577% للميلادية مع التحقق من النصاب.',
    h1: 'حاسبة زكاة المال وعروض التجارة الشرعية',
    searchKeywords: [
      'حاسبة الزكاة',
      'حساب زكاة المال',
      'نصاب الزكاة بالذهب',
      'زكاة عروض التجارة',
      'نسبة الزكاة 2.5',
    ],
    countryMode: 'UNIVERSAL',
    supportedCountries: ['*'],
    supportedJurisdictions: ['Islamic Fiqh Standards'],
    sourceIds: ['zatca-sa'],
    ruleVersion: '2026.1',
    verificationStatus: 'VERIFIED',
    publicationStatus: 'PUBLISHED',
    lastReviewedAt: '2026-10-01',
    calculationEngineId: 'tax.calculateZakatWealth',
    calculate: calculateZakatWealth,
    inputs: [
      {
        id: 'cash',
        label: 'النقد والأرصدة البنكية والودائع',
        type: 'currency',
        defaultValue: 50000,
        min: 0,
        max: 100000000,
        step: 1000,
        required: true,
        helpText: 'الأموال النقدية المتوفرة لديك أو في حساباتك البنكية التي حال عليها الحول.',
        exampleValue: 50000,
      },
      {
        id: 'tradeGoods',
        label: 'قيمة عروض التجارة والسلع المعدة للبيع',
        type: 'currency',
        defaultValue: 0,
        min: 0,
        max: 100000000,
        step: 1000,
        helpText: 'قيمة البضائع المعدة للبيع بسعر السوق الحالي وقت إخراج الزكاة.',
      },
      {
        id: 'receivables',
        label: 'الديون المرجوة السداد لك عند الآخرين',
        type: 'currency',
        defaultValue: 0,
        min: 0,
        max: 10000000,
        step: 500,
        helpText: 'الديون التي لك عند أشخاص موثوقين وقادرين على السداد.',
      },
      {
        id: 'debtsToDeduct',
        label: 'الديون والالتزامات العاجلة الواجبة عليك',
        type: 'currency',
        defaultValue: 0,
        min: 0,
        max: 10000000,
        step: 500,
        helpText: 'الديون التي يطالبك بها أصحابها وحان وقت سدادها الآن.',
      },
      {
        id: 'goldGramPrice',
        label: 'سعر غرام الذهب عيار 24 في دولتك',
        type: 'decimal',
        defaultValue: 310,
        min: 50,
        max: 1000,
        step: 5,
        unit: 'للغرام',
        helpText: 'يستخدم لتحديد نصاب الزكاة الشرعي وهو ما يعادل قيمة 85 غراماً من الذهب الخالص.',
      },
      {
        id: 'calendarType',
        label: 'التقويم المعتمد للحول',
        type: 'radio',
        defaultValue: 'hijri',
        options: [
          { value: 'hijri', label: 'سنة هجرية (354 يوماً - النسبة 2.5%)' },
          { value: 'gregorian', label: 'سنة ميلادية (365 يوماً - النسبة 2.577%)' },
        ],
      },
    ],
    formula: 'مقدار الزكاة = صافي الوعاء الزكوي (الأصول الزكوية - الديون العاجلة) × 2.5% (بشرط بلوغ النصاب: 85 غرام ذهب 24)',
    formulaExplanation: 'تجب الزكاة إذا بلغ المال النصاب وحال عليه الحول بنسبة ربع العشر (2.5%) في العام الهجري أو ما يعادله في العام الميلادي.',
    workedExamples: [
      {
        title: 'مثال: رصيد بنكي 50,000 ريال مع سعر غرام الذهب 310 ريال',
        description: 'حساب النصاب (85 × 310 = 26,350 ريال)، المبلغ تجاوز النصاب.',
        inputs: { cash: 50000, goldGramPrice: 310, calendarType: 'hijri' },
        steps: [
          'قيمة النصاب الشرعي = 85 × 310 = 26,350 ر.س',
          'المال (50,000) أكبر من النصاب، فتجب فيه الزكاة',
          'مقدار الزكاة = 50,000 × 0.025 = 1,250 ر.س',
        ],
        resultSummary: '1,250 ريال سعودي زكاة واجبة',
      },
    ],
    faqs: [
      {
        question: 'ما هو نصاب زكاة المال؟',
        answer: 'نصاب زكاة المال هو ما يعادل قيمة 85 غراماً من الذهب الخالص عيار 24، أو 595 غراماً من الفضة الخالصة، فإذا ملك المسلم هذا المبلغ وحال عليه الحول وجبت فيه الزكاة.',
      },
      {
        question: 'هل تجب الزكاة في منزل السكن والسيارة الشخصية؟',
        answer: 'لا، الأصول المقتناة للاستعمال الشخصي كالمنزل والسيارة والملابس والأثاث معفاة من الزكاة باتفاق العلماء.',
      },
    ],
    relatedCalculatorIds: ['vat-calculator', 'loan-calculator', 'percentage-calculator'],
  },
  {
    id: 'electricity-bill',
    slug: 'electricity-bill',
    nameAr: 'حاسبة فاتورة الكهرباء وشرائح الاستهلاك',
    nameEn: 'Electricity Bill & Consumption Tariff Calculator',
    shortNameAr: 'حساب فاتورة الكهرباء',
    category: 'electricity-energy',
    subcategory: 'فاتورة الكهرباء بالشرائح',
    descriptionAr: 'احسب التكلفة المتوقعة لفاتورة الكهرباء الشهرية بالشرائح المعتمدة في السعودية وخدمة العداد وضريبة القيمة المضافة.',
    metaTitle: 'حاسبة فاتورة الكهرباء – حساب الشرائح المنزلية والتجارية بالسعودية',
    metaDescription: 'احسب فاتورة الكهرباء بالشرائح: الشريحة الأولى (18 هللة) والشريحة الثانية (30 هللة) مع احتساب رسوم العداد وضريبة 15%.',
    h1: 'حاسبة فاتورة الكهرباء وشرائح الاستهلاك المعتمدة',
    searchKeywords: [
      'حاسبة فاتورة الكهرباء',
      'شرائح الكهرباء في السعودية',
      'حساب استهلاك الكهرباء كيلو واط',
      'حاسبة الكهرباء سكني',
    ],
    countryMode: 'COUNTRY_REGULATED',
    supportedCountries: ['SA', 'AE', 'EG'],
    supportedJurisdictions: ['SERA'],
    sourceIds: ['sera-sa'],
    ruleVersion: '2026.1',
    verificationStatus: 'VERIFIED',
    publicationStatus: 'PUBLISHED',
    lastReviewedAt: '2026-10-12',
    calculationEngineId: 'electricity.calculateElectricityBill',
    calculate: calculateElectricityBill,
    inputs: [
      {
        id: 'kwh',
        label: 'كمية الاستهلاك الشهري (كيلوواط / ساعة)',
        type: 'number',
        defaultValue: 4500,
        min: 1,
        max: 100000,
        step: 100,
        unit: 'ك.و.س',
        required: true,
        helpText: 'كمية الاستهلاك المسجلة في عداد الكهرباء خلال الشهر.',
        exampleValue: 4500,
      },
      {
        id: 'tariffCategory',
        label: 'نوع الاستهلاك / النشاط',
        type: 'select',
        defaultValue: 'residential',
        options: [
          { value: 'residential', label: 'سكني (منازل وشقق)' },
          { value: 'commercial', label: 'تجاري (محلات ومكاتب)' },
        ],
      },
      {
        id: 'meterBreakerAmps',
        label: 'سعة قاطع العداد (أمبير)',
        type: 'select',
        defaultValue: '60',
        options: [
          { value: '60', label: 'حتى 60 أمبير (مقابل خدمة 15 ر.س)' },
          { value: '100', label: 'أكثر من 60 أمبير (مقابل خدمة 20 ر.س)' },
        ],
      },
      {
        id: 'country',
        label: 'الدولة والتعرفة التنظيمية',
        type: 'country',
        defaultValue: 'SA',
        options: [
          { value: 'SA', label: 'السعودية (هيئة تنظيم المياه والكهرباء SERA)' },
          { value: 'AE', label: 'الإمارات' },
          { value: 'EG', label: 'مصر' },
        ],
      },
    ],
    formula: 'الفاتورة = (كيلوواط الشريحة 1 × سعر الشريحة 1) + (كيلوواط الشريحة 2 × سعر الشريحة 2) + خدمة العداد + الضريبة',
    formulaExplanation: 'في السعودية للقطاع السكني: تستهلك حتى 6000 ك.و.س بسعر 18 هللة/ك.و.س، وما زاد عنها بسعر 30 هللة/ك.و.س، ويضاف مقابل خدمة العداد وضريبة 15%.',
    workedExamples: [
      {
        title: 'مثال: استهلاك سكني شهري قدره 4,500 ك.و.س في السعودية',
        description: 'الاستهلاك يقع بالكامل ضمن الشريحة الأولى (أقل من 6,000 ك.و.س) مع قاطع 60 أمبير.',
        inputs: { kwh: 4500, tariffCategory: 'residential', meterBreakerAmps: 60, country: 'SA' },
        steps: [
          'تكلفة الطاقة: 4,500 × 0.18 ر.س = 810.00 ر.س',
          'خدمة العداد: 15.00 ر.س',
          'المجموع قبل الضريبة: 825.00 ر.س',
          'ضريبة القيمة المضافة (15%): 123.75 ر.س',
          'إجمالي الفاتورة: 948.75 ر.س',
        ],
        resultSummary: '948.75 ريال سعودي شاملة الضريبة',
      },
    ],
    faqs: [
      {
        question: 'ما هي شرائح الكهرباء السكنية في السعودية؟',
        answer: 'تنقسم التعرفة السكنية في السعودية إلى شريحتين: الشريحة الأولى من 1 إلى 6000 ك.و.س بتعرفة 18 هللة، والشريحة الثانية لأكثر من 6000 ك.و.س بتعرفة 30 هللة لكل كيلوواط/ساعة.',
      },
    ],
    relatedCalculatorIds: ['car-fuel-cost', 'vat-calculator', 'loan-calculator'],
  },
  {
    id: 'bmi-calculator',
    slug: 'bmi-calculator',
    nameAr: 'حاسبة مؤشر كتلة الجسم (BMI) والوزن المثالي',
    nameEn: 'Body Mass Index (BMI) & Ideal Weight Calculator',
    shortNameAr: 'حساب مؤشر كتلة الجسم',
    category: 'health-fitness',
    subcategory: 'مؤشر كتلة الجسم (BMI)',
    descriptionAr: 'احسب مؤشر كتلة الجسم (BMI) بدقة واكتشف تصنيفك الصحي ونطاق وزنك المثالي بالكيلوغرام وفق معايير منظمة الصحة العالمية (WHO).',
    metaTitle: 'حاسبة كتلة الجسم (BMI) والوزن المثالي – تصنيف منظمة الصحة العالمية',
    metaDescription: 'احسب مؤشر كتلة جسمك (BMI) واعرف هل وزنك طبيعي أم تعاني من زيادة أو نحافة، وتعرف على الوزن المثالي لطولك بالكيلوغرام مجاناً.',
    h1: 'حاسبة مؤشر كتلة الجسم والوزن الصحي',
    searchKeywords: [
      'حاسبة bmi',
      'حساب مؤشر كتلة الجسم',
      'الوزن المثالي للطول',
      'حاسبة الوزن المثالي',
      'كتلة الجسم منظمة الصحة العالمية',
    ],
    countryMode: 'UNIVERSAL',
    supportedCountries: ['*'],
    supportedJurisdictions: ['WHO'],
    sourceIds: ['who-intl'],
    ruleVersion: '2026.1',
    verificationStatus: 'VERIFIED',
    publicationStatus: 'PUBLISHED',
    lastReviewedAt: '2026-10-05',
    calculationEngineId: 'health.calculateBmi',
    calculate: calculateBmi,
    inputs: [
      {
        id: 'weightKg',
        label: 'الوزن (كيلوغرام)',
        type: 'decimal',
        defaultValue: 75,
        min: 20,
        max: 300,
        step: 0.5,
        unit: 'كجم',
        required: true,
        helpText: 'وزنك الحالي بالكيلوغرام.',
        exampleValue: 75,
      },
      {
        id: 'heightCm',
        label: 'الطول (سنتيمتر)',
        type: 'number',
        defaultValue: 175,
        min: 100,
        max: 230,
        step: 1,
        unit: 'سم',
        required: true,
        helpText: 'طولك بالسنتيمتر بدون حذاء.',
        exampleValue: 175,
      },
    ],
    formula: 'مؤشر كتلة الجسم (BMI) = الوزن بالكيلوغرام ÷ (الطول بالمتر)^2',
    formulaExplanation: 'يقسم الوزن على مربع الطول بالأمتار، ويقارن الناتج مع فئات منظمة الصحة العالمية لتحديد ما إذا كان الوزن طبيعياً أو نحيفاً أو زائداً.',
    workedExamples: [
      {
        title: 'مثال: شخص وزنه 75 كجم وطوله 175 سم',
        description: 'تحويل الطول لأمتار (1.75 م) وتطبيق المعادلة.',
        inputs: { weightKg: 75, heightCm: 175 },
        steps: [
          'تربيع الطول: 1.75 × 1.75 = 3.0625 م²',
          'حساب المؤشر: 75 ÷ 3.0625 = 24.5 كجم/م²',
          'المؤشر يقع بين 18.5 و 24.9، فالوزن طبيعي وصحي.',
        ],
        resultSummary: '24.5 كجم/م² (وزن طبيعي وصحي)',
      },
    ],
    faqs: [
      {
        question: 'ما هي المعدلات الطبيعية لمؤشر كتلة الجسم؟',
        answer: 'وفقاً لمنظمة الصحة العالمية: أقل من 18.5 يعني نحافة، من 18.5 إلى 24.9 يعتبر وزناً طبيعياً وصحياً، من 25 إلى 29.9 زيادة وزن، و30 فأكثر يعتبر سمنة.',
      },
    ],
    relatedCalculatorIds: ['percentage-calculator', 'car-fuel-cost'],
  },
  {
    id: 'percentage-calculator',
    slug: 'percentage-calculator',
    nameAr: 'حاسبة النسبة المئوية الشاملة والتغير المئوي',
    nameEn: 'Comprehensive Percentage & Percent Change Calculator',
    shortNameAr: 'حساب النسبة المئوية',
    category: 'mathematics-percentages',
    subcategory: 'حساب النسب المئوية',
    descriptionAr: 'احسب النسبة المئوية من أي مبلغ، أو احسب نسبة عدد من آخر، ومعدل الزيادة أو النقصان المئوي بدقة وفورية.',
    metaTitle: 'حاسبة النسبة المئوية – حساب النسبة من مبلغ ومعدل الزيادة والنقصان',
    metaDescription: 'أداة سهلة وسريعة لحساب النسب المئوية: كم يساوي X% من Y، أو نسبة رقم إلى رقم آخر، وحساب نسبة الخصم والزيادة المئوية خطوة بخطوة.',
    h1: 'حاسبة النسبة المئوية والتغير المئوي',
    searchKeywords: [
      'حاسبة النسبة المئوية',
      'حساب النسبة من مبلغ',
      'كيف احسب النسبة المئوية',
      'حساب التغير المئوي',
      'نسبة الزيادة والنقصان',
    ],
    countryMode: 'UNIVERSAL',
    supportedCountries: ['*'],
    supportedJurisdictions: [],
    sourceIds: [],
    ruleVersion: '2026.1',
    verificationStatus: 'VERIFIED',
    publicationStatus: 'PUBLISHED',
    lastReviewedAt: '2026-10-01',
    calculationEngineId: 'math.calculatePercentage',
    calculate: calculatePercentage,
    inputs: [
      {
        id: 'mode',
        label: 'نوع العملية الحسابية للنسبة المئوية',
        type: 'select',
        defaultValue: 'percent_of',
        options: [
          { value: 'percent_of', label: 'حساب قيمة نسبة مئوية من مبلغ (مثال: كم يساوي 15% من 500؟)' },
          { value: 'is_what_percent', label: 'حساب نسبة عدد إلى عدد آخر (مثال: 50 يمثل كم بالمئة من 200؟)' },
          { value: 'change', label: 'حساب نسبة التغير / الزيادة / الانخفاض بين قيمتين' },
        ],
      },
      {
        id: 'valueA',
        label: 'القيمة الأولى',
        type: 'decimal',
        defaultValue: 15,
        step: 0.1,
        required: true,
        conditionalLabels: [
          { condition: { field: 'mode', value: 'percent_of' }, label: 'النسبة المئوية (%)', unit: '%' },
          { condition: { field: 'mode', value: 'is_what_percent' }, label: 'العدد الجزئي (البسط)' },
          { condition: { field: 'mode', value: 'change' }, label: 'القيمة الأصلية (قبل التغير)' },
        ],
        exampleValue: 15,
      },
      {
        id: 'valueB',
        label: 'القيمة الثانية',
        type: 'decimal',
        defaultValue: 500,
        step: 0.1,
        required: true,
        conditionalLabels: [
          { condition: { field: 'mode', value: 'percent_of' }, label: 'المبلغ الإجمالي (العدد الكلي)' },
          { condition: { field: 'mode', value: 'is_what_percent' }, label: 'العدد الكلي (المقام)' },
          { condition: { field: 'mode', value: 'change' }, label: 'القيمة الجديدة (بعد التغير)' },
        ],
        exampleValue: 500,
      },
    ],
    formula: 'قيمة النسبة = (النسبة ÷ 100) × المبلغ الإجمالي',
    formulaExplanation: 'لحساب قيمة نسبة معينة من رقم، تُقسم النسبة على 100 ثم تُضرب في الرقم الإجمالي.',
    workedExamples: [
      {
        title: 'مثال: حساب 15% من مبلغ 500 ريال',
        description: 'تطبيق معادلة النسبة المئوية المباشرة.',
        inputs: { mode: 'percent_of', valueA: 15, valueB: 500 },
        steps: [
          'قسمة النسبة على مئة: 15 ÷ 100 = 0.15',
          'الضرب في المبلغ: 0.15 × 500 = 75',
        ],
        resultSummary: 'الناتج هو 75',
      },
    ],
    faqs: [
      {
        question: 'كيف أحسب النسبة المئوية لخصم معين في المتاجر؟',
        answer: 'لحساب قيمة الخصم: اضرب السعر الأصلي في نسبة الخصم واقسم الناتج على 100. لمعرفة السعر النهائي بعد الخصم: اطرح قيمة الخصم من السعر الأصلي.',
      },
    ],
    relatedCalculatorIds: ['vat-calculator', 'loan-calculator', 'zakat-wealth'],
  },
];

// O(1) lookup map
const SLUG_MAP = new Map<string, CalculatorDefinition>();
for (const calc of ALL_CALCULATORS) {
  SLUG_MAP.set(calc.slug, calc);
  SLUG_MAP.set(calc.id, calc);
}

export function getCalculatorBySlug(slug: string): CalculatorDefinition | undefined {
  return SLUG_MAP.get(slug);
}

export function getCalculatorsByCategory(categorySlug: string): CalculatorDefinition[] {
  return ALL_CALCULATORS.filter((c) => c.category === categorySlug);
}

export function getCalculatorsByCountry(countryCode: string): CalculatorDefinition[] {
  const code = countryCode.toUpperCase();
  return ALL_CALCULATORS.filter(
    (c) => c.supportedCountries.includes('*') || c.supportedCountries.map((s) => s.toUpperCase()).includes(code)
  );
}

export function getRelatedCalculators(
  calc: CalculatorDefinition,
  limit = 4,
  countryCode?: string
): CalculatorDefinition[] {
  const result: CalculatorDefinition[] = [];
  const addedSlugs = new Set<string>([calc.slug]);

  // 1. Explicitly configured relatedCalculatorIds
  for (const relId of calc.relatedCalculatorIds) {
    const related = getCalculatorBySlug(relId);
    if (related && !addedSlugs.has(related.slug)) {
      if (!countryCode || related.supportedCountries.includes('*') || related.supportedCountries.includes(countryCode.toUpperCase())) {
        result.push(related);
        addedSlugs.add(related.slug);
        if (result.length >= limit) return result;
      }
    }
  }

  // 2. Same subcategory
  if (calc.subcategory) {
    for (const c of ALL_CALCULATORS) {
      if (c.subcategory === calc.subcategory && !addedSlugs.has(c.slug)) {
        if (!countryCode || c.supportedCountries.includes('*') || c.supportedCountries.includes(countryCode.toUpperCase())) {
          result.push(c);
          addedSlugs.add(c.slug);
          if (result.length >= limit) return result;
        }
      }
    }
  }

  // 3. Same category
  for (const c of ALL_CALCULATORS) {
    if (c.category === calc.category && !addedSlugs.has(c.slug)) {
      if (!countryCode || c.supportedCountries.includes('*') || c.supportedCountries.includes(countryCode.toUpperCase())) {
        result.push(c);
        addedSlugs.add(c.slug);
        if (result.length >= limit) return result;
      }
    }
  }

  return result;
}

export function getAllCalculatorSlugs(): string[] {
  return ALL_CALCULATORS.map((c) => c.slug);
}
