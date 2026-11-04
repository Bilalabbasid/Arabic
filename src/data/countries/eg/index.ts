import { CountryData } from '../types';

export const COUNTRY_DATA_EG: CountryData = {
  "countryCode": "eg",
  "basics": {
    "nameAr": "جمهورية مصر العربية",
    "nameEn": "Egypt",
    "locale": "ar-EG",
    "currency": {
      "code": "EGP",
      "nameAr": "جنيه مصري",
      "symbolAr": "ج.م",
      "minorUnits": 2
    },
    "weekendDays": [
      5,
      6
    ],
    "officialCalendar": "gregorian",
    "localTerms": {
      "vehicleRegistration": "رخصة تسيير سيارة",
      "diesel": "سولار",
      "periodicInspection": "الفحص الفني بوحدة المرور",
      "drivingLicence": "رخصة قيادة خاصة"
    }
  },
  "vat": {
    "status": "verified",
    "value": {
      "standardRate": 14,
      "reducedRates": [
        0,
        5
      ],
      "zeroRatedItems": [
        "السلع والخدمات المصدرة للخارج",
        "النقل الدولي للبضائع والركاب"
      ],
      "exemptItems": [
        "السلع الغذائية التموينية الأساسية",
        "الخدمات المصرفية النقدية والائتمانية",
        "تأجير وبيع الوحدات السكنية غير المفروشة"
      ]
    },
    "law": "قانون الضريبة على القيمة المضافة رقم 67 لسنة 2016 وتعديلاته بالقانون رقم 3 لسنة 2022",
    "authority": "مصلحة الضرائب المصرية (ETA)",
    "sourceUrl": "https://www.eta.gov.eg",
    "validFrom": "2016-09-08",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "incomeTax": {
    "status": "verified",
    "value": {
      "hasPersonalIncomeTax": true,
      "standardDeduction": 20000,
      "roundDownTo": 10,
      "brackets": [
        { "thresholdUpTo": 40000, "rate": 0 },
        { "thresholdUpTo": 55000, "rate": 10 },
        { "thresholdUpTo": 70000, "rate": 15 },
        { "thresholdUpTo": 200000, "rate": 20 },
        { "thresholdUpTo": 400000, "rate": 22.5 },
        { "thresholdUpTo": 1200000, "rate": 25 },
        { "rate": 27.5 }
      ],
      "schedules": [
        { "maxTaxable": 600000, "brackets": [
          { "thresholdUpTo": 40000, "rate": 0 },
          { "thresholdUpTo": 55000, "rate": 10 },
          { "thresholdUpTo": 70000, "rate": 15 },
          { "thresholdUpTo": 200000, "rate": 20 },
          { "thresholdUpTo": 400000, "rate": 22.5 },
          { "rate": 25 }
        ] },
        { "maxTaxable": 700000, "brackets": [
          { "thresholdUpTo": 55000, "rate": 10 },
          { "thresholdUpTo": 70000, "rate": 15 },
          { "thresholdUpTo": 200000, "rate": 20 },
          { "thresholdUpTo": 400000, "rate": 22.5 },
          { "rate": 25 }
        ] },
        { "maxTaxable": 800000, "brackets": [
          { "thresholdUpTo": 70000, "rate": 15 },
          { "thresholdUpTo": 200000, "rate": 20 },
          { "thresholdUpTo": 400000, "rate": 22.5 },
          { "rate": 25 }
        ] },
        { "maxTaxable": 900000, "brackets": [
          { "thresholdUpTo": 200000, "rate": 20 },
          { "thresholdUpTo": 400000, "rate": 22.5 },
          { "rate": 25 }
        ] },
        { "maxTaxable": 1200000, "brackets": [
          { "thresholdUpTo": 400000, "rate": 22.5 },
          { "rate": 25 }
        ] },
        { "brackets": [
          { "thresholdUpTo": 1200000, "rate": 25 },
          { "rate": 27.5 }
        ] }
      ]
    },
    "law": "قانون الضريبة على الدخل رقم 91 لسنة 2005 والمادتان 8 و13 كما استبدلتا بالقانون رقم 7 لسنة 2024 (إعفاء شخصي 20,000 جنيه سنوياً)",
    "authority": "مصلحة الضرائب المصرية",
    "sourceUrl": "https://eta.gov.eg/sites/default/files/2024-03/law_no.7-2024.pdf",
    "validFrom": "2024-03-01",
    "checkedAt": "2026-11-05",
    "staleAfterDays": 365
  },
  "socialInsurance": {
    "status": "verified",
    "value": {
      "nationalEmployeeRate": 11,
      "nationalEmployerRate": 18.75,
      "expatEmployeeRate": 0,
      "expatEmployerRate": 2,
      "maxMonthlyWageCap": 16700,
      "minMonthlyWage": 2700,
      "agencyNameAr": "الهيئة القومية للتأمين الاجتماعي",
      "agencyAcronym": "NOSI"
    },
    "law": "قانون التأمينات الاجتماعية والمعاشات رقم 148 لسنة 2019",
    "authority": "الهيئة القومية للتأمين الاجتماعي (NOSI)",
    "sourceUrl": "https://www.nosi.gov.eg/ar/News/Pages/2025-11-30.aspx",
    "validFrom": "2026-01-01",
    "checkedAt": "2026-11-05",
    "staleAfterDays": 365
  },
  "endOfService": {
    "status": "unverified",
    "value": {
      "standardFormula": "أجر نصف شهر عن كل سنة من السنوات الخمس الأولى، وأجر شهر كامل عن كل سنة تالية (عند سن التقاعد 60 سنة).",
      "firstTierYears": 5,
      "firstTierFraction": 0.5,
      "secondTierFraction": 1,
      "resignationScale": [
        {
          "minYears": 0,
          "maxYears": 5,
          "fractionOfAward": 0
        },
        {
          "minYears": 5,
          "fractionOfAward": 0
        }
      ],
      "wageBasis": "gross_wage_with_fixed_allowances",
      "articles": "المادة 126 من قانون العمل المصري الموحد رقم 12 لسنة 2003"
    },
    "law": "قيد المراجعة التشريعية بعد صدور قانون العمل الجديد رقم 14 لسنة 2025",
    "authority": "وزارة العمل المصرية",
    "sourceUrl": "https://www.manpower.gov.eg",
    "validFrom": "2003-07-01",
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
      "islamicFinanceTerm": "تمويل مرابحة سيارات إسلامية"
    },
    "law": "التعليمات الرقابية للائتمان المصرفي وضوابط التمويل الاستهلاكي الصادرة عن البنك المركزي المصري",
    "authority": "البنك المركزي المصري (CBE)",
    "sourceUrl": "https://www.cbe.org.eg",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "fuel": {
    "status": "verified",
    "value": {
      "pricingModel": "monthly_adjusted",
      "grades": {
        "octane80": {
          "nameAr": "بنزين 80",
          "pricePerLiter": 20.75,
          "unitAr": "ج.م/لتر"
        },
        "octane92": {
          "nameAr": "بنزين 92",
          "pricePerLiter": 22.25,
          "unitAr": "ج.م/لتر"
        },
        "octane95": {
          "nameAr": "بنزين 95",
          "pricePerLiter": 24.00,
          "unitAr": "ج.م/لتر"
        },
        "solar": {
          "nameAr": "سولار (ديزل)",
          "pricePerLiter": 20.50,
          "unitAr": "ج.م/لتر"
        }
      },
      "updateCadenceDays": 90
    },
    "law": "قرارات لجنة التسعير التلقائي للمنتجات البترولية الصادرة عن مجلس الوزراء",
    "authority": "وزارة البترول والثروة المعدنية",
    "sourceUrl": "https://gate.ahram.org.eg/News/5565403.aspx",
    "validFrom": "2026-03-10",
    "checkedAt": "2026-11-05",
    "staleAfterDays": 35
  },
  "electricity": {
    "status": "verified",
    "value": {
      "residentialTiers": [
        {
          "minKwh": 1,
          "maxKwh": 50,
          "ratePerKwh": 0.68
        },
        {
          "minKwh": 51,
          "maxKwh": 100,
          "ratePerKwh": 0.78
        },
        {
          "minKwh": 101,
          "maxKwh": 200,
          "ratePerKwh": 0.95
        },
        {
          "minKwh": 201,
          "maxKwh": 350,
          "ratePerKwh": 1.55
        },
        {
          "minKwh": 351,
          "maxKwh": 650,
          "ratePerKwh": 1.95
        },
        {
          "minKwh": 651,
          "maxKwh": 1000,
          "ratePerKwh": 2.1
        },
        {
          "minKwh": 1001,
          "ratePerKwh": 2.23
        }
      ],
      "meterServiceFeeMonthly": 9,
      "vatApplies": false
    },
    "law": "تعريفة بيع الطاقة الكهربائية المعتمدة بقرار وزير الكهرباء رقم 123 لسنة 2024",
    "authority": "جهاز تنظيم مرفق الكهرباء وحماية المستهلك (EgyptERA)",
    "sourceUrl": "http://egyptera.org",
    "validFrom": "2024-08-01",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "vehicle": {
    "status": "verified",
    "value": {
      "registrationFeeAnnual": 750,
      "periodicInspectionFee": 250,
      "drivingLicenceRenewal10Yr": 1200,
      "customsDutyPercent": 40,
      "customsVatPercent": 14,
      "maxImportAgeYears": 0,
      "importTaxes": {
        "dutyBands": [
          { "maxCc": 1600, "rate": 40 },
          { "rate": 135 }
        ],
        "preferentialOriginDutyRate": 0,
        "preferentialOriginLabelAr": "منشأ الاتحاد الأوروبي (بشهادة منشأ تفضيلية EUR.1)",
        "scheduleTaxBands": [
          { "maxCc": 1600, "rate": 1 },
          { "maxCc": 2000, "rate": 15 },
          { "rate": 30 }
        ],
        "developmentFeeBands": [
          { "maxCc": 1599, "rate": 3 },
          { "maxCc": 1999, "rate": 5 },
          { "rate": 8.5 }
        ],
        "vatRate": 14
      },
      "trafficFines": [
        {
          "categoryAr": "الإشارات المرورية",
          "violationAr": "تجاوز الإشارة الضوئية الحمراء",
          "minFine": 500,
          "maxFine": 1000
        },
        {
          "categoryAr": "السرعة الزائدة",
          "violationAr": "تجاوز السرعة المقررة على الطرق",
          "minFine": 300,
          "maxFine": 1500
        },
        {
          "categoryAr": "السلامة العامة",
          "violationAr": "عدم ربط حزام الأمان",
          "minFine": 100,
          "maxFine": 300
        },
        {
          "categoryAr": "السلامة العامة",
          "violationAr": "استخدام الهاتف المحمول باليد أثناء القيادة",
          "minFine": 100,
          "maxFine": 300
        }
      ]
    },
    "law": "قانون المرور رقم 66 لسنة 1973 المعدل بالقانون 142 لسنة 2014 وقانون الجمارك 207 لسنة 2020",
    "authority": "وزارة الداخلية - الإدارة العامة للمرور / مصلحة الجمارك",
    "sourceUrl": "https://traffic.moi.gov.eg",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "zakat": {
    "status": "verified",
    "value": {
      "authorityName": "بيت الزكاة والصدقات المصري تحت إشراف شيخ الأزهر",
      "isMandatoryForCompanies": false,
      "individualNoteAr": "زكاة المال فريضة شرعية بنسبة 2.5% على الأموال التي بلغت النصاب وحال عليها الحول."
    },
    "law": "القانون رقم 123 لسنة 2014 بإنشاء بيت الزكاة والصدقات المصري",
    "authority": "بيت الزكاة والصدقات المصري (الأزهر الشريف)",
    "sourceUrl": "https://www.baitzakat.org.eg",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "routes": [
    {
      "id": "cairo-alexandria",
      "fromCityAr": "القاهرة",
      "toCityAr": "الإسكندرية",
      "distanceKm": 215,
      "source": "طريق القاهرة - الإسكندرية الصحراوي"
    },
    {
      "id": "cairo-hurghada",
      "fromCityAr": "القاهرة",
      "toCityAr": "الغردقة",
      "distanceKm": 460,
      "source": "طريق الزعفرانة - الغردقة"
    },
    {
      "id": "cairo-sharm",
      "fromCityAr": "القاهرة",
      "toCityAr": "شرم الشيخ",
      "distanceKm": 500,
      "source": "طريق نفق الشهيد أحمد حمدي - عيون موسى"
    },
    {
      "id": "cairo-luxor",
      "fromCityAr": "القاهرة",
      "toCityAr": "الأقصر",
      "distanceKm": 670,
      "source": "طريق الصعيد الصحراوي الشرقي"
    },
    {
      "id": "cairo-aswan",
      "fromCityAr": "القاهرة",
      "toCityAr": "أسوان",
      "distanceKm": 880,
      "source": "طريق الصعيد الصحراوي الغربي"
    },
    {
      "id": "cairo-suez",
      "fromCityAr": "القاهرة",
      "toCityAr": "السويس",
      "distanceKm": 130,
      "source": "طريق القاهرة - السويس الحر"
    }
  ]
};

export default COUNTRY_DATA_EG;
