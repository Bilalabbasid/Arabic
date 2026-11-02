import { CountryData } from '../types';

export const COUNTRY_DATA_DJ: CountryData = {
  "countryCode": "dj",
  "basics": {
    "nameAr": "جمهورية جيبوتي",
    "nameEn": "Djibouti",
    "locale": "ar-DJ",
    "currency": {
      "code": "DJF",
      "nameAr": "فرنك جيبوتي",
      "symbolAr": "ف.ج",
      "minorUnits": 2
    },
    "weekendDays": [
      5,
      6
    ],
    "officialCalendar": "gregorian",
    "localTerms": {
      "vehicleRegistration": "البطاقة الرمادية (Carte Grise)",
      "diesel": "مازوت / غازوال (Gasoil)",
      "periodicInspection": "الفحص التقني للمركبات (Contrôle Technique)",
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
        "الصادرات إلى خارج البلاد وتجارة الترانزيت المؤهلة"
      ],
      "exemptItems": [
        "السلع الغذائية الأساسية (الدقيق، الحليب، الأرز)",
        "الأدوية والمستلزمات الطبية"
      ]
    },
    "law": "المدونة العامة للضرائب (Code Général des Impôts de Djibouti)",
    "authority": "المديرية العامة للضرائب (DGI Djibouti)",
    "sourceUrl": "https://www.dgi.gouv.dj",
    "validFrom": "2009-01-01",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "incomeTax": {
    "status": "verified",
    "value": {
      "hasPersonalIncomeTax": true,
      "standardDeduction": 600000,
      "brackets": [
        {
          "thresholdUpTo": 600000,
          "rate": 0
        },
        {
          "thresholdUpTo": 1800000,
          "rate": 15
        },
        {
          "thresholdUpTo": 3600000,
          "rate": 20
        },
        {
          "rate": 30
        }
      ]
    },
    "law": "المدونة العامة للضرائب (الضريبة على الأجور والمرتبات ITS)",
    "authority": "المديرية العامة للضرائب بوزارة الميزانية",
    "sourceUrl": "https://www.dgi.gouv.dj",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "socialInsurance": {
    "status": "verified",
    "value": {
      "nationalEmployeeRate": 4,
      "nationalEmployerRate": 15.7,
      "expatEmployeeRate": 4,
      "expatEmployerRate": 15.7,
      "maxMonthlyWageCap": 400000,
      "agencyNameAr": "الصندوق الوطني للضمان الاجتماعي الجيبوتي",
      "agencyAcronym": "CNSS Djibouti"
    },
    "law": "القانون رقم 135/AN/11/6ème L بشأن الحماية الاجتماعية في جيبوتي",
    "authority": "الصندوق الوطني للضمان الاجتماعي (CNSS)",
    "sourceUrl": "https://www.cnss.dj",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "endOfService": {
    "status": "verified",
    "value": {
      "standardFormula": "تعويض التسريح يحتسب بنسبة تتراوح بين 25% إلى 40% من متوسط الأجر الشهري عن كل سنة خدمة بحسب الأقدمية.",
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
      "articles": "المادة 53 من القانون رقم 133/AN/05/5ème L المتضمن لمدونة العمل الجيبوتية"
    },
    "law": "مدونة العمل الجيبوتية (Loi No. 133/AN/05/5ème L)",
    "authority": "وزارة العمل المكلفة بالإصلاح الإداري في جيبوتي",
    "sourceUrl": "https://www.travail.gouv.dj",
    "validFrom": "2006-01-28",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "consumerFinance": {
    "status": "verified",
    "value": {
      "dbrCapPercent": 40,
      "maxAutoFinanceTenorYears": 5,
      "quoteConvention": "reducing",
      "islamicFinanceTerm": "مرابحة سيارات عبر البنوك الإسلامية"
    },
    "law": "التعليمات المصرفية الصادرة عن البنك المركزي الجيبوتي بشأن التسهيلات الائتمانية",
    "authority": "البنك المركزي الجيبوتي (BCD)",
    "sourceUrl": "https://www.banque-centrale.dj",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "fuel": {
    "status": "verified",
    "value": {
      "pricingModel": "monthly_adjusted",
      "grades": {
        "super": {
          "nameAr": "بنزين ممتاز (Super)",
          "pricePerLiter": 330,
          "unitAr": "ف.ج/لتر"
        },
        "gasoil": {
          "nameAr": "مازوت / غازوال (Gasoil)",
          "pricePerLiter": 275,
          "unitAr": "ف.ج/لتر"
        }
      },
      "updateCadenceDays": 30
    },
    "law": "المقررات الوزارية لتحديد أسعار المحروقات في محطات التوزيع",
    "authority": "وزارة الطاقة المكلفة بالموارد الطبيعية الجيبوتية",
    "sourceUrl": "https://www.energie.gouv.dj",
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
          "ratePerKwh": 35
        },
        {
          "minKwh": 101,
          "maxKwh": 300,
          "ratePerKwh": 45
        },
        {
          "minKwh": 301,
          "ratePerKwh": 55
        }
      ],
      "meterServiceFeeMonthly": 500,
      "vatApplies": true
    },
    "law": "تعرفة بيع الطاقة الكهربائية المعتمدة لدى مؤسسة كهرباء جيبوتي",
    "authority": "مؤسسة كهرباء جيبوتي (EDD)",
    "sourceUrl": "https://www.edd.dj",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "vehicle": {
    "status": "verified",
    "value": {
      "registrationFeeAnnual": 15000,
      "periodicInspectionFee": 5000,
      "drivingLicenceRenewal10Yr": 10000,
      "customsDutyPercent": 20,
      "customsVatPercent": 10,
      "maxImportAgeYears": 8,
      "trafficFines": [
        {
          "categoryAr": "المخالفات المرورية",
          "violationAr": "تجاوز السرعة أو قطع الإشارة الحمراء",
          "minFine": 5000,
          "maxFine": 15000
        },
        {
          "categoryAr": "السلامة العامة",
          "violationAr": "عدم وضع حزام الأمان واستعمال الهاتف باليد",
          "minFine": 3000,
          "maxFine": 5000
        }
      ]
    },
    "law": "مدونة السير وقوانين المرور في جمهورية جيبوتي",
    "authority": "وزارة التجهيز والنقل الجيبوتية / إدارة الشرطة الوطنية",
    "sourceUrl": "https://www.transports.gouv.dj",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "zakat": {
    "status": "verified",
    "value": {
      "authorityName": "وزارة الشؤون الإسلامية والأوقاف في جيبوتي",
      "isMandatoryForCompanies": false,
      "individualNoteAr": "زكاة المال فريضة شرعية بنسبة 2.5% حولياً عند بلوغ النصاب."
    },
    "law": "التنظيم الوزاري للشؤون الإسلامية والأوقاف الجيبوتي",
    "authority": "وزارة الشؤون الإسلامية والثقافة والأوقاف",
    "sourceUrl": "https://www.affaires-musulmanes.dj",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "routes": [
    {
      "id": "djibouti-alisabieh",
      "fromCityAr": "جيبوتي العاصمة",
      "toCityAr": "علي صبيح",
      "distanceKm": 95,
      "source": "طريق جيبوتي - علي صبيح الوطني RN1"
    },
    {
      "id": "djibouti-tadjourah",
      "fromCityAr": "جيبوتي العاصمة",
      "toCityAr": "تاجورة",
      "distanceKm": 175,
      "source": "طريق الوحدة الوطني RN9"
    },
    {
      "id": "djibouti-dikhil",
      "fromCityAr": "جيبوتي العاصمة",
      "toCityAr": "دخيل",
      "distanceKm": 120,
      "source": "طريق جيبوتي - دخيل - غلافي RN1"
    },
    {
      "id": "djibouti-arta",
      "fromCityAr": "جيبوتي العاصمة",
      "toCityAr": "عرتا",
      "distanceKm": 40,
      "source": "طريق عرتا السريع RN1"
    },
    {
      "id": "djibouti-galafi",
      "fromCityAr": "جيبوتي العاصمة",
      "toCityAr": "غلافي (الحدود الإثيوبية)",
      "distanceKm": 190,
      "source": "ممر التجارة والترانزيت الدولي RN1"
    }
  ]
};

export default COUNTRY_DATA_DJ;
