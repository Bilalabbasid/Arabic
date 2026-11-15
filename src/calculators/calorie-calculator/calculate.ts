import { CalculationResult } from '../../types/calculator';

export type CalorieSex = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
export type CalorieGoal = 'maintain' | 'lose025' | 'lose05' | 'lose1' | 'gain025' | 'gain05';

/** Standard activity multipliers applied to BMR to get total daily energy expenditure (TDEE). */
export const ACTIVITY_FACTORS: Record<ActivityLevel, { factor: number; label: string }> = {
  sedentary: { factor: 1.2, label: 'خامل (عمل مكتبي بلا رياضة)' },
  light: { factor: 1.375, label: 'نشاط خفيف (رياضة 1–3 أيام أسبوعياً)' },
  moderate: { factor: 1.55, label: 'نشاط متوسط (رياضة 3–5 أيام أسبوعياً)' },
  active: { factor: 1.725, label: 'نشاط عالٍ (رياضة 6–7 أيام أسبوعياً)' },
  very_active: { factor: 1.9, label: 'نشاط عالٍ جداً (تمرين مرتين يومياً أو عمل بدني شاق)' },
};

/** Weekly weight change in kg per goal (negative = loss). */
export const GOAL_KG_PER_WEEK: Record<CalorieGoal, number> = {
  maintain: 0,
  lose025: -0.25,
  lose05: -0.5,
  lose1: -1,
  gain025: 0.25,
  gain05: 0.5,
};

/** Energy in 1 kg of body fat (kcal), the common planning figure. */
export const KCAL_PER_KG = 7700;

/** Minimum daily intake without medical supervision. */
export const CALORIE_FLOOR: Record<CalorieSex, number> = { male: 1500, female: 1200 };

/** Balanced macro split, inside the US Dietary Reference Intakes ranges (protein 10–35%, carbs 45–65%, fat 20–35%). */
export const MACRO_SPLIT = { protein: 0.25, carbs: 0.45, fat: 0.3 } as const;

export interface CalorieInputs {
  sex?: CalorieSex | string;
  age: number | string;
  heightCm: number | string;
  weightKg: number | string;
  activity?: ActivityLevel | string;
  goal?: CalorieGoal | string;
  bodyFatPercent?: number | string;
}

const fmt = (n: number) => Math.round(n).toLocaleString('en-US');

/** Mifflin-St Jeor (1990): 10 × kg + 6.25 × cm − 5 × age + 5 (men) or − 161 (women). */
export function mifflinStJeor(sex: CalorieSex, weightKg: number, heightCm: number, age: number): number {
  return 10 * weightKg + 6.25 * heightCm - 5 * age + (sex === 'male' ? 5 : -161);
}

/** Katch-McArdle: 370 + 21.6 × lean body mass (kg). */
export function katchMcArdle(weightKg: number, bodyFatPercent: number): number {
  return 370 + 21.6 * weightKg * (1 - bodyFatPercent / 100);
}

export function dailyAdjustment(goal: CalorieGoal): number {
  return (GOAL_KG_PER_WEEK[goal] * KCAL_PER_KG) / 7;
}

const GOAL_LABELS: Record<CalorieGoal, string> = {
  maintain: 'الحفاظ على الوزن',
  lose025: 'خسارة ربع كيلو أسبوعياً',
  lose05: 'خسارة نصف كيلو أسبوعياً',
  lose1: 'خسارة كيلو أسبوعياً',
  gain025: 'زيادة ربع كيلو أسبوعياً',
  gain05: 'زيادة نصف كيلو أسبوعياً',
};

export function calculateCalories(inputs: CalorieInputs): CalculationResult {
  const sex: CalorieSex = String(inputs.sex) === 'female' ? 'female' : 'male';
  const age = Number(inputs.age);
  const h = Number(inputs.heightCm);
  const w = Number(inputs.weightKg);
  const activity: ActivityLevel = (String(inputs.activity) in ACTIVITY_FACTORS ? inputs.activity : 'sedentary') as ActivityLevel;
  const goal: CalorieGoal = (String(inputs.goal) in GOAL_KG_PER_WEEK ? inputs.goal : 'maintain') as CalorieGoal;
  const bf = Number(inputs.bodyFatPercent) || 0;

  const fail = (error: string): CalculationResult => ({
    primary: { label: 'السعرات اليومية', value: 0, formattedValue: '-' },
    error,
  });
  if (!Number.isFinite(age) || age < 15 || age > 100) return fail('أدخل العمر بين 15 و 100 سنة.');
  if (!Number.isFinite(h) || h < 120 || h > 230) return fail('أدخل الطول بالسنتيمتر بين 120 و 230 سم.');
  if (!Number.isFinite(w) || w < 30 || w > 300) return fail('أدخل الوزن بالكيلوغرام بين 30 و 300 كغ.');
  if (bf < 0 || bf > 60) return fail('نسبة الدهون يجب أن تكون بين 0 و 60%، أو اتركها 0.');

  const useKatch = bf >= 3;
  const mifflin = mifflinStJeor(sex, w, h, age);
  const bmr = useKatch ? katchMcArdle(w, bf) : mifflin;
  const { factor, label: activityLabel } = ACTIVITY_FACTORS[activity];
  const tdee = bmr * factor;
  const adjustment = dailyAdjustment(goal);
  const rawTarget = tdee + adjustment;
  const floor = CALORIE_FLOOR[sex];
  const target = adjustment < 0 ? Math.max(rawTarget, floor) : rawTarget;
  const floored = adjustment < 0 && rawTarget < floor;

  const macros = {
    protein: (target * MACRO_SPLIT.protein) / 4,
    carbs: (target * MACRO_SPLIT.carbs) / 4,
    fat: (target * MACRO_SPLIT.fat) / 9,
  };

  const warnings: string[] = [];
  if (age < 18) warnings.push('المعادلة مخصصة للبالغين؛ احتياج المراهقين يزيد بسبب النمو، فلا تتبع حمية إنقاص دون إشراف طبي.');
  if (floored) {
    warnings.push(
      `العجز المطلوب يُنزل السعرات إلى ${fmt(rawTarget)} سعرة، وهذا أقل من الحد الأدنى الآمن (${fmt(floor)} سعرة ${sex === 'male' ? 'للرجال' : 'للنساء'})، فرفعنا الهدف إلى ${fmt(floor)}. اختر هدف خسارة أبطأ أو زد نشاطك.`
    );
  }
  if (goal === 'lose1') warnings.push('خسارة كيلو أسبوعياً هي الحد الأعلى الموصى به، وتناسب من لديهم وزن زائد كبير؛ الأفضل لمعظم الناس نصف كيلو.');

  const goalLabel = GOAL_LABELS[goal];
  const sexAr = sex === 'male' ? 'رجل' : 'امرأة';
  const bmrMethod = useKatch ? 'كاتش-مكاردل (حسب الكتلة العضلية)' : 'ميفلين-سانت جيور';

  const secondary: NonNullable<CalculationResult['secondary']> = [
    { id: 'bmr', label: `معدل الأيض الأساسي BMR (${bmrMethod})`, value: Math.round(bmr), formattedValue: `${fmt(bmr)} سعرة`, helpText: 'ما يحرقه جسمك في راحة تامة طوال اليوم' },
    { id: 'tdee', label: 'سعرات الثبات TDEE (للحفاظ على وزنك)', value: Math.round(tdee), formattedValue: `${fmt(tdee)} سعرة` },
    { id: 'lose05', label: 'لخسارة نصف كيلو أسبوعياً', value: Math.round(Math.max(tdee - 550, floor)), formattedValue: `${fmt(Math.max(tdee - 550, floor))} سعرة` },
    { id: 'lose1', label: 'لخسارة كيلو أسبوعياً', value: Math.round(Math.max(tdee - 1100, floor)), formattedValue: `${fmt(Math.max(tdee - 1100, floor))} سعرة` },
    { id: 'gain05', label: 'لزيادة نصف كيلو أسبوعياً', value: Math.round(tdee + 550), formattedValue: `${fmt(tdee + 550)} سعرة` },
    { id: 'protein', label: `البروتين (${MACRO_SPLIT.protein * 100}% من السعرات)`, value: Math.round(macros.protein), unit: 'غرام' },
    { id: 'carbs', label: `الكربوهيدرات (${MACRO_SPLIT.carbs * 100}%)`, value: Math.round(macros.carbs), unit: 'غرام' },
    { id: 'fat', label: `الدهون (${MACRO_SPLIT.fat * 100}%)`, value: Math.round(macros.fat), unit: 'غرام' },
  ];

  const steps = useKatch
    ? [
        `الكتلة الخالية من الدهون = ${w} × (1 − ${bf}%) = ${(w * (1 - bf / 100)).toFixed(1)} كغ`,
        `BMR (كاتش-مكاردل) = 370 + 21.6 × ${(w * (1 - bf / 100)).toFixed(1)} = ${fmt(bmr)} سعرة`,
      ]
    : [
        `BMR (ميفلين-سانت جيور) = 10 × ${w} + 6.25 × ${h} − 5 × ${age} ${sex === 'male' ? '+ 5' : '− 161'} = ${fmt(bmr)} سعرة`,
      ];
  steps.push(`سعرات الثبات = ${fmt(bmr)} × ${factor} (${activityLabel}) = ${fmt(tdee)} سعرة`);
  if (adjustment !== 0) {
    steps.push(
      `${adjustment < 0 ? 'العجز' : 'الفائض'} اليومي = ${Math.abs(GOAL_KG_PER_WEEK[goal])} كغ × 7700 ÷ 7 = ${fmt(Math.abs(adjustment))} سعرة، فالهدف = ${fmt(tdee)} ${adjustment < 0 ? '−' : '+'} ${fmt(Math.abs(adjustment))} = ${fmt(rawTarget)} سعرة${floored ? ` (رُفع إلى الحد الأدنى ${fmt(floor)})` : ''}`
    );
  }
  steps.push(`البروتين = ${fmt(target)} × 25% ÷ 4 = ${Math.round(macros.protein)} غ، الكربوهيدرات = ${fmt(target)} × 45% ÷ 4 = ${Math.round(macros.carbs)} غ، الدهون = ${fmt(target)} × 30% ÷ 9 = ${Math.round(macros.fat)} غ`);

  return {
    primary: {
      id: 'target',
      label: `السعرات اليومية لهدف: ${goalLabel}`,
      value: Math.round(target),
      formattedValue: `${fmt(target)} سعرة حرارية يومياً`,
      badge: `سعرات الثبات ${fmt(tdee)}`,
      highlight: true,
    },
    directAnswer: `يحتاج ${sexAr} عمره ${age} سنة وطوله ${h} سم ووزنه ${w} كغ بنشاط ${activityLabel.split(' (')[0]} إلى نحو ${fmt(tdee)} سعرة يومياً للحفاظ على وزنه، و${fmt(target)} سعرة لهدف ${goalLabel}.`,
    secondary,
    details: [
      { label: 'معادلة الأيض الأساسي', value: bmrMethod },
      { label: 'معامل النشاط', value: `${factor} – ${activityLabel}` },
      ...(useKatch ? [{ label: 'BMR بمعادلة ميفلين للمقارنة', value: `${fmt(mifflin)} سعرة` }] : []),
    ],
    calculationSteps: steps,
    warnings: warnings.length ? warnings : undefined,
    assumptions: [
      'المعادلات تقدّر الاحتياج بدقة ±10% لمعظم البالغين؛ راقب وزنك أسبوعين وعدّل السعرات 100–200 سعرة حسب النتيجة الفعلية.',
      'الكيلو من دهون الجسم ≈ 7700 سعرة، لذلك عجز 550 سعرة يومياً يعادل نحو نصف كيلو أسبوعياً.',
    ],
  };
}
