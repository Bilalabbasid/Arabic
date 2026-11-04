import { CountryData } from '../types';

export const COUNTRY_DATA_SA: CountryData = {
  "countryCode": "sa",
  "basics": {
    "nameAr": "المملكة العربية السعودية",
    "nameEn": "Saudi Arabia",
    "locale": "ar-SA",
    "currency": {
      "code": "SAR",
      "nameAr": "ريال سعودي",
      "symbolAr": "ر.س",
      "minorUnits": 2
    },
    "weekendDays": [
      5,
      6
    ],
    "officialCalendar": "dual",
    "localTerms": {
      "vehicleRegistration": "استمارة السيارة (رخصة السير)",
      "diesel": "ديزل",
      "periodicInspection": "الفحص الفني الدوري (سلامة المركبات)",
      "drivingLicence": "رخصة القيادة"
    }
  },
  "vat": {
    "status": "verified",
    "value": {
      "standardRate": 15,
      "reducedRates": [
        0
      ],
      "zeroRatedItems": [
        "الصادرات الدولية",
        "النقل الدولي للركاب والبضائع",
        "الأدوية والمعدات الطبية المؤهلة"
      ],
      "exemptItems": [
        "الخدمات المالية غير الصريحة المقابل",
        "التأجير السكني للعقارات",
        "بيع العقار السكني الخاضع لضريبة التصرفات العقارية 5%"
      ]
    },
    "law": "نظام ضريبة القيمة المضافة الصادر بالمرسوم الملكي م/113 وتعديلاته بالأمر الملكي أ/638",
    "authority": "هيئة الزكاة والضريبة والجمارك (ZATCA)",
    "sourceUrl": "https://zatca.gov.sa/ar/RulesRegulations/Taxes/Pages/vat_regulations.aspx",
    "validFrom": "2020-07-01",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "incomeTax": {
    "status": "not_applicable",
    "note": "لا تفرض المملكة العربية السعودية ضريبة على الدخل الشخصي أو الرواتب للأفراد الطبيعيين.",
    "authority": "هيئة الزكاة والضريبة والجمارك (ZATCA)",
    "sourceUrl": "https://zatca.gov.sa",
    "checkedAt": "2026-11-01",
    "value": {
      "hasPersonalIncomeTax": false
    }
  },
  "socialInsurance": {
    "status": "verified",
    "value": {
      "nationalEmployeeRate": 9.75,
      "nationalEmployerRate": 11.75,
      "expatEmployeeRate": 0,
      "expatEmployerRate": 2,
      "maxMonthlyWageCap": 45000,
      "agencyNameAr": "المؤسسة العامة للتأمينات الاجتماعية",
      "agencyAcronym": "GOSI"
    },
    "law": "نظام التأمينات الاجتماعية ونظام التأمين ضد التعطل عن العمل (ساند)",
    "authority": "المؤسسة العامة للتأمينات الاجتماعية (GOSI)",
    "sourceUrl": "https://gosi.gov.sa",
    "validFrom": "2014-06-01",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "endOfService": {
    "status": "verified",
    "value": {
      "standardFormula": "أجر نصف شهر عن كل سنة من السنوات الـ 5 الأولى، وأجر شهر كامل عن كل سنة تالية.",
      "firstTierYears": 5,
      "firstTierFraction": 0.5,
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
      "wageBasis": "gross_wage_with_fixed_allowances",
      "articles": "المادتان 84 و 85 من نظام العمل السعودي الصادر بالمرسوم الملكي م/51"
    },
    "law": "نظام العمل السعودي (المرسوم الملكي م/51)",
    "authority": "وزارة الموارد البشرية والتنمية الاجتماعية",
    "sourceUrl": "https://hrsd.gov.sa",
    "validFrom": "2006-04-23",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "consumerFinance": {
    "status": "verified",
    "value": {
      "dbrCapPercent": 33.33,
      "dbrCapPensionerPercent": 25,
      "maxAutoFinanceTenorYears": 5,
      "quoteConvention": "reducing",
      "islamicFinanceTerm": "تمويل مرابحة / إيجار تمويلي"
    },
    "law": "تعليمات التمويل المسؤول للأفراد الصادرة عن البنك المركزي السعودي (ساما)",
    "authority": "البنك المركزي السعودي (SAMA)",
    "sourceUrl": "https://www.sama.gov.sa",
    "validFrom": "2018-05-01",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "fuel": {
    "status": "verified",
    "value": {
      "pricingModel": "subsidised_cap",
      "grades": {
        "octane91": {
          "nameAr": "بنزين 91 ممتاز",
          "pricePerLiter": 2.18,
          "unitAr": "ر.س/لتر"
        },
        "octane95": {
          "nameAr": "بنزين 95 سوبر",
          "pricePerLiter": 2.33,
          "unitAr": "ر.س/لتر"
        },
        "diesel": {
          "nameAr": "ديزل نقل وصناعي",
          "pricePerLiter": 1.79,
          "unitAr": "ر.س/لتر"
        }
      },
      "priceHistory": [
        {
          "date": "2026-11-01",
          "prices": {
            "octane91": 2.18,
            "octane95": 2.33,
            "diesel": 1.79
          }
        },
        {
          "date": "2026-10-01",
          "prices": {
            "octane91": 2.18,
            "octane95": 2.33,
            "diesel": 1.79
          }
        }
      ],
      "updateCadenceDays": 30
    },
    "law": "السقف السعري الرسمي المعتمد بالأمر الملكي الكريم لحماية المستهلك",
    "authority": "وزارة الطاقة / شركة أرامكو السعودية",
    "sourceUrl": "https://www.aramco.com/ar/creating-value/products/retail-fuels",
    "validFrom": "2021-07-10",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 35
  },
  "electricity": {
    "status": "verified",
    "value": {
      "residentialTiers": [
        {
          "minKwh": 1,
          "maxKwh": 6000,
          "ratePerKwh": 0.18
        },
        {
          "minKwh": 6001,
          "ratePerKwh": 0.3
        }
      ],
      "meterServiceFeeMonthly": 15,
      "vatApplies": true
    },
    "law": "تعرفة بيع الطاقة الكهربائية المعتمدة بقرار مجلس الوزراء رقم 170",
    "authority": "هيئة تنظيم المياه والكهرباء (WERA)",
    "sourceUrl": "https://wera.gov.sa",
    "validFrom": "2018-01-01",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "vehicle": {
    "status": "verified",
    "value": {
      "registrationFeeAnnual": 100,
      "periodicInspectionFee": 84,
      "drivingLicenceRenewal10Yr": 400,
      "customsDutyPercent": 5,
      "customsVatPercent": 15,
      "maxImportAgeYears": 5,
      "importAgeRules": "لا يتجاوز موديل سيارات الركوب الصغيرة 5 سنوات من سنة الصنع، وشاحنات النقل 10 سنوات.",
      "trafficFines": [
        {
          "categoryAr": "السرعة الزائدة (حد 120 كم/س)",
          "violationAr": "تجاوز السرعة بأكثر من 10 إلى 20 كم/س",
          "minFine": 150,
          "maxFine": 300
        },
        {
          "categoryAr": "السرعة الزائدة (حد 120 كم/س)",
          "violationAr": "تجاوز السرعة بأكثر من 20 إلى 30 كم/س",
          "minFine": 300,
          "maxFine": 500
        },
        {
          "categoryAr": "الإشارات المرورية",
          "violationAr": "تجاوز إشارة الضوء الأحمر",
          "minFine": 3000,
          "maxFine": 6000
        },
        {
          "categoryAr": "السلامة العامة",
          "violationAr": "عدم ربط حزام الأمان",
          "minFine": 150,
          "maxFine": 300
        },
        {
          "categoryAr": "السلامة العامة",
          "violationAr": "استخدام الهاتف المحمول باليد أثناء القيادة",
          "minFine": 500,
          "maxFine": 900
        }
      ]
    },
    "law": "نظام المرور ولائحته التنفيذية ولائحة الاستيراد الجمركي",
    "authority": "الإدارة العامة للمرور / هيئة الزكاة والضريبة والجمارك",
    "sourceUrl": "https://www.moi.gov.sa",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "zakat": {
    "status": "verified",
    "value": {
      "authorityName": "هيئة الزكاة والضريبة والجمارك (ZATCA)",
      "isMandatoryForCompanies": true,
      "individualNoteAr": "زكاة المال للأفراد هي فريضة شرعية بنسبة 2.5%، والحاسبة أداة مساعدة غير ملزمة."
    },
    "law": "اللائحة التنفيذية لجباية الزكاة بالقرار الوزاري رقم (2216)",
    "authority": "هيئة الزكاة والضريبة والجمارك",
    "sourceUrl": "https://zatca.gov.sa",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "routes": [
    {
      "id": "riyadh-jeddah",
      "fromCityAr": "الرياض",
      "toCityAr": "جدة",
      "distanceKm": 950,
      "source": "الهيئة العامة للطرق - مسار طريق مكة السريع"
    },
    {
      "id": "riyadh-dammam",
      "fromCityAr": "الرياض",
      "toCityAr": "الدمام",
      "distanceKm": 395,
      "source": "الهيئة العامة للطرق - طريق الرياض الدمام السريع"
    },
    {
      "id": "riyadh-qassim",
      "fromCityAr": "الرياض",
      "toCityAr": "القصيم (بريدة)",
      "distanceKm": 330,
      "source": "الهيئة العامة للطرق"
    },
    {
      "id": "jeddah-madinah",
      "fromCityAr": "جدة",
      "toCityAr": "المدينة المنورة",
      "distanceKm": 420,
      "source": "الهيئة العامة للطرق - طريق الهجرة"
    },
    {
      "id": "riyadh-abha",
      "fromCityAr": "الرياض",
      "toCityAr": "أبها",
      "distanceKm": 960,
      "source": "الهيئة العامة للطرق"
    },
    {
      "id": "khobar-jubail",
      "fromCityAr": "الخبر",
      "toCityAr": "الجبيل",
      "distanceKm": 95,
      "source": "الهيئة العامة للطرق"
    }
  ]
};

export default COUNTRY_DATA_SA;
