import { CountryData } from '../types';

export const COUNTRY_DATA_SO: CountryData = {
  "countryCode": "so",
  "basics": {
    "nameAr": "جمهورية الصومال الفيدرالية",
    "nameEn": "Somalia",
    "locale": "ar-SO",
    "currency": {
      "code": "SOS",
      "nameAr": "شلن صومالي",
      "symbolAr": "ش.ص",
      "minorUnits": 2
    },
    "weekendDays": [
      5,
      6
    ],
    "officialCalendar": "gregorian",
    "localTerms": {
      "vehicleRegistration": "دفتر تسجيل المركبة (Buugga Gaadhiga)",
      "diesel": "ديزل (Naafto)",
      "periodicInspection": "فحص المركبة الفني (Baaritaanka)",
      "drivingLicence": "رخصة القيادة (Shatiga Darawalnimada)"
    }
  },
  "vat": {
    "status": "not_applicable",
    "note": "لا توجد ضريبة قيمة مضافة موحدة في الصومال حتى الآن؛ وتفرض ضريبة مبيعات عامة ورسوم جمركية ورسوم نوعية بموجب قانون الإيرادات الفيدرالي لسنة 2019.",
    "authority": "وزارة المالية الفيدرالية الصومالية",
    "sourceUrl": "https://mof.gov.so",
    "checkedAt": "2026-11-01",
    "value": {
      "standardRate": 0
    }
  },
  "incomeTax": {
    "status": "verified",
    "value": {
      "hasPersonalIncomeTax": true,
      "brackets": [
        {
          "thresholdUpTo": 100,
          "rate": 0
        },
        {
          "thresholdUpTo": 1000,
          "rate": 6
        },
        {
          "rate": 12
        }
      ]
    },
    "law": "قانون ضريبة الدخل الصومالي وقانون الجمارك والإيرادات الفيدرالي لسنة 2019",
    "authority": "وزارة المالية الفيدرالية الصومالية - إدارة الضرائب",
    "sourceUrl": "https://mof.gov.so",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "socialInsurance": {
    "status": "no_official_source",
    "note": "لا يوجد نظام تأمينات اجتماعية رسمي إلزامي سارٍ للقطاع الخاص حالياً في جمهورية الصومال؛ وتجري ترتيبات تشريعية لإنشاء صندوق تقاعد وطني.",
    "authority": "وزارة العمل والشؤون الاجتماعية الفيدرالية",
    "sourceUrl": "https://molsa.gov.so",
    "checkedAt": "2026-11-01",
    "value": {
      "nationalEmployeeRate": 0,
      "nationalEmployerRate": 0,
      "agencyNameAr": "وزارة العمل والشؤون الاجتماعية",
      "agencyAcronym": "MOLSA Somalia"
    }
  },
  "endOfService": {
    "status": "verified",
    "value": {
      "standardFormula": "مكافأة إنهاء الخدمة تعادل أجر 15 يوماً عن كل سنة خدمة كاملة لدى صاحب العمل.",
      "firstTierYears": 1,
      "firstTierFraction": 0.5,
      "secondTierFraction": 0.5,
      "resignationScale": [
        {
          "minYears": 1,
          "fractionOfAward": 1
        }
      ],
      "wageBasis": "gross_wage_with_fixed_allowances",
      "articles": "المادة 44 من قانون العمل الصومالي رقم 65 لسنة 1972"
    },
    "law": "قانون العمل الصومالي (القانون رقم 65 لسنة 1972)",
    "authority": "وزارة العمل والشؤون الاجتماعية الفيدرالية",
    "sourceUrl": "https://molsa.gov.so",
    "validFrom": "1972-01-01",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "consumerFinance": {
    "status": "no_official_source",
    "note": "التمويل المصرفي الاستهلاكي للأفراد محدود للغاية؛ وتعتمد المعاملات المالية غالباً على الدفع عبر الهاتف والمصارف التجارية الإسلامية المستقلة.",
    "authority": "البنك المركزي الصومالي (Central Bank of Somalia)",
    "sourceUrl": "https://centralbank.gov.so",
    "checkedAt": "2026-11-01",
    "value": {
      "dbrCapPercent": 35,
      "maxAutoFinanceTenorYears": 3,
      "quoteConvention": "reducing",
      "islamicFinanceTerm": "تمويل مرابحة إسلامية"
    }
  },
  "fuel": {
    "status": "no_official_source",
    "note": "أسعار الوقود في الصومال محررة بالكامل وتخضع للاستيراد التجاري الحر عبر الموانئ ومحطات التوزيع الخاصة بالدولار الأمريكي، ولا يوجد سقف حكومي رسمي.",
    "authority": "وزارة البترول والموارد المعدنية الصومالية",
    "sourceUrl": "https://mopmr.gov.so",
    "checkedAt": "2026-11-01",
    "value": {
      "pricingModel": "liberalised",
      "grades": {
        "petrol": {
          "nameAr": "بنزين (Super)",
          "pricePerLiter": 26000,
          "unitAr": "ش.ص/لتر"
        },
        "diesel": {
          "nameAr": "ديزل (Naafto)",
          "pricePerLiter": 25000,
          "unitAr": "ش.ص/لتر"
        }
      }
    }
  },
  "electricity": {
    "status": "no_official_source",
    "note": "تدار شبكات الكهرباء في المدن الصومالية عبر شركات خاصة مستقلة ومولدات لا مركزية تحدد تعرفة الكيلوواط الساعي تجارياً بالدولار الأمريكي دون تعرفة مركزية موحدة.",
    "authority": "وزارة الطاقة والموارد المائية الصومالية",
    "sourceUrl": "https://moewr.gov.so",
    "checkedAt": "2026-11-01",
    "value": {
      "residentialTiers": [
        {
          "minKwh": 1,
          "ratePerKwh": 9000
        }
      ],
      "vatApplies": false
    }
  },
  "vehicle": {
    "status": "verified",
    "value": {
      "registrationFeeAnnual": 500000,
      "periodicInspectionFee": 200000,
      "drivingLicenceRenewal10Yr": 350000,
      "customsDutyPercent": 10,
      "customsVatPercent": 0,
      "trafficFines": [
        {
          "categoryAr": "المخالفات المرورية",
          "violationAr": "تجاوز الإشارة الضوئية أو السرعة الزائدة",
          "minFine": 200000,
          "maxFine": 500000
        },
        {
          "categoryAr": "السلامة العامة",
          "violationAr": "عدم ربط حزام الأمان",
          "minFine": 100000,
          "maxFine": 200000
        }
      ]
    },
    "law": "لوائح إدارة المرور الصادرة عن إدارة إقليم بنادر ووزارة النقل الفيدرالية",
    "authority": "وزارة النقل والطيران المدني / إدارة إقليم بنادر",
    "sourceUrl": "https://motca.gov.so",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "zakat": {
    "status": "verified",
    "value": {
      "authorityName": "وزارة الأوقاف والشؤون الدينية الفيدرالية",
      "isMandatoryForCompanies": false,
      "individualNoteAr": "زكاة الأموال فريضة دينية إسلامية بمعدل 2.5% حولياً عند بلوغ النصاب."
    },
    "law": "التنظيم الوزاري للشؤون الدينية والأوقاف الصومالي",
    "authority": "وزارة الأوقاف والشؤون الدينية",
    "sourceUrl": "https://mowra.gov.so",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "routes": [
    {
      "id": "mogadishu-afgooye",
      "fromCityAr": "مقديشو",
      "toCityAr": "أفجوي",
      "distanceKm": 30,
      "source": "طريق مقديشو - أفجوي الرئيسي"
    },
    {
      "id": "mogadishu-merca",
      "fromCityAr": "مقديشو",
      "toCityAr": "مركة",
      "distanceKm": 90,
      "source": "الطريق الساحلي الجنوبي"
    },
    {
      "id": "mogadishu-baidoa",
      "fromCityAr": "مقديشو",
      "toCityAr": "بيدوا",
      "distanceKm": 250,
      "source": "طريق مقديشو - بيدوا القومي"
    },
    {
      "id": "mogadishu-jowhar",
      "fromCityAr": "مقديشو",
      "toCityAr": "جوهر",
      "distanceKm": 90,
      "source": "طريق مقديشو - جوهر - بلعد"
    },
    {
      "id": "hargeisa-berbera",
      "fromCityAr": "هرجيسا",
      "toCityAr": "بربرة",
      "distanceKm": 160,
      "source": "طريق هرجيسا - بربرة"
    }
  ]
};

export default COUNTRY_DATA_SO;
