import { CountryData } from '../../data/countries/types';
import { CalculationResult } from '../../types/calculator';

export interface ZakatInputs {
  cashAmount: number;
  goldGrams24k?: number;
  silverGrams?: number;
  tradeGoodsValue?: number;
  debtsOwed?: number;
  goldPricePerGram?: number;
  yearType?: 'hijri' | 'gregorian';
}

export function calculateZakatWealth(inputs: ZakatInputs, country?: CountryData): CalculationResult {
  const cash = Number(inputs.cashAmount) || 0;
  const goldGrams = Number(inputs.goldGrams24k) || 0;
  const silverGrams = Number(inputs.silverGrams) || 0;
  const tradeGoods = Number(inputs.tradeGoodsValue) || 0;
  const debts = Number(inputs.debtsOwed) || 0;
  const yearType = inputs.yearType || 'hijri';

  const currencySymbol = country?.basics.currency.symbolAr || 'ر.س';
  const minorUnits = country?.basics.currency.minorUnits ?? 2;

  // Default gold price per gram in SAR / equivalent if not specified
  const goldPrice = Number(inputs.goldPricePerGram) || (country?.countryCode === 'kw' ? 24 : country?.countryCode === 'eg' ? 3800 : 310);
  const silverPrice = goldPrice / 75; // Average historical ratio

  // Gold Nisab = 85 grams of 24k gold
  const nisabThreshold = 85 * goldPrice;

  // Calculate gross and net zakatable wealth
  const goldValue = goldGrams * goldPrice;
  const silverValue = silverGrams * silverPrice;
  const totalGrossWealth = cash + goldValue + silverValue + tradeGoods;
  const netZakatableWealth = Math.max(0, totalGrossWealth - debts);

  // Rate: 2.5% for Hijri year (354 days), 2.577% for Gregorian solar year (365 days)
  const zakatRate = yearType === 'gregorian' ? 0.02577 : 0.025;
  const isNisabReached = netZakatableWealth >= nisabThreshold;
  const zakatDue = isNisabReached ? netZakatableWealth * zakatRate : 0;

  const fmt = (num: number) =>
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: minorUnits,
      maximumFractionDigits: minorUnits,
    }).format(num);

  const warnings: string[] = [];
  if (!isNisabReached) {
    warnings.push(
      `إجمالي أموالك الزكوية (${fmt(netZakatableWealth)} ${currencySymbol}) لم يبلغ حد النصاب الشرعي (${fmt(nisabThreshold)} ${currencySymbol})، ولذلك لا تجب عليك الزكاة في هذا المال.`
    );
  }

  return {
    primary: {
      label: 'مقدار الزكاة الواجب إخراجها',
      value: zakatDue,
      formattedValue: `${fmt(zakatDue)} ${currencySymbol}`,
      unit: currencySymbol,
      isCurrency: true,
      badge: isNisabReached ? (yearType === 'hijri' ? '2.5% هجري' : '2.577% ميلادي') : 'دون النصاب',
    },
    secondary: [
      {
        label: 'صافي الوعاء الزكوي',
        value: netZakatableWealth,
        formattedValue: `${fmt(netZakatableWealth)} ${currencySymbol}`,
        unit: currencySymbol,
        isCurrency: true,
      },
      {
        label: 'قيمة النصاب الشرعي (85 غرام ذهب)',
        value: nisabThreshold,
        formattedValue: `${fmt(nisabThreshold)} ${currencySymbol}`,
        unit: currencySymbol,
        isCurrency: true,
      },
    ],
    details: [
      { label: 'سعر غرام الذهب المعتمد', value: `${fmt(goldPrice)} ${currencySymbol}` },
      { label: 'النقدية والمدخرات البنكية', value: `${fmt(cash)} ${currencySymbol}` },
      { label: 'قيمة الذهب والفضة', value: `${fmt(goldValue + silverValue)} ${currencySymbol}` },
      { label: 'عروض التجارة والسلع', value: `${fmt(tradeGoods)} ${currencySymbol}` },
      { label: 'الديون العاجلة المخصومة', value: `${fmt(debts)} ${currencySymbol}` },
    ],
    calculationSteps: [
      `النصاب الشرعي = 85 غرام ذهب × ${fmt(goldPrice)} = ${fmt(nisabThreshold)} ${currencySymbol}`,
      `صافي المال الزكوي = ${fmt(totalGrossWealth)} - الديون (${fmt(debts)}) = ${fmt(netZakatableWealth)} ${currencySymbol}`,
      isNisabReached
        ? `الزكاة = ${fmt(netZakatableWealth)} × ${(zakatRate * 100).toFixed(3)}% = ${fmt(zakatDue)} ${currencySymbol}`
        : 'المال دون النصاب، لا زكاة واجبة.',
    ],
    warnings: warnings.length > 0 ? warnings : undefined,
    country: country?.countryCode,
    currency: country?.basics.currency.code,
  };
}
