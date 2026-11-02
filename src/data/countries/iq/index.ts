import { CountryData } from '../types';

export const COUNTRY_DATA_IQ: CountryData = {
  "countryCode": "iq",
  "basics": {
    "nameAr": "جمهورية العراق",
    "nameEn": "Iraq",
    "locale": "ar-IQ",
    "currency": {
      "code": "IQD",
      "nameAr": "دينار عراقي",
      "symbolAr": "د.ع",
      "minorUnits": 2
    },
    "weekendDays": [
      5,
      6
    ],
    "officialCalendar": "gregorian",
    "localTerms": {
      "vehicleRegistration": "سنوية السيارة (رخصة تسجيل المركبة)",
      "diesel": "كاز (ديزل / زيت الغاز)",
      "periodicInspection": "فحص الهزة (فحص السلامة المرورية)",
      "drivingLicence": "إجازة سوق"
    }
  },
  "vat": {
    "status": "not_applicable",
    "note": "لا تطبق جمهورية العراق ضريبة قيمة مضافة موحدة؛ وتفرض ضريبة مبيعات نوعية على بعض الخدمات والفنادق والمبيعات بنسبة 5% إلى 15%.",
    "authority": "الهيئة العامة للضرائب بوزارة المالية العراقية",
    "sourceUrl": "http://www.mof.gov.iq",
    "checkedAt": "2026-11-01",
    "value": {
      "standardRate": 0
    }
  },
  "incomeTax": {
    "status": "verified",
    "value": {
      "hasPersonalIncomeTax": true,
      "standardDeduction": 2500000,
      "brackets": [
        {
          "thresholdUpTo": 250000,
          "rate": 3
        },
        {
          "thresholdUpTo": 500000,
          "rate": 5
        },
        {
          "thresholdUpTo": 1000000,
          "rate": 10
        },
        {
          "rate": 15
        }
      ]
    },
    "law": "قانون ضريبة الدخل العراقي رقم 113 لسنة 1982 وتعديلاته",
    "authority": "الهيئة العامة للضرائب",
    "sourceUrl": "http://www.mof.gov.iq",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "socialInsurance": {
    "status": "verified",
    "value": {
      "nationalEmployeeRate": 5,
      "nationalEmployerRate": 12,
      "expatEmployeeRate": 5,
      "expatEmployerRate": 12,
      "agencyNameAr": "دائرة التقاعد والضمان الاجتماعي للعمال",
      "agencyAcronym": "MOLSA Iraq"
    },
    "law": "قانون التقاعد والضمان الاجتماعي للعمال رقم 18 لسنة 2023",
    "authority": "وزارة العمل والشؤون الاجتماعية العراقية",
    "sourceUrl": "https://molsa.gov.iq",
    "validFrom": "2023-11-28",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "endOfService": {
    "status": "verified",
    "value": {
      "standardFormula": "أجر أسبوعين عن كل سنة من السنوات الخمس الأولى، وأجر شهر كامل عن كل سنة تالية.",
      "firstTierYears": 5,
      "firstTierFraction": 0.5,
      "secondTierFraction": 1,
      "resignationScale": [
        {
          "minYears": 1,
          "fractionOfAward": 1
        }
      ],
      "wageBasis": "gross_wage_with_fixed_allowances",
      "articles": "المادة 75 من قانون العمل العراقي رقم 37 لسنة 2015"
    },
    "law": "قانون العمل العراقي رقم 37 لسنة 2015",
    "authority": "وزارة العمل والشؤون الاجتماعية العراقية",
    "sourceUrl": "https://molsa.gov.iq",
    "validFrom": "2016-02-07",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "consumerFinance": {
    "status": "verified",
    "value": {
      "dbrCapPercent": 50,
      "dbrCapPensionerPercent": 30,
      "maxAutoFinanceTenorYears": 5,
      "quoteConvention": "reducing",
      "islamicFinanceTerm": "مرابحة سيارات / تمويل مصرفي إسلامي"
    },
    "law": "ضوابط وشروط منح القروض والتسهيلات المصرفية الصادرة عن البنك المركزي العراقي",
    "authority": "البنك المركزي العراقي (CBI)",
    "sourceUrl": "https://cbi.iq",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "fuel": {
    "status": "verified",
    "value": {
      "pricingModel": "fixed_official",
      "grades": {
        "regular": {
          "nameAr": "بنزين عادي ممتاز",
          "pricePerLiter": 450,
          "unitAr": "د.ع/لتر"
        },
        "super95": {
          "nameAr": "بنزين محسن (عالي الأوكتان)",
          "pricePerLiter": 650,
          "unitAr": "د.ع/لتر"
        },
        "premium": {
          "nameAr": "بنزين سوبر مستورد 95",
          "pricePerLiter": 1000,
          "unitAr": "د.ع/لتر"
        },
        "gasoil": {
          "nameAr": "زيت الغاز (كاز / ديزل)",
          "pricePerLiter": 400,
          "unitAr": "د.ع/لتر"
        }
      },
      "updateCadenceDays": 180
    },
    "law": "التسعيرة الرسمية المقررة من مجلس الوزراء العراقي وشركة توزيع المنتجات النفطية",
    "authority": "وزارة النفط العراقية - شركة توزيع المنتجات النفطية",
    "sourceUrl": "https://oil.gov.iq",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 90
  },
  "electricity": {
    "status": "verified",
    "value": {
      "residentialTiers": [
        {
          "minKwh": 1,
          "maxKwh": 1500,
          "ratePerKwh": 10
        },
        {
          "minKwh": 1501,
          "maxKwh": 3000,
          "ratePerKwh": 35
        },
        {
          "minKwh": 3001,
          "maxKwh": 4000,
          "ratePerKwh": 80
        },
        {
          "minKwh": 4001,
          "ratePerKwh": 120
        }
      ],
      "meterServiceFeeMonthly": 1000,
      "vatApplies": false
    },
    "law": "تعرفة مبيعات الطاقة الكهربائية المعتمدة بقرار مجلس الوزراء العراقي",
    "authority": "وزارة الكهرباء العراقية",
    "sourceUrl": "https://moel.gov.iq",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "vehicle": {
    "status": "verified",
    "value": {
      "registrationFeeAnnual": 50000,
      "periodicInspectionFee": 30000,
      "drivingLicenceRenewal10Yr": 50000,
      "customsDutyPercent": 5,
      "customsVatPercent": 0,
      "trafficFines": [
        {
          "categoryAr": "الإشارات المرورية",
          "violationAr": "تجاوز الإشارة المرورية الحمراء",
          "minFine": 100000,
          "maxFine": 200000
        },
        {
          "categoryAr": "السرعة الزائدة",
          "violationAr": "تجاوز السرعة المحددة في الطرق العامة",
          "minFine": 50000,
          "maxFine": 100000
        },
        {
          "categoryAr": "السلامة العامة",
          "violationAr": "عدم ارتداء حزام الأمان للسائق والراكب",
          "minFine": 50000,
          "maxFine": 50000
        },
        {
          "categoryAr": "السلامة العامة",
          "violationAr": "استخدام الهاتف النقال أثناء قيادة المركبة",
          "minFine": 100000,
          "maxFine": 100000
        }
      ]
    },
    "law": "قانون المرور العراقي رقم 8 لسنة 2019",
    "authority": "وزارة الداخلية العراقية - مديرية المرور العامة",
    "sourceUrl": "https://itp.gov.iq",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "zakat": {
    "status": "verified",
    "value": {
      "authorityName": "صندوق الزكاة والصدقات بديوان الوقف",
      "isMandatoryForCompanies": false,
      "individualNoteAr": "زكاة المال فريضة شرعية بنسبة 2.5% حولياً عند بلوغ النصاب."
    },
    "law": "قوانين ديوان الوقفين وتنظيم العمل الخيري الشرعي",
    "authority": "ديوان الوقف",
    "sourceUrl": "https://cbi.iq",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "routes": [
    {
      "id": "baghdad-basra",
      "fromCityAr": "بغداد",
      "toCityAr": "البصرة",
      "distanceKm": 545,
      "source": "طريق المرور السريع رقم 1"
    },
    {
      "id": "baghdad-erbil",
      "fromCityAr": "بغداد",
      "toCityAr": "أربيل",
      "distanceKm": 360,
      "source": "طريق بغداد - كركوك - أربيل السريع"
    },
    {
      "id": "baghdad-mosul",
      "fromCityAr": "بغداد",
      "toCityAr": "الموصل",
      "distanceKm": 400,
      "source": "طريق بغداد - تكريت - الموصل"
    },
    {
      "id": "baghdad-najaf",
      "fromCityAr": "بغداد",
      "toCityAr": "النجف الأشرف",
      "distanceKm": 160,
      "source": "طريق بغداد - الحلة - النجف"
    },
    {
      "id": "baghdad-karbala",
      "fromCityAr": "بغداد",
      "toCityAr": "كربلاء المقدسة",
      "distanceKm": 105,
      "source": "طريق بغداد - المحمودية - كربلاء"
    }
  ]
};

export default COUNTRY_DATA_IQ;
