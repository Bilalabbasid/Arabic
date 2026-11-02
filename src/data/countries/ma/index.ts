import { CountryData } from '../types';

export const COUNTRY_DATA_MA: CountryData = {
  "countryCode": "ma",
  "basics": {
    "nameAr": "المملكة المغربية",
    "nameEn": "Morocco",
    "locale": "ar-MA",
    "currency": {
      "code": "MAD",
      "nameAr": "درهم مغربي",
      "symbolAr": "د.م.",
      "minorUnits": 2
    },
    "weekendDays": [
      6,
      0
    ],
    "officialCalendar": "gregorian",
    "localTerms": {
      "vehicleRegistration": "البطاقة الرمادية (Carte Grise)",
      "diesel": "غازوال (Gasoil / Diesel)",
      "periodicInspection": "الفحص التقني للسيارات (Visite Technique)",
      "drivingLicence": "رخصة السياقة (Permis de Conduire)"
    }
  },
  "vat": {
    "status": "verified",
    "value": {
      "standardRate": 20,
      "reducedRates": [
        7,
        10,
        14
      ],
      "zeroRatedItems": [
        "السلع والخدمات المصدرة للخارج",
        "المعدات الفلاحية المحددة في المدونة"
      ],
      "exemptItems": [
        "الخبز والحليب والسكر والمنتجات غير المصنعة",
        "الخدمات المصرفية للمعاملات غير المفوترة بصراحة",
        "العقارات السكنية غير المهنية بعد أول تسليم"
      ]
    },
    "law": "المدونة العامة للضرائب (Code Général des Impôts) - الباب المتعلق بالضريبة على القيمة المضافة",
    "authority": "المديرية العامة للضرائب المغربية (DGI)",
    "sourceUrl": "https://www.tax.gov.ma",
    "validFrom": "2024-01-01",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "incomeTax": {
    "status": "verified",
    "value": {
      "hasPersonalIncomeTax": true,
      "standardDeduction": 30000,
      "brackets": [
        {
          "thresholdUpTo": 30000,
          "rate": 0
        },
        {
          "thresholdUpTo": 50000,
          "rate": 10
        },
        {
          "thresholdUpTo": 60000,
          "rate": 20
        },
        {
          "thresholdUpTo": 80000,
          "rate": 30
        },
        {
          "thresholdUpTo": 180000,
          "rate": 34
        },
        {
          "rate": 38
        }
      ]
    },
    "law": "المدونة العامة للضرائب (الضريبة على الدخل - فئة الأجور والدخول المعتبرة في حكمها)",
    "authority": "المديرية العامة للضرائب (DGI)",
    "sourceUrl": "https://www.tax.gov.ma",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "socialInsurance": {
    "status": "verified",
    "value": {
      "nationalEmployeeRate": 6.74,
      "nationalEmployerRate": 21.09,
      "expatEmployeeRate": 6.74,
      "expatEmployerRate": 21.09,
      "maxMonthlyWageCap": 6000,
      "agencyNameAr": "الصندوق الوطني للضمان الاجتماعي",
      "agencyAcronym": "CNSS"
    },
    "law": "ظهير شريف رقم 1-72-184 بمثابة نظام الضمان الاجتماعي ومدونة التغطية الصحية الأساسية (القانون 65-00)",
    "authority": "الصندوق الوطني للضمان الاجتماعي (CNSS)",
    "sourceUrl": "https://www.cnss.ma",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "endOfService": {
    "status": "verified",
    "value": {
      "standardFormula": "96 ساعة أجر عن كل سنة من السنوات الخمس الأولى، و144 ساعة للسنوات (6-10)، و192 ساعة للسنوات (11-15)، و240 ساعة لما فوق 15 سنة.",
      "firstTierYears": 5,
      "firstTierFraction": 0.46153846153846156,
      "secondTierFraction": 0.6923076923076923,
      "resignationScale": [
        {
          "minYears": 1,
          "fractionOfAward": 1
        }
      ],
      "wageBasis": "gross_wage_with_fixed_allowances",
      "articles": "المواد 52 و 53 من القانون رقم 65.99 بمثابة مدونة الشغل المغربية"
    },
    "law": "مدونة الشغل المغربية (القانون رقم 65.99)",
    "authority": "وزارة الإدماج الاقتصادي والمقاولة الصغرى والتشغيل والكفاءات",
    "sourceUrl": "https://www.emploi.gov.ma",
    "validFrom": "2004-06-08",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "consumerFinance": {
    "status": "verified",
    "value": {
      "dbrCapPercent": 45,
      "dbrCapPensionerPercent": 35,
      "maxAutoFinanceTenorYears": 7,
      "quoteConvention": "reducing",
      "islamicFinanceTerm": "تمويل مرابحة السيارات (المالية التشاركية)"
    },
    "law": "دورية والي بنك المغرب حول القروض الاستهلاكية والتمويلات التشاركية الممنوحة للأفراد",
    "authority": "بنك المغرب (Bank Al-Maghrib)",
    "sourceUrl": "https://www.bkam.ma",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "fuel": {
    "status": "no_official_source",
    "note": "أسعار الوقود في المغرب محررة بالكامل منذ أواخر عام 2015؛ وتحددها شركات التوزيع ومحطات الوقود الخاصة (أفريقيا، شل، طوطال، وينكسو) بحرية وفق أسعار النفط العالمية وتكاليف النقل.",
    "authority": "وزارة الانتقال الطاقي والتنمية المستدامة / مجلس المنافسة",
    "sourceUrl": "https://www.mted.gov.ma",
    "checkedAt": "2026-11-01",
    "value": {
      "pricingModel": "liberalised",
      "grades": {
        "sansPlomb": {
          "nameAr": "بنزين بدون رصاص (Sans Plomb)",
          "pricePerLiter": 14.5,
          "unitAr": "د.م./لتر"
        },
        "gasoil": {
          "nameAr": "غازوال (ديزل ممتاز)",
          "pricePerLiter": 12.8,
          "unitAr": "د.م./لتر"
        }
      }
    }
  },
  "electricity": {
    "status": "verified",
    "value": {
      "residentialTiers": [
        {
          "minKwh": 1,
          "maxKwh": 100,
          "ratePerKwh": 0.901
        },
        {
          "minKwh": 101,
          "maxKwh": 150,
          "ratePerKwh": 1.0732
        },
        {
          "minKwh": 151,
          "maxKwh": 200,
          "ratePerKwh": 1.0732
        },
        {
          "minKwh": 201,
          "maxKwh": 300,
          "ratePerKwh": 1.1676
        },
        {
          "minKwh": 301,
          "maxKwh": 500,
          "ratePerKwh": 1.3817
        },
        {
          "minKwh": 501,
          "ratePerKwh": 1.5958
        }
      ],
      "meterServiceFeeMonthly": 15,
      "vatApplies": true
    },
    "law": "تعرفة بيع الطاقة الكهربائية المنشورة بالجريدة الرسمية والمنظمة للمكتب الوطني للكهرباء",
    "authority": "المكتب الوطني للكهرباء والماء الصالح للشرب (ONEE)",
    "sourceUrl": "http://www.one.org.ma",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "vehicle": {
    "status": "verified",
    "value": {
      "registrationFeeAnnual": 700,
      "periodicInspectionFee": 300,
      "drivingLicenceRenewal10Yr": 400,
      "customsDutyPercent": 2.5,
      "customsVatPercent": 20,
      "maxImportAgeYears": 5,
      "trafficFines": [
        {
          "categoryAr": "المخالفات من الدرجة الأولى",
          "violationAr": "تجاوز الإشارة الحمراء أو السير في الاتجاه الممنوع",
          "minFine": 700,
          "maxFine": 700
        },
        {
          "categoryAr": "المخالفات من الدرجة الثانية",
          "violationAr": "تجاوز السرعة بأكثر من 20 إلى 30 كم/س وعدم ربط حزام الأمان",
          "minFine": 500,
          "maxFine": 500
        },
        {
          "categoryAr": "المخالفات من الدرجة الثالثة",
          "violationAr": "استعمال الهاتف باليد أثناء السياقة والتوقف غير القانوني",
          "minFine": 300,
          "maxFine": 300
        }
      ]
    },
    "law": "القانون رقم 52.05 بمثابة مدونة السير على الطرقات المعدل بالقانون 116.14",
    "authority": "الوكالة الوطنية للسلامة الطرقية (نارسا NARSA)",
    "sourceUrl": "https://narsa.ma",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "zakat": {
    "status": "verified",
    "value": {
      "authorityName": "وزارة الأوقاف والشؤون الإسلامية المغربية",
      "isMandatoryForCompanies": false,
      "individualNoteAr": "زكاة المال ركن ديني إسلامي بمعدل 2.5% حولياً عند بلوغ نصاب الذهب الشرعي."
    },
    "law": "الظهير الشريف رقم 1-03-193 في شأن اختصاصات وتنظيم وزارة الأوقاف والشؤون الإسلامية",
    "authority": "وزارة الأوقاف والشؤون الإسلامية",
    "sourceUrl": "https://www.habous.gov.ma",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "routes": [
    {
      "id": "casablanca-rabat",
      "fromCityAr": "الدار البيضاء",
      "toCityAr": "الرباط",
      "distanceKm": 87,
      "source": "الطريق السيار A1 الدار البيضاء - الرباط"
    },
    {
      "id": "casablanca-marrakech",
      "fromCityAr": "الدار البيضاء",
      "toCityAr": "مراكش",
      "distanceKm": 240,
      "source": "الطريق السيار A3 الدار البيضاء - مراكش"
    },
    {
      "id": "casablanca-tangier",
      "fromCityAr": "الدار البيضاء",
      "toCityAr": "طنجة",
      "distanceKm": 340,
      "source": "الطريق السيار A1 الرباط - طنجة"
    },
    {
      "id": "rabat-fes",
      "fromCityAr": "الرباط",
      "toCityAr": "فاس",
      "distanceKm": 200,
      "source": "الطريق السيار A2 الرباط - فاس - وجدة"
    },
    {
      "id": "marrakech-agadir",
      "fromCityAr": "مراكش",
      "toCityAr": "أكادير",
      "distanceKm": 260,
      "source": "الطريق السيار A3 مراكش - أكادير"
    }
  ]
};

export default COUNTRY_DATA_MA;
