import { CountryData } from '../types';

export const COUNTRY_DATA_SD: CountryData = {
  "countryCode": "sd",
  "basics": {
    "nameAr": "جمهورية السودان",
    "nameEn": "Sudan",
    "locale": "ar-SD",
    "currency": {
      "code": "SDG",
      "nameAr": "جنيه سوداني",
      "symbolAr": "ج.س",
      "minorUnits": 2
    },
    "weekendDays": [
      5,
      6
    ],
    "officialCalendar": "gregorian",
    "localTerms": {
      "vehicleRegistration": "شهادة بحث المركبة (ترخيص وتسيير)",
      "diesel": "جازولين (ديزل)",
      "periodicInspection": "الفحص الآلي لترخيص المرور",
      "drivingLicence": "رخصة قيادة"
    }
  },
  "vat": {
    "status": "verified",
    "value": {
      "standardRate": 17,
      "reducedRates": [
        0
      ],
      "zeroRatedItems": [
        "الصادرات إلى خارج السودان"
      ],
      "exemptItems": [
        "السلع الغذائية غير المصنعة",
        "الخدمات المصرفية والنقدية",
        "الأدوية البشرية والبيطرية"
      ]
    },
    "law": "قانون ضريبة القيمة المضافة لسنة 1999 وتعديلاته بقوانين الموازنة المالية",
    "authority": "ديوان الضرائب السوداني",
    "sourceUrl": "http://www.tax.gov.sd",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "incomeTax": {
    "status": "verified",
    "value": {
      "hasPersonalIncomeTax": true,
      "brackets": [
        {
          "thresholdUpTo": 600000,
          "rate": 0
        },
        {
          "thresholdUpTo": 1200000,
          "rate": 5
        },
        {
          "thresholdUpTo": 2400000,
          "rate": 10
        },
        {
          "rate": 15
        }
      ]
    },
    "law": "قانون ضريبة الدخل الشخصي لسنة 1986 وتعديلاته",
    "authority": "ديوان الضرائب السوداني",
    "sourceUrl": "http://www.tax.gov.sd",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "socialInsurance": {
    "status": "verified",
    "value": {
      "nationalEmployeeRate": 8,
      "nationalEmployerRate": 17,
      "expatEmployeeRate": 0,
      "expatEmployerRate": 2,
      "agencyNameAr": "الصندوق القومي للتأمينات الاجتماعية",
      "agencyAcronym": "NSIF Sudan"
    },
    "law": "قانون التأمين الاجتماعي لسنة 1990 وتعديلاته",
    "authority": "الصندوق القومي للتأمينات الاجتماعية",
    "sourceUrl": "http://www.nsif.gov.sd",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "endOfService": {
    "status": "verified",
    "value": {
      "standardFormula": "أجر شهر عن كل سنة من السنوات العشر الأولى، وشهر ونصف عن السنوات من 11-15، وشهران عن كل سنة تزيد عن ذلك.",
      "firstTierYears": 10,
      "firstTierFraction": 1,
      "secondTierFraction": 1.5,
      "resignationScale": [
        {
          "minYears": 1,
          "fractionOfAward": 1
        }
      ],
      "wageBasis": "gross_wage_with_fixed_allowances",
      "articles": "المادة 57 من قانون العمل السوداني لسنة 1997"
    },
    "law": "قانون العمل السوداني لسنة 1997",
    "authority": "وزارة التنمية الاجتماعية والعمل",
    "sourceUrl": "http://www.mols.gov.sd",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "consumerFinance": {
    "status": "verified",
    "value": {
      "dbrCapPercent": 35,
      "maxAutoFinanceTenorYears": 5,
      "quoteConvention": "flat",
      "islamicFinanceTerm": "تمويل مرابحة إسلامية"
    },
    "law": "منشورات وضوابط التمويل الأصغر والاستهلاكي الصادرة عن بنك السودان المركزي",
    "authority": "بنك السودان المركزي (CBOS)",
    "sourceUrl": "https://cbos.gov.sd",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "fuel": {
    "status": "verified",
    "value": {
      "pricingModel": "monthly_adjusted",
      "grades": {
        "gasoline": {
          "nameAr": "بنزين (حر)",
          "pricePerLiter": 1550,
          "unitAr": "ج.س/لتر"
        },
        "diesel": {
          "nameAr": "جازولين (ديزل)",
          "pricePerLiter": 1450,
          "unitAr": "ج.س/لتر"
        }
      },
      "updateCadenceDays": 30
    },
    "law": "الأسعار الرسمية المعتمدة الصادرة عن وزارة الطاقة والنفط السودانية",
    "authority": "وزارة الطاقة والنفط السودانية / المؤسسة السودانية للنفط",
    "sourceUrl": "http://www.mop.gov.sd",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 35
  },
  "electricity": {
    "status": "verified",
    "value": {
      "residentialTiers": [
        {
          "minKwh": 1,
          "maxKwh": 100,
          "ratePerKwh": 26
        },
        {
          "minKwh": 101,
          "maxKwh": 200,
          "ratePerKwh": 38
        },
        {
          "minKwh": 201,
          "maxKwh": 400,
          "ratePerKwh": 75
        },
        {
          "minKwh": 401,
          "ratePerKwh": 130
        }
      ],
      "meterServiceFeeMonthly": 500,
      "vatApplies": false
    },
    "law": "تعرفة بيع الكهرباء المعتمدة من الشركة السودانية لتوزيع الكهرباء",
    "authority": "الشركة السودانية لتوزيع الكهرباء المحدودة (SEDC)",
    "sourceUrl": "http://www.sedc.com.sd",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "vehicle": {
    "status": "verified",
    "value": {
      "registrationFeeAnnual": 35000,
      "periodicInspectionFee": 15000,
      "drivingLicenceRenewal10Yr": 45000,
      "customsDutyPercent": 25,
      "customsVatPercent": 17,
      "trafficFines": [
        {
          "categoryAr": "الإشارات المرورية",
          "violationAr": "تخطي الإشارة الحمراء",
          "minFine": 20000,
          "maxFine": 40000
        },
        {
          "categoryAr": "السرعة الزائدة",
          "violationAr": "القيادة بسرعة زائدة عن السرعة القانونية",
          "minFine": 15000,
          "maxFine": 30000
        },
        {
          "categoryAr": "السلامة العامة",
          "violationAr": "عدم ربط حزام الأمان",
          "minFine": 10000,
          "maxFine": 10000
        }
      ]
    },
    "law": "قانون حركة المرور لسنة 2010 ولائحته التنفيذية",
    "authority": "وزارة الداخلية - الإدارة العامة للمرور",
    "sourceUrl": "http://traffic.gov.sd",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 365
  },
  "zakat": {
    "status": "verified",
    "value": {
      "authorityName": "ديوان الزكاة السوداني",
      "isMandatoryForCompanies": true,
      "individualNoteAr": "الزكاة جباية شرعية وقانونية بنسبة 2.5% على الأموال النقدية والتجارية."
    },
    "law": "قانون ديوان الزكاة لسنة 2001",
    "authority": "ديوان الزكاة الاتحادي",
    "sourceUrl": "http://www.zakat.gov.sd",
    "checkedAt": "2026-11-01",
    "staleAfterDays": 400
  },
  "routes": [
    {
      "id": "khartoum-portsudan",
      "fromCityAr": "الخرطوم",
      "toCityAr": "بورتسودان",
      "distanceKm": 800,
      "source": "طريق التحدي - طريق بورتسودan القومي"
    },
    {
      "id": "khartoum-wadmadani",
      "fromCityAr": "الخرطوم",
      "toCityAr": "ود مدني",
      "distanceKm": 180,
      "source": "طريق الخرطوم - مدني الشرقي والغربي"
    },
    {
      "id": "khartoum-atbara",
      "fromCityAr": "الخرطوم",
      "toCityAr": "عطبرة",
      "distanceKm": 310,
      "source": "طريق التحدي الخرطوم عطبرة"
    },
    {
      "id": "khartoum-kassala",
      "fromCityAr": "الخرطوم",
      "toCityAr": "كسلا",
      "distanceKm": 600,
      "source": "طريق الخرطوم - مدني - القضارف - كسلا"
    },
    {
      "id": "khartoum-kosti",
      "fromCityAr": "الخرطوم",
      "toCityAr": "كوستي",
      "distanceKm": 320,
      "source": "طريق الخرطوم كوستي القومي"
    }
  ]
};

export default COUNTRY_DATA_SD;
