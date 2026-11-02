import { CalculationResult } from '../../types/calculator';

export interface BmiInputs {
  weightKg: number;
  heightCm: number;
  gender?: 'male' | 'female';
}

export function calculateBmi(inputs: BmiInputs): CalculationResult {
  const weight = Number(inputs.weightKg) || 75;
  const heightCm = Number(inputs.heightCm) || 175;
  const heightM = heightCm / 100;

  const bmi = heightM > 0 ? weight / (heightM * heightM) : 0;

  let category = 'وزن طبيعي وصحي';
  let badgeColor = 'bg-emerald-600';
  if (bmi < 18.5) {
    category = 'نقص في الوزن (نحافة)';
    badgeColor = 'bg-amber-500';
  } else if (bmi < 25) {
    category = 'وزن طبيعي ومثالي';
    badgeColor = 'bg-emerald-600';
  } else if (bmi < 30) {
    category = 'زيادة في الوزن (وزن زائد)';
    badgeColor = 'bg-amber-600';
  } else if (bmi < 35) {
    category = 'سمنة من الدرجة الأولى';
    badgeColor = 'bg-rose-500';
  } else {
    category = 'سمنة مفرطة أو متقدمة';
    badgeColor = 'bg-rose-700';
  }

  // Ideal weight range for height (BMI 18.5 to 24.9)
  const minIdealWeight = 18.5 * (heightM * heightM);
  const maxIdealWeight = 24.9 * (heightM * heightM);

  return {
    primary: {
      label: 'مؤشر كتلة الجسم (BMI)',
      value: bmi,
      formattedValue: `${bmi.toFixed(1)} كجم/م²`,
      unit: 'كجم/م²',
      badge: category,
    },
    secondary: [
      {
        label: 'التصنيف الصحي لمنظمة الصحة العالمية',
        value: category,
      },
      {
        label: 'الوزن المثالي الموصى به لطولك',
        value: `من ${minIdealWeight.toFixed(1)} إلى ${maxIdealWeight.toFixed(1)} كجم`,
      },
    ],
    details: [
      { label: 'الوزن المدخل', value: `${weight} كجم` },
      { label: 'الطول المدخل', value: `${heightCm} سم (${heightM.toFixed(2)} متر)` },
      { label: 'المعادلة المعتمدة', value: 'الوزن (كجم) ÷ مربع الطول (متر)' },
    ],
    calculationSteps: [
      `الطول بالمتر = ${heightCm} ÷ 100 = ${heightM.toFixed(2)} م`,
      `مربع الطول = ${(heightM * heightM).toFixed(4)} م²`,
      `مؤشر كتلة الجسم = ${weight} ÷ ${(heightM * heightM).toFixed(4)} = ${bmi.toFixed(2)}`,
    ],
  };
}
