import { CountryData } from '../types';

export const COUNTRY_DATA_KM: CountryData = {
  "countryCode": "km",
  "basics": {
    "nameAr": "الاتحاد القمري",
    "nameEn": "Comoros",
    "locale": "ar-KM",
    "currency": {
      "code": "KMF",
      "nameAr": "فرنك قمري",
      "symbolAr": "ف.ق",
      "minorUnits": 2
    },
    "weekendDays": [
      5,
      6
    ],
    "officialCalendar": "gregorian",
    "localTerms": {
      "vehicleRegistration": "البطاقة الرمادية للمركبة (Carte Grise)",
      "diesel": "مازوت / ديزل (Gasoil)",
      "periodicInspection": "الفحص التقني للسيارات (Visite Technique)",
      "drivingLicence": "رخصة السياقة (Permis de Conduire)"
    }
  },
  "vat": {
    "status": "verified",
    "value": {
      "standardRate": 10,
      "reducedRates": [
        0
      ],
      "zeroRatedItems": [
        "الصادرات إلى خارج جزر القمر"
      ],
      "exemptItems": [
        "المنتجات الغذائية الاستهلاكية الأساسية",
        "الأدوية والخدمات الصحية الأساسية"
      ]
    },
    "law": "المدونة العامة للضرائب في جزر القمر (القانون رقم 12-014/AU)",
    "authority": "المديرية العامة للضرائب والأملاك القمرية (DGID)",
    "sourceUrl": "https://dgid.km",
    "validFrom": "2013-01-01",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "incomeTax": {
    "status": "verified",
    "value": {
      "hasPersonalIncomeTax": true,
      "standardDeduction": 360000,
      "brackets": [
        {
          "thresholdUpTo": 360000,
          "rate": 0
        },
        {
          "thresholdUpTo": 1000000,
          "rate": 10
        },
        {
          "thresholdUpTo": 2500000,
          "rate": 20
        },
        {
          "rate": 30
        }
      ]
    },
    "law": "المدونة العامة للضرائب (الضريبة العامة على دخل الأفراد IGR)",
    "authority": "المديرية العامة للضرائب والأملاك (DGID)",
    "sourceUrl": "https://dgid.km",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "socialInsurance": {
    "status": "verified",
    "value": {
      "nationalEmployeeRate": 3,
      "nationalEmployerRate": 6,
      "expatEmployeeRate": 3,
      "expatEmployerRate": 6,
      "agencyNameAr": "صندوق التقاعد والضمان الاجتماعي القمري",
      "agencyAcronym": "CPS Comores"
    },
    "law": "قوانين التأمين الاجتماعي ونظام التقاعد في الاتحاد القمري",
    "authority": "صندوق التقاعد والاحتياط الاجتماعي القمري",
    "sourceUrl": "https://dgid.km",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "endOfService": {
    "status": "verified",
    "value": {
      "standardFormula": "مكافأة التسريح القانونية تحتسب بنسبة من متوسط الأجر الشهري عن كل سنة خدمة وفق مدونة العمل.",
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
      "articles": "المواد المنظمة لإنهاء الخدمة بمدونة الشغل القمرية (القانون رقم 84-018/PR)"
    },
    "law": "مدونة الشغل في الاتحاد القمري (القانون رقم 84-018/PR)",
    "authority": "وزارة العمل والتشغيل القمرية",
    "sourceUrl": "https://dgid.km",
    "validFrom": "1984-05-15",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "consumerFinance": {
    "status": "verified",
    "value": {
      "dbrCapPercent": 35,
      "maxAutoFinanceTenorYears": 5,
      "quoteConvention": "reducing",
      "islamicFinanceTerm": "تمويل مرابحة استهلاكي"
    },
    "law": "تعليمات البنك المركزي القمري الخاصة بالقروض والتسهيلات المصرفية للأفراد",
    "authority": "البنك المركزي القمري (Banque Centrale des Comores)",
    "sourceUrl": "https://www.banque-centrale-des-comores.net",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "fuel": {
    "status": "verified",
    "value": {
      "pricingModel": "monthly_adjusted",
      "grades": {
        "essence": {
          "nameAr": "بنزين (Essence)",
          "pricePerLiter": 700,
          "unitAr": "ف.ق/لتر"
        },
        "gasoil": {
          "nameAr": "مازوت / ديزل (Gasoil)",
          "pricePerLiter": 600,
          "unitAr": "ف.ق/لتر"
        }
      },
      "updateCadenceDays": 30
    },
    "law": "التسعيرة الرسمية الصادرة عن الشركة الوطنية للمحروقات في جزر القمر",
    "authority": "الشركة القمرية للمحروقات (SCH - Société Comorienne des Hydrocarbures)",
    "sourceUrl": "https://dgid.km",
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
          "ratePerKwh": 135
        },
        {
          "minKwh": 101,
          "ratePerKwh": 165
        }
      ],
      "meterServiceFeeMonthly": 1000,
      "vatApplies": true
    },
    "law": "تعرفة استهلاك الكهرباء المقررة للشركة الوطنية للكهرباء (سونيليك)",
    "authority": "الشركة الوطنية للكهرباء بجزر القمر (SONELEC)",
    "sourceUrl": "https://dgid.km",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "vehicle": {
    "status": "verified",
    "value": {
      "registrationFeeAnnual": 12500,
      "periodicInspectionFee": 5000,
      "drivingLicenceRenewal10Yr": 10000,
      "customsDutyPercent": 20,
      "customsVatPercent": 10,
      "trafficFines": [
        {
          "categoryAr": "المخالفات المرورية",
          "violationAr": "تجاوز السرعة المقررة أو عدم احترام الأولوية",
          "minFine": 5000,
          "maxFine": 15000
        },
        {
          "categoryAr": "السلامة العامة",
          "violationAr": "عدم وضع حزام الأمان",
          "minFine": 3000,
          "maxFine": 5000
        }
      ]
    },
    "law": "قوانين السير والمرور في الاتحاد القمري وقانون المالية",
    "authority": "وزارة النقل والاتصالات القمرية",
    "sourceUrl": "https://dgid.km",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "zakat": {
    "status": "verified",
    "value": {
      "authorityName": "مكتب الإفتاء العام في الاتحاد القمري",
      "isMandatoryForCompanies": false,
      "individualNoteAr": "زكاة المال فريضة شرعية بنسبة 2.5% حولياً عند بلوغ النصاب."
    },
    "law": "المرسوم الرئاسي لتنظيم الإفتاء والشؤون الإسلامية في جزر القمر",
    "authority": "مكتب الإفتاء العام بجزر القمر",
    "sourceUrl": "https://dgid.km",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "routes": [
    {
      "id": "moroni-mitsamiouli",
      "fromCityAr": "موروني (القمر الكبرى)",
      "toCityAr": "ميتساميولي (الشمال)",
      "distanceKm": 40,
      "source": "طريق موروني ميتساميولي الساحلي RN1"
    },
    {
      "id": "moroni-foumbouni",
      "fromCityAr": "موروني",
      "toCityAr": "فومبوني (الجنوب)",
      "distanceKm": 50,
      "source": "طريق موروني فومبوني RN2"
    },
    {
      "id": "moroni-mbeni",
      "fromCityAr": "موروني",
      "toCityAr": "مبيني (الشرق)",
      "distanceKm": 35,
      "source": "طريق موروني مبيني RN3"
    },
    {
      "id": "moroni-airport",
      "fromCityAr": "موروني",
      "toCityAr": "مطار الأمير سعيد إبراهيم الدولي (هاهايا)",
      "distanceKm": 20,
      "source": "طريق المطار الدولي RN1"
    },
    {
      "id": "mutsamudu-domoni",
      "fromCityAr": "موتسامودو (أنجوان)",
      "toCityAr": "دوموني",
      "distanceKm": 30,
      "source": "طريق موتسامودو دوموني الرئيسي"
    }
  ]
};

export default COUNTRY_DATA_KM;
