import { CalculationResult } from '@/types/calculator';

/**
 * High-precision exact conversion factors to international base units:
 * - Length base unit: Metre (m)
 *   Governed by the 1959 International Yard and Pound Agreement.
 *   1 in = 0.0254 m (exact)
 *   1 ft = 0.3048 m (exact)
 *   1 yd = 0.9144 m (exact)
 *   1 mi = 1609.344 m (exact international statute mile)
 *   1 km = 1000 m
 *   1 cm = 0.01 m
 *   1 mm = 0.001 m
 *
 * - Time base unit: Second (s)
 *   SI standard definition:
 *   1 s = 1 s
 *   1 min = 60 s
 *   1 hr = 3600 s
 *   1 day = 86400 s
 *   1 week = 604800 s
 *   1 ms = 0.001 s
 *   Year conventions:
 *   - Julian average year: 365.25 days = 31,557,600 s (astronomical standard)
 *   - Common calendar year: 365 days = 31,536,000 s
 *   - Leap year: 366 days = 31,622,400 s
 */

export interface UnitDefinition {
  id: string;
  nameAr: string;
  nameEn: string;
  symbolAr: string;
  symbolEn: string;
  factorToBase: number;
}

export const LENGTH_UNITS: Record<string, UnitDefinition> = {
  mm: {
    id: 'mm',
    nameAr: 'مليمتر',
    nameEn: 'Millimetre',
    symbolAr: 'مم',
    symbolEn: 'mm',
    factorToBase: 0.001,
  },
  cm: {
    id: 'cm',
    nameAr: 'سنتيمتر',
    nameEn: 'Centimetre',
    symbolAr: 'سم',
    symbolEn: 'cm',
    factorToBase: 0.01,
  },
  m: {
    id: 'm',
    nameAr: 'متر',
    nameEn: 'Metre',
    symbolAr: 'م',
    symbolEn: 'm',
    factorToBase: 1,
  },
  km: {
    id: 'km',
    nameAr: 'كيلومتر',
    nameEn: 'Kilometre',
    symbolAr: 'كم',
    symbolEn: 'km',
    factorToBase: 1000,
  },
  in: {
    id: 'in',
    nameAr: 'بوصة (إنش)',
    nameEn: 'Inch',
    symbolAr: 'إنش',
    symbolEn: 'in',
    factorToBase: 0.0254,
  },
  ft: {
    id: 'ft',
    nameAr: 'قدم',
    nameEn: 'Foot',
    symbolAr: 'قدم',
    symbolEn: 'ft',
    factorToBase: 0.3048,
  },
  yd: {
    id: 'yd',
    nameAr: 'ياردة',
    nameEn: 'Yard',
    symbolAr: 'ياردة',
    symbolEn: 'yd',
    factorToBase: 0.9144,
  },
  mi: {
    id: 'mi',
    nameAr: 'ميل بري',
    nameEn: 'Mile',
    symbolAr: 'ميل',
    symbolEn: 'mi',
    factorToBase: 1609.344,
  },
};

export const TIME_BASE_FACTORS: Record<string, number> = {
  ms: 0.001,
  s: 1,
  min: 60,
  hr: 3600,
  day: 86400,
  week: 604800,
};

export const TIME_UNITS: Record<string, { id: string; nameAr: string; nameEn: string; symbolAr: string; symbolEn: string }> = {
  ms: { id: 'ms', nameAr: 'ميلي ثانية', nameEn: 'Millisecond', symbolAr: 'مل ث', symbolEn: 'ms' },
  s: { id: 's', nameAr: 'ثانية', nameEn: 'Second', symbolAr: 'ث', symbolEn: 's' },
  min: { id: 'min', nameAr: 'دقيقة', nameEn: 'Minute', symbolAr: 'د', symbolEn: 'min' },
  hr: { id: 'hr', nameAr: 'ساعة', nameEn: 'Hour', symbolAr: 'س', symbolEn: 'hr' },
  day: { id: 'day', nameAr: 'يوم', nameEn: 'Day', symbolAr: 'يوم', symbolEn: 'day' },
  week: { id: 'week', nameAr: 'أسبوع', nameEn: 'Week', symbolAr: 'أسبوع', symbolEn: 'wk' },
  year: { id: 'year', nameAr: 'سنة', nameEn: 'Year', symbolAr: 'سنة', symbolEn: 'yr' },
};

export function getTimeFactorToBase(unit: string, yearConvention: string = 'julian'): number {
  if (unit === 'year') {
    if (yearConvention === 'common') return 31536000; // 365 * 86400
    if (yearConvention === 'leap') return 31622400; // 366 * 86400
    return 31557600; // 365.25 * 86400 (Julian standard)
  }
  return TIME_BASE_FACTORS[unit] ?? 1;
}

export function formatConverterNumber(val: number, maxDecimals: number = 6): string {
  if (isNaN(val) || !isFinite(val)) return '-';
  if (val === 0) return '0';

  const cleanVal = Number(val.toPrecision(12));
  const abs = Math.abs(cleanVal);
  if (abs > 0 && abs < 1e-6) {
    return cleanVal.toExponential(4);
  }

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: maxDecimals,
    useGrouping: true,
  }).format(cleanVal);
}

/**
 * Calculates bidirectional length conversions between mm, cm, m, km, in, ft, yd, mi.
 */
export function calculateLengthConverter(inputs: Record<string, any>): CalculationResult {
  const rawValue = inputs.value;
  const fromUnit = String(inputs.fromUnit || 'in');
  const toUnit = String(inputs.toUnit || 'cm');
  const precision = Math.min(Math.max(Number(inputs.precision || 6), 0), 10);

  const value = Number(rawValue);

  if (isNaN(value)) {
    return {
      primary: { label: 'النتيجة', value: 0, formattedValue: '-' },
      error: 'يرجى إدخال قيمة عددية صالحة للتحويل.',
    };
  }

  const fromDef = LENGTH_UNITS[fromUnit] || LENGTH_UNITS.in;
  const toDef = LENGTH_UNITS[toUnit] || LENGTH_UNITS.cm;

  // Conversion via base unit (Metre)
  const valueInMetres = value * fromDef.factorToBase;
  const convertedValue = valueInMetres / toDef.factorToBase;

  const formattedValue = formatConverterNumber(convertedValue, precision);
  const formattedSourceValue = formatConverterNumber(value, precision);

  // Generate secondary list of all units
  const secondaryUnits = Object.values(LENGTH_UNITS)
    .filter((u) => u.id !== toDef.id)
    .map((unit) => {
      const val = valueInMetres / unit.factorToBase;
      return {
        id: `conv_${unit.id}`,
        label: `${unit.nameAr} (${unit.symbolAr})`,
        value: val,
        formattedValue: `${formatConverterNumber(val, precision)} ${unit.symbolAr}`,
        unit: unit.symbolAr,
      };
    });

  // Direct Arabic Answer
  const directAnswer = `${formattedSourceValue} ${fromDef.nameAr} (${fromDef.symbolAr}) تعادل بالضبط ${formattedValue} ${toDef.nameAr} (${toDef.symbolAr}).`;

  // Step-by-step mathematical explanation
  const ratio = fromDef.factorToBase / toDef.factorToBase;
  const calculationSteps = [
    `الوحدة المصدر: ${fromDef.nameAr} (معامل التحويل إلى المتر: ${fromDef.factorToBase} م)`,
    `الوحدة الهدف: ${toDef.nameAr} (معامل التحويل إلى المتر: ${toDef.factorToBase} م)`,
    `التحويل إلى المتر: ${formattedSourceValue} × ${fromDef.factorToBase} = ${formatConverterNumber(valueInMetres, 8)} م`,
    `التحويل للهدف: ${formatConverterNumber(valueInMetres, 8)} ÷ ${toDef.factorToBase} = ${formattedValue} ${toDef.symbolAr}`,
    `المعادلة الرياضية المباشرة: الناتج = القيمة × (${fromDef.factorToBase} ÷ ${toDef.factorToBase}) = القيمة × ${formatConverterNumber(ratio, 8)}`,
  ];

  return {
    primary: {
      id: 'result',
      label: `الناتج بـ ${toDef.nameAr}`,
      value: convertedValue,
      formattedValue,
      unit: toDef.symbolAr,
      highlight: true,
      badge: `${toDef.nameEn} (${toDef.symbolEn})`,
    },
    secondary: secondaryUnits,
    details: [
      { label: 'القيمة المدخلة', value: `${formattedSourceValue} ${fromDef.symbolAr}` },
      { label: 'المعادل بالمتر الدولي (m)', value: `${formatConverterNumber(valueInMetres, 6)} م` },
      { label: 'معامل التحويل المباشر', value: formatConverterNumber(ratio, 8) },
      { label: 'النظام المرجعي', value: 'المعيار الدولي للياردة والباوند (1959)' },
    ],
    calculationSteps,
    directAnswer,
  };
}

/**
 * Calculates compound time duration from seconds.
 * Example: 90061s = 1 day, 1 hour, 1 minute, 1 second.
 */
export function breakDownDuration(totalSeconds: number): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  formattedArabic: string;
} {
  const isNegative = totalSeconds < 0;
  let remainingMs = Math.round(Math.abs(totalSeconds) * 1000);

  const days = Math.floor(remainingMs / 86400000);
  remainingMs %= 86400000;

  const hours = Math.floor(remainingMs / 3600000);
  remainingMs %= 3600000;

  const minutes = Math.floor(remainingMs / 60000);
  remainingMs %= 60000;

  const seconds = Math.floor(remainingMs / 1000);
  const milliseconds = remainingMs % 1000;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days} يوم`);
  if (hours > 0) parts.push(`${hours} ساعة`);
  if (minutes > 0) parts.push(`${minutes} دقيقة`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds} ثانية`);
  if (milliseconds > 0 && days === 0 && hours === 0) parts.push(`${milliseconds} ميلي ثانية`);

  const formattedArabic = (isNegative ? 'سالب ' : '') + parts.join(' و ');

  return {
    days: isNegative ? -days : days,
    hours: isNegative ? -hours : hours,
    minutes: isNegative ? -minutes : minutes,
    seconds: isNegative ? -seconds : seconds,
    milliseconds: isNegative ? -milliseconds : milliseconds,
    formattedArabic,
  };
}

/**
 * Calculates bidirectional time conversions between ms, s, min, hr, day, week, year.
 */
export function calculateTimeConverter(inputs: Record<string, any>): CalculationResult {
  const rawValue = inputs.value;
  const fromUnit = String(inputs.fromUnit || 'min');
  const toUnit = String(inputs.toUnit || 'hr');
  const yearConvention = String(inputs.yearConvention || 'julian');
  const precision = Math.min(Math.max(Number(inputs.precision || 6), 0), 10);

  const value = Number(rawValue);

  if (isNaN(value)) {
    return {
      primary: { label: 'النتيجة', value: 0, formattedValue: '-' },
      error: 'يرجى إدخال قيمة عددية صالحة للتحويل.',
    };
  }

  const fromDef = TIME_UNITS[fromUnit] || TIME_UNITS.min;
  const toDef = TIME_UNITS[toUnit] || TIME_UNITS.hr;

  const fromFactor = getTimeFactorToBase(fromUnit, yearConvention);
  const toFactor = getTimeFactorToBase(toUnit, yearConvention);

  // Conversion via base unit (Second)
  const valueInSeconds = value * fromFactor;
  const convertedValue = valueInSeconds / toFactor;

  const formattedValue = formatConverterNumber(convertedValue, precision);
  const formattedSourceValue = formatConverterNumber(value, precision);

  // Generate secondary list of all units
  const secondaryUnits = Object.keys(TIME_UNITS)
    .filter((unitKey) => unitKey !== toDef.id)
    .map((unitKey) => {
      const uDef = TIME_UNITS[unitKey];
      const factor = getTimeFactorToBase(unitKey, yearConvention);
      const val = valueInSeconds / factor;
      return {
        id: `conv_${uDef.id}`,
        label: `${uDef.nameAr} (${uDef.symbolAr})`,
        value: val,
        formattedValue: `${formatConverterNumber(val, precision)} ${uDef.symbolAr}`,
        unit: uDef.symbolAr,
      };
    });

  // Compound duration breakdown for human-readable temporal analysis
  const breakdown = breakDownDuration(valueInSeconds);

  // Direct Arabic Answer
  const directAnswer = `${formattedSourceValue} ${fromDef.nameAr} تعادل ${formattedValue} ${toDef.nameAr} (التحليل التفصيلي للمدة: ${breakdown.formattedArabic}).`;

  // Year convention Arabic label
  const conventionLabel =
    yearConvention === 'common'
      ? 'السنة البسيطة (365 يوماً)'
      : yearConvention === 'leap'
      ? 'السنة الكبيسة (366 يوماً)'
      : 'السنة الشمسية اليوليانية (365.25 يوماً - المعيار الفلكي)';

  const ratio = fromFactor / toFactor;
  const calculationSteps = [
    `الوحدة المصدر: ${fromDef.nameAr} (معامل التحويل إلى الثواني: ${fromFactor} ثانية)`,
    `الوحدة الهدف: ${toDef.nameAr} (معامل التحويل إلى الثواني: ${toFactor} ثانية)`,
    `التحويل إلى الثواني: ${formattedSourceValue} × ${fromFactor} = ${formatConverterNumber(valueInSeconds, 6)} ثانية`,
    `التحويل للهدف: ${formatConverterNumber(valueInSeconds, 6)} ÷ ${toFactor} = ${formattedValue} ${toDef.symbolAr}`,
    `المعادلة المباشرة: الناتج = القيمة × (${fromFactor} ÷ ${toFactor}) = القيمة × ${formatConverterNumber(ratio, 8)}`,
  ];

  return {
    primary: {
      id: 'result',
      label: `الناتج بـ ${toDef.nameAr}`,
      value: convertedValue,
      formattedValue,
      unit: toDef.symbolAr,
      highlight: true,
      badge: `${toDef.nameEn} (${toDef.symbolEn})`,
    },
    secondary: secondaryUnits,
    details: [
      { label: 'القيمة المدخلة', value: `${formattedSourceValue} ${fromDef.symbolAr}` },
      { label: 'المعادل بالثواني الدولية (s)', value: `${formatConverterNumber(valueInSeconds, 3)} ث` },
      { label: 'المدة الزمنية المركبة', value: breakdown.formattedArabic },
      { label: 'اتفاقية حساب طول السنة', value: conventionLabel },
    ],
    calculationSteps,
    directAnswer,
  };
}

