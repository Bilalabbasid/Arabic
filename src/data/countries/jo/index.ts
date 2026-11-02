import { CountryData } from '../types';

export const COUNTRY_DATA_JO: CountryData = {
  "countryCode": "jo",
  "basics": {
    "nameAr": "المملكة الأردنية الهاشمية",
    "nameEn": "Jordan",
    "locale": "ar-JO",
    "currency": {
      "code": "JOD",
      "nameAr": "دينار أردني",
      "symbolAr": "د.أ",
      "minorUnits": 3
    },
    "weekendDays": [
      5,
      6
    ],
    "officialCalendar": "gregorian",
    "localTerms": {
      "vehicleRegistration": "رخصة اقتناء المركبة (تسجيل)",
      "diesel": "ديزل (سولار)",
      "periodicInspection": "الفحص الفني الدوري بإدارة الترخيص",
      "drivingLicence": "رخصة قيادة (سوق)"
    }
  },
  "vat": {
    "status": "verified",
    "value": {
      "standardRate": 16,
      "reducedRates": [
        0,
        4,
        10
      ],
      "zeroRatedItems": [
        "صادرات السلع والخدمات إلى خارج الأردن"
      ],
      "exemptItems": [
        "الخدمات المالية والمصرفية",
        "التأجير السكني غير المفروش",
        "الأدوية الأساسية"
      ]
    },
    "law": "قانون الضريبة العامة على المبيعات رقم 6 لسنة 1994 وتعديلاته",
    "authority": "دائرة ضريبة الدخل والمبيعات (ISTD)",
    "sourceUrl": "https://www.istd.gov.jo",
    "validFrom": "1994-06-01",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "incomeTax": {
    "status": "verified",
    "value": {
      "hasPersonalIncomeTax": true,
      "standardDeduction": 9000,
      "brackets": [
        {
          "thresholdUpTo": 5000,
          "rate": 5
        },
        {
          "thresholdUpTo": 10000,
          "rate": 10
        },
        {
          "thresholdUpTo": 15000,
          "rate": 15
        },
        {
          "thresholdUpTo": 20000,
          "rate": 20
        },
        {
          "rate": 25
        }
      ]
    },
    "law": "قانون ضريبة الدخل رقم 34 لسنة 2014 المعدل بالقانون رقم 38 لسنة 2018",
    "authority": "دائرة ضريبة الدخل والمبيعات (ISTD)",
    "sourceUrl": "https://www.istd.gov.jo",
    "validFrom": "2019-01-01",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "socialInsurance": {
    "status": "verified",
    "value": {
      "nationalEmployeeRate": 7.5,
      "nationalEmployerRate": 14.25,
      "expatEmployeeRate": 7.5,
      "expatEmployerRate": 14.25,
      "maxMonthlyWageCap": 3538,
      "agencyNameAr": "المؤسسة العامة للضمان الاجتماعي",
      "agencyAcronym": "SSC"
    },
    "law": "قانون الضمان الاجتماعي رقم 1 لسنة 2014 وتعديلاته بالمرسوم رقم 11 لسنة 2023",
    "authority": "المؤسسة العامة للضمان الاجتماعي (SSC)",
    "sourceUrl": "https://www.ssc.gov.jo",
    "validFrom": "2014-03-01",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "endOfService": {
    "status": "verified",
    "value": {
      "standardFormula": "أجر شهر كامل عن كل سنة خدمة فعلية للعمال غير الخاضعين لأحكام قانون الضمان الاجتماعي.",
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
      "articles": "المادة 32 من قانون العمل الأردني رقم 8 لسنة 1996 وتعديلاته"
    },
    "law": "قانون العمل الأردني رقم 8 لسنة 1996",
    "authority": "وزارة العمل الأردنية",
    "sourceUrl": "https://www.mol.gov.jo",
    "validFrom": "1996-06-16",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "consumerFinance": {
    "status": "verified",
    "value": {
      "dbrCapPercent": 50,
      "dbrCapPensionerPercent": 35,
      "maxAutoFinanceTenorYears": 8,
      "quoteConvention": "reducing",
      "islamicFinanceTerm": "تمويل مرابحة / إجارة منتهية بالتمليك"
    },
    "law": "تعليمات التعامل مع العملاء بعدالة وشفافية وضوابط الإقراض الصادرة عن البنك المركزي الأردني",
    "authority": "البنك المركزي الأردني (CBJ)",
    "sourceUrl": "https://www.cbj.gov.jo",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "fuel": {
    "status": "verified",
    "value": {
      "pricingModel": "monthly_adjusted",
      "grades": {
        "octane90": {
          "nameAr": "بنزين أوكتان 90",
          "pricePerLiter": 0.915,
          "unitAr": "د.أ/لتر"
        },
        "octane95": {
          "nameAr": "بنزين أوكتان 95",
          "pricePerLiter": 1.155,
          "unitAr": "د.أ/لتر"
        },
        "diesel": {
          "nameAr": "ديزل (سولار)",
          "pricePerLiter": 0.725,
          "unitAr": "د.أ/لتر"
        }
      },
      "updateCadenceDays": 30
    },
    "law": "تسعيرة لجنة تسعير المشتقات النفطية الشهرية بوزارة الطاقة والثروة المعدنية",
    "authority": "وزارة الطاقة والثروة المعدنية (MEMR)",
    "sourceUrl": "https://www.memr.gov.jo",
    "validFrom": "2026-11-01",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 35
  },
  "electricity": {
    "status": "verified",
    "value": {
      "residentialTiers": [
        {
          "minKwh": 1,
          "maxKwh": 300,
          "ratePerKwh": 0.05
        },
        {
          "minKwh": 301,
          "maxKwh": 600,
          "ratePerKwh": 0.1
        },
        {
          "minKwh": 601,
          "ratePerKwh": 0.2
        }
      ],
      "meterServiceFeeMonthly": 1.5,
      "vatApplies": false
    },
    "law": "التعرفة الكهربائية المدعومة المعتمدة بقرار هيئة تنظيم قطاع الطاقة والمعادن لسنة 2022",
    "authority": "هيئة تنظيم قطاع الطاقة والمعادن (EMRC)",
    "sourceUrl": "https://emrc.gov.jo",
    "validFrom": "2022-04-01",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "vehicle": {
    "status": "verified",
    "value": {
      "registrationFeeAnnual": 64,
      "periodicInspectionFee": 15,
      "drivingLicenceRenewal10Yr": 35,
      "customsDutyPercent": 25,
      "customsVatPercent": 16,
      "trafficFines": [
        {
          "categoryAr": "الإشارات المرورية",
          "violationAr": "قطع الإشارة الضوئية الحمراء",
          "minFine": 100,
          "maxFine": 200
        },
        {
          "categoryAr": "السرعة الزائدة",
          "violationAr": "تجاوز السرعة المقررة بأكثر من 30 كم/س",
          "minFine": 50,
          "maxFine": 100
        },
        {
          "categoryAr": "السلامة العامة",
          "violationAr": "عدم استعمال حزام الأمان",
          "minFine": 20,
          "maxFine": 20
        },
        {
          "categoryAr": "السلامة العامة",
          "violationAr": "استخدام الهاتف المحمول أثناء القيادة باليد",
          "minFine": 50,
          "maxFine": 50
        }
      ]
    },
    "law": "قانون السير الأردني رقم 49 لسنة 2008 وتعديلاته بالقانون رقم 18 لسنة 2023",
    "authority": "مديرية الأمن العام - إدارة السير والترخيص",
    "sourceUrl": "https://www.psd.gov.jo",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "zakat": {
    "status": "verified",
    "value": {
      "authorityName": "صندوق الزكاة التابع لوزارة الأوقاف والشؤون والمقدسات الإسلامية",
      "isMandatoryForCompanies": false,
      "individualNoteAr": "زكاة المال 2.5% حولياً عند بلوغ نصاب 85 غراماً من الذهب."
    },
    "law": "قانون صندوق الزكاة رقم 8 لسنة 1988 وتعديلاته",
    "authority": "صندوق الزكاة الأردني",
    "sourceUrl": "https://www.zakatfund.org.jo",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "routes": [
    {
      "id": "amman-zarqa",
      "fromCityAr": "عَمّان",
      "toCityAr": "الزرقاء",
      "distanceKm": 25,
      "source": "طريق الأوتوستراد وطريق عمان الزرقاء السريع"
    },
    {
      "id": "amman-irbid",
      "fromCityAr": "عَمّان",
      "toCityAr": "إربد",
      "distanceKm": 85,
      "source": "طريق الأردن السريع 35"
    },
    {
      "id": "amman-aqaba",
      "fromCityAr": "عَمّان",
      "toCityAr": "العقبة",
      "distanceKm": 330,
      "source": "الطريق الصحراوي 15"
    },
    {
      "id": "amman-deadsea",
      "fromCityAr": "عَمّان",
      "toCityAr": "البحر الميت",
      "distanceKm": 55,
      "source": "طريق ناعور - البحر الميت"
    },
    {
      "id": "amman-karak",
      "fromCityAr": "عَمّان",
      "toCityAr": "الكرك",
      "distanceKm": 125,
      "source": "الطريق الصحراوي عبر القطرانة"
    }
  ]
};

export default COUNTRY_DATA_JO;
