import { CountryData } from '../types';

export const COUNTRY_DATA_DZ: CountryData = {
  "countryCode": "dz",
  "basics": {
    "nameAr": "الجمهورية الجزائرية الديمقراطية الشعبية",
    "nameEn": "Algeria",
    "locale": "ar-DZ",
    "currency": {
      "code": "DZD",
      "nameAr": "دينار جزائري",
      "symbolAr": "د.ج",
      "minorUnits": 2
    },
    "weekendDays": [
      5,
      6
    ],
    "officialCalendar": "gregorian",
    "localTerms": {
      "vehicleRegistration": "البطاقة الرمادية (Carte Grise)",
      "diesel": "مازوت / غازوال",
      "periodicInspection": "المراقبة التقنية للسيارات (Contrôle Technique)",
      "drivingLicence": "رخصة السياقة (Permis de Conduire)"
    }
  },
  "vat": {
    "status": "verified",
    "value": {
      "standardRate": 19,
      "reducedRates": [
        9
      ],
      "zeroRatedItems": [
        "الصادرات إلى خارج الجزائر المؤهلة"
      ],
      "exemptItems": [
        "السلع الغذائية واسعة الاستهلاك (الدقيق، الخبز، الحليب)",
        "الأدوية الأساسية"
      ]
    },
    "law": "قانون الرسوم على رقم الأعمال (Code des Taxes sur le Chiffre d'Affaires)",
    "authority": "المديرية العامة للضرائب الجزائرية (DGI Algérie)",
    "sourceUrl": "https://mfdgi.gov.dz",
    "validFrom": "2017-01-01",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "incomeTax": {
    "status": "verified",
    "value": {
      "hasPersonalIncomeTax": true,
      "standardDeduction": 240000,
      "brackets": [
        {
          "thresholdUpTo": 240000,
          "rate": 0
        },
        {
          "thresholdUpTo": 480000,
          "rate": 23
        },
        {
          "thresholdUpTo": 960000,
          "rate": 27
        },
        {
          "thresholdUpTo": 1920000,
          "rate": 30
        },
        {
          "thresholdUpTo": 3840000,
          "rate": 33
        },
        {
          "rate": 35
        }
      ]
    },
    "law": "قانون الضرائب المباشرة والرسوم المماثلة وتعديلاته بقانون المالية 2022 وقانون المالية 2024",
    "authority": "المديرية العامة للضرائب (DGI)",
    "sourceUrl": "https://mfdgi.gov.dz",
    "validFrom": "2022-01-01",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "socialInsurance": {
    "status": "verified",
    "value": {
      "nationalEmployeeRate": 9,
      "nationalEmployerRate": 26,
      "expatEmployeeRate": 9,
      "expatEmployerRate": 26,
      "agencyNameAr": "الصندوق الوطني للتأمينات الاجتماعية للعمال الأجراء",
      "agencyAcronym": "CNAS"
    },
    "law": "القانون رقم 83-11 المتعلق بالتأمينات الاجتماعية والقانون 83-12 المتعلق بالتقاعد وتعديلاتهما",
    "authority": "الصندوق الوطني للتأمينات الاجتماعية للعمال الأجراء (CNAS)",
    "sourceUrl": "https://www.cnas.dz",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "endOfService": {
    "status": "verified",
    "value": {
      "standardFormula": "تعويض التسريح يعادل أجر شهر كامل عن كل سنة عمل في حدود الاتفاقيات الجماعية وعقود العمل.",
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
      "articles": "القانون رقم 90-11 المتعلق بعلاقات العمل والاتفاقيات الجماعية القطاعية"
    },
    "law": "القانون رقم 90-11 المؤرخ في 21 أبريل 1990 المتعلق بعلاقات العمل",
    "authority": "وزارة العمل والتشغيل والضمان الاجتماعي الجزائرية",
    "sourceUrl": "https://www.mtess.gov.dz",
    "validFrom": "1990-04-21",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "consumerFinance": {
    "status": "verified",
    "value": {
      "dbrCapPercent": 30,
      "maxAutoFinanceTenorYears": 5,
      "quoteConvention": "reducing",
      "islamicFinanceTerm": "تمويل مرابحة السيارات الاستهلاكي"
    },
    "law": "نظام بنك الجزائر رقم 20-02 المحدد للعمليات البنكية التشاركية وشروط القروض الاستهلاكية",
    "authority": "بنك الجزائر (Banque d'Algérie)",
    "sourceUrl": "https://www.bank-of-algeria.dz",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "fuel": {
    "status": "verified",
    "value": {
      "pricingModel": "fixed_official",
      "grades": {
        "sansPlomb": {
          "nameAr": "بنزين بدون رصاص (Super Sans Plomb)",
          "pricePerLiter": 45.62,
          "unitAr": "د.ج/لتر"
        },
        "gasoil": {
          "nameAr": "مازوت (Gasoil / ديزل)",
          "pricePerLiter": 29.01,
          "unitAr": "د.ج/لتر"
        },
        "gpl": {
          "nameAr": "غاز البترول المميع (سيرغاز GPL)",
          "pricePerLiter": 9,
          "unitAr": "د.ج/لتر"
        }
      },
      "updateCadenceDays": 365
    },
    "law": "التسعيرة الرسمية المقننة لمنتجات المحروقات عبر محطات نفطال المعتمدة بقوانين المالية",
    "authority": "سلطة ضبط المحروقات (ARH) / شركة نفطال (Naftal)",
    "sourceUrl": "https://www.naftal.dz",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 90
  },
  "electricity": {
    "status": "verified",
    "value": {
      "residentialTiers": [
        {
          "minKwh": 1,
          "maxKwh": 125,
          "ratePerKwh": 1.7787
        },
        {
          "minKwh": 126,
          "maxKwh": 250,
          "ratePerKwh": 4.1789
        },
        {
          "minKwh": 251,
          "maxKwh": 375,
          "ratePerKwh": 4.8109
        },
        {
          "minKwh": 376,
          "ratePerKwh": 5.4797
        }
      ],
      "meterServiceFeeMonthly": 85,
      "vatApplies": true
    },
    "law": "تعرفة بيع الكهرباء المعتمدة بقرارات لجنة ضبط الكهرباء والغاز (CREG)",
    "authority": "لجنة ضبط الكهرباء والغاز (CREG) / شركة سونلغاز (Sonelgaz)",
    "sourceUrl": "https://www.creg.gov.dz",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "vehicle": {
    "status": "verified",
    "value": {
      "registrationFeeAnnual": 2500,
      "periodicInspectionFee": 1500,
      "drivingLicenceRenewal10Yr": 1000,
      "customsDutyPercent": 15,
      "customsVatPercent": 19,
      "maxImportAgeYears": 3,
      "trafficFines": [
        {
          "categoryAr": "الدرجة الرابعة",
          "violationAr": "تجاوز السرعة بأكثر من 40 كم/س واجتياز الخط المتصل",
          "minFine": 5000,
          "maxFine": 7000
        },
        {
          "categoryAr": "الدرجة الثالثة",
          "violationAr": "عدم وضع حزام الأمان واستعمال الهاتف باليد",
          "minFine": 3000,
          "maxFine": 4000
        },
        {
          "categoryAr": "الدرجة الثانية",
          "violationAr": "تجاوز السرعة من 10 إلى 20 كم/س",
          "minFine": 2500,
          "maxFine": 3000
        }
      ]
    },
    "law": "القانون رقم 01-14 المتعلق بتنظيم حركة المرور عبر الطرق وسلامتها المعدل بالقانون 17-05",
    "authority": "وزارة الداخلية والجماعات المحلية - المندوبية الوطنية للأمن في الطرق",
    "sourceUrl": "https://interieur.gov.dz",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "zakat": {
    "status": "verified",
    "value": {
      "authorityName": "صندوق الزكاة بوزارة الشؤون الدينية والأوقاف الجزائرية",
      "isMandatoryForCompanies": false,
      "individualNoteAr": "زكاة الأموال فريضة شرعية بنسبة 2.5% حولياً عند بلوغ نصاب الذهب الرسمي المعلن سنوياً."
    },
    "law": "التنظيم الوزاري الخاص بصندوق الزكاة بالمرسوم التنفيذي رقم 01-419",
    "authority": "صندوق الزكاة الجزائري (وزارة الشؤون الدينية)",
    "sourceUrl": "https://www.marw.dz",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "routes": [
    {
      "id": "algiers-oran",
      "fromCityAr": "الجزائر العاصمة",
      "toCityAr": "وهران",
      "distanceKm": 415,
      "source": "الطريق السيار شرق - غرب A1"
    },
    {
      "id": "algiers-constantine",
      "fromCityAr": "الجزائر العاصمة",
      "toCityAr": "قسنطينة",
      "distanceKm": 400,
      "source": "الطريق السيار شرق - غرب A1"
    },
    {
      "id": "algiers-setif",
      "fromCityAr": "الجزائر العاصمة",
      "toCityAr": "سطيف",
      "distanceKm": 300,
      "source": "الطريق السيار شرق - غرب"
    },
    {
      "id": "algiers-annaba",
      "fromCityAr": "الجزائر العاصمة",
      "toCityAr": "عنابة",
      "distanceKm": 540,
      "source": "الطريق السيار شرق - غرب المقطع الشرقي"
    },
    {
      "id": "oran-tlemcen",
      "fromCityAr": "وهران",
      "toCityAr": "تلمسان",
      "distanceKm": 140,
      "source": "الطريق السيار شرق - غرب الشطر الغربي"
    }
  ]
};

export default COUNTRY_DATA_DZ;
