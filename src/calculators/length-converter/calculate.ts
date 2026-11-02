import { CalculationResult } from '../../types/calculator';

export interface LengthInputs {
  value: number;
  fromUnit: 'meter' | 'kilometer' | 'centimeter' | 'millimeter' | 'mile' | 'yard' | 'foot' | 'inch';
}

const TO_METERS: Record<string, number> = {
  meter: 1.0,
  kilometer: 1000.0,
  centimeter: 0.01,
  millimeter: 0.001,
  mile: 1609.344,
  yard: 0.9144,
  foot: 0.3048,
  inch: 0.0254,
};

const UNIT_NAMES_AR: Record<string, string> = {
  meter: 'متر',
  kilometer: 'كيلومتر',
  centimeter: 'سنتيمتر',
  millimeter: 'مليمتر',
  mile: 'ميل',
  yard: 'ياردة',
  foot: 'قدم',
  inch: 'بوصة / إنش',
};

export function calculateLengthConverter(inputs: LengthInputs): CalculationResult {
  const val = Number(inputs.value) || 0;
  const unit = inputs.fromUnit || 'kilometer';

  const factor = TO_METERS[unit] || 1.0;
  const inMeters = val * factor;

  const rows = Object.entries(TO_METERS).map(([uKey, uFactor]) => {
    const converted = inMeters / uFactor;
    return {
      period: UNIT_NAMES_AR[uKey] || uKey,
      values: {
        value: converted < 0.01 ? converted.toExponential(4) : converted.toLocaleString('en-US', { maximumFractionDigits: 4 }),
        unit: UNIT_NAMES_AR[uKey] || uKey,
      },
    };
  });

  return {
    primary: {
      label: `القيمة بالمتر القياسي (ISO)`,
      value: inMeters,
      formattedValue: `${inMeters.toLocaleString('en-US', { maximumFractionDigits: 3 })} متر`,
      unit: 'متر',
      badge: UNIT_NAMES_AR[unit] || unit,
    },
    secondary: [
      {
        label: 'بالكيلومتر',
        value: inMeters / 1000,
        formattedValue: `${(inMeters / 1000).toLocaleString('en-US', { maximumFractionDigits: 4 })} كم`,
      },
      {
        label: 'بالميل الأمريكي/الإنجليزي',
        value: inMeters / 1609.344,
        formattedValue: `${(inMeters / 1609.344).toLocaleString('en-US', { maximumFractionDigits: 4 })} ميل`,
      },
    ],
    details: [
      { label: 'القيمة المدخلة', value: `${val} ${UNIT_NAMES_AR[unit] || unit}` },
      { label: 'المعيار الدولي المعتمد', value: 'المكتب الدولي للأوزان والمقاييس (BIPM)' },
    ],
    breakdown: {
      columns: [
        { key: 'value', label: 'القيمة المقابلة' },
        { key: 'unit', label: 'الوحدة' },
      ],
      rows,
    },
    calculationSteps: [
      `التحويل للمتر: ${val} × ${factor} = ${inMeters} متر`,
      `التحويل لجميع الوحدات المتناسبة بدقة معيارية ISO.`,
    ],
  };
}
