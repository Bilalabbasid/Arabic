import { CountryData } from '../types';

export const COUNTRY_DATA_AE: CountryData = {
  "countryCode": "ae",
  "basics": {
    "nameAr": "الإمارات العربية المتحدة",
    "nameEn": "United Arab Emirates",
    "locale": "ar-AE",
    "currency": {
      "code": "AED",
      "nameAr": "درهم إماراتي",
      "symbolAr": "د.إ",
      "minorUnits": 2
    },
    "weekendDays": [
      5,
      6,
      0
    ],
    "officialCalendar": "gregorian",
    "localTerms": {
      "vehicleRegistration": "ملكية المركبة (تسجيل وترخيص)",
      "diesel": "ديزل",
      "periodicInspection": "فحص المركبة الفني (شامل / فاحص)",
      "drivingLicence": "رخصة القيادة"
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
        "الصادرات الدولية للسلع والخدمات",
        "النقل الدولي",
        "المباني السكنية الجديدة (خلال 3 سنوات)"
      ],
      "exemptItems": [
        "الخدمات المالية المصرفية المحلية",
        "العقارات السكنية المحلية بعد 3 سنوات",
        "النقل المحلي للركاب"
      ]
    },
    "law": "المرسوم بقانون اتحادي رقم (8) لسنة 2017 وتعديلاته بالمرسوم رقم (18) لسنة 2022",
    "authority": "الهيئة الاتحادية للضرائب (FTA)",
    "sourceUrl": "https://tax.gov.ae/ar/legislation.aspx",
    "validFrom": "2018-01-01",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "incomeTax": {
    "status": "not_applicable",
    "note": "لا تفرض دولة الإمارات أي ضريبة على الدخل الشخصي أو الأجور للموظفين.",
    "authority": "الهيئة الاتحادية للضرائب",
    "sourceUrl": "https://tax.gov.ae",
    "checkedAt": "2026-11-01",
    "value": {
      "hasPersonalIncomeTax": false
    }
  },
  "socialInsurance": {
    "status": "verified",
    "value": {
      "nationalEmployeeRate": 5,
      "nationalEmployerRate": 12.5,
      "expatEmployeeRate": 0,
      "expatEmployerRate": 0,
      "maxMonthlyWageCap": 50000,
      "agencyNameAr": "الهيئة العامة للمعاشات والتأمينات الاجتماعية",
      "agencyAcronym": "GPSSA"
    },
    "law": "قانون المعاشات والتأمينات الاجتماعية الاتحادي رقم 7 لسنة 1999 وتعديلاته",
    "authority": "الهيئة العامة للمعاشات والتأمينات الاجتماعية (GPSSA)",
    "sourceUrl": "https://gpssa.gov.ae",
    "validFrom": "1999-01-01",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "endOfService": {
    "status": "verified",
    "value": {
      "standardFormula": "21 يوماً من الأجر الأساسي عن كل سنة من السنوات الخمس الأولى، و 30 يوماً عن كل سنة تالية.",
      "firstTierYears": 5,
      "firstTierFraction": 0.7,
      "secondTierFraction": 1,
      "resignationScale": [
        {
          "minYears": 1,
          "fractionOfAward": 1
        }
      ],
      "wageBasis": "basic_only",
      "articles": "المادة 51 من المرسوم بقانون اتحادي رقم 33 لسنة 2021 في شأن تنظيم علاقات العمل"
    },
    "law": "المرسوم بقانون اتحادي رقم 33 لسنة 2021",
    "authority": "وزارة الموارد البشرية والتوطين (MOHRE)",
    "sourceUrl": "https://www.mohre.gov.ae",
    "validFrom": "2022-02-02",
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
      "islamicFinanceTerm": "مرابحة سيارات / إجارة منتهية بالتمليك"
    },
    "law": "نظام القروض المصرفية والتسهيلات الأخرى المقدمة للعملاء الأفراد رقم 29/2011",
    "authority": "مصرف الإمارات العربية المتحدة المركزي (CBUAE)",
    "sourceUrl": "https://www.centralbank.ae",
    "validFrom": "2011-05-01",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "fuel": {
    "status": "verified",
    "value": {
      "pricingModel": "monthly_adjusted",
      "grades": {
        "super98": {
          "nameAr": "سوبر 98 ممتاز",
          "pricePerLiter": 3.14,
          "unitAr": "د.إ/لتر"
        },
        "special95": {
          "nameAr": "خصوصي 95",
          "pricePerLiter": 3.03,
          "unitAr": "د.إ/لتر"
        },
        "eplus91": {
          "nameAr": "إي بلس 91",
          "pricePerLiter": 2.95,
          "unitAr": "د.إ/لتر"
        },
        "diesel": {
          "nameAr": "ديزل",
          "pricePerLiter": 3.08,
          "unitAr": "د.إ/لتر"
        }
      },
      "priceHistory": [
        {
          "date": "2026-11-01",
          "prices": {
            "super98": 3.14,
            "special95": 3.03,
            "eplus91": 2.95,
            "diesel": 3.08
          }
        },
        {
          "date": "2026-10-01",
          "prices": {
            "super98": 3.07,
            "special95": 2.95,
            "eplus91": 2.88,
            "diesel": 3.04
          }
        }
      ],
      "updateCadenceDays": 30
    },
    "law": "قرار تحرير أسعار الوقود الصادر عن مجلس الوزراء بربط الأسعار بالمتوسط العالمي",
    "authority": "لجنة متابعة أسعار الوقود / وزارة الطاقة والبنية التحتية",
    "sourceUrl": "https://www.moei.gov.ae",
    "validFrom": "2015-08-01",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 35
  },
  "electricity": {
    "status": "verified",
    "value": {
      "residentialTiers": [
        {
          "minKwh": 1,
          "maxKwh": 2000,
          "ratePerKwh": 0.23
        },
        {
          "minKwh": 2001,
          "maxKwh": 4000,
          "ratePerKwh": 0.28
        },
        {
          "minKwh": 4001,
          "maxKwh": 6000,
          "ratePerKwh": 0.32
        },
        {
          "minKwh": 6001,
          "ratePerKwh": 0.38
        }
      ],
      "meterServiceFeeMonthly": 0,
      "vatApplies": true
    },
    "law": "تعرفة استهلاك الكهرباء السكنية المعتمدة لدى هيئة كهرباء ومياه دبي (ديوا)",
    "authority": "هيئة كهرباء ومياه دبي (DEWA) / دائرة الطاقة بأبوظبي",
    "sourceUrl": "https://www.dewa.gov.ae",
    "validFrom": "2011-01-01",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "vehicle": {
    "status": "verified",
    "value": {
      "registrationFeeAnnual": 350,
      "periodicInspectionFee": 170,
      "drivingLicenceRenewal10Yr": 300,
      "customsDutyPercent": 5,
      "customsVatPercent": 5,
      "trafficFines": [
        {
          "categoryAr": "السرعة الزائدة",
          "violationAr": "تجاوز السرعة بما لا يزيد عن 20 كم/س",
          "minFine": 300,
          "maxFine": 300,
          "blackPoints": 0
        },
        {
          "categoryAr": "السرعة الزائدة",
          "violationAr": "تجاوز السرعة بما يزيد عن 60 كم/س",
          "minFine": 1500,
          "maxFine": 1500,
          "blackPoints": 6
        },
        {
          "categoryAr": "الإشارات المرورية",
          "violationAr": "تجاوز الإشارة الحمراء للمركبات الخفيفة",
          "minFine": 1000,
          "maxFine": 1000,
          "blackPoints": 12
        },
        {
          "categoryAr": "السلامة العامة",
          "violationAr": "عدم ربط حزام الأمان أثناء القيادة",
          "minFine": 400,
          "maxFine": 400,
          "blackPoints": 4
        },
        {
          "categoryAr": "السلامة العامة",
          "violationAr": "الانشغال بغير الطريق عبر الهاتف المتحرك",
          "minFine": 800,
          "maxFine": 800,
          "blackPoints": 4
        }
      ]
    },
    "law": "القرار الوزاري رقم (178) لسنة 2017 بشأن قواعد وإجراءات الضبط المروري",
    "authority": "وزارة الداخلية / هيئة الطرق والمواصلات بدبي (RTA)",
    "sourceUrl": "https://www.moi.gov.ae",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "zakat": {
    "status": "verified",
    "value": {
      "authorityName": "صندوق الزكاة الإماراتي",
      "isMandatoryForCompanies": false,
      "individualNoteAr": "زكاة المال فريضة دينية إسلامية بمعدل 2.5% حولياً عند بلوغ النصاب."
    },
    "law": "القانون الاتحادي رقم 4 لسنة 2003 بإنشاء صندوق الزكاة",
    "authority": "صندوق الزكاة بدولة الإمارات",
    "sourceUrl": "https://www.zakatfund.gov.ae",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "routes": [
    {
      "id": "dubai-abudhabi",
      "fromCityAr": "دبي",
      "toCityAr": "أبوظبي",
      "distanceKm": 140,
      "source": "هيئة الطرق والمواصلات - طريق الشيخ زايد E11"
    },
    {
      "id": "dubai-sharjah",
      "fromCityAr": "دبي",
      "toCityAr": "الشارقة",
      "distanceKm": 25,
      "source": "هيئة الطرق والمواصلات E11"
    },
    {
      "id": "dubai-alain",
      "fromCityAr": "دبي",
      "toCityAr": "العين",
      "distanceKm": 135,
      "source": "طريق دبي - العين E66"
    },
    {
      "id": "abudhabi-alain",
      "fromCityAr": "أبوظبي",
      "toCityAr": "العين",
      "distanceKm": 160,
      "source": "طريق أبوظبي - العين E22"
    },
    {
      "id": "dubai-fujairah",
      "fromCityAr": "دبي",
      "toCityAr": "الفجيرة",
      "distanceKm": 120,
      "source": "طريق الشيخ خليفة السريع E84"
    },
    {
      "id": "dubai-rasalkhaimah",
      "fromCityAr": "دبي",
      "toCityAr": "رأس الخيمة",
      "distanceKm": 110,
      "source": "طريق محمد بن زايد E311"
    }
  ]
};

export default COUNTRY_DATA_AE;
