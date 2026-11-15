import { CalculationResult } from '../../types/calculator';

export type Sex = 'male' | 'female';
export type Frame = 'small' | 'medium' | 'large';

/**
 * Ideal body weight formulas (kg) based on inches of height above 5 feet (152.4 cm):
 * - Devine (1974):   male 50 + 2.3 × in,   female 45.5 + 2.3 × in
 * - Robinson (1983): male 52 + 1.9 × in,   female 49 + 1.7 × in
 * - Miller (1983):   male 56.2 + 1.41 × in, female 53.1 + 1.36 × in
 * - Hamwi (1964):    male 48 + 2.7 × in,   female 45.5 + 2.2 × in (±10% for small/large frame)
 */
export const IDEAL_WEIGHT_FORMULAS: Record<'devine' | 'robinson' | 'miller' | 'hamwi', Record<Sex, [number, number]>> = {
  devine: { male: [50, 2.3], female: [45.5, 2.3] },
  robinson: { male: [52, 1.9], female: [49, 1.7] },
  miller: { male: [56.2, 1.41], female: [53.1, 1.36] },
  hamwi: { male: [48, 2.7], female: [45.5, 2.2] },
};

export const HEALTHY_BMI_MIN = 18.5;
export const HEALTHY_BMI_MAX = 24.9;

export interface IdealWeightInputs {
  heightCm: number | string;
  sex?: Sex | string;
  age?: number | string;
  frame?: Frame | string;
  currentWeightKg?: number | string;
}

const round1 = (n: number) => Math.round(n * 10) / 10;

export function inchesOverFiveFeet(heightCm: number): number {
  return heightCm / 2.54 - 60;
}

export function calculateIdealWeight(inputs: IdealWeightInputs): CalculationResult {
  const h = Number(inputs.heightCm);
  const sex: Sex = String(inputs.sex) === 'female' ? 'female' : 'male';
  const frame: Frame = inputs.frame === 'small' || inputs.frame === 'large' ? (inputs.frame as Frame) : 'medium';
  const age = Number(inputs.age) || 0;
  const current = Number(inputs.currentWeightKg) || 0;

  if (!Number.isFinite(h) || h < 120 || h > 230) {
    return {
      primary: { label: 'الوزن المثالي', value: 0, formattedValue: '-' },
      error: 'أدخل الطول بالسنتيمتر بين 120 و 230 سم.',
    };
  }

  const inches = inchesOverFiveFeet(h);
  const formula = (key: keyof typeof IDEAL_WEIGHT_FORMULAS) => {
    const [base, perInch] = IDEAL_WEIGHT_FORMULAS[key][sex];
    return base + perInch * inches;
  };

  const devine = formula('devine');
  const robinson = formula('robinson');
  const miller = formula('miller');
  const hamwiBase = formula('hamwi');
  const frameFactor = frame === 'small' ? 0.9 : frame === 'large' ? 1.1 : 1;
  const hamwi = hamwiBase * frameFactor;
  const average = (devine + robinson + miller + hamwi) / 4;

  const m = h / 100;
  const bmiMin = HEALTHY_BMI_MIN * m * m;
  const bmiMax = HEALTHY_BMI_MAX * m * m;

  const warnings: string[] = [];
  if (age > 0 && age < 18) {
    warnings.push('هذه المعادلات مخصصة للبالغين (18 سنة فأكثر)؛ وزن الأطفال والمراهقين يُقيّم بمنحنيات النمو حسب العمر.');
  }
  if (h < 152.4) {
    warnings.push('الطول أقل من 152.4 سم (5 أقدام)، والمعادلات صُممت لما فوق هذا الطول، لذلك اعتمد نطاق مؤشر كتلة الجسم أكثر.');
  }

  const sexAr = sex === 'male' ? 'رجل' : 'امرأة';
  const secondary: NonNullable<CalculationResult['secondary']> = [
    { id: 'bmiRange', label: 'النطاق الصحي حسب مؤشر كتلة الجسم (18.5–24.9)', value: `${round1(bmiMin)} – ${round1(bmiMax)}`, unit: 'كغ' },
    { id: 'devine', label: 'معادلة ديفاين (Devine)', value: round1(devine), unit: 'كغ' },
    { id: 'robinson', label: 'معادلة روبنسون (Robinson)', value: round1(robinson), unit: 'كغ' },
    { id: 'miller', label: 'معادلة ميلر (Miller)', value: round1(miller), unit: 'كغ' },
    {
      id: 'hamwi',
      label: frame === 'medium' ? 'معادلة هاموي (Hamwi)' : `معادلة هاموي (Hamwi) معدلة لبنية ${frame === 'small' ? 'صغيرة −10%' : 'كبيرة +10%'}`,
      value: round1(hamwi),
      unit: 'كغ',
    },
  ];

  if (current > 0) {
    const bmi = current / (m * m);
    let status: string;
    if (current < bmiMin) status = `أقل من النطاق الصحي بـ ${round1(bmiMin - current)} كغ`;
    else if (current > bmiMax) status = `أعلى من النطاق الصحي بـ ${round1(current - bmiMax)} كغ`;
    else status = 'ضمن النطاق الصحي';
    secondary.push({ id: 'currentStatus', label: `وزنك الحالي ${current} كغ (BMI ${bmi.toFixed(1)})`, value: status });
  }

  return {
    primary: {
      id: 'idealAverage',
      label: 'الوزن المثالي التقديري (متوسط المعادلات الأربع)',
      value: round1(average),
      formattedValue: `${round1(average)} كغ`,
      badge: `النطاق الصحي ${round1(bmiMin)}–${round1(bmiMax)} كغ`,
      highlight: true,
    },
    directAnswer: `الوزن المثالي لـ${sexAr} طوله ${h} سم نحو ${round1(average)} كغ، والنطاق الصحي حسب مؤشر كتلة الجسم من ${round1(bmiMin)} إلى ${round1(bmiMax)} كغ.`,
    secondary,
    details: [
      { label: 'الطول بالبوصة فوق 5 أقدام', value: round1(inches) },
      { label: 'الجنس', value: sex === 'male' ? 'ذكر' : 'أنثى' },
      { label: 'بنية الجسم', value: frame === 'small' ? 'صغيرة' : frame === 'large' ? 'كبيرة' : 'متوسطة' },
    ],
    calculationSteps: [
      `الطول بالبوصة = ${h} ÷ 2.54 = ${round1(h / 2.54)} بوصة، والزيادة فوق 60 بوصة = ${inches.toFixed(2)}`,
      `ديفاين = ${IDEAL_WEIGHT_FORMULAS.devine[sex][0]} + ${IDEAL_WEIGHT_FORMULAS.devine[sex][1]} × ${inches.toFixed(2)} = ${round1(devine)} كغ`,
      `روبنسون = ${IDEAL_WEIGHT_FORMULAS.robinson[sex][0]} + ${IDEAL_WEIGHT_FORMULAS.robinson[sex][1]} × ${inches.toFixed(2)} = ${round1(robinson)} كغ`,
      `ميلر = ${IDEAL_WEIGHT_FORMULAS.miller[sex][0]} + ${IDEAL_WEIGHT_FORMULAS.miller[sex][1]} × ${inches.toFixed(2)} = ${round1(miller)} كغ`,
      `هاموي = ${IDEAL_WEIGHT_FORMULAS.hamwi[sex][0]} + ${IDEAL_WEIGHT_FORMULAS.hamwi[sex][1]} × ${inches.toFixed(2)}${frameFactor !== 1 ? ` × ${frameFactor}` : ''} = ${round1(hamwi)} كغ`,
      `النطاق الصحي = 18.5 × ${m.toFixed(2)}² إلى 24.9 × ${m.toFixed(2)}² = ${round1(bmiMin)} – ${round1(bmiMax)} كغ`,
    ],
    warnings: warnings.length ? warnings : undefined,
    assumptions: [
      'المعادلات تقديرات إحصائية للبالغين ولا تراعي الكتلة العضلية أو الحمل أو الحالات المرضية؛ استشر الطبيب لتحديد وزن مستهدف شخصي.',
    ],
  };
}
