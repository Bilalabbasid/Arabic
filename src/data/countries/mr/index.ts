import { CountryData } from '../types';

export const COUNTRY_DATA_MR: CountryData = {
  "countryCode": "mr",
  "basics": {
    "nameAr": "الجمهورية الإسلامية الموريتانية",
    "nameEn": "Mauritania",
    "locale": "ar-MR",
    "currency": {
      "code": "MRU",
      "nameAr": "أوقية موريتانية",
      "symbolAr": "أ.م",
      "minorUnits": 2
    },
    "weekendDays": [
      5,
      6
    ],
    "officialCalendar": "gregorian",
    "localTerms": {
      "vehicleRegistration": "البطاقة الرمادية للسيارة (Carte Grise)",
      "diesel": "مازوت / غازوال",
      "periodicInspection": "الفحص الفني للسيارات (Visite Technique)",
      "drivingLicence": "رخصة السياقة (Permis de Conduire)"
    }
  },
  "vat": {
    "status": "verified",
    "value": {
      "standardRate": 16,
      "reducedRates": [
        0
      ],
      "zeroRatedItems": [
        "الصادرات إلى الخارج"
      ],
      "exemptItems": [
        "السلع الغذائية واسعة الاستهلاك",
        "الأدوية والمستلزمات الطبية"
      ]
    },
    "law": "المدونة العامة للضرائب الموريتانية (Code Général des Impôts)",
    "authority": "المديرية العامة للضرائب الموريتانية (DGI)",
    "sourceUrl": "http://www.impots.gov.mr",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "incomeTax": {
    "status": "verified",
    "value": {
      "hasPersonalIncomeTax": true,
      "standardDeduction": 108000,
      "brackets": [
        {
          "thresholdUpTo": 108000,
          "rate": 0
        },
        {
          "thresholdUpTo": 252000,
          "rate": 15
        },
        {
          "thresholdUpTo": 480000,
          "rate": 25
        },
        {
          "rate": 40
        }
      ]
    },
    "law": "المدونة العامة للضرائب (الضريبة على الرواتب والأجور ITS)",
    "authority": "المديرية العامة للضرائب",
    "sourceUrl": "http://www.impots.gov.mr",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "socialInsurance": {
    "status": "verified",
    "value": {
      "nationalEmployeeRate": 1,
      "nationalEmployerRate": 15,
      "expatEmployeeRate": 1,
      "expatEmployerRate": 15,
      "maxMonthlyWageCap": 7000,
      "agencyNameAr": "الصندوق الوطني للضمان الاجتماعي الموريتاني",
      "agencyAcronym": "CNSS Mauritanie"
    },
    "law": "القانون رقم 67-039 المتضمن لنظام الضمان الاجتماعي وتعديلاته",
    "authority": "الصندوق الوطني للضمان الاجتماعي (CNSS)",
    "sourceUrl": "http://www.cnss.mr",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "endOfService": {
    "status": "verified",
    "value": {
      "standardFormula": "25% من متوسط الأجر الشهري عن كل سنة من السنوات الخمس الأولى، و35% عن السنوات (6-10)، و45% عن السنوات (11-15)، و55% لما فوق 15 سنة.",
      "firstTierYears": 5,
      "firstTierFraction": 0.25,
      "secondTierFraction": 0.35,
      "resignationScale": [
        {
          "minYears": 1,
          "fractionOfAward": 1
        }
      ],
      "wageBasis": "gross_wage_with_fixed_allowances",
      "articles": "المادة 57 من القانون رقم 2004-017 المتضمن لمدونة الشغل الموريتانية"
    },
    "law": "مدونة الشغل الموريتانية (القانون رقم 2004-017)",
    "authority": "وزارة الوظيفة العمومية والعمل الموريتانية",
    "sourceUrl": "http://www.fonctionpublique.gov.mr",
    "validFrom": "2004-07-06",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "consumerFinance": {
    "status": "verified",
    "value": {
      "dbrCapPercent": 40,
      "maxAutoFinanceTenorYears": 5,
      "quoteConvention": "reducing",
      "islamicFinanceTerm": "تمويل مرابحة إسلامية للسيارات"
    },
    "law": "التعليمات الرقابية الصادرة عن البنك المركزي الموريتاني لتنظيم التسهيلات الائتمانية",
    "authority": "البنك المركزي الموريتاني (BCM)",
    "sourceUrl": "https://www.bcm.mr",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "fuel": {
    "status": "verified",
    "value": {
      "pricingModel": "monthly_adjusted",
      "grades": {
        "gasoil": {
          "nameAr": "مازوت (Gasoil / ديزل)",
          "pricePerLiter": 49.96,
          "unitAr": "أ.م/لتر"
        },
        "essence": {
          "nameAr": "بنزين (Essence)",
          "pricePerLiter": 56.64,
          "unitAr": "أ.م/لتر"
        }
      },
      "updateCadenceDays": 30
    },
    "law": "التعريفة الرسمية الصادرة بمقررات وزارة البترول والمعادن والطاقة",
    "authority": "وزارة البترول والمعادن والطاقة / اللجنة الوطنية للمحروقات",
    "sourceUrl": "http://www.petrole.gov.mr",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 35
  },
  "electricity": {
    "status": "verified",
    "value": {
      "residentialTiers": [
        {
          "minKwh": 1,
          "maxKwh": 100,
          "ratePerKwh": 3.2
        },
        {
          "minKwh": 101,
          "maxKwh": 200,
          "ratePerKwh": 5.5
        },
        {
          "minKwh": 201,
          "ratePerKwh": 7.8
        }
      ],
      "meterServiceFeeMonthly": 50,
      "vatApplies": true
    },
    "law": "التعريفة الكهربائية الاجتماعية المعتمدة لدى الشركة الموريتانية للكهرباء",
    "authority": "الشركة الموريتانية للكهرباء (صوملك SOMELEC)",
    "sourceUrl": "http://www.somelec.mr",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "vehicle": {
    "status": "verified",
    "value": {
      "registrationFeeAnnual": 2500,
      "periodicInspectionFee": 800,
      "drivingLicenceRenewal10Yr": 1500,
      "customsDutyPercent": 20,
      "customsVatPercent": 16,
      "maxImportAgeYears": 8,
      "trafficFines": [
        {
          "categoryAr": "المخالفات المرورية",
          "violationAr": "تجاوز السرعة أو قطع الإشارة الحمراء",
          "minFine": 2000,
          "maxFine": 5000
        },
        {
          "categoryAr": "السلامة العامة",
          "violationAr": "عدم وضع حزام الأمان واستعمال الهاتف",
          "minFine": 1000,
          "maxFine": 2000
        }
      ]
    },
    "law": "مدونة السير على الطرق الموريتانية وقوانين المالية السنوية",
    "authority": "وزارة التجهيز والنقل الموريتانية",
    "sourceUrl": "http://www.transports.gov.mr",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "zakat": {
    "status": "verified",
    "value": {
      "authorityName": "وزارة الشؤون الإسلامية والتعليم الأصلي",
      "isMandatoryForCompanies": false,
      "individualNoteAr": "زكاة المال فريضة شرعية بنسبة 2.5% حولياً عند بلوغ النصاب."
    },
    "law": "التنظيم الوزاري للشؤون الإسلامية والمساجد والأوقاف في موريتانيا",
    "authority": "وزارة الشؤون الإسلامية والتعليم الأصلي",
    "sourceUrl": "http://www.islam.gov.mr",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "routes": [
    {
      "id": "nouakchott-nouadhibou",
      "fromCityAr": "نواكشوط",
      "toCityAr": "نواذيبو",
      "distanceKm": 470,
      "source": "طريق نواكشوط - نواذيبو الساحلي RN2"
    },
    {
      "id": "nouakchott-rosso",
      "fromCityAr": "نواكشوط",
      "toCityAr": "روصو (الحدود الجنوبية)",
      "distanceKm": 205,
      "source": "طريق الأمل والجنوب RN2"
    },
    {
      "id": "nouakchott-kiffa",
      "fromCityAr": "نواكشوط",
      "toCityAr": "كيفه",
      "distanceKm": 600,
      "source": "طريق الأمل الوطني RN3"
    },
    {
      "id": "nouakchott-atar",
      "fromCityAr": "نواكشوط",
      "toCityAr": "أطار (آدرار)",
      "distanceKm": 440,
      "source": "طريق أطار الوطني RN1"
    },
    {
      "id": "nouakchott-kaedi",
      "fromCityAr": "نواكشوط",
      "toCityAr": "كيهيدي",
      "distanceKm": 430,
      "source": "طريق بوغي - كيهيدي"
    }
  ]
};

export default COUNTRY_DATA_MR;
