import { CountryData } from '../types';

export const COUNTRY_DATA_LB: CountryData = {
  "countryCode": "lb",
  "basics": {
    "nameAr": "الجمهورية اللبنانية",
    "nameEn": "Lebanon",
    "locale": "ar-LB",
    "currency": {
      "code": "LBP",
      "nameAr": "ليرة لبنانية",
      "symbolAr": "ل.ل",
      "minorUnits": 2
    },
    "weekendDays": [
      6,
      0
    ],
    "officialCalendar": "gregorian",
    "localTerms": {
      "vehicleRegistration": "دفتر السيارة (رخصة السير)",
      "diesel": "مازوت",
      "periodicInspection": "المعاينة الميكانيكية",
      "drivingLicence": "رخصة سوق"
    }
  },
  "vat": {
    "status": "verified",
    "value": {
      "standardRate": 11,
      "reducedRates": [
        0
      ],
      "zeroRatedItems": [
        "الصادرات إلى خارج الأراضي اللبنانية"
      ],
      "exemptItems": [
        "الخدمات الصحية والاستشفائية",
        "التعليم",
        "المنتجات الزراعية غير المصنعة"
      ]
    },
    "law": "قانون الضريبة على القيمة المضافة رقم 379/2001 وتعديلاته بالقانون 64/2017",
    "authority": "وزارة المالية - مديرية الضريبة على القيمة المضافة",
    "sourceUrl": "http://www.finance.gov.lb",
    "validFrom": "2018-01-01",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "incomeTax": {
    "status": "verified",
    "value": {
      "hasPersonalIncomeTax": true,
      "brackets": [
        {
          "thresholdUpTo": 360000000,
          "rate": 2
        },
        {
          "thresholdUpTo": 900000000,
          "rate": 4
        },
        {
          "thresholdUpTo": 1800000000,
          "rate": 7
        },
        {
          "thresholdUpTo": 3600000000,
          "rate": 11
        },
        {
          "thresholdUpTo": 6000000000,
          "rate": 15
        },
        {
          "thresholdUpTo": 9000000000,
          "rate": 20
        },
        {
          "rate": 25
        }
      ]
    },
    "law": "قانون ضريبة الدخل (المرسوم الاشتراعي رقم 144/1959 وتعديلاته بقوانين الموازنة العامة 2024)",
    "authority": "وزارة المالية اللبنانية",
    "sourceUrl": "http://www.finance.gov.lb",
    "validFrom": "2024-02-15",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "socialInsurance": {
    "status": "verified",
    "value": {
      "nationalEmployeeRate": 3,
      "nationalEmployerRate": 21.5,
      "expatEmployeeRate": 0,
      "expatEmployerRate": 8.5,
      "agencyNameAr": "الصندوق الوطني للضمان الاجتماعي",
      "agencyAcronym": "NSSF"
    },
    "law": "قانون الضمان الاجتماعي الصادر بالمرسوم رقم 13955 وتعديلاته",
    "authority": "الصندوق الوطني للضمان الاجتماعي (NSSF)",
    "sourceUrl": "https://www.cnss.gov.lb",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "endOfService": {
    "status": "verified",
    "value": {
      "standardFormula": "أجر شهر كامل عن كل سنة خدمة مسدد عبر فرع تعويض نهاية الخدمة بالصندوق الوطني للضمان الاجتماعي.",
      "firstTierYears": 1,
      "firstTierFraction": 1,
      "secondTierFraction": 1,
      "resignationScale": [
        {
          "minYears": 1,
          "fractionOfAward": 1
        }
      ],
      "wageBasis": "gross_wage_with_fixed_allowances",
      "articles": "المادة 54 من قانون الضمان الاجتماعي اللبناني والمادة 54 من قانون العمل"
    },
    "law": "قانون الضمان الاجتماعي اللبناني وقانون العمل الصادر سنة 1946",
    "authority": "وزارة العمل / الصندوق الوطني للضمان الاجتماعي",
    "sourceUrl": "https://www.cnss.gov.lb",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "consumerFinance": {
    "status": "unverified",
    "note": "القروض المصرفية الاستهلاكية وقروض السيارات متوقفة أو مقيدة للغاية لدى المصارف اللبنانية بسبب الأزمة المالية وإعادة هيكلة القطاع المصرفي.",
    "authority": "مصرف لبنان (BDL)",
    "sourceUrl": "https://www.bdl.gov.lb",
    "checkedAt": "2026-11-01",
    "value": {
      "dbrCapPercent": 40,
      "maxAutoFinanceTenorYears": 5,
      "quoteConvention": "reducing",
      "islamicFinanceTerm": "مرابحة / تمويل مصرفي"
    }
  },
  "fuel": {
    "status": "verified",
    "value": {
      "pricingModel": "monthly_adjusted",
      "grades": {
        "octane95": {
          "nameAr": "بنزين 95 أوكتان (صفيحة 20 لتر)",
          "pricePerLiter": 75000,
          "unitAr": "ل.ل/لتر"
        },
        "octane98": {
          "nameAr": "بنزين 98 أوكتان",
          "pricePerLiter": 77000,
          "unitAr": "ل.ل/لتر"
        },
        "diesel": {
          "nameAr": "مازوت أخضر",
          "pricePerLiter": 71000,
          "unitAr": "ل.ل/لتر"
        }
      },
      "updateCadenceDays": 7
    },
    "law": "جدول تركيب أسعار المحروقات الأسبوعي الصادر عن المديرية العامة للنفط",
    "authority": "وزارة الطاقة والمياه - المديرية العامة للنفط",
    "sourceUrl": "https://energyandwater.gov.lb",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 14
  },
  "electricity": {
    "status": "verified",
    "value": {
      "residentialTiers": [
        {
          "minKwh": 1,
          "maxKwh": 100,
          "ratePerKwh": 10
        },
        {
          "minKwh": 101,
          "ratePerKwh": 27
        }
      ],
      "meterServiceFeeMonthly": 21,
      "vatApplies": true
    },
    "law": "تعرفة مؤسسة كهرباء لبنان الصادرة بقرار مجلس الإدارة والمقومة بسنت الدولار الأمريكي",
    "authority": "مؤسسة كهرباء لبنان (EDL)",
    "sourceUrl": "http://www.edl.gov.lb",
    "validFrom": "2022-11-01",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "vehicle": {
    "status": "verified",
    "value": {
      "registrationFeeAnnual": 5000000,
      "periodicInspectionFee": 1500000,
      "drivingLicenceRenewal10Yr": 3000000,
      "customsDutyPercent": 5,
      "customsVatPercent": 11,
      "trafficFines": [
        {
          "categoryAr": "الإشارات المرورية",
          "violationAr": "اجتياز الإشارة الحمراء",
          "minFine": 3000000,
          "maxFine": 5000000
        },
        {
          "categoryAr": "السرعة الزائدة",
          "violationAr": "تجاوز السرعة القصوى المحددة",
          "minFine": 1500000,
          "maxFine": 3000000
        },
        {
          "categoryAr": "السلامة العامة",
          "violationAr": "عدم وضع حزام الأمان",
          "minFine": 700000,
          "maxFine": 1500000
        }
      ]
    },
    "law": "قانون السير الجديد رقم 243 لسنة 2012 وقوانين الموازنة لتعديل الرسوم",
    "authority": "وزارة الداخلية والبلديات - هيئة إدارة السير والآليات والمركبات",
    "sourceUrl": "http://www.tmo.gov.lb",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "zakat": {
    "status": "verified",
    "value": {
      "authorityName": "صندوق الزكاة في لبنان التابع لدار الفتوى اللبنانية",
      "isMandatoryForCompanies": false,
      "individualNoteAr": "زكاة المال فريضة بنسبة 2.5% حولياً عند بلوغ النصاب الشرعي."
    },
    "law": "المرسوم الصادر بتنظيم صندوق الزكاة التابع لدار الفتوى في الجمهورية اللبنانية",
    "authority": "صندوق الزكاة في لبنان (دار الفتوى)",
    "sourceUrl": "https://www.zakatlebanon.org",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "routes": [
    {
      "id": "beirut-tripoli",
      "fromCityAr": "بيروت",
      "toCityAr": "طرابلس",
      "distanceKm": 80,
      "source": "الأوتوستراد الساحلي الشمالي M51"
    },
    {
      "id": "beirut-sidon",
      "fromCityAr": "بيروت",
      "toCityAr": "صيدا",
      "distanceKm": 45,
      "source": "الأوتوستراد الساحلي الجنوبي"
    },
    {
      "id": "beirut-tyre",
      "fromCityAr": "بيروت",
      "toCityAr": "صور",
      "distanceKm": 80,
      "source": "أوتوستراد الجنوب السريع"
    },
    {
      "id": "beirut-zahle",
      "fromCityAr": "بيروت",
      "toCityAr": "زحلة (البقاع)",
      "distanceKm": 55,
      "source": "طريق بيروت - دمشق الدولي"
    },
    {
      "id": "beirut-byblos",
      "fromCityAr": "بيروت",
      "toCityAr": "جبيل",
      "distanceKm": 40,
      "source": "أوتوستراد جونيه - جبيل الساحلي"
    }
  ]
};

export default COUNTRY_DATA_LB;
