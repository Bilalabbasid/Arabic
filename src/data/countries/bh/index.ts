import { CountryData } from '../types';

export const COUNTRY_DATA_BH: CountryData = {
  "countryCode": "bh",
  "basics": {
    "nameAr": "مملكة البحرين",
    "nameEn": "Bahrain",
    "locale": "ar-BH",
    "currency": {
      "code": "BHD",
      "nameAr": "دينار بحريني",
      "symbolAr": "د.ب",
      "minorUnits": 3
    },
    "weekendDays": [
      5,
      6
    ],
    "officialCalendar": "gregorian",
    "localTerms": {
      "vehicleRegistration": "ملكية السيارة (شهادة تسجيل المركبة)",
      "diesel": "ديزل",
      "periodicInspection": "فحص المركبات الفني للإدارة العامة للمرور",
      "drivingLicence": "رخصة القيادة"
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
        "السلع الغذائية الأساسية (94 سلعة أساسية)",
        "الأدوية والمعدات الطبية",
        "النقل الدولي والمحلي",
        "النفط والغاز المشتقات"
      ],
      "exemptItems": [
        "الخدمات المالية غير المبنية على رسم صريح",
        "العقارات السكنية غير المفروشة بيعاً وإيجاراً"
      ]
    },
    "law": "المرسوم بقانون رقم (33) لسنة 2021 بتعديل بعض أحكام قانون ضريبة القيمة المضافة",
    "authority": "الجهاز الوطني للإيرادات (NBR)",
    "sourceUrl": "https://www.nbr.gov.bh",
    "validFrom": "2022-01-01",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "incomeTax": {
    "status": "not_applicable",
    "note": "لا تفرض مملكة البحرين أي ضريبة دخل على الرواتب الشخصية أو أجور العاملين.",
    "authority": "الجهاز الوطني للإيرادات (NBR)",
    "sourceUrl": "https://www.nbr.gov.bh",
    "checkedAt": "2026-11-01",
    "value": {
      "hasPersonalIncomeTax": false
    }
  },
  "socialInsurance": {
    "status": "verified",
    "value": {
      "nationalEmployeeRate": 8,
      "nationalEmployerRate": 18,
      "expatEmployeeRate": 1,
      "expatEmployerRate": 7.2,
      "maxMonthlyWageCap": 4000,
      "agencyNameAr": "الهيئة العامة للتأمين الاجتماعي",
      "agencyAcronym": "SIO"
    },
    "law": "قانون التأمين الاجتماعي وقانون التأمين ضد التعطل والمرسوم بقانون رقم 14 لسنة 2022",
    "authority": "الهيئة العامة للتأمين الاجتماعي (SIO)",
    "sourceUrl": "https://www.sio.gov.bh",
    "validFrom": "2022-04-19",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "endOfService": {
    "status": "verified",
    "value": {
      "standardFormula": "أجر نصف شهر عن كل سنة من السنوات الثلاث الأولى، وأجر شهر كامل عن كل سنة تالية.",
      "firstTierYears": 3,
      "firstTierFraction": 0.5,
      "secondTierFraction": 1,
      "resignationScale": [
        {
          "minYears": 1,
          "fractionOfAward": 1
        }
      ],
      "wageBasis": "basic_only",
      "articles": "المادة 116 من قانون العمل في القطاع الأهلي رقم 36 لسنة 2012"
    },
    "law": "قانون العمل البحريني رقم 36 لسنة 2012 وتعديلاته",
    "authority": "وزارة العمل البحرينية",
    "sourceUrl": "https://www.mol.gov.bh",
    "validFrom": "2012-09-02",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "consumerFinance": {
    "status": "verified",
    "value": {
      "dbrCapPercent": 50,
      "dbrCapPensionerPercent": 30,
      "maxAutoFinanceTenorYears": 7,
      "quoteConvention": "reducing",
      "islamicFinanceTerm": "تمويل مرابحة للآمرات بالشراء / إجارة"
    },
    "law": "مجلد القواعد والتعليمات الرقابية للائتمان الاستهلاكي الصادر عن مصرف البحرين المركزي",
    "authority": "مصرف البحرين المركزي (CBB)",
    "sourceUrl": "https://www.cbb.gov.bh",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "fuel": {
    "status": "verified",
    "value": {
      "pricingModel": "monthly_adjusted",
      "grades": {
        "jayyid91": {
          "nameAr": "بنزين جيد 91",
          "pricePerLiter": 0.235,
          "unitAr": "د.ب/لتر"
        },
        "mumtaz95": {
          "nameAr": "بنزين ممتاز 95",
          "pricePerLiter": 0.277,
          "unitAr": "د.ب/لتر"
        },
        "super98": {
          "nameAr": "بنزين سوبر 98",
          "pricePerLiter": 0.41,
          "unitAr": "د.ب/لتر"
        },
        "diesel": {
          "nameAr": "ديزل",
          "pricePerLiter": 0.26,
          "unitAr": "د.ب/لتر"
        }
      },
      "updateCadenceDays": 30
    },
    "law": "قرارات لجنة تسعير ومراقبة الوقود الشهرية (منذ 30 ديسمبر 2025)",
    "authority": "لجنة تسعير ومراقبة الوقود / بابكو إنرجيز",
    "sourceUrl": "https://www.alayam.com/online/Economy/1150433/News.html",
    "validFrom": "2026-11-02",
    "checkedAt": "2026-11-05",
    "staleAfterDays": 35
  },
  "electricity": {
    "status": "verified",
    "value": {
      "residentialTiers": [
        {
          "minKwh": 1,
          "maxKwh": 3000,
          "ratePerKwh": 0.003
        },
        {
          "minKwh": 3001,
          "maxKwh": 5000,
          "ratePerKwh": 0.009
        },
        {
          "minKwh": 5001,
          "ratePerKwh": 0.016
        }
      ],
      "meterServiceFeeMonthly": 0,
      "vatApplies": false
    },
    "law": "تعرفة خدمات الكهرباء والماء السكنية الصادرة عن هيئة الكهرباء والماء",
    "authority": "هيئة الكهرباء والماء (EWA)",
    "sourceUrl": "https://www.ewa.bh",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "vehicle": {
    "status": "verified",
    "value": {
      "registrationFeeAnnual": 20,
      "periodicInspectionFee": 10,
      "drivingLicenceRenewal10Yr": 40,
      "customsDutyPercent": 5,
      "customsVatPercent": 10,
      "maxImportAgeYears": 5,
      "trafficFines": [
        {
          "categoryAr": "الإشارات المرورية",
          "violationAr": "تجاوز الإشارة الضوئية الحمراء",
          "minFine": 100,
          "maxFine": 500
        },
        {
          "categoryAr": "السرعة الزائدة",
          "violationAr": "تجاوز السرعة المقررة بأكثر من 30%",
          "minFine": 50,
          "maxFine": 100
        },
        {
          "categoryAr": "السلامة العامة",
          "violationAr": "عدم ربط حزام الأمان",
          "minFine": 20,
          "maxFine": 50
        },
        {
          "categoryAr": "السلامة العامة",
          "violationAr": "استخدام الهاتف النقال باليد أثناء القيادة",
          "minFine": 50,
          "maxFine": 100
        }
      ]
    },
    "law": "قانون المرور رقم 23 لسنة 2014 ولائحته التنفيذية بالقرار رقم 154 لسنة 2015",
    "authority": "وزارة الداخلية - الإدارة العامة للمرور",
    "sourceUrl": "https://www.traffic.gov.bh",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "zakat": {
    "status": "verified",
    "value": {
      "authorityName": "صندوق الزكاة والصدقات بوزارة العدل والشؤون الإسلامية والأوقاف",
      "isMandatoryForCompanies": false,
      "individualNoteAr": "زكاة المال 2.5% حولياً عند بلوغ النصاب."
    },
    "law": "المرسوم بقانون رقم 8 لسنة 1992 بإنشاء صندوق الزكاة والصدقات",
    "authority": "صندوق الزكاة والصدقات البحريني",
    "sourceUrl": "https://www.islam.gov.bh",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "routes": [
    {
      "id": "manama-riffa",
      "fromCityAr": "المنامة",
      "toCityAr": "الرفاع",
      "distanceKm": 18,
      "source": "وزارة الأشغال - شارع الشيخ عيسى بن سلمان"
    },
    {
      "id": "manama-muharraq",
      "fromCityAr": "المنامة",
      "toCityAr": "المحرق",
      "distanceKm": 8,
      "source": "جسر الشيخ عيسى بن سلمان وجسر الشيخ حمد"
    },
    {
      "id": "manama-hamadtown",
      "fromCityAr": "المنامة",
      "toCityAr": "مدينة حمد",
      "distanceKm": 22,
      "source": "شارع الشيخ خليفة بن سلمان السريع"
    },
    {
      "id": "manama-causeway",
      "fromCityAr": "المنامة",
      "toCityAr": "جسر الملك فهد (الحدود السعودية)",
      "distanceKm": 25,
      "source": "جسر الملك فهد"
    },
    {
      "id": "manama-zallaq",
      "fromCityAr": "المنامة",
      "toCityAr": "الزلاق",
      "distanceKm": 30,
      "source": "شارع خليج البحرين"
    }
  ]
};

export default COUNTRY_DATA_BH;
