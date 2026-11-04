import { CountryData } from '../../data/countries/types';
import { CalculationResult } from '../../types/calculator';

export interface VehicleFeesInputs {
  vehicleType?: 'private_car' | 'suv' | 'commercial';
  renewalYears?: number;
  includeInspection?: boolean;
}

export function calculateVehicleFees(inputs: VehicleFeesInputs, country?: CountryData): CalculationResult {
  const years = Number(inputs.renewalYears) || 1;
  const includeInspection = inputs.includeInspection !== false;
  const currencySymbol = country?.basics.currency.symbolAr || 'ر.س';
  const minorUnits = country?.basics.currency.minorUnits ?? 2;

  const regAnnual = country?.vehicle.value?.registrationFeeAnnual ?? 100;
  const inspectionFee = includeInspection ? (country?.vehicle.value?.periodicInspectionFee ?? 84) : 0;
  const licenceValidityYears = country?.vehicle.value?.drivingLicenceValidityYears ?? 10;
  const licenceAnnual = (country?.vehicle.value?.drivingLicenceRenewal10Yr ?? 400) / licenceValidityYears;

  const totalRegistration = regAnnual * years;
  const totalFees = totalRegistration + inspectionFee;

  const fmt = (num: number) =>
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: minorUnits,
      maximumFractionDigits: minorUnits,
    }).format(num);

  const localRegTerm = country?.basics.localTerms.vehicleRegistration || 'استمارة السيارة';
  const localInspTerm = country?.basics.localTerms.periodicInspection || 'الفحص الدوري';

  return {
    primary: {
      label: `إجمالي رسوم تجديد ${localRegTerm}`,
      value: totalFees,
      formattedValue: `${fmt(totalFees)} ${currencySymbol}`,
      unit: currencySymbol,
      isCurrency: true,
      badge: `${years} سنوات`,
    },
    secondary: [
      {
        label: `رسم تجديد ${localRegTerm} (${years} سنة)`,
        value: totalRegistration,
        formattedValue: `${fmt(totalRegistration)} ${currencySymbol}`,
        unit: currencySymbol,
        isCurrency: true,
      },
      {
        label: `رسوم ${localInspTerm}`,
        value: inspectionFee,
        formattedValue: `${fmt(inspectionFee)} ${currencySymbol}`,
        unit: currencySymbol,
        isCurrency: true,
      },
    ],
    details: [
      { label: 'المصطلح المحلي لرخصة السير', value: localRegTerm },
      { label: 'المصطلح المحلي للفحص الفني', value: localInspTerm },
      { label: 'الرسم السنوي لرخصة السير', value: `${fmt(regAnnual)} ${currencySymbol}/سنة` },
      { label: 'الرسم السنوي التقديري لرخصة القيادة', value: `${fmt(licenceAnnual)} ${currencySymbol}/سنة (رخصة صالحة ${licenceValidityYears} سنوات)` },
      { label: 'الجهة المنظمة للرسوم', value: country?.vehicle.authority || 'الإدارة العامة للمرور' },
    ],
    calculationSteps: [
      `رسم تجديد ${localRegTerm}: ${fmt(regAnnual)} × ${years} سنوات = ${fmt(totalRegistration)} ${currencySymbol}`,
      includeInspection ? `رسوم ${localInspTerm} = ${fmt(inspectionFee)} ${currencySymbol}` : 'بدون فحص دوري',
      `الإجمالي النهائي المستحق = ${fmt(totalFees)} ${currencySymbol}`,
    ],
    country: country?.countryCode,
    currency: country?.basics.currency.code,
  };
}
