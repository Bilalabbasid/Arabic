import { CalculationResult } from '@/types/calculator';
import { formatNumber } from '@/lib/formatters';

/**
 * Calculates Body Mass Index (BMI) according to World Health Organization (WHO) standards.
 */
export function calculateBmi(inputs: Record<string, any>): CalculationResult {
  const weightKg = Number(inputs.weightKg);
  const heightCm = Number(inputs.heightCm);

  if (isNaN(weightKg) || weightKg <= 0 || weightKg > 500) {
    return {
      primary: { label: 'مؤشر كتلة الجسم', value: 0, formattedValue: '-' },
      error: 'يرجى إدخال وزن صحيح بالكيلوغرام (بين 10 و 500 كجم).',
    };
  }

  if (isNaN(heightCm) || heightCm < 50 || heightCm > 250) {
    return {
      primary: { label: 'مؤشر كتلة الجسم', value: 0, formattedValue: '-' },
      error: 'يرجى إدخال طول صحيح بالسنتيمتر (بين 50 و 250 سم).',
    };
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  // WHO BMI Categories
  let categoryAr = '';
  let badgeColor = '';
  if (bmi < 18.5) {
    categoryAr = 'نقص في الوزن (نحافة)';
    badgeColor = 'نحافة';
  } else if (bmi < 24.9) {
    categoryAr = 'وزن طبيعي وصحي';
    badgeColor = 'طبيعي';
  } else if (bmi < 29.9) {
    categoryAr = 'زيادة في الوزن';
    badgeColor = 'زيادة وزن';
  } else if (bmi < 34.9) {
    categoryAr = 'سمنة من الدرجة الأولى';
    badgeColor = 'سمنة 1';
  } else if (bmi < 39.9) {
    categoryAr = 'سمنة من الدرجة الثانية';
    badgeColor = 'سمنة 2';
  } else {
    categoryAr = 'سمنة مفرطة شديدة (الدرجة الثالثة)';
    badgeColor = 'سمنة مفرطة';
  }

  // Ideal weight range for height (BMI 18.5 to 24.9)
  const idealWeightMin = 18.5 * (heightM * heightM);
  const idealWeightMax = 24.9 * (heightM * heightM);

  return {
    primary: {
      id: 'bmi',
      label: 'مؤشر كتلة الجسم (BMI)',
      value: bmi,
      formattedValue: formatNumber(bmi, { decimals: 1 }),
      unit: 'كجم/م²',
      highlight: true,
      badge: categoryAr,
    },
    secondary: [
      {
        id: 'category',
        label: 'التصنيف الصحي حسب معايير WHO',
        value: categoryAr,
        formattedValue: categoryAr,
      },
      {
        id: 'idealRange',
        label: 'نطاق الوزن المثالي لطولك',
        value: `${formatNumber(idealWeightMin, { decimals: 1 })} - ${formatNumber(idealWeightMax, { decimals: 1 })} كجم`,
        formattedValue: `${formatNumber(idealWeightMin, { decimals: 1 })} - ${formatNumber(idealWeightMax, { decimals: 1 })} كجم`,
        unit: 'كجم',
      },
      {
        id: 'weightDifference',
        label: bmi > 24.9 ? 'الوزن الإضافي عن الحد الصحي' : bmi < 18.5 ? 'الوزن المطلوب زيادته' : 'فارق الوزن',
        value: bmi > 24.9 ? weightKg - idealWeightMax : bmi < 18.5 ? idealWeightMin - weightKg : 0,
        formattedValue: bmi > 24.9
          ? `+${formatNumber(weightKg - idealWeightMax, { decimals: 1 })} كجم`
          : bmi < 18.5
          ? `-${formatNumber(idealWeightMin - weightKg, { decimals: 1 })} كجم`
          : 'ضمن المعدل الطبيعي',
      },
    ],
    details: [
      { label: 'الوزن المدخل', value: `${formatNumber(weightKg)} كجم` },
      { label: 'الطول المدخل', value: `${formatNumber(heightCm)} سم (${formatNumber(heightM, { decimals: 2 })} م)` },
      { label: 'المعادلة الرياضية', value: 'الوزن بالكيلوغرام ÷ (الطول بالمتر × الطول بالمتر)' },
    ],
    calculationSteps: [
      `تحويل الطول إلى أمتار: ${formatNumber(heightCm)} سم ÷ 100 = ${formatNumber(heightM, { decimals: 2 })} م`,
      `تربيع الطول: ${formatNumber(heightM, { decimals: 2 })} × ${formatNumber(heightM, { decimals: 2 })} = ${formatNumber(heightM * heightM, { decimals: 3 })} م²`,
      `حساب مؤشر الكتلة: ${formatNumber(weightKg)} ÷ ${formatNumber(heightM * heightM, { decimals: 3 })} = ${formatNumber(bmi, { decimals: 1 })} كجم/م²`,
    ],
    directAnswer: `مؤشر كتلة جسمك هو ${formatNumber(bmi, { decimals: 1 })} وتصنيفك الصحي هو "${categoryAr}". الوزن المثالي لطولك يتراوح بين ${formatNumber(idealWeightMin, { decimals: 1 })} و ${formatNumber(idealWeightMax, { decimals: 1 })} كجم.`,
    assumptions: [
      'هذا المؤشر استرشادي للأشخاص البالغين من عمر 18 سنة فأكثر، ولا ينطبق بدقة على الرياضيين ذوي الكتل العضلية الضخمة أو الحوامل أو الأطفال دون سن البلوغ.',
    ],
  };
}
