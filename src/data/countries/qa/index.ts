import { CountryData } from '../types';

export const COUNTRY_DATA_QA: CountryData = {
  "countryCode": "qa",
  "basics": {
    "nameAr": "دولة قطر",
    "nameEn": "Qatar",
    "locale": "ar-QA",
    "currency": {
      "code": "QAR",
      "nameAr": "ريال قطري",
      "symbolAr": "ر.ق",
      "minorUnits": 2
    },
    "weekendDays": [
      5,
      6
    ],
    "officialCalendar": "gregorian",
    "localTerms": {
      "vehicleRegistration": "استمارة تسيير المركبة",
      "diesel": "ديزل",
      "periodicInspection": "الفحص الفني الدوري (فاحص / وقود)",
      "drivingLicence": "رخصة سوق"
    }
  },
  "vat": {
    "status": "not_applicable",
    "note": "لم تُطبق دولة قطر ضريبة القيمة المضافة حتى الآن؛ وهي مُدرجة ضمن الدراسات والخطط المستقبلية المشتركة ولم يصدر بها قانون نافذ.",
    "authority": "الهيئة العامة للضرائب (GTA)",
    "sourceUrl": "https://www.gta.gov.qa",
    "checkedAt": "2026-11-01",
    "value": {
      "standardRate": 0
    }
  },
  "incomeTax": {
    "status": "not_applicable",
    "note": "لا تفرض دولة قطر ضريبة على الدخل الشخصي أو رواتب الموظفين والأفراد الطبيعيين.",
    "authority": "الهيئة العامة للضرائب",
    "sourceUrl": "https://www.gta.gov.qa",
    "checkedAt": "2026-11-01",
    "value": {
      "hasPersonalIncomeTax": false
    }
  },
  "socialInsurance": {
    "status": "verified",
    "value": {
      "nationalEmployeeRate": 7,
      "nationalEmployerRate": 14,
      "expatEmployeeRate": 0,
      "expatEmployerRate": 0,
      "maxMonthlyWageCap": 100000,
      "agencyNameAr": "الهيئة العامة للتقاعد والتأمينات الاجتماعية",
      "agencyAcronym": "GRSIA"
    },
    "law": "قانون التأمينات الاجتماعية رقم 1 لسنة 2022",
    "authority": "الهيئة العامة للتقاعد والتأمينات الاجتماعية (GRSIA)",
    "sourceUrl": "https://www.grsia.gov.qa",
    "validFrom": "2023-01-03",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "endOfService": {
    "status": "verified",
    "value": {
      "standardFormula": "مكافأة لا تقل عن أجر 3 أسابيع عن كل سنة خدمة كاملة (بناء على الراتب الأساسي الأخير).",
      "firstTierYears": 1,
      "firstTierFraction": 0.7,
      "secondTierFraction": 0.7,
      "resignationScale": [
        {
          "minYears": 1,
          "fractionOfAward": 1
        }
      ],
      "wageBasis": "basic_only",
      "articles": "المادة 54 من قانون العمل رقم 14 لسنة 2004"
    },
    "law": "قانون العمل القطري رقم 14 لسنة 2004 وتعديلاته",
    "authority": "وزارة العمل القطرية",
    "sourceUrl": "https://www.mol.gov.qa",
    "validFrom": "2004-05-19",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "consumerFinance": {
    "status": "verified",
    "value": {
      "dbrCapPercent": 75,
      "dbrCapPensionerPercent": 50,
      "maxAutoFinanceTenorYears": 6,
      "quoteConvention": "reducing",
      "islamicFinanceTerm": "مرابحة سيارات / إجارة منتهية بالتمليك"
    },
    "law": "تعليمات مصرف قطر المركزي بشأن القروض والتسهيلات الائتمانية الاستهلاكية",
    "authority": "مصرف قطر المركزي (QCB)",
    "sourceUrl": "https://www.qcb.gov.qa",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "fuel": {
    "status": "verified",
    "value": {
      "pricingModel": "monthly_adjusted",
      "grades": {
        "super95": {
          "nameAr": "بنزين سوبر 95",
          "pricePerLiter": 2.1,
          "unitAr": "ر.ق/لتر"
        },
        "premium91": {
          "nameAr": "بنزين ممتاز 91",
          "pricePerLiter": 1.95,
          "unitAr": "ر.ق/لتر"
        },
        "diesel": {
          "nameAr": "ديزل",
          "pricePerLiter": 2.05,
          "unitAr": "ر.ق/لتر"
        }
      },
      "priceHistory": [
        {
          "date": "2026-11-01",
          "prices": {
            "super95": 2.1,
            "premium91": 1.95,
            "diesel": 2.05
          }
        },
        {
          "date": "2026-10-01",
          "prices": {
            "super95": 2.1,
            "premium91": 1.9,
            "diesel": 2.05
          }
        }
      ],
      "updateCadenceDays": 30
    },
    "law": "التسعيرة الشهرية الرسمية المعلنة من قطر للطاقة",
    "authority": "قطر للطاقة (QatarEnergy)",
    "sourceUrl": "https://www.qatarenergy.qa",
    "validFrom": "2026-11-01",
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
          "ratePerKwh": 0.09
        },
        {
          "minKwh": 2001,
          "maxKwh": 4000,
          "ratePerKwh": 0.12
        },
        {
          "minKwh": 4001,
          "maxKwh": 6000,
          "ratePerKwh": 0.15
        },
        {
          "minKwh": 6001,
          "ratePerKwh": 0.22
        }
      ],
      "meterServiceFeeMonthly": 0,
      "vatApplies": false
    },
    "law": "تعرفة كهرماء الرسمية لكهرباء القطاع السكني المعتمدة بقرار مجلس الوزراء",
    "authority": "المؤسسة العامة القطرية للكهرباء والماء (كهرماء)",
    "sourceUrl": "https://www.km.qa",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "vehicle": {
    "status": "verified",
    "value": {
      "registrationFeeAnnual": 100,
      "periodicInspectionFee": 150,
      "drivingLicenceRenewal10Yr": 500,
      "customsDutyPercent": 5,
      "customsVatPercent": 0,
      "maxImportAgeYears": 5,
      "trafficFines": [
        {
          "categoryAr": "الإشارات المرورية",
          "violationAr": "تجاوز الإشارة الضوئية الحمراء",
          "minFine": 6000,
          "maxFine": 6000,
          "blackPoints": 7
        },
        {
          "categoryAr": "السرعة الزائدة",
          "violationAr": "تجاوز السرعة المقررة بمقدار محدد بالرادار",
          "minFine": 500,
          "maxFine": 1000
        },
        {
          "categoryAr": "السلامة العامة",
          "violationAr": "عدم ربط حزام الأمان للسائق والراكب الأمامي",
          "minFine": 500,
          "maxFine": 500
        },
        {
          "categoryAr": "السلامة العامة",
          "violationAr": "استخدام الهاتف المحمول أثناء القيادة",
          "minFine": 500,
          "maxFine": 500
        }
      ]
    },
    "law": "قانون المرور الصادر بالمرسوم بقانون رقم 19 لسنة 2007 وتعديلاته",
    "authority": "وزارة الداخلية - الإدارة العامة للمرور",
    "sourceUrl": "https://www.moi.gov.qa",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "zakat": {
    "status": "verified",
    "value": {
      "authorityName": "إدارة شؤون الزكاة بوزارة الأوقاف القطرية",
      "isMandatoryForCompanies": false,
      "individualNoteAr": "زكاة الأموال فريضة شرعية بنسبة 2.5% للحول القمري."
    },
    "law": "القرار الأميري رقم 23 لسنة 2014 بالهيكل التنظيمي لوزارة الأوقاف والشؤون الإسلامية",
    "authority": "إدارة شؤون الزكاة - وزارة الأوقاف",
    "sourceUrl": "https://www.zf.org.qa",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "routes": [
    {
      "id": "doha-alkhor",
      "fromCityAr": "الدوحة",
      "toCityAr": "الخور",
      "distanceKm": 50,
      "source": "هيئة الأشغال العامة (أشغال) - طريق الخور السريع"
    },
    {
      "id": "doha-alwakrah",
      "fromCityAr": "الدوحة",
      "toCityAr": "الوكرة",
      "distanceKm": 20,
      "source": "هيئة الأشغال العامة (أشغال) - طريق الوكرة الرئيسي"
    },
    {
      "id": "doha-mesaieed",
      "fromCityAr": "الدوحة",
      "toCityAr": "مسيعيد",
      "distanceKm": 45,
      "source": "هيئة الأشغال العامة - طريق مسيعيد"
    },
    {
      "id": "doha-alruwais",
      "fromCityAr": "الدوحة",
      "toCityAr": "الرويس (شمال قطر)",
      "distanceKm": 110,
      "source": "طريق الشمال السريع Q1"
    },
    {
      "id": "doha-dukhan",
      "fromCityAr": "الدوحة",
      "toCityAr": "دخان (الساحل الغربي)",
      "distanceKm": 80,
      "source": "طريق دخان السريع Q3"
    },
    {
      "id": "doha-abusamra",
      "fromCityAr": "الدوحة",
      "toCityAr": "أبو سمرة (المنفذ الحدودي)",
      "distanceKm": 95,
      "source": "طريق سلوى الدولي Q2"
    }
  ]
};

export default COUNTRY_DATA_QA;
