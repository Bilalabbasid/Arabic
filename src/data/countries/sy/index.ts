import { CountryData } from '../types';

export const COUNTRY_DATA_SY: CountryData = {
  "countryCode": "sy",
  "basics": {
    "nameAr": "الجمهورية العربية السورية",
    "nameEn": "Syria",
    "locale": "ar-SY",
    "currency": {
      "code": "SYP",
      "nameAr": "ليرة سورية",
      "symbolAr": "ل.س",
      "minorUnits": 2
    },
    "weekendDays": [
      5,
      6
    ],
    "officialCalendar": "gregorian",
    "localTerms": {
      "vehicleRegistration": "دفتر ترسيم السيارة (رخصة السير)",
      "diesel": "مازوت",
      "periodicInspection": "الفحص الفني السنوي للمركبات",
      "drivingLicence": "شهادة سواقة (رخصة قيادة)"
    }
  },
  "vat": {
    "status": "not_applicable",
    "note": "لا توجد ضريبة قيمة مضافة عامة موحدة في سوريا؛ ويطبق رسم الإنفاق الاستهلاكي ورسوم مبيعات نوعية وفق قوانين الضرائب المباشرة وغير المباشرة.",
    "authority": "الهيئة العامة للضرائب والرسوم السورية",
    "sourceUrl": "http://www.gct.gov.sy",
    "checkedAt": "2026-11-01",
    "value": {
      "standardRate": 0
    }
  },
  "incomeTax": {
    "status": "verified",
    "value": {
      "hasPersonalIncomeTax": true,
      "standardDeduction": 150000,
      "brackets": [
        {
          "thresholdUpTo": 50000,
          "rate": 5
        },
        {
          "thresholdUpTo": 100000,
          "rate": 7
        },
        {
          "thresholdUpTo": 200000,
          "rate": 9
        },
        {
          "thresholdUpTo": 300000,
          "rate": 11
        },
        {
          "thresholdUpTo": 500000,
          "rate": 13
        },
        {
          "rate": 18
        }
      ]
    },
    "law": "المرسوم التشريعي رقم 24 لسنة 2003 المعدل بالمرسوم التشريعي رقم 30 لسنة 2023",
    "authority": "الهيئة العامة للضرائب والرسوم",
    "sourceUrl": "http://www.gct.gov.sy",
    "validFrom": "2023-09-01",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "socialInsurance": {
    "status": "verified",
    "value": {
      "nationalEmployeeRate": 7,
      "nationalEmployerRate": 17.1,
      "expatEmployeeRate": 7,
      "expatEmployerRate": 17.1,
      "agencyNameAr": "المؤسسة العامة للتأمينات الاجتماعية",
      "agencyAcronym": "GOSI Syria"
    },
    "law": "قانون التأمينات الاجتماعية السوري الصادر بالمرسوم التشريعي رقم 92 لسنة 1959 وتعديلاته",
    "authority": "المؤسسة العامة للتأمينات الاجتماعية السورية",
    "sourceUrl": "http://taminat.gov.sy",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "endOfService": {
    "status": "verified",
    "value": {
      "standardFormula": "أجر شهر كامل عن كل سنة خدمة للعمال غير الخاضعين لنظام التقاعد التأميني بالمؤسسة العامة للتأمينات الاجتماعية.",
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
      "articles": "المادة 90 من قانون العمل السوري رقم 17 لسنة 2010"
    },
    "law": "قانون العمل السوري رقم 17 لسنة 2010",
    "authority": "وزارة الشؤون الاجتماعية والعمل السورية",
    "sourceUrl": "http://www.mosa.gov.sy",
    "validFrom": "2010-04-12",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "consumerFinance": {
    "status": "verified",
    "value": {
      "dbrCapPercent": 40,
      "maxAutoFinanceTenorYears": 5,
      "quoteConvention": "reducing",
      "islamicFinanceTerm": "مرابحة سيارات إسلامية"
    },
    "law": "قرارات وضوابط الإقراض الصادرة عن مصرف سورية المركزي ومجلس النقد والتسليف",
    "authority": "مصرف سورية المركزي (CBS)",
    "sourceUrl": "http://www.cb-sy.com",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "fuel": {
    "status": "verified",
    "value": {
      "pricingModel": "subsidised_cap",
      "grades": {
        "subsidised90": {
          "nameAr": "بنزين أوكتان 90 مدعوم (بطاقة ذكية)",
          "pricePerLiter": 9500,
          "unitAr": "ل.س/لتر"
        },
        "free95": {
          "nameAr": "بنزين أوكتان 95 حر",
          "pricePerLiter": 14290,
          "unitAr": "ل.س/لتر"
        },
        "mazout": {
          "nameAr": "مازوت تدفئة ونقل مدعوم",
          "pricePerLiter": 2000,
          "unitAr": "ل.س/لتر"
        }
      },
      "updateCadenceDays": 30
    },
    "law": "قرارات وزارة التجارة الداخلية وحماية المستهلك بتعديل أسعار المشتقات النفطية",
    "authority": "وزارة التجارة الداخلية وحماية المستهلك / شركة سادكوب",
    "sourceUrl": "http://www.mitcp.gov.sy",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 35
  },
  "electricity": {
    "status": "verified",
    "value": {
      "residentialTiers": [
        {
          "minKwh": 1,
          "maxKwh": 600,
          "ratePerKwh": 10
        },
        {
          "minKwh": 601,
          "maxKwh": 1000,
          "ratePerKwh": 25
        },
        {
          "minKwh": 1001,
          "ratePerKwh": 135
        }
      ],
      "meterServiceFeeMonthly": 500,
      "vatApplies": false
    },
    "law": "التعرفة الرسمية الصادرة بقرارات وزارة الكهرباء السورية",
    "authority": "وزارة الكهرباء السورية",
    "sourceUrl": "http://www.moe.gov.sy",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "vehicle": {
    "status": "verified",
    "value": {
      "registrationFeeAnnual": 50000,
      "periodicInspectionFee": 25000,
      "drivingLicenceRenewal10Yr": 35000,
      "customsDutyPercent": 20,
      "customsVatPercent": 0,
      "trafficFines": [
        {
          "categoryAr": "الإشارات المرورية",
          "violationAr": "تجاوز الإشارة الحمراء",
          "minFine": 25000,
          "maxFine": 50000
        },
        {
          "categoryAr": "السرعة الزائدة",
          "violationAr": "تجاوز السرعة القانونية",
          "minFine": 15000,
          "maxFine": 30000
        },
        {
          "categoryAr": "السلامة العامة",
          "violationAr": "عدم ارتداء حزام الأمان",
          "minFine": 5000,
          "maxFine": 10000
        }
      ]
    },
    "law": "قانون السير والمركبات السوري رقم 11 لسنة 2008 وتعديلاته بالمرسوم رقم 11 لسنة 2018",
    "authority": "وزارة الداخلية - إدارة المرور السورية",
    "sourceUrl": "http://www.syriamoi.gov.sy",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "zakat": {
    "status": "verified",
    "value": {
      "authorityName": "صندوق الزكاة بوزارة الأوقاف السورية",
      "isMandatoryForCompanies": false,
      "individualNoteAr": "زكاة المال فريضة شرعية بمقدار 2.5% حولياً عند بلوغ النصاب."
    },
    "law": "قانون وزارة الأوقاف السورية رقم 31 لسنة 2018",
    "authority": "وزارة الأوقاف السورية",
    "sourceUrl": "http://mow.gov.sy",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "routes": [
    {
      "id": "damascus-homs",
      "fromCityAr": "دمشق",
      "toCityAr": "حمص",
      "distanceKm": 160,
      "source": "طريق دمشق - حمص الدولي M5"
    },
    {
      "id": "damascus-aleppo",
      "fromCityAr": "دمشق",
      "toCityAr": "حلب",
      "distanceKm": 355,
      "source": "الأوتوستراد الدولي M5"
    },
    {
      "id": "damascus-latakia",
      "fromCityAr": "دمشق",
      "toCityAr": "اللاذقية",
      "distanceKm": 345,
      "source": "طريق دمشق - حمص - طرطوس - اللاذقية"
    },
    {
      "id": "damascus-daraa",
      "fromCityAr": "دمشق",
      "toCityAr": "درعا",
      "distanceKm": 105,
      "source": "أوتوستراد درعا الدولي M5"
    },
    {
      "id": "homs-hama",
      "fromCityAr": "حمص",
      "toCityAr": "حماة",
      "distanceKm": 45,
      "source": "طريق حمص حماة M5"
    }
  ]
};

export default COUNTRY_DATA_SY;
