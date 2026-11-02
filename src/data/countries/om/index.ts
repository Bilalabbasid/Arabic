import { CountryData } from '../types';

export const COUNTRY_DATA_OM: CountryData = {
  "countryCode": "om",
  "basics": {
    "nameAr": "سلطنة عمان",
    "nameEn": "Oman",
    "locale": "ar-OM",
    "currency": {
      "code": "OMR",
      "nameAr": "ريال عماني",
      "symbolAr": "ر.ع",
      "minorUnits": 3
    },
    "weekendDays": [
      5,
      6
    ],
    "officialCalendar": "gregorian",
    "localTerms": {
      "vehicleRegistration": "ملكية المركبة (رخصة التسيير)",
      "diesel": "ديزل",
      "periodicInspection": "فحص المركبات الدوري بشرطة عمان السلطانية",
      "drivingLicence": "رخصة سياقة"
    }
  },
  "vat": {
    "status": "verified",
    "value": {
      "standardRate": 5,
      "reducedRates": [
        0
      ],
      "zeroRatedItems": [
        "السلع الغذائية الأساسية (نحو 500 سلعة مؤهلة)",
        "الأدوية والتجهيزات الطبية",
        "النقل الدولي ونقل السلع والركاب",
        "الذهب والفضة والبلاتين الاستثماري"
      ],
      "exemptItems": [
        "الخدمات المالية المصرفية المحلية",
        "تأجير وشراء العقارات السكنية",
        "الأراضي الفضاء",
        "خدمات التعليم والرعاية الصحية المحلية"
      ]
    },
    "law": "قانون ضريبة القيمة المضافة الصادر بالمرسوم السلطاني رقم 121/2020",
    "authority": "جهاز الضرائب العماني (Tax Authority)",
    "sourceUrl": "https://tms.taxoman.gov.om",
    "validFrom": "2021-04-16",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "incomeTax": {
    "status": "not_applicable",
    "note": "لا تفرض سلطنة عمان ضريبة على الدخل الشخصي للأفراد أو رواتب الموظفين حتى تاريخه.",
    "authority": "جهاز الضرائب العماني",
    "sourceUrl": "https://tms.taxoman.gov.om",
    "checkedAt": "2026-11-01",
    "value": {
      "hasPersonalIncomeTax": false
    }
  },
  "socialInsurance": {
    "status": "verified",
    "value": {
      "nationalEmployeeRate": 8,
      "nationalEmployerRate": 14.5,
      "expatEmployeeRate": 0,
      "expatEmployerRate": 1,
      "maxMonthlyWageCap": 3000,
      "agencyNameAr": "صندوق الحماية الاجتماعية",
      "agencyAcronym": "SPF"
    },
    "law": "قانون الحماية الاجتماعية الصادر بالمرسوم السلطاني رقم 52/2023",
    "authority": "صندوق الحماية الاجتماعية (SPF)",
    "sourceUrl": "https://www.spf.gov.om",
    "validFrom": "2024-01-01",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "endOfService": {
    "status": "verified",
    "value": {
      "standardFormula": "أجر شهر كامل عن كل سنة خدمة بناء على الأجر الشامل الأخير.",
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
      "articles": "المادة 61 من قانون العمل الصادر بالمرسوم السلطاني رقم 53/2023 ومنظومة الحماية الاجتماعية"
    },
    "law": "قانون العمل العماني بالمرسوم السلطاني رقم 53/2023 وقانون الحماية الاجتماعية",
    "authority": "وزارة العمل العمانية / صندوق الحماية الاجتماعية",
    "sourceUrl": "https://www.mol.gov.om",
    "validFrom": "2023-07-26",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "consumerFinance": {
    "status": "verified",
    "value": {
      "dbrCapPercent": 50,
      "dbrCapPensionerPercent": 40,
      "maxAutoFinanceTenorYears": 7,
      "quoteConvention": "reducing",
      "islamicFinanceTerm": "تمويل مرابحة سيارات / إجارة منتهية بالتمليك"
    },
    "law": "التعاميم المصرفية والتعليمات الرقابية للائتمان الصادرة عن البنك المركزي العماني",
    "authority": "البنك المركزي العماني (CBO)",
    "sourceUrl": "https://www.cbo.gov.om",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "fuel": {
    "status": "verified",
    "value": {
      "pricingModel": "subsidised_cap",
      "grades": {
        "m91": {
          "nameAr": "بنزين عادي 91 (مدعوم للمواطنين)",
          "pricePerLiter": 0.229,
          "unitAr": "ر.ع/لتر"
        },
        "m95": {
          "nameAr": "بنزين ممتاز 95",
          "pricePerLiter": 0.239,
          "unitAr": "ر.ع/لتر"
        },
        "diesel": {
          "nameAr": "ديزل",
          "pricePerLiter": 0.258,
          "unitAr": "ر.ع/لتر"
        }
      },
      "updateCadenceDays": 30
    },
    "law": "التوجيهات السامية بتثبيت سقف أسعار وقود المركبات وفق أسعار أكتوبر 2021 دعماً للمواطنين",
    "authority": "وزارة الطاقة والمعادن / شركة النفط العمانية للتسويق",
    "sourceUrl": "https://www.mem.gov.om",
    "validFrom": "2021-11-01",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 35
  },
  "electricity": {
    "status": "verified",
    "value": {
      "residentialTiers": [
        {
          "minKwh": 1,
          "maxKwh": 4000,
          "ratePerKwh": 0.014
        },
        {
          "minKwh": 4001,
          "maxKwh": 6000,
          "ratePerKwh": 0.017
        },
        {
          "minKwh": 6001,
          "ratePerKwh": 0.03
        }
      ],
      "meterServiceFeeMonthly": 0,
      "vatApplies": true
    },
    "law": "لائحة تعرفة تزويد الكهرباء المعتمدة من هيئة تنظيم الخدمات العامة بقرار رقم 8/2021",
    "authority": "هيئة تنظيم الخدمات العامة (APSR)",
    "sourceUrl": "https://www.apsr.om",
    "validFrom": "2022-01-01",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "vehicle": {
    "status": "verified",
    "value": {
      "registrationFeeAnnual": 20,
      "periodicInspectionFee": 5,
      "drivingLicenceRenewal10Yr": 20,
      "customsDutyPercent": 5,
      "customsVatPercent": 5,
      "maxImportAgeYears": 7,
      "trafficFines": [
        {
          "categoryAr": "الإشارات المرورية",
          "violationAr": "تجاوز الإشارة الضوئية الحمراء",
          "minFine": 50,
          "maxFine": 50
        },
        {
          "categoryAr": "السرعة الزائدة",
          "violationAr": "تجاوز السرعة المقررة من 15 إلى 35 كم/س",
          "minFine": 15,
          "maxFine": 35
        },
        {
          "categoryAr": "السلامة العامة",
          "violationAr": "عدم ربط حزام الأمان",
          "minFine": 10,
          "maxFine": 10
        },
        {
          "categoryAr": "السلامة العامة",
          "violationAr": "استخدام الهاتف النقال باليد أثناء السياقة",
          "minFine": 15,
          "maxFine": 15
        }
      ]
    },
    "law": "قانون المرور الصادر بالمرسوم السلطاني رقم 28/93 وتعديلاته بالمرسوم رقم 38/2016 ولائحته التنفيذية",
    "authority": "شرطة عمان السلطانية - الإدارة العامة للمرور",
    "sourceUrl": "https://www.traffic.rop.gov.om",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "zakat": {
    "status": "verified",
    "value": {
      "authorityName": "وزارة الأوقاف والشؤون الدينية - دائرة الزكاة",
      "isMandatoryForCompanies": false,
      "individualNoteAr": "الزكاة ركن شرعي بمقدار 2.5% من المال الحائل عليه الحول البالغ النصاب."
    },
    "law": "المرسوم السلطاني رقم 6/99 بتحديد اختصاصات وزارة الأوقاف والشؤون الدينية",
    "authority": "وزارة الأوقاف والشؤون الدينية (بوابة الزكاة)",
    "sourceUrl": "https://www.zakat.om",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "routes": [
    {
      "id": "muscat-sohar",
      "fromCityAr": "مسقط",
      "toCityAr": "صحار",
      "distanceKm": 210,
      "source": "طريق الباطنة السريع"
    },
    {
      "id": "muscat-salalah",
      "fromCityAr": "مسقط",
      "toCityAr": "صلالة",
      "distanceKm": 1000,
      "source": "طريق أدم - ثمريت - صلالة 31"
    },
    {
      "id": "muscat-nizwa",
      "fromCityAr": "مسقط",
      "toCityAr": "نزوى",
      "distanceKm": 160,
      "source": "طريق مسقط - نزوى المزدوج 15"
    },
    {
      "id": "muscat-sur",
      "fromCityAr": "مسقط",
      "toCityAr": "صور",
      "distanceKm": 205,
      "source": "طريق قريات - صور الساحلي"
    },
    {
      "id": "muscat-ibri",
      "fromCityAr": "مسقط",
      "toCityAr": "عبري",
      "distanceKm": 290,
      "source": "طريق مسقط - عبري"
    }
  ]
};

export default COUNTRY_DATA_OM;
