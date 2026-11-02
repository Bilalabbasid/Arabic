import { CountryData } from '../types';

export const COUNTRY_DATA_YE: CountryData = {
  "countryCode": "ye",
  "basics": {
    "nameAr": "الجمهورية اليمنية",
    "nameEn": "Yemen",
    "locale": "ar-YE",
    "currency": {
      "code": "YER",
      "nameAr": "ريال يمني",
      "symbolAr": "ر.ي",
      "minorUnits": 2
    },
    "weekendDays": [
      5,
      6
    ],
    "officialCalendar": "gregorian",
    "localTerms": {
      "vehicleRegistration": "كرت السيارة (ملكية / رخصة تسيير المركبة)",
      "diesel": "ديزل",
      "periodicInspection": "الفحص الفني الدوري للمرور",
      "drivingLicence": "رخصة قيادة"
    }
  },
  "vat": {
    "status": "verified",
    "value": {
      "standardRate": 5,
      "reducedRates": [
        0
      ],
      "zeroRatedItems": [
        "الصادرات إلى خارج الجمهورية"
      ],
      "exemptItems": [
        "السلع الغذائية الأساسية (قمح، أرز، دقيق)",
        "الأدوية والمستلزمات الطبية"
      ]
    },
    "law": "قانون الضريبة العامة على المبيعات رقم 19 لسنة 2001 ولائحته التنفيذية",
    "authority": "مصلحة الضرائب اليمنية",
    "sourceUrl": "http://www.yementax.gov.ye",
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
          "rate": 10
        },
        {
          "rate": 15
        }
      ]
    },
    "law": "قانون ضرائب الدخل رقم 17 لسنة 2010",
    "authority": "مصلحة الضرائب اليمنية",
    "sourceUrl": "http://www.yementax.gov.ye",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "socialInsurance": {
    "status": "verified",
    "value": {
      "nationalEmployeeRate": 6,
      "nationalEmployerRate": 9,
      "expatEmployeeRate": 0,
      "expatEmployerRate": 3,
      "agencyNameAr": "المؤسسة العامة للتأمينات الاجتماعية",
      "agencyAcronym": "GOSI Yemen"
    },
    "law": "قانون التأمينات الاجتماعية رقم 26 لسنة 1991 وتعديلاته",
    "authority": "المؤسسة العامة للتأمينات الاجتماعية اليمنية",
    "sourceUrl": "http://www.gosi.gov.ye",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "endOfService": {
    "status": "verified",
    "value": {
      "standardFormula": "أجر شهر كامل عن كل سنة خدمة للعمال غير الخاضعين لقانون التأمينات الاجتماعية.",
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
      "articles": "المادة 120 من قانون العمل اليمني رقم 5 لسنة 1995"
    },
    "law": "قانون العمل اليمني رقم 5 لسنة 1995",
    "authority": "وزارة الشؤون الاجتماعية والعمل اليمنية",
    "sourceUrl": "http://www.mosal.gov.ye",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "consumerFinance": {
    "status": "unverified",
    "note": "الائتمان المصرفي للأفراد محدود للغاية نظراً للظروف الاقتصادية الراهنة وتعدد أسعار الصرف بين المناطق.",
    "authority": "البنك المركزي اليمني",
    "sourceUrl": "https://www.centralbankye.com",
    "checkedAt": "2026-11-01",
    "value": {
      "dbrCapPercent": 35,
      "maxAutoFinanceTenorYears": 5,
      "quoteConvention": "reducing",
      "islamicFinanceTerm": "مرابحة سيارات إسلامية"
    }
  },
  "fuel": {
    "status": "verified",
    "value": {
      "pricingModel": "monthly_adjusted",
      "grades": {
        "petrol": {
          "nameAr": "بنزين (محطات شركة النفط)",
          "pricePerLiter": 1250,
          "unitAr": "ر.ي/لتر"
        },
        "diesel": {
          "nameAr": "ديزل",
          "pricePerLiter": 1200,
          "unitAr": "ر.ي/لتر"
        }
      },
      "updateCadenceDays": 30
    },
    "law": "التعرفة الرسمية الصادرة عن شركة النفط اليمنية (تختلف بحسب المحافظة وسعر الصرف)",
    "authority": "شركة النفط اليمنية (YPC)",
    "sourceUrl": "http://www.ypcye.com",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 35
  },
  "electricity": {
    "status": "verified",
    "value": {
      "residentialTiers": [
        {
          "minKwh": 1,
          "maxKwh": 200,
          "ratePerKwh": 25
        },
        {
          "minKwh": 201,
          "maxKwh": 350,
          "ratePerKwh": 35
        },
        {
          "minKwh": 351,
          "ratePerKwh": 55
        }
      ],
      "meterServiceFeeMonthly": 500,
      "vatApplies": false
    },
    "law": "تعرفة بيع الطاقة الكهربائية للمؤسسة العامة للكهرباء",
    "authority": "المؤسسة العامة للكهرباء اليمنية (PEC)",
    "sourceUrl": "http://www.pec.com.ye",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "vehicle": {
    "status": "verified",
    "value": {
      "registrationFeeAnnual": 10000,
      "periodicInspectionFee": 5000,
      "drivingLicenceRenewal10Yr": 15000,
      "customsDutyPercent": 5,
      "customsVatPercent": 5,
      "trafficFines": [
        {
          "categoryAr": "الإشارات المرورية",
          "violationAr": "تجاوز الإشارة الحمراء",
          "minFine": 5000,
          "maxFine": 10000
        },
        {
          "categoryAr": "السرعة الزائدة",
          "violationAr": "تجاوز السرعة المقررة",
          "minFine": 3000,
          "maxFine": 6000
        },
        {
          "categoryAr": "السلامة العامة",
          "violationAr": "عدم ربط حزام الأمان",
          "minFine": 2000,
          "maxFine": 2000
        }
      ]
    },
    "law": "قانون المرور اليمني رقم 46 لسنة 1991",
    "authority": "وزارة الداخلية - الإدارة العامة لشرطة السير",
    "sourceUrl": "http://www.yemenmoi.gov.ye",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "zakat": {
    "status": "verified",
    "value": {
      "authorityName": "الهيئة العامة للزكاة",
      "isMandatoryForCompanies": true,
      "individualNoteAr": "زكاة الأموال فريضة شرعية بمقدار 2.5% سنوياً."
    },
    "law": "القرار الجمهوري بالقانون رقم 2 لسنة 1999 بشأن الزكاة وتعديلاته",
    "authority": "الهيئة العامة للزكاة",
    "sourceUrl": "http://www.zakat.gov.ye",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "routes": [
    {
      "id": "sanaa-aden",
      "fromCityAr": "صنعاء",
      "toCityAr": "عدن",
      "distanceKm": 360,
      "source": "طريق صنعاء - ذمار - إب - تعز - عدن"
    },
    {
      "id": "sanaa-taiz",
      "fromCityAr": "صنعاء",
      "toCityAr": "تعز",
      "distanceKm": 260,
      "source": "طريق صنعاء - إب - تعز الرئيسي"
    },
    {
      "id": "sanaa-hodeidah",
      "fromCityAr": "صنعاء",
      "toCityAr": "الحديدة",
      "distanceKm": 225,
      "source": "طريق صنعاء - مناخة - الحديدة"
    },
    {
      "id": "aden-mukalla",
      "fromCityAr": "عدن",
      "toCityAr": "المكلا (حضرموت)",
      "distanceKm": 620,
      "source": "الطريق الساحلي الدولي عدن المكلا"
    },
    {
      "id": "aden-taiz",
      "fromCityAr": "عدن",
      "toCityAr": "تعز",
      "distanceKm": 180,
      "source": "طريق عدن لحج تعز"
    }
  ]
};

export default COUNTRY_DATA_YE;
