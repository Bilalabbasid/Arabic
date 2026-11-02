import { CountryData } from '../types';

export const COUNTRY_DATA_LY: CountryData = {
  "countryCode": "ly",
  "basics": {
    "nameAr": "دولة ليبيا",
    "nameEn": "Libya",
    "locale": "ar-LY",
    "currency": {
      "code": "LYD",
      "nameAr": "دينار ليبي",
      "symbolAr": "د.ل",
      "minorUnits": 3
    },
    "weekendDays": [
      5,
      6
    ],
    "officialCalendar": "gregorian",
    "localTerms": {
      "vehicleRegistration": "كتيب السيارة (رخصة التسيير)",
      "diesel": "نافطة (ديزل)",
      "periodicInspection": "الفحص الفني الدوري للمرور",
      "drivingLicence": "كتيب قيادة / رخصة سوق"
    }
  },
  "vat": {
    "status": "not_applicable",
    "note": "لا تطبق دولة ليبيا ضريبة القيمة المضافة؛ وتفرض رسوم دمغة نوعية ورسوم إنتاج وفق قوانين الضرائب الليبية.",
    "authority": "مصلحة الضرائب الليبية",
    "sourceUrl": "http://www.tax.gov.ly",
    "checkedAt": "2026-11-01",
    "value": {
      "standardRate": 0
    }
  },
  "incomeTax": {
    "status": "verified",
    "value": {
      "hasPersonalIncomeTax": true,
      "standardDeduction": 1800,
      "brackets": [
        {
          "thresholdUpTo": 12000,
          "rate": 5
        },
        {
          "rate": 10
        }
      ]
    },
    "law": "قانون ضرائب الدخل الليبي رقم 7 لسنة 2010 وقانون ضريبة الجهاد",
    "authority": "مصلحة الضرائب الليبية",
    "sourceUrl": "http://www.tax.gov.ly",
    "validFrom": "2010-01-28",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "socialInsurance": {
    "status": "verified",
    "value": {
      "nationalEmployeeRate": 3.75,
      "nationalEmployerRate": 10.5,
      "expatEmployeeRate": 3.75,
      "expatEmployerRate": 10.5,
      "agencyNameAr": "صندوق الضمان الاجتماعي الليبي",
      "agencyAcronym": "SSF Libya"
    },
    "law": "قانون الضمان الاجتماعي الليبي رقم 13 لسنة 1980 وتعديلاته",
    "authority": "صندوق الضمان الاجتماعي (SSF)",
    "sourceUrl": "https://ssf.ly",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "endOfService": {
    "status": "verified",
    "value": {
      "standardFormula": "أجر نصف شهر عن كل سنة من السنوات الخمس الأولى، وأجر شهر كامل عن كل سنة تالية (لحالات إنهاء الخدمة والتقاعد).",
      "firstTierYears": 5,
      "firstTierFraction": 0.5,
      "secondTierFraction": 1,
      "resignationScale": [
        {
          "minYears": 1,
          "fractionOfAward": 1
        }
      ],
      "wageBasis": "gross_wage_with_fixed_allowances",
      "articles": "المادة 73 من قانون علاقات العمل الليبي رقم 12 لسنة 2010"
    },
    "law": "قانون علاقات العمل الليبي رقم 12 لسنة 2010",
    "authority": "وزارة العمل والتأهيل الليبية",
    "sourceUrl": "http://www.labour.gov.ly",
    "validFrom": "2010-05-01",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "consumerFinance": {
    "status": "verified",
    "value": {
      "dbrCapPercent": 40,
      "maxAutoFinanceTenorYears": 5,
      "quoteConvention": "flat",
      "islamicFinanceTerm": "تمويل مرابحة إسلامية للمركبات"
    },
    "law": "منشورات إدارة الرقابة على المصارف والنقد بمصرف ليبيا المركزي والقانون رقم 1 لسنة 2013 بشأن المعاملات الإسلامية",
    "authority": "مصرف ليبيا المركزي (CBL)",
    "sourceUrl": "https://cbl.gov.ly",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "fuel": {
    "status": "verified",
    "value": {
      "pricingModel": "fixed_official",
      "grades": {
        "gasoline95": {
          "nameAr": "بنزين 95 سوبر",
          "pricePerLiter": 0.15,
          "unitAr": "د.ل/لتر"
        },
        "diesel": {
          "nameAr": "نافطة (ديزل مدعوم)",
          "pricePerLiter": 0.15,
          "unitAr": "د.ل/لتر"
        }
      },
      "updateCadenceDays": 365
    },
    "law": "التسعيرة الرسمية المدعومة المعتمدة بقرارات مجلس الوزراء وشركة البريقة لتسويق النفط",
    "authority": "شركة البريقة لتسويق النفط / المؤسسة الوطنية للنفط (NOC)",
    "sourceUrl": "https://brega.ly",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 180
  },
  "electricity": {
    "status": "verified",
    "value": {
      "residentialTiers": [
        {
          "minKwh": 1,
          "maxKwh": 500,
          "ratePerKwh": 0.02
        },
        {
          "minKwh": 501,
          "maxKwh": 800,
          "ratePerKwh": 0.035
        },
        {
          "minKwh": 801,
          "ratePerKwh": 0.05
        }
      ],
      "meterServiceFeeMonthly": 5,
      "vatApplies": false
    },
    "law": "التعرفة العامة المدعومة الصادرة عن الشركة العامة للكهرباء",
    "authority": "الشركة العامة للكهرباء بليبيا (GECOL)",
    "sourceUrl": "https://gecol.ly",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "vehicle": {
    "status": "verified",
    "value": {
      "registrationFeeAnnual": 50,
      "periodicInspectionFee": 20,
      "drivingLicenceRenewal10Yr": 30,
      "customsDutyPercent": 5,
      "customsVatPercent": 0,
      "trafficFines": [
        {
          "categoryAr": "الإشارات المرورية",
          "violationAr": "تخطي الإشارة الضوئية الحمراء",
          "minFine": 50,
          "maxFine": 100
        },
        {
          "categoryAr": "السرعة الزائدة",
          "violationAr": "تجاوز السرعة المسموح بها في الطرق العامة",
          "minFine": 30,
          "maxFine": 60
        },
        {
          "categoryAr": "السلامة العامة",
          "violationAr": "عدم ربط حزام الأمان",
          "minFine": 20,
          "maxFine": 20
        }
      ]
    },
    "law": "قانون المرور الليبي رقم 11 لسنة 1984 وتعديلاته",
    "authority": "وزارة الداخلية - الإدارة العامة للمرور والتراخيص",
    "sourceUrl": "http://moi.gov.ly",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "zakat": {
    "status": "verified",
    "value": {
      "authorityName": "الهيئة العامة للأوقاف والشؤون الإسلامية بليبيا",
      "isMandatoryForCompanies": false,
      "individualNoteAr": "زكاة الأموال 2.5% سنوياً حولياً على رأس المال والمدخرات البالغة النصاب الشرعي."
    },
    "law": "قانون الهيئة العامة للأوقاف والشؤون الإسلامية",
    "authority": "الهيئة العامة للأوقاف والشؤون الإسلامية",
    "sourceUrl": "https://awqaf.gov.ly",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "routes": [
    {
      "id": "tripoli-benghazi",
      "fromCityAr": "طرابلس",
      "toCityAr": "بنغازي",
      "distanceKm": 1000,
      "source": "الطريق الساحلي الليبي السريع"
    },
    {
      "id": "tripoli-misrata",
      "fromCityAr": "طرابلس",
      "toCityAr": "مصراتة",
      "distanceKm": 210,
      "source": "الطريق الساحلي طرابلس مصراتة"
    },
    {
      "id": "tripoli-zawiya",
      "fromCityAr": "طرابلس",
      "toCityAr": "الزاوية",
      "distanceKm": 45,
      "source": "الطريق الساحلي الغربي"
    },
    {
      "id": "tripoli-sirte",
      "fromCityAr": "طرابلس",
      "toCityAr": "سرت",
      "distanceKm": 450,
      "source": "الطريق الساحلي عبر مصراتة"
    },
    {
      "id": "benghazi-tobruk",
      "fromCityAr": "بنغازي",
      "toCityAr": "طبرق",
      "distanceKm": 470,
      "source": "الطريق الساحلي الشرقي"
    }
  ]
};

export default COUNTRY_DATA_LY;
