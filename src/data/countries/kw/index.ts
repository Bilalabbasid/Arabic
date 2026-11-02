import { CountryData } from '../types';

export const COUNTRY_DATA_KW: CountryData = {
  "countryCode": "kw",
  "basics": {
    "nameAr": "دولة الكويت",
    "nameEn": "Kuwait",
    "locale": "ar-KW",
    "currency": {
      "code": "KWD",
      "nameAr": "دينار كويتي",
      "symbolAr": "د.ك",
      "minorUnits": 3
    },
    "weekendDays": [
      5,
      6
    ],
    "officialCalendar": "gregorian",
    "localTerms": {
      "vehicleRegistration": "دفتر السيارة (ترخيص وتسيير المركبة)",
      "diesel": "ديزل",
      "periodicInspection": "الفحص الفني للمرور",
      "drivingLicence": "إجازة قيادة (رخصة)"
    }
  },
  "vat": {
    "status": "not_applicable",
    "note": "لا تفرض دولة الكويت ضريبة القيمة المضافة حتى الآن؛ وقد تم استبعادها رسمياً من برنامج عمل الحكومة والوثيقة المالية 2026-2030.",
    "authority": "وزارة المالية الكويتية",
    "sourceUrl": "https://www.mof.gov.kw",
    "checkedAt": "2026-11-01",
    "value": {
      "standardRate": 0
    }
  },
  "incomeTax": {
    "status": "not_applicable",
    "note": "لا تفرض الكويت ضريبة دخل على أجور ورواتب الأفراد والمواطنين.",
    "authority": "وزارة المالية",
    "sourceUrl": "https://www.mof.gov.kw",
    "checkedAt": "2026-11-01",
    "value": {
      "hasPersonalIncomeTax": false
    }
  },
  "socialInsurance": {
    "status": "verified",
    "value": {
      "nationalEmployeeRate": 10.5,
      "nationalEmployerRate": 11.5,
      "expatEmployeeRate": 0,
      "expatEmployerRate": 0,
      "maxMonthlyWageCap": 2750,
      "agencyNameAr": "المؤسسة العامة للتأمينات الاجتماعية",
      "agencyAcronym": "PIFSS"
    },
    "law": "الأمر الأميري بالقانون رقم 61 لسنة 1976 بإصدار قانون التأمينات الاجتماعية",
    "authority": "المؤسسة العامة للتأمينات الاجتماعية (PIFSS)",
    "sourceUrl": "https://www.pifss.gov.kw",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "endOfService": {
    "status": "verified",
    "value": {
      "standardFormula": "أجر 15 يوماً عن كل سنة من السنوات الخمس الأولى، وأجر شهر كامل عن كل سنة تالية (بحد أقصى أجر سنة ونصف).",
      "firstTierYears": 5,
      "firstTierFraction": 0.5,
      "secondTierFraction": 1,
      "resignationScale": [
        {
          "minYears": 0,
          "maxYears": 3,
          "fractionOfAward": 0
        },
        {
          "minYears": 3,
          "maxYears": 5,
          "fractionOfAward": 0.5
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
      "wageBasis": "gross_wage_with_fixed_allowances",
      "articles": "المادتان 51 و 53 من القانون رقم 6 لسنة 2010 في شأن العمل في القطاع الأهلي"
    },
    "law": "قانون العمل الكويتي رقم 6 لسنة 2010",
    "authority": "الهيئة العامة للقوى العاملة",
    "sourceUrl": "https://www.manpower.gov.kw",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "consumerFinance": {
    "status": "verified",
    "value": {
      "dbrCapPercent": 40,
      "dbrCapPensionerPercent": 30,
      "maxAutoFinanceTenorYears": 5,
      "quoteConvention": "flat",
      "islamicFinanceTerm": "مرابحة سيارات / مساومة"
    },
    "law": "تعليمات تنظيم منح القروض الاستهلاكية والمقسطة الصادرة عن بنك الكويت المركزي",
    "authority": "بنك الكويت المركزي (CBK)",
    "sourceUrl": "https://www.cbk.gov.kw",
    "validFrom": "2018-11-12",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "fuel": {
    "status": "verified",
    "value": {
      "pricingModel": "fixed_official",
      "grades": {
        "premium91": {
          "nameAr": "بنزين ممتاز 91",
          "pricePerLiter": 0.085,
          "unitAr": "د.ك/لتر"
        },
        "super95": {
          "nameAr": "بنزين خصوصي 95",
          "pricePerLiter": 0.105,
          "unitAr": "د.ك/لتر"
        },
        "ultra98": {
          "nameAr": "بنزين ألترا 98",
          "pricePerLiter": 0.21,
          "unitAr": "د.ك/لتر"
        },
        "diesel": {
          "nameAr": "ديزل",
          "pricePerLiter": 0.115,
          "unitAr": "د.ك/لتر"
        }
      },
      "updateCadenceDays": 90
    },
    "law": "قرارات لجنة مراجعة أسعار البنزين الحكومية الصادرة عن مجلس الوزراء",
    "authority": "شركة البترول الوطنية الكويتية (KNPC) / وزارة النفط",
    "sourceUrl": "https://www.knpc.com",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 90
  },
  "electricity": {
    "status": "verified",
    "value": {
      "residentialTiers": [
        {
          "minKwh": 1,
          "ratePerKwh": 0.002
        }
      ],
      "meterServiceFeeMonthly": 0,
      "vatApplies": false
    },
    "law": "القانون رقم 20 لسنة 2016 بشأن تحديد تعرفة وحدتي الكهرباء والماء",
    "authority": "وزارة الكهرباء والماء والطاقة المتجددة الكويتية",
    "sourceUrl": "https://www.mew.gov.kw",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "vehicle": {
    "status": "verified",
    "value": {
      "registrationFeeAnnual": 10,
      "periodicInspectionFee": 10,
      "drivingLicenceRenewal10Yr": 10,
      "customsDutyPercent": 5,
      "customsVatPercent": 0,
      "maxImportAgeYears": 5,
      "trafficFines": [
        {
          "categoryAr": "الإشارات المرورية",
          "violationAr": "تجاوز الإشارة الضوئية الحمراء",
          "minFine": 50,
          "maxFine": 300
        },
        {
          "categoryAr": "السرعة الزائدة",
          "violationAr": "تجاوز السرعة المقررة",
          "minFine": 20,
          "maxFine": 100
        },
        {
          "categoryAr": "السلامة العامة",
          "violationAr": "عدم ربط حزام الأمان",
          "minFine": 10,
          "maxFine": 30
        },
        {
          "categoryAr": "السلامة العامة",
          "violationAr": "استخدام الهاتف المحمول أثناء القيادة باليد",
          "minFine": 15,
          "maxFine": 75
        }
      ]
    },
    "law": "قانون المرور الكويتي الصادر بالمرسوم بالقانون رقم 67 لسنة 1976 وتعديلاته",
    "authority": "وزارة الداخلية - الإدارة العامة للمرور",
    "sourceUrl": "https://www.moi.gov.kw",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "zakat": {
    "status": "verified",
    "value": {
      "authorityName": "بيت الزكاة الكويتي",
      "isMandatoryForCompanies": false,
      "individualNoteAr": "فريضة الزكاة تحتسب بنسبة 2.5% للحول الهجري."
    },
    "law": "القانون رقم 5 لسنة 1982 بإنشاء بيت الزكاة",
    "authority": "بيت الزكاة الكويتي",
    "sourceUrl": "https://www.zakathouse.org.kw",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "routes": [
    {
      "id": "kuwait-jahra",
      "fromCityAr": "مدينة الكويت",
      "toCityAr": "الجهراء",
      "distanceKm": 32,
      "source": "الهيئة العامة للطرق والنقل البري"
    },
    {
      "id": "kuwait-ahmadi",
      "fromCityAr": "مدينة الكويت",
      "toCityAr": "الأحمدي",
      "distanceKm": 38,
      "source": "الهيئة العامة للطرق"
    },
    {
      "id": "kuwait-nuwaiseeb",
      "fromCityAr": "مدينة الكويت",
      "toCityAr": "النويصيب (الحدود السعودية)",
      "distanceKm": 105,
      "source": "طريق الملك فهد بن عبد العزيز السريع 40"
    },
    {
      "id": "kuwait-salmi",
      "fromCityAr": "مدينة الكويت",
      "toCityAr": "السالمي (الحدود الغربية)",
      "distanceKm": 125,
      "source": "طريق السالمي 70"
    },
    {
      "id": "kuwait-abdali",
      "fromCityAr": "مدينة الكويت",
      "toCityAr": "العبدلي (الحدود الشمالية)",
      "distanceKm": 95,
      "source": "طريق الشيخ جابر الأحمد الصباح 80"
    }
  ]
};

export default COUNTRY_DATA_KW;
