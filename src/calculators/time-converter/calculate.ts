import { CalculationResult } from '../../types/calculator';

export interface TimeInputs {
  value: number;
  fromUnit: 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years';
}

const TO_SECONDS: Record<string, number> = {
  seconds: 1,
  minutes: 60,
  hours: 3600,
  days: 86400,
  weeks: 604800,
  months: 2629746, // Average month (365.2425 / 12 * 86400)
  years: 31556952, // Solar year (365.2425 * 86400)
};

const TIME_UNIT_NAMES: Record<string, string> = {
  seconds: 'ثانية',
  minutes: 'دقيقة',
  hours: 'ساعة',
  days: 'يوم',
  weeks: 'أسبوع',
  months: 'شهر',
  years: 'سنة',
};

export function calculateTimeConverter(inputs: TimeInputs): CalculationResult {
  const val = Number(inputs.value) || 0;
  const unit = inputs.fromUnit || 'hours';

  const inSeconds = val * (TO_SECONDS[unit] || 1);

  const rows = Object.entries(TO_SECONDS).map(([uKey, uFactor]) => {
    const converted = inSeconds / uFactor;
    return {
      period: TIME_UNIT_NAMES[uKey] || uKey,
      values: {
        value: converted.toLocaleString('en-US', { maximumFractionDigits: 3 }),
        unit: TIME_UNIT_NAMES[uKey] || uKey,
      },
    };
  });

  return {
    primary: {
      label: 'القيمة بالثواني القياسية (SI)',
      value: inSeconds,
      formattedValue: `${inSeconds.toLocaleString('en-US', { maximumFractionDigits: 1 })} ثانية`,
      unit: 'ثانية',
      badge: TIME_UNIT_NAMES[unit] || unit,
    },
    secondary: [
      {
        label: 'بالساعات',
        value: inSeconds / 3600,
        formattedValue: `${(inSeconds / 3600).toLocaleString('en-US', { maximumFractionDigits: 2 })} ساعة`,
      },
      {
        label: 'بالأيام',
        value: inSeconds / 86400,
        formattedValue: `${(inSeconds / 86400).toLocaleString('en-US', { maximumFractionDigits: 2 })} يوم`,
      },
    ],
    details: [
      { label: 'القيمة المدخلة', value: `${val} ${TIME_UNIT_NAMES[unit] || unit}` },
      { label: 'المعيار القياسي', value: 'النظام الدولي للوحدات ISO 8601' },
    ],
    breakdown: {
      columns: [
        { key: 'value', label: 'القيمة المعادلة' },
        { key: 'unit', label: 'الوحدة الزمنية' },
      ],
      rows,
    },
    calculationSteps: [
      `التحويل للثواني: ${val} × ${TO_SECONDS[unit] || 1} = ${inSeconds} ثانية`,
    ],
  };
}
