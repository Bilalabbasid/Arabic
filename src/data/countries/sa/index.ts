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
      "agencyAcronym": "GOSI",
      "minMonthlyWage": 1500,
      "legacySystemLabelAr": "النظام السابق (مسجل قبل 3 يوليو 2024): معاشات 9% + ساند 0.75% على الموظف",
      "newSystem": {
        "labelAr": "نظام التأمينات الجديد (أول تسجيل بعد 3 يوليو 2024): معاشات 10% + ساند 0.75% على الموظف",
        "effectiveFrom": "2026-07-01",
        "nationalEmployeeRate": 10.75,
        "nationalEmployerRate": 12.75,
        "maxMonthlyWageCap": 45000,
        "minMonthlyWage": 1500,
        "noteAr": "ترتفع نسبة المعاشات في النظام الجديد 0.5% على كل طرف في 1 يوليو من كل عام حتى تبلغ 11% لكل طرف في يوليو 2028."
      }
    },
    "law": "نظام التأمينات الاجتماعية الصادر بالمرسوم الملكي م/273 (نافذ 3 يوليو 2024) ونظام التأمين ضد التعطل عن العمل (ساند)",
    "authority": "المؤسسة العامة للتأمينات الاجتماعية (GOSI)",
    "sourceUrl": "https://awareness.gosi.gov.sa/businessJourney.html",
    "validFrom": "2014-06-01",
    "checkedAt": "2026-11-05",
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
    "sourceUrl": "https://www.aramco.com/ar/what-we-do/energy-products/retail-fuels",
    "validFrom": "2021-07-10",
    "checkedAt": "2026-11-05",
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
      "periodicInspectionFee": 115,
      "drivingLicenceRenewal10Yr": 400,
      "customsDutyPercent": 5,
      "customsVatPercent": 15,
      "maxImportAgeYears": 5,
      "importAgeRules": "لا يتجاوز موديل سيارات الركوب الصغيرة 5 سنوات من سنة الصنع، وشاحنات النقل 10 سنوات.",
      "trafficFines": [
        {
          "categoryAr": "السرعة الزائدة (طرق حدها 120 كم/س أو أقل)",
          "violationAr": "تجاوز السرعة بأكثر من 10 إلى 20 كم/س",
          "minFine": 150,
          "maxFine": 300
        },
        {
          "categoryAr": "السرعة الزائدة (طرق حدها 120 كم/س أو أقل)",
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
    "law": "نظام المرور (م/85 لعام 1428هـ) وجداول المخالفات المعدلة بالمرسوم م/115، ومقابل الفحص الفني الدوري المعلن من هيئة المواصفات",
    "authority": "الإدارة العامة للمرور / هيئة الزكاة والضريبة والجمارك",
    "sourceUrl": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/85364e57-c01e-41ba-8def-a9a700f183e9/1",
    "checkedAt": "2026-11-05",
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
      "durationMinutes": 625,
      "source": "الهيئة العامة للطرق - مسار طريق مكة السريع"
    },
    {
      "id": "riyadh-dammam",
      "fromCityAr": "الرياض",
      "toCityAr": "الدمام",
      "distanceKm": 400,
      "durationMinutes": 225,
      "source": "الهيئة العامة للطرق - طريق الرياض الدمام السريع"
    },
    {
      "id": "riyadh-qassim",
      "fromCityAr": "الرياض",
      "toCityAr": "القصيم (بريدة)",
      "distanceKm": 330,
      "durationMinutes": 190,
      "source": "الهيئة العامة للطرق"
    },
    {
      "id": "jeddah-madinah",
      "fromCityAr": "جدة",
      "toCityAr": "المدينة المنورة",
      "distanceKm": 420,
      "durationMinutes": 290,
      "source": "الهيئة العامة للطرق - طريق الهجرة"
    },
    {
      "id": "riyadh-abha",
      "fromCityAr": "الرياض",
      "toCityAr": "أبها",
      "distanceKm": 960,
      "durationMinutes": 690,
      "source": "الهيئة العامة للطرق"
    },
    {
      "id": "khobar-jubail",
      "fromCityAr": "الخبر",
      "toCityAr": "الجبيل",
      "distanceKm": 105,
      "durationMinutes": 70,
      "source": "الهيئة العامة للطرق"
    },
    {
      "id": "riyadh-kharj",
      "fromCityAr": "الرياض",
      "toCityAr": "الخرج",
      "distanceKm": 95,
      "durationMinutes": 85,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "riyadh-hail",
      "fromCityAr": "الرياض",
      "toCityAr": "حائل",
      "distanceKm": 614,
      "durationMinutes": 355,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "riyadh-dawadmi",
      "fromCityAr": "الرياض",
      "toCityAr": "الدوادمي",
      "distanceKm": 316,
      "durationMinutes": 220,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "riyadh-majmaah",
      "fromCityAr": "الرياض",
      "toCityAr": "المجمعة",
      "distanceKm": 195,
      "durationMinutes": 115,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "riyadh-zulfi",
      "fromCityAr": "الرياض",
      "toCityAr": "الزلفي",
      "distanceKm": 270,
      "durationMinutes": 165,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "riyadh-quwayiyah",
      "fromCityAr": "الرياض",
      "toCityAr": "القويعية",
      "distanceKm": 172,
      "durationMinutes": 115,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "riyadh-shaqra",
      "fromCityAr": "الرياض",
      "toCityAr": "شقراء",
      "distanceKm": 191,
      "durationMinutes": 130,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "riyadh-ahsa",
      "fromCityAr": "الرياض",
      "toCityAr": "الأحساء",
      "distanceKm": 326,
      "durationMinutes": 225,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "riyadh-aflaj",
      "fromCityAr": "الرياض",
      "toCityAr": "الأفلاج",
      "distanceKm": 293,
      "durationMinutes": 215,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "riyadh-taif",
      "fromCityAr": "الرياض",
      "toCityAr": "الطائف",
      "distanceKm": 788,
      "durationMinutes": 515,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "riyadh-makkah",
      "fromCityAr": "الرياض",
      "toCityAr": "مكة المكرمة",
      "distanceKm": 871,
      "durationMinutes": 575,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "riyadh-madinah",
      "fromCityAr": "الرياض",
      "toCityAr": "المدينة المنورة",
      "distanceKm": 826,
      "durationMinutes": 460,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "riyadh-tabuk",
      "fromCityAr": "الرياض",
      "toCityAr": "تبوك",
      "distanceKm": 1351,
      "durationMinutes": 830,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "riyadh-rumah",
      "fromCityAr": "الرياض",
      "toCityAr": "رماح",
      "distanceKm": 127,
      "durationMinutes": 95,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "riyadh-muzahmiyah",
      "fromCityAr": "الرياض",
      "toCityAr": "المزاحمية",
      "distanceKm": 59,
      "durationMinutes": 45,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "riyadh-afif",
      "fromCityAr": "الرياض",
      "toCityAr": "عفيف",
      "distanceKm": 487,
      "durationMinutes": 340,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "riyadh-wadi-aldawasir",
      "fromCityAr": "الرياض",
      "toCityAr": "وادي الدواسر",
      "distanceKm": 619,
      "durationMinutes": 445,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "riyadh-huraymila",
      "fromCityAr": "الرياض",
      "toCityAr": "حريملاء",
      "distanceKm": 88,
      "durationMinutes": 60,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "riyadh-hafar-albatin",
      "fromCityAr": "الرياض",
      "toCityAr": "حفر الباطن",
      "distanceKm": 499,
      "durationMinutes": 330,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "dammam-ahsa",
      "fromCityAr": "الدمام",
      "toCityAr": "الأحساء",
      "distanceKm": 150,
      "durationMinutes": 105,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "dammam-khobar",
      "fromCityAr": "الدمام",
      "toCityAr": "الخبر",
      "distanceKm": 29,
      "durationMinutes": 25,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "dammam-jubail",
      "fromCityAr": "الدمام",
      "toCityAr": "الجبيل",
      "distanceKm": 87,
      "durationMinutes": 60,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "dammam-khafji",
      "fromCityAr": "الدمام",
      "toCityAr": "الخفجي",
      "distanceKm": 297,
      "durationMinutes": 195,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "dammam-nairyah",
      "fromCityAr": "الدمام",
      "toCityAr": "النعيرية",
      "distanceKm": 210,
      "durationMinutes": 140,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "khobar-ahsa",
      "fromCityAr": "الخبر",
      "toCityAr": "الأحساء",
      "distanceKm": 153,
      "durationMinutes": 105,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "jeddah-makkah",
      "fromCityAr": "جدة",
      "toCityAr": "مكة المكرمة",
      "distanceKm": 83,
      "durationMinutes": 60,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "makkah-madinah",
      "fromCityAr": "مكة المكرمة",
      "toCityAr": "المدينة المنورة",
      "distanceKm": 436,
      "durationMinutes": 290,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "jeddah-taif",
      "fromCityAr": "جدة",
      "toCityAr": "الطائف",
      "distanceKm": 165,
      "durationMinutes": 125,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "makkah-taif",
      "fromCityAr": "مكة المكرمة",
      "toCityAr": "الطائف",
      "distanceKm": 89,
      "durationMinutes": 75,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "jeddah-yanbu",
      "fromCityAr": "جدة",
      "toCityAr": "ينبع",
      "distanceKm": 336,
      "durationMinutes": 225,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "jeddah-umluj",
      "fromCityAr": "جدة",
      "toCityAr": "أملج",
      "distanceKm": 482,
      "durationMinutes": 325,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "jeddah-rabigh",
      "fromCityAr": "جدة",
      "toCityAr": "رابغ",
      "distanceKm": 161,
      "durationMinutes": 110,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "madinah-hail",
      "fromCityAr": "المدينة المنورة",
      "toCityAr": "حائل",
      "distanceKm": 429,
      "durationMinutes": 280,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "madinah-alula",
      "fromCityAr": "المدينة المنورة",
      "toCityAr": "العلا",
      "distanceKm": 339,
      "durationMinutes": 305,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "tabuk-alula",
      "fromCityAr": "تبوك",
      "toCityAr": "العلا",
      "distanceKm": 450,
      "durationMinutes": 350,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "hail-qassim",
      "fromCityAr": "حائل",
      "toCityAr": "القصيم (بريدة)",
      "distanceKm": 267,
      "durationMinutes": 160,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "hail-tabuk",
      "fromCityAr": "حائل",
      "toCityAr": "تبوك",
      "distanceKm": 674,
      "durationMinutes": 485,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "taif-baha",
      "fromCityAr": "الطائف",
      "toCityAr": "الباحة",
      "distanceKm": 218,
      "durationMinutes": 150,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "abha-namas",
      "fromCityAr": "أبها",
      "toCityAr": "النماص",
      "distanceKm": 144,
      "durationMinutes": 105,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    },
    {
      "id": "tabuk-tayma",
      "fromCityAr": "تبوك",
      "toCityAr": "تيماء",
      "distanceKm": 265,
      "durationMinutes": 190,
      "source": "خرائط OpenStreetMap (محرك التوجيه OSRM)"
    }
  ]
};

export default COUNTRY_DATA_SA;
