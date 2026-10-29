export interface GuideArticle {
  slug: string;
  titleAr: string;
  summaryAr: string;
  category: string;
  readingTimeMinutes: number;
  updatedAt: string;
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string;
    }[];
    conclusion: string;
  };
  relatedCalculatorSlug: string;
}

export const GUIDES: GuideArticle[] = [
  {
    slug: 'how-to-calculate-car-fuel-cost',
    titleAr: 'دليل حساب استهلاك وقود السيارة وتكلفة السفر والمشاوير',
    summaryAr: 'تعرف على الطريقة الرياضية لحساب لترات البنزين المستهلكة لكل 100 كيلومتر وتأثير السرعة والمكيف على تكلفة الرحلة.',
    category: 'cars-transportation',
    readingTimeMinutes: 4,
    updatedAt: '2026-10-15',
    relatedCalculatorSlug: 'car-fuel-cost',
    content: {
      intro: 'تعد تكلفة الوقود من أكبر بنود المصاريف التشغيلية لأي سيارة. يساعدك فهم معدل استهلاك سيارتك في تخطيط ميزانيتك الشهرية بدقة.',
      sections: [
        {
          heading: '1. معادلة استهلاك البنزين القياسية',
          body: 'تُحسب كمية الوقود المستهلكة بالمعادلة: (المسافة المقطوعة بالكم × معدل استهلاك السيارة للترات لكل 100 كم) ÷ 100. بعد ذلك، يُضرب عدد اللترات في سعر لتر الوقود في محطتك.',
        },
        {
          heading: '2. نصائح ذهبية لتقليل استهلاك الوقود',
          body: 'تجنب التسارع المفاجئ، وحافظ على ضغط الإطارات المناسب والموصى به من المصنع، وتجنب الحمولات الزائدة غير الضرورية في حقيبة السيارة الخلفية.',
        },
      ],
      conclusion: 'يمكنك استخدام حاسبة تكلفة الوقود التفاعلية على منصتنا لتحديد تكلفة أي رحلة فورياً بأسعار الوقود المعتمدة في بلدك.',
    },
  },
  {
    slug: 'saudi-end-of-service-gratuity-guide',
    titleAr: 'الدليل الشامل لمكافأة نهاية الخدمة وفق المادتين 84 و 85 من نظام العمل السعودي',
    summaryAr: 'شرح مفصل لكيفية حساب مكافأة نهاية الخدمة في عقود العمل محددة وغير محددة المدة وحالات الاستقالة وإنهاء العقد.',
    category: 'salary-employment',
    readingTimeMinutes: 5,
    updatedAt: '2026-10-18',
    relatedCalculatorSlug: 'end-of-service-reward',
    content: {
      intro: 'تعتبر مكافأة نهاية الخدمة حقاً أصيلاً للعامل كفله نظام العمل السعودي، ويتم احتسابها بناءً على الأجر الفعلي الأخير ومدة الخدمة.',
      sections: [
        {
          heading: '1. الاستحقاق في حالة إنهاء العقد (المادة 84)',
          body: 'يستحق العامل أجر نصف شهر عن كل سنة من السنوات الخمس الأولى، وأجر شهر كامل عن كل سنة تالية، وتستحق أجزاء السنة بنسبة ما قضاه العامل منها في العمل.',
        },
        {
          heading: '2. حالات استقالة العامل (المادة 85)',
          body: 'إذا انتهت علاقة العمل بسبب استقالة العامل، يستحق ثلث المكافأة بعد خدمة لا تقل عن سنتين متتاليتين ولا تزيد على 5 سنوات، ويستحق ثلثيها إذا زادت مدة خدمته على 5 سنوات ولم تبلغ 10 سنوات، ويستحق المكافأة كاملة إذا بلغت مدة خدمته 10 سنوات فأكثر.',
        },
      ],
      conclusion: 'احسب مستحقاتك بدقة الآن عبر حاسبة مكافأة نهاية الخدمة المعتمدة في منصة لِسيارتك.',
    },
  },
];

export function getGuideBySlug(slug: string): GuideArticle | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getAllGuides(): GuideArticle[] {
  return GUIDES;
}
