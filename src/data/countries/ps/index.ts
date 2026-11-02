import { CountryData } from '../types';

export const COUNTRY_DATA_PS: CountryData = {
  "countryCode": "ps",
  "basics": {
    "nameAr": "دولة فلسطين",
    "nameEn": "Palestine",
    "locale": "ar-PS",
    "currency": {
      "code": "ILS",
      "nameAr": "شيكل إسرائيلي جديد",
      "symbolAr": "₪",
      "minorUnits": 2
    },
    "weekendDays": [
      5,
      6
    ],
    "officialCalendar": "gregorian",
    "localTerms": {
      "vehicleRegistration": "رخصة المركبة (كرت التسجيل)",
      "diesel": "سولار (ديزل)",
      "periodicInspection": "الفحص الفني السنوي (ديناموميتر المرور)",
      "drivingLicence": "رخصة قيادة (سياقة)"
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
        "الخدمات المالية والمصرفية",
        "التأجير السكني"
      ]
    },
    "law": "قانون ضريبة القيمة المضافة المعمول به والإدارة العامة للجمارك والمكوس",
    "authority": "وزارة المالية - الإدارة العامة للجمارك والمكوس وضريبة القيمة المضافة",
    "sourceUrl": "http://www.pmof.ps",
    "validFrom": "2016-01-01",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "incomeTax": {
    "status": "verified",
    "value": {
      "hasPersonalIncomeTax": true,
      "standardDeduction": 36000,
      "brackets": [
        {
          "thresholdUpTo": 40000,
          "rate": 5
        },
        {
          "thresholdUpTo": 80000,
          "rate": 10
        },
        {
          "rate": 15
        }
      ]
    },
    "law": "القرار بقانون رقم 8 لسنة 2011 بشأن ضريبة الدخل وتعديلاته بالقرار بقانون رقم 17 لسنة 2014",
    "authority": "وزارة المالية - الإدارة العامة لضريبة الدخل",
    "sourceUrl": "http://www.pmof.ps",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "socialInsurance": {
    "status": "unverified",
    "note": "تم تعليق تطبيق قانون الضمان الاجتماعي رقم 19 لسنة 2016 بالقرار بقانون رقم 4 لسنة 2019؛ ويخضع عمال القطاع الخاص لمكافأة نهاية الخدمة بموجب قانون العمل.",
    "authority": "مؤسسة الضمان الاجتماعي الفلسطينية / وزارة العمل",
    "sourceUrl": "http://www.mol.pna.ps",
    "checkedAt": "2026-11-01",
    "value": {
      "nationalEmployeeRate": 0,
      "nationalEmployerRate": 0,
      "agencyNameAr": "مؤسسة الضمان الاجتماعي الفلسطينية (معلق)",
      "agencyAcronym": "PSSIC"
    }
  },
  "endOfService": {
    "status": "verified",
    "value": {
      "standardFormula": "أجر شهر كامل عن كل سنة عمل بناء على آخر راتب أساسي تقاضاه العامل.",
      "firstTierYears": 1,
      "firstTierFraction": 1,
      "secondTierFraction": 1,
      "resignationScale": [
        {
          "minYears": 0,
          "maxYears": 2,
          "fractionOfAward": 0
        },
        {
          "minYears": 2,
          "maxYears": 5,
          "fractionOfAward": 0.3333333333333333
        },
        {
          "minYears": 5,
          "maxYears": 10,
          "fractionOfAward": 0.6666666666666666
        },
        {
          "minYears": 10,
          "fractionOfAward": 1
        }
      ],
      "wageBasis": "basic_only",
      "articles": "المادتان 42 و 45 من قانون العمل الفلسطيني رقم 7 لسنة 2000"
    },
    "law": "قانون العمل الفلسطيني رقم 7 لسنة 2000",
    "authority": "وزارة العمل الفلسطينية",
    "sourceUrl": "http://www.mol.pna.ps",
    "validFrom": "2001-12-25",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "consumerFinance": {
    "status": "verified",
    "value": {
      "dbrCapPercent": 50,
      "dbrCapPensionerPercent": 35,
      "maxAutoFinanceTenorYears": 7,
      "quoteConvention": "reducing",
      "islamicFinanceTerm": "مرابحة سيارات / تمويل إسلامي"
    },
    "law": "تعليمات الإقراض العادل وإدارة مخاطر الائتمان الاستهلاكي الصادرة عن سلطة النقد الفلسطينية",
    "authority": "سلطة النقد الفلسطينية (PMA)",
    "sourceUrl": "https://www.pma.ps",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "fuel": {
    "status": "verified",
    "value": {
      "pricingModel": "monthly_adjusted",
      "grades": {
        "gasoline95": {
          "nameAr": "بنزين 95 أوكتان",
          "pricePerLiter": 7.15,
          "unitAr": "₪/لتر"
        },
        "gasoline98": {
          "nameAr": "بنزين 98 أوكتان",
          "pricePerLiter": 8.1,
          "unitAr": "₪/لتر"
        },
        "solar": {
          "nameAr": "سولار (ديزل)",
          "pricePerLiter": 6.3,
          "unitAr": "₪/لتر"
        }
      },
      "updateCadenceDays": 30
    },
    "law": "التسعيرة الشهرية الرسمية الصادرة عن الهيئة العامة للبترول بوزارة المالية",
    "authority": "الهيئة العامة للبترول - وزارة المالية",
    "sourceUrl": "http://www.pmof.ps",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 35
  },
  "electricity": {
    "status": "verified",
    "value": {
      "residentialTiers": [
        {
          "minKwh": 1,
          "maxKwh": 160,
          "ratePerKwh": 0.46
        },
        {
          "minKwh": 161,
          "maxKwh": 300,
          "ratePerKwh": 0.52
        },
        {
          "minKwh": 301,
          "maxKwh": 500,
          "ratePerKwh": 0.58
        },
        {
          "minKwh": 501,
          "ratePerKwh": 0.65
        }
      ],
      "meterServiceFeeMonthly": 12,
      "vatApplies": true
    },
    "law": "تعرفة مبيعات الكهرباء الصادرة عن مجلس تنظيم قطاع الكهرباء الفلسطيني (PERC)",
    "authority": "مجلس تنظيم قطاع الكهرباء الفلسطيني (PERC)",
    "sourceUrl": "http://www.perc.ps",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "vehicle": {
    "status": "verified",
    "value": {
      "registrationFeeAnnual": 550,
      "periodicInspectionFee": 120,
      "drivingLicenceRenewal10Yr": 300,
      "customsDutyPercent": 50,
      "customsVatPercent": 16,
      "trafficFines": [
        {
          "categoryAr": "الإشارات المرورية",
          "violationAr": "تجاوز الإشارة الضوئية الحمراء",
          "minFine": 500,
          "maxFine": 500
        },
        {
          "categoryAr": "السرعة الزائدة",
          "violationAr": "تجاوز السرعة المقررة",
          "minFine": 300,
          "maxFine": 500
        },
        {
          "categoryAr": "السلامة العامة",
          "violationAr": "عدم ربط حزام الأمان",
          "minFine": 150,
          "maxFine": 150
        },
        {
          "categoryAr": "السلامة العامة",
          "violationAr": "استخدام الهاتف المحمول أثناء القيادة",
          "minFine": 300,
          "maxFine": 300
        }
      ]
    },
    "law": "قانون المرور الفلسطيني رقم 5 لسنة 2000 ولائحته التنفيذية رقم 393 لسنة 2005",
    "authority": "وزارة النقل والمواصلات الفلسطينية",
    "sourceUrl": "http://www.mot.gov.ps",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "zakat": {
    "status": "verified",
    "value": {
      "authorityName": "صندوق الزكاة الفلسطيني التابع لوزارة الأوقاف والشؤون الدينية",
      "isMandatoryForCompanies": false,
      "individualNoteAr": "زكاة المال فريضة شرعية بنسبة 2.5% حولياً عند بلوغ النصاب."
    },
    "law": "قانون تنظيم صندوق الزكاة الفلسطيني",
    "authority": "صندوق الزكاة الفلسطيني (وزارة الأوقاف)",
    "sourceUrl": "http://www.pal-zakat.ps",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "routes": [
    {
      "id": "ramallah-nablus",
      "fromCityAr": "رام الله",
      "toCityAr": "نابلس",
      "distanceKm": 45,
      "source": "طريق رام الله - نابلس الرئيسي 60"
    },
    {
      "id": "ramallah-jerusalem",
      "fromCityAr": "رام الله",
      "toCityAr": "القدس",
      "distanceKm": 18,
      "source": "طريق القدس - رام الله"
    },
    {
      "id": "ramallah-hebron",
      "fromCityAr": "رام الله",
      "toCityAr": "الخليل",
      "distanceKm": 55,
      "source": "طريق وادي النار - الخليل 60"
    },
    {
      "id": "ramallah-jenin",
      "fromCityAr": "رام الله",
      "toCityAr": "جنين",
      "distanceKm": 75,
      "source": "طريق نابلس - جنين الرئيسي 60"
    },
    {
      "id": "ramallah-jericho",
      "fromCityAr": "رام الله",
      "toCityAr": "أريحا",
      "distanceKm": 38,
      "source": "طريق المعرجات - أريحا"
    }
  ]
};

export default COUNTRY_DATA_PS;
