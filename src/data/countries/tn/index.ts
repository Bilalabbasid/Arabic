import { CountryData } from '../types';

export const COUNTRY_DATA_TN: CountryData = {
  "countryCode": "tn",
  "basics": {
    "nameAr": "الجمهورية التونسية",
    "nameEn": "Tunisia",
    "locale": "ar-TN",
    "currency": {
      "code": "TND",
      "nameAr": "دينار تونسي",
      "symbolAr": "د.ت",
      "minorUnits": 3
    },
    "weekendDays": [
      6,
      0
    ],
    "officialCalendar": "gregorian",
    "localTerms": {
      "vehicleRegistration": "البطاقة الرمادية (Carte Grise)",
      "diesel": "غازوال / مازوت (Gasoil)",
      "periodicInspection": "الفحص الفني للسيارات بالوكالة الفنية للنقل البري (ATTT)",
      "drivingLicence": "رخصة السياقة (Permis de Conduire)"
    }
  },
  "vat": {
    "status": "verified",
    "value": {
      "standardRate": 19,
      "reducedRates": [
        7,
        13
      ],
      "zeroRatedItems": [
        "الصادرات إلى خارج البلاد التونسية"
      ],
      "exemptItems": [
        "المواد الغذائية الأساسية والحبوب",
        "الخدمات الصحية والاستشفائية التابعة للقطاع العام"
      ]
    },
    "law": "مجلة الأداء على القيمة المضافة (Code de la TVA) وتعديلاتها بقوانين المالية",
    "authority": "الإدارة العامة للأداءات (DGI Tunisie)",
    "sourceUrl": "http://www.impots.finances.gov.tn",
    "validFrom": "2018-01-01",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "incomeTax": {
    "status": "verified",
    "value": {
      "hasPersonalIncomeTax": true,
      "standardDeduction": 5000,
      "brackets": [
        {
          "thresholdUpTo": 5000,
          "rate": 0
        },
        {
          "thresholdUpTo": 20000,
          "rate": 26
        },
        {
          "thresholdUpTo": 30000,
          "rate": 28
        },
        {
          "thresholdUpTo": 50000,
          "rate": 32
        },
        {
          "rate": 35
        }
      ]
    },
    "law": "مجلة الضريبة على دخل الأشخاص الطبيعيين والضريبة على الشركات (Code de l'IRPP et de l'IS)",
    "authority": "الإدارة العامة للأداءات بوزارة المالية التونسية",
    "sourceUrl": "http://www.impots.finances.gov.tn",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "socialInsurance": {
    "status": "verified",
    "value": {
      "nationalEmployeeRate": 9.18,
      "nationalEmployerRate": 16.57,
      "expatEmployeeRate": 9.18,
      "expatEmployerRate": 16.57,
      "agencyNameAr": "الصندوق الوطني للضمان الاجتماعي",
      "agencyAcronym": "CNSS Tunisie"
    },
    "law": "القانون رقم 60-30 المتعلق بأنظمة الضمان الاجتماعي وتعديلاته بالمرسوم رقم 2007-44",
    "authority": "الصندوق الوطني للضمان الاجتماعي (CNSS)",
    "sourceUrl": "http://www.cnss.tn",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "endOfService": {
    "status": "verified",
    "value": {
      "standardFormula": "مكافأة نهاية الخدمة / الطرد التعسفي تعادل أجر يوم عن كل شهر عمل فعلي (سقف أقصاه أجر 3 أشهر).",
      "firstTierYears": 1,
      "firstTierFraction": 0.03287671232876712,
      "secondTierFraction": 0.03287671232876712,
      "resignationScale": [
        {
          "minYears": 1,
          "fractionOfAward": 1
        }
      ],
      "wageBasis": "gross_wage_with_fixed_allowances",
      "articles": "الفصل 22 من مجلة الشغل التونسية (Code du Travail No. 66-27)"
    },
    "law": "مجلة الشغل التونسية الصادرة بالقانون رقم 66-27 وتعديلاتها",
    "authority": "وزارة التشغيل والتكوين المهني التونسية",
    "sourceUrl": "http://www.emploi.gov.tn",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "consumerFinance": {
    "status": "verified",
    "value": {
      "dbrCapPercent": 40,
      "maxAutoFinanceTenorYears": 5,
      "quoteConvention": "reducing",
      "islamicFinanceTerm": "مرابحة سيارات بالصيرفة الإسلامية"
    },
    "law": "مناشير البنك المركزي التونسي المنظمة لنسب الفائدة الفعلية وقروض الاستهلاك للمواطنين",
    "authority": "البنك المركزي التونسي (BCT)",
    "sourceUrl": "https://www.bct.gov.tn",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "fuel": {
    "status": "verified",
    "value": {
      "pricingModel": "monthly_adjusted",
      "grades": {
        "sansPlomb": {
          "nameAr": "بنزين خال من الرصاص (Sans Plomb)",
          "pricePerLiter": 2.525,
          "unitAr": "د.ت/لتر"
        },
        "gasoilSansSoufre": {
          "nameAr": "غازوال بدون كبريت (ديزل 50)",
          "pricePerLiter": 2.205,
          "unitAr": "د.ت/لتر"
        },
        "gasoilOrdinaire": {
          "nameAr": "غازوال عادي",
          "pricePerLiter": 1.985,
          "unitAr": "د.ت/لتر"
        }
      },
      "updateCadenceDays": 30
    },
    "law": "التعريفة الرسمية الشهرية المقررة من وزارة الصناعة والمناجم والطاقة التونسية",
    "authority": "وزارة الصناعة والمناجم والطاقة / الشركة التونسية لصناعات التكرير (ستير STIR)",
    "sourceUrl": "http://www.energiemines.gov.tn",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 35
  },
  "electricity": {
    "status": "verified",
    "value": {
      "residentialTiers": [
        {
          "minKwh": 1,
          "maxKwh": 50,
          "ratePerKwh": 0.181
        },
        {
          "minKwh": 51,
          "maxKwh": 100,
          "ratePerKwh": 0.223
        },
        {
          "minKwh": 101,
          "maxKwh": 200,
          "ratePerKwh": 0.338
        },
        {
          "minKwh": 201,
          "maxKwh": 300,
          "ratePerKwh": 0.373
        },
        {
          "minKwh": 301,
          "maxKwh": 500,
          "ratePerKwh": 0.419
        },
        {
          "minKwh": 501,
          "ratePerKwh": 0.471
        }
      ],
      "meterServiceFeeMonthly": 4,
      "vatApplies": true
    },
    "law": "تعريفة بيع الكهرباء والغاز للجهد المنخفض المعتمدة بالقرارات الوزارية المشتركة",
    "authority": "الشركة التونسية للكهرباء والغاز (الستاغ STEG)",
    "sourceUrl": "https://www.steg.com.tn",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "vehicle": {
    "status": "verified",
    "value": {
      "registrationFeeAnnual": 180,
      "periodicInspectionFee": 35,
      "drivingLicenceRenewal10Yr": 30,
      "customsDutyPercent": 20,
      "customsVatPercent": 19,
      "trafficFines": [
        {
          "categoryAr": "الجنح والخطايا الخطيرة",
          "violationAr": "عدم الامتثال لإشارة التوقف الضوئية الحمراء",
          "minFine": 60,
          "maxFine": 200
        },
        {
          "categoryAr": "مخالفات السرعة",
          "violationAr": "تجاوز السرعة القصوى المسموح بها من 20 إلى 40 كم/س",
          "minFine": 40,
          "maxFine": 100
        },
        {
          "categoryAr": "السلامة المرورية",
          "violationAr": "عدم وضع حزام الأمان واستعمال الهاتف أثناء القيادة",
          "minFine": 40,
          "maxFine": 60
        }
      ]
    },
    "law": "مجلة الطرقات التونسية الصادرة بالقانون رقم 99-71 والقرارات المعدلة للمخالفات",
    "authority": "وزارة النقل - الوكالة الفنية للنقل البري (ATTT)",
    "sourceUrl": "http://www.attt.com.tn",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "zakat": {
    "status": "verified",
    "value": {
      "authorityName": "ديوان الإفتاء بالجمهورية التونسية",
      "isMandatoryForCompanies": false,
      "individualNoteAr": "زكاة المال فريضة شرعية بنسبة 2.5% حولياً عند بلوغ نصاب الذهب المحدد رسمياً من مفتي الجمهورية."
    },
    "law": "بيانات وإعلانات ديوان الإفتاء بالجمهورية التونسية السنوية",
    "authority": "ديوان الإفتاء التونسي (رئاسة الحكومة)",
    "sourceUrl": "http://www.carthage.tn",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "routes": [
    {
      "id": "tunis-sousse",
      "fromCityAr": "تونس العاصمة",
      "toCityAr": "سوسة",
      "distanceKm": 145,
      "source": "الطريق السيارة A1 تونس - مساكن"
    },
    {
      "id": "tunis-sfax",
      "fromCityAr": "تونس العاصمة",
      "toCityAr": "صفاقس",
      "distanceKm": 270,
      "source": "الطريق السيارة A1 تونس - صفاقس"
    },
    {
      "id": "tunis-bizerte",
      "fromCityAr": "تونس العاصمة",
      "toCityAr": "بنزرت",
      "distanceKm": 65,
      "source": "الطريق السيارة A4 تونس - بنزرت"
    },
    {
      "id": "tunis-gabes",
      "fromCityAr": "تونس العاصمة",
      "toCityAr": "قابس",
      "distanceKm": 400,
      "source": "الطريق السيارة A1 تونس - قابس"
    },
    {
      "id": "tunis-kairouan",
      "fromCityAr": "تونس العاصمة",
      "toCityAr": "القيروان",
      "distanceKm": 160,
      "source": "الطريق الوطنية رقم 3"
    }
  ]
};

export default COUNTRY_DATA_TN;
