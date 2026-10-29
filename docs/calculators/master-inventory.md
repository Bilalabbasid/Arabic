# Master Calculator Inventory — lsayartk.com (200+ Calculators)

This document establishes the master inventory of 200+ planned and implemented calculators for **lsayartk.com**, classified across the 18 platform categories established in Prompt 1.

## Status Definitions
- `PLANNED`: Documented in inventory; mathematical model and specifications defined.
- `IMPLEMENTED`: TypeScript calculation engine and interface inputs implemented.
- `SOURCE_REQUIRED`: Regulated calculator requiring official legal/tariff documentation.
- `SOURCE_REVIEWED`: Official sources identified and cross-checked against statutory references.
- `FORMULA_TESTED`: Unit and boundary tests verified against independent benchmark calculations.
- `APPROVED`: Peer/editorial review completed and signed off for regulatory compliance.
- `PUBLISHED`: Prerendered and active on public web routes.
- `REVIEW_REQUIRED`: Scheduled or triggered for regulatory re-audit.
- `DISABLED`: Suspended due to statutory amendments or pending verification.

---

## 1. Finance & Savings (المالية والادخار) — 18 Calculators

| # | Calculator Name | Purpose | Key Inputs | Key Outputs | Country Mode | Implementation Complexity | Status |
|---|---|---|---|---|---|---|---|
| 1 | Compound Interest (حاسبة الفائدة والعائد المركب) | Calculates asset growth over time with reinvested yields | Initial deposit, monthly addition, annual rate, frequency, years | Future value, total contributions, total interest | UNIVERSAL | Medium | PUBLISHED |
| 2 | Savings Target (حاسبة هدف الادخار) | Calculates required monthly savings to achieve financial goal | Target amount, current savings, target date/months, expected yield | Required monthly savings, total interest generated | UNIVERSAL | Low | PLANNED |
| 3 | Inflation & Purchasing Power (حاسبة التضخم وتآكل القوة الشرائية) | Calculates inflation erosion on cash value over time | Present amount, inflation rate %, duration in years | Future equivalent purchasing power, total loss | COUNTRY_CONFIGURABLE | Low | PLANNED |
| 4 | Return on Investment - ROI (حاسبة العائد على الاستثمار) | Calculates percentage gain/loss and annualized ROI | Initial investment, final return/sale value, holding duration | Absolute profit/loss, ROI %, Annualized ROI (CAGR) | UNIVERSAL | Low | PLANNED |
| 5 | Emergency Fund Sizing (حاسبة صندوق الطوارئ) | Calculates safety reserve needed based on living expenses | Monthly living expenses, dependent count, stability level (3-12 mo) | Recommended fund size, minimum survival tier | COUNTRY_CONFIGURABLE | Low | PLANNED |
| 6 | Retirement Nest Egg (حاسبة تقاعد واستقلال مالي FIRE) | Calculates capital needed to retire based on the 4% rule | Desired monthly retirement income, current age, target age, inflation | Required capital, monthly savings needed | UNIVERSAL | High | PLANNED |
| 7 | Lump Sum vs Systematic Investment (حاسبة الاستثمار المقطوع مقابل الدوري) | Compares dollar-cost averaging vs lump-sum deployment | Total capital, monthly installment, expected return, horizon | Final balance comparison, volatility risk estimate | UNIVERSAL | Medium | PLANNED |
| 8 | Fixed Deposit / Term Yield (حاسبة الودائع لأجل والمرابحة الزمنية) | Calculates bank deposit profit across tenors | Deposit amount, profit rate p.a., term (months), payout schedule | Net profit, total at maturity, effective APR | COUNTRY_CONFIGURABLE | Low | PLANNED |
| 9 | Gold Investment Profit/Loss (حاسبة أرباح وخسائر سبائك الذهب) | Calculates return on physical gold bullion after craft fees | Grams purchased, buy price/g, sell price/g, workmanship fee | Net profit/loss, percentage return, breakeven price/g | UNIVERSAL | Low | PLANNED |
| 10 | Stock Dividend Yield (حاسبة توزيعات الأرباح للأسهم) | Calculates annual cash dividend yield and reinvestment | Share count, share purchase price, annual dividend per share | Total cash dividend, dividend yield %, payout frequency | UNIVERSAL | Low | PLANNED |
| 11 | Sukuk & Bond Yield to Maturity (حاسبة عوائد الصكوك والسندات) | Calculates annualized return on fixed-income instruments | Par value, purchase price, coupon rate, coupon frequency, maturity | Current yield, Yield to Maturity (YTM) | UNIVERSAL | High | PLANNED |
| 12 | Safe Withdrawal Rate - SWR (حاسبة معدل السحب الآمن للتقاعد) | Simulates portfolio longevity across varied withdrawal rates | Portfolio balance, annual withdrawal amount, asset allocation | Portfolio longevity in years, depletion probability | UNIVERSAL | High | PLANNED |
| 13 | Net Present Value - NPV (حاسبة صافي القيمة الحالية) | Discounts future project cash flows to evaluate feasibility | Discount rate, initial outlay, periodic future cash flows | Net Present Value (NPV), project profitability signal | UNIVERSAL | Medium | PLANNED |
| 14 | Internal Rate of Return - IRR (حاسبة معدل العائد الداخلي) | Calculates internal discount rate that yields zero NPV | Cash flow stream (outlay followed by periodic inflows) | Exact IRR percentage | UNIVERSAL | High | PLANNED |
| 15 | Rule of 72 Doubling Time (حاسبة مضاعفة رأس المال - قاعدة 72) | Calculates time needed to double capital at given return rate | Annual expected return rate % | Years needed to double investment | UNIVERSAL | Low | PLANNED |
| 16 | Opportunity Cost (حاسبة تكلفة الفرصة البديلة) | Compares chosen spending vs investing that amount in markets | Expense amount, investment return rate, time horizon | Forgone wealth potential over time | UNIVERSAL | Low | PLANNED |
| 17 | Multi-Currency Purchasing Power (حاسبة مقارنة القوة الشرائية بين العملات) | Evaluates relative purchasing power across Arab currencies | Amount in base currency, target currency, relative price index | Purchasing parity equivalent, cost of living adjustment | COUNTRY_CONFIGURABLE | Medium | PLANNED |
| 18 | Cash Flow Runway (حاسبة فترة الأمان المالي والسيولة) | Calculates months of financial runway based on burn rate | Total liquid assets, monthly mandatory expenses | Runway in months, depletion date | UNIVERSAL | Low | PLANNED |

---

## 2. Loans & Installments (القروض والتقسيط) — 16 Calculators

| # | Calculator Name | Purpose | Key Inputs | Key Outputs | Country Mode | Implementation Complexity | Status |
|---|---|---|---|---|---|---|---|
| 19 | Personal Loan Amortization (حاسبة القروض والتمويل الشخصي والأقساط) | Calculates monthly installments and amortization schedule | Principal, annual APR, tenor, rate type (reducing vs flat) | Monthly payment, total interest, total repayment, schedule | COUNTRY_CONFIGURABLE | Medium | PUBLISHED |
| 20 | Auto Finance & Leasing (حاسبة تمويل وتأجير السيارات التمويلي) | Calculates car loan installments with down payment & balloon | Car price, down payment, balloon payment %, APR, years | Monthly installment, total financing cost | COUNTRY_CONFIGURABLE | Medium | PLANNED |
| 21 | Early Loan Settlement (حاسبة السداد المبكر للقروض) | Calculates early settlement discount and remaining principal | Original loan, paid months, APR, early settlement penalty terms | Net payoff amount, interest savings, penalty fee | COUNTRY_REGULATED | High | PLANNED |
| 22 | Debt-to-Income / Burden Ratio (حاسبة نسبة التحمل والاستقطاع الشهري) | Calculates total monthly debt burden against net income | Net monthly salary, personal loan installment, auto installment, credit card | Debt burden ratio %, maximum allowable borrowing ceiling | COUNTRY_REGULATED | Medium | PLANNED |
| 23 | Mortgage Amortization (حاسبة التمويل العقاري السكني) | Calculates residential home mortgage payments & insurance | Property price, down payment (10-30%), tenor (10-30 yrs), APR | Monthly payment, property insurance cost, total interest | COUNTRY_REGULATED | High | PLANNED |
| 24 | Fixed vs Variable Mortgage (حاسبة مقارنة الفائدة الثابتة بالمتغيرة للرهن العقاري) | Compares fixed-rate stability vs variable benchmark (SAIBOR/EIBOR/Corridor) | Loan amount, fixed rate, variable margin + benchmark, stress test delta | Monthly payments under rising/stable rates, total cost | COUNTRY_REGULATED | High | PLANNED |
| 25 | Buy Now Pay Later - BNPL (حاسبة التقسيط بدون فوائد تابي وتمارا) | Calculates installment splits and penalty cost if overdue | Purchase amount, installment count (3-4 split), on-time status | Split per installment, late fee impact, true APR | COUNTRY_CONFIGURABLE | Low | PLANNED |
| 26 | Credit Card Minimum Payment (حاسبة الحد الأدنى لبطاقة الائتمان) | Illustrates interest trap of paying only minimum card balance | Outstanding balance, monthly APR/interest (1.5-2.5%), min % | Months to debt freedom, total finance charges | UNIVERSAL | Medium | PLANNED |
| 27 | Loan Refinancing / Top-up (حاسبة إعادة التمويل وتوحيد الديون) | Evaluates savings from consolidating multiple loans into one | Existing loans balances and rates, new consolidated APR & term | New monthly payment, net interest savings/increase | COUNTRY_CONFIGURABLE | Medium | PLANNED |
| 28 | Flat to Reducing APR Converter (محول الفائدة الثابتة إلى متناقصة) | Converts deceptive flat financing rates into true central bank APR | Flat rate %, loan duration in years | Equivalent APR (reducing balance rate) | UNIVERSAL | Medium | PLANNED |
| 29 | Extra Installment Prepayment (حاسبة تسريع سداد القرض بدفعة إضافية) | Calculates tenure reduction by adding recurring extra amount | Current balance, regular installment, extra monthly amount | Months saved, interest saved, new payoff date | UNIVERSAL | Medium | PLANNED |
| 30 | Mortgage Affordability by Salary (حاسبة أقصى تمويل عقاري متاح براتبك) | Estimates maximum property purchase budget based on income | Monthly income, other debt obligations, age, down payment savings | Maximum loan eligibility, maximum home price | COUNTRY_REGULATED | Medium | PLANNED |
| 31 | Grace Period Finance (حاسبة فترة السماح وتأجيل الأقساط) | Calculates accrued interest during payment holiday/grace period | Principal, grace period months, APR, capitalization mode | Capitalized balance, increased future installment | COUNTRY_CONFIGURABLE | Medium | PLANNED |
| 32 | Student / Education Financing (حاسبة تمويل التعليم والرسوم الجامعية) | Calculates installment plans for school and university fees | Total tuition, tenure in months, zero-interest or administrative fee | Monthly tuition payment, fee percentage | COUNTRY_CONFIGURABLE | Low | PLANNED |
| 33 | Commercial Equipment Lease (حاسبة تأجير المعدات والآلات التجارية) | Calculates operating vs capital lease costs for businesses | Equipment cost, lease term, residual value, finance charge | Periodic lease payment, buyout price | UNIVERSAL | Medium | PLANNED |
| 34 | Bridge Loan Cost (حاسبة القرض التجسيري قصير الأجل) | Calculates interim financing cost between property buy and sell | Borrowed sum, term in months, monthly financing rate | Total interim cost, daily finance rate | UNIVERSAL | Low | PLANNED |

---

## 3. Salary & Employment (الرواتب والعمل) — 18 Calculators

| # | Calculator Name | Purpose | Key Inputs | Key Outputs | Country Mode | Implementation Complexity | Status |
|---|---|---|---|---|---|---|---|
| 35 | End of Service Gratuity (حاسبة مكافأة نهاية الخدمة للقطاع الخاص) | Calculates statutory severance pay under labor codes | Basic wage, service years/months/days, termination mode, country | Gratuity amount, entitlement ratio, legal basis citation | COUNTRY_REGULATED | High | PUBLISHED |
| 36 | Hourly Wage from Monthly Salary (حاسبة تحويل الراتب الشهري إلى أجر الساعة) | Calculates effective hourly rate based on weekly work hours | Monthly salary, weekly work hours (40 vs 48 hrs) | Hourly rate, daily rate, minute rate | COUNTRY_CONFIGURABLE | Low | PLANNED |
| 37 | Overtime Pay (حاسبة العمل الإضافي وساعات الأوفر تايم) | Calculates legal overtime wage for normal & holiday hours | Hourly rate, normal overtime hours, weekend/holiday hours | Overtime pay, statutory multiplier (1.5x, 2.0x) | COUNTRY_REGULATED | Medium | PLANNED |
| 38 | Annual Leave Pay & Encashment (حاسبة رصيد وبدل الإجازات السنوية) | Calculates cash payout for unused vacation days upon departure | Last wage, unused leave days count, work days per month basis | Cash compensation for leave balance | COUNTRY_REGULATED | Medium | PLANNED |
| 39 | Gross to Net Salary - Saudi GOSI (حاسبة صافي الراتب والتأمينات الاجتماعية بالسعودية) | Calculates employee GOSI deduction (SANED & Pension) | Basic wage, housing allowance, nationality (Saudi vs expat) | Net take-home salary, employee GOSI (9.75%), employer GOSI (11.75%) | COUNTRY_REGULATED | Medium | PLANNED |
| 40 | Gross to Net Salary - Egypt (حاسبة صافي المرتب وضريبة كسب العمل في مصر) | Calculates Egyptian salary after social insurance & bracketed income tax | Gross monthly salary, functional exemptions | Net salary, social insurance, monthly income tax | COUNTRY_REGULATED | High | PLANNED |
| 41 | Notice Period Compensation (حاسبة مهلة الإشعار وبدل الإنهاء المفاجئ) | Calculates wage owed for unserved notice period days | Monthly wage, contractual notice days (30-90), days served | Compensation amount owed by or to employee | COUNTRY_REGULATED | Medium | PLANNED |
| 42 | Part-Time Pro-Rata Salary (حاسبة الراتب للدوام الجزئي) | Computes proportionate compensation for part-time schedules | Full-time benchmark salary, part-time weekly hours vs full-time | Pro-rated monthly salary | UNIVERSAL | Low | PLANNED |
| 43 | Total Employee Cost to Employer (حاسبة التكلفة الإجمالية للموظف على المنشأة) | Computes full overhead of employing staff | Basic salary, housing, transport, medical insurance, visa, GOSI | Total monthly and annual cost to company | COUNTRY_REGULATED | Medium | PLANNED |
| 44 | Salary Increment / Raise (حاسبة نسبة ومبلغ زيادة الراتب) | Calculates new wage and impact of percentage/fixed raises | Current salary, raise percentage or fixed amount | New salary, monthly difference, annual gain | UNIVERSAL | Low | PLANNED |
| 45 | Probation Period Dates (حاسبة فترة التجربة وتواريخ الانتهاء) | Calculates exact end date of statutory 90-180 days probation | Contract start date, agreed probation days (90/180), leave interruptions | Last day of probation, renewal deadline | COUNTRY_REGULATED | Medium | PLANNED |
| 46 | Sick Leave Wage Deduction (حاسبة خصم الإجازة المرضية وتدرج الراتب) | Calculates wage percentage owed across statutory sick leave tiers | Salary, sick leave days count, statutory tier (full pay, half, unpaid) | Net payable salary during illness | COUNTRY_REGULATED | Medium | PLANNED |
| 47 | Maternity Leave Pay (حاسبة إجازة الأمومة والوضع للمرأة العاملة) | Calculates statutory paid maternity leave allowance | Monthly salary, maternity leave days count (e.g. 70 days SA) | Full maternity wage owed, resumption date | COUNTRY_REGULATED | Medium | PLANNED |
| 48 | Daily Per Diem & Travel Allowance (حاسبة انتداب العمل والبدل اليومي) | Computes travel per diem based on destination and grade | Days traveled, daily allowance tier, internal vs external | Total per diem compensation | COUNTRY_CONFIGURABLE | Low | PLANNED |
| 49 | Freelancer Hourly Rate Benchmark (حاسبة تحديد سعر الساعة للمستقلين) | Calculates minimum hourly billing rate to match salary & cover unpaid days | Desired annual income, billable hours per week, non-billable time, overhead | Target hourly billing rate | UNIVERSAL | Medium | PLANNED |
| 50 | Hajj / Umrah Leave Eligibility (حاسبة إجازة الحج مدفوعة الأجر) | Verifies eligibility and entitlement for paid Hajj leave | Continuous service duration, prior Hajj leave taken | Eligible days (10-15 days), paid allowance | COUNTRY_REGULATED | Low | PLANNED |
| 51 | Unpaid Leave Salary Impact (حاسبة تأثير الإجازة بدون راتب على الأجر) | Calculates exact daily wage deductions for unpaid absence | Monthly salary, month calendar days vs working days basis, absent days | Deducted amount, adjusted net payout | COUNTRY_REGULATED | Low | PLANNED |
| 52 | Commission & Bonus Incentive (حاسبة عمولات المبيعات والمكافآت التقديرية) | Calculates sales commission based on tiered threshold brackets | Target, actual sales achieved, tiered commission percentage | Commission payout, achievement percentage | UNIVERSAL | Medium | PLANNED |

---

## 4. Taxation & Zakat (الضرائب والزكاة) — 14 Calculators

| # | Calculator Name | Purpose | Key Inputs | Key Outputs | Country Mode | Implementation Complexity | Status |
|---|---|---|---|---|---|---|---|
| 53 | VAT Inclusive & Exclusive (حاسبة ضريبة القيمة المضافة) | Calculates VAT addition or extraction across Arab tax regimes | Base amount, calculation type (add/extract), country selection | Tax amount, net, gross, statutory rate | COUNTRY_CONFIGURABLE | Low | PUBLISHED |
| 54 | Zakat on Wealth & Commercial Assets (حاسبة زكاة المال وعروض التجارة) | Calculates zakat obligation with gold nisab threshold verification | Cash, trade inventory, receivables, debts, gold price/g, calendar | Zakat due, nisab status, net zakatable wealth | UNIVERSAL | Medium | PUBLISHED |
| 55 | Real Estate Transaction Tax - RETT (حاسبة ضريبة التصرفات العقارية) | Calculates 5% RETT in Saudi Arabia with first-home exempt tiers | Property sale price, transaction category, first-home buyer status | RETT tax due, exempt bracket, net payable | COUNTRY_REGULATED | Medium | PLANNED |
| 56 | UAE Corporate Tax (حاسبة ضريبة الشركات في الإمارات 9%) | Calculates corporate tax liability under FTA rules | Net taxable accounting profit, small business relief threshold (375k AED) | Corporate tax due, effective tax rate | COUNTRY_REGULATED | High | PLANNED |
| 57 | Zakat on Public Shares (حاسبة زكاة الأسهم والمحافظ الاستثمارية) | Calculates zakat on investment portfolio (speculation vs dividend) | Stock portfolio value, purpose (trading vs long-term investment) | Zakat due, deduction method | UNIVERSAL | Medium | PLANNED |
| 58 | Withholding Tax on Non-Residents (حاسبة ضريبة الاستقطاع لغير المقيمين) | Computes withholding tax on international services and royalties | Service contract value, service nature (technical, royalties, interest) | Withholding tax amount, net payment to foreign vendor | COUNTRY_REGULATED | Medium | PLANNED |
| 59 | White Land Tax - Saudi WLT (حاسبة رسوم الأراضي البيضاء) | Estimates municipal white land fees on undeveloped urban plots | Land plot area (m²), urban location tier, estimated land value | Annual land tax levy | COUNTRY_REGULATED | Medium | PLANNED |
| 60 | Zakat on Agricultural Produce (حاسبة زكاة الحبوب والثمار والزروع) | Computes agricultural zakat (5% irrigated vs 10% rain-fed) | Harvest weight in kg, irrigation method (natural vs artificial) | Zakat in kg or equivalent cash value | UNIVERSAL | Low | PLANNED |
| 61 | Zakat on Livestock (حاسبة زكاة بهيمة الأنعام - إبل وبقر وغنم) | Determines statutory head count zakat on grazing herds | Head count of camels, cattle, sheep/goats, grazing status | Prescribed animal offering or monetary equivalent | UNIVERSAL | High | PLANNED |
| 62 | Egyptian Stamp Duty (حاسبة ضريبة الدمغة المصرفية والنسخ في مصر) | Calculates banking and transaction stamp duties | Transaction/credit facility amount, individual vs corporate | Applicable stamp duty fee | COUNTRY_REGULATED | Medium | PLANNED |
| 63 | Moroccan Corporate Tax (حاسبة الضريبة على الشركات في المغرب IS) | Computes progressive Moroccan IS rates across profit brackets | Net taxable profit in MAD | Tax liability, effective bracket | COUNTRY_REGULATED | High | PLANNED |
| 64 | Excise Tax / Sin Tax (حاسبة الضريبة الانتقائية على السلع الضارة) | Calculates 50% or 100% excise tax on tobacco, energy & sugary drinks | Retail price before excise, product category | Excise tax amount, retail shelf price | COUNTRY_REGULATED | Medium | PLANNED |
| 65 | Tourist / Municipality Tax (حاسبة رسوم البلدية والسياحة للفنادق) | Calculates hotel stay municipal and hospitality surcharges | Room charge per night, nights count, city municipality rate | Municipal fee, total booking invoice with VAT | COUNTRY_CONFIGURABLE | Low | PLANNED |
| 66 | Zakat on Gold & Jewelry (حاسبة زكاة الذهب والمجوهرات والحلي) | Calculates zakat on gold stored for savings vs personal adornment | Grams of 18k, 21k, 22k, 24k gold, usage intent, gold spot price | Total pure gold equivalent, nisab pass, zakat due | UNIVERSAL | Medium | PLANNED |

---

## 5. Cars & Transportation (السيارات والنقل) — 20 Calculators

| # | Calculator Name | Purpose | Key Inputs | Key Outputs | Country Mode | Implementation Complexity | Status |
|---|---|---|---|---|---|---|---|
| 67 | Trip Fuel Cost & Consumption (حاسبة تكلفة الوقود واستهلاك البنزين) | Calculates trip fuel volume and cost using local country tariffs | Distance (km), fuel efficiency (L/100km), fuel type, country | Trip cost, liters needed, cost/km, monthly budget | COUNTRY_CONFIGURABLE | Low | PUBLISHED |
| 68 | Car Import Customs & Taxes (حاسبة جمارك وضريبة استيراد السيارات) | Calculates customs duty (5%) and VAT on imported vehicles | Car CIF value, production year, engine capacity, country | Customs duty, import VAT, total port clearance fees | COUNTRY_REGULATED | High | PLANNED |
| 69 | Electric Vehicle Charging Cost (حاسبة تكلفة شحن السيارة الكهربائية EV) | Calculates battery charging cost at home vs public stations | Battery capacity (kWh), home electricity tariff, charger efficiency | Full charge cost, cost per 100 km, monthly charging expense | COUNTRY_CONFIGURABLE | Medium | PLANNED |
| 70 | EV vs Petrol Vehicle TCO (حاسبة مقارنة تكلفة السيارة الكهربائية والبنزين) | Compares total cost of ownership over 5 years (fuel + maintenance) | Annual mileage, EV purchase price, petrol car price, fuel & kWh rates | 5-year total savings, breakeven year | COUNTRY_CONFIGURABLE | High | PLANNED |
| 71 | Vehicle Depreciation Rate (حاسبة انخفاض قيمة السيارة واستهلاكها السنوي) | Estimates resale market value drop year-over-year | Purchase price, vehicle age, brand reliability tier, annual km | Current estimated market value, annual depreciation loss | UNIVERSAL | Medium | PLANNED |
| 72 | Total Cost of Ownership - TCO (حاسبة التكلفة الإجمالية لامتلاك سيارة شهرياً) | Aggregates installments, fuel, insurance, maintenance, registration | Purchase price/installment, monthly km, insurance, maintenance, tires | Total monthly ownership cost, cost per km | COUNTRY_CONFIGURABLE | Medium | PLANNED |
| 73 | Commute Expenses & Carpool Sharing (حاسبة تكلفة مشوار العمل والمشاركة) | Calculates commuting expenses and fair split per carpool passenger | Distance to workplace, workdays/month, fuel cost, passengers count | Monthly commute cost, fair share per passenger | COUNTRY_CONFIGURABLE | Low | PLANNED |
| 74 | Tire Size & Speedometer Error (حاسبة مقارنة مقاسات الإطارات وخطأ العداد) | Calculates diameter change and speedometer discrepancy on new tires | Original tire size (e.g. 215/55R17), new tire size (e.g. 225/50R18) | Diameter delta %, speedometer readout error at 100 km/h | UNIVERSAL | Medium | PLANNED |
| 75 | Fuel Tank Range & Distance (حاسبة المسافة المتبقية لسرعة وتانكي البنزين) | Estimates maximum range achievable on remaining fuel | Tank capacity in liters, current fuel gauge level (1/4, 1/2), L/100km | Estimated distance remaining in km | UNIVERSAL | Low | PLANNED |
| 76 | Vehicle Top Speed & Gear Ratio (حاسبة نسب التروس والسرعة القصوى للمحرك) | Calculates theoretical vehicle speed based on RPM, gear & final drive | Engine RPM, gear ratio, final drive ratio, tire circumference | Theoretical speed in km/h per gear | UNIVERSAL | High | PLANNED |
| 77 | Car Insurance Deductible Comparison (حاسبة مقارنة تأمين السيارات الشامل وضد الغير) | Evaluates third-party vs comprehensive insurance based on car value | Vehicle market value, annual premium quote, deductible amount | Breakeven repair threshold | COUNTRY_CONFIGURABLE | Medium | PLANNED |
| 78 | Braking Distance & Reaction Time (حاسبة مسافة التوقف وفرملة السيارة) | Calculates physics braking distance based on vehicle speed and road condition | Speed (km/h), reaction time (sec), road friction (dry vs wet asphalt) | Reaction distance, braking distance, total stopping distance | UNIVERSAL | Medium | PLANNED |
| 79 | Engine Horsepower to Kilowatt (حاسبة تحويل قوة المحرك حصان وكيلوواط) | Converts between mechanical HP, metric PS, and kW | Power value, input unit (HP, PS, kW) | Converted power in all units | UNIVERSAL | Low | PLANNED |
| 80 | Car Loan vs Cash Purchase (حاسبة الشراء نقداً مقابل تمويل السيارة) | Compares cash outlay opportunity cost vs installment interest | Car cash price, loan APR, loan term, investment yield of cash | Net wealth difference after loan term | UNIVERSAL | Medium | PLANNED |
| 81 | Heavy Truck Cargo Weight Limit (حاسبة حمولة الشاحنات والوزن المحوري) | Verifies axle weight limits to prevent transport fines | Truck tare weight, cargo payload, axle count configuration | Total gross weight, axle limit status | COUNTRY_REGULATED | Medium | PLANNED |
| 82 | Motor Oil Change Interval Cost (حاسبة تكلفة وتوقيت تغيير زيت المحرك) | Calculates annual oil maintenance expense by mileage | Annual mileage, oil lifespan (5,000 vs 10,000 km), cost per change | Annual oil changes count, annual expense | UNIVERSAL | Low | PLANNED |
| 83 | Vehicle Power-to-Weight Ratio (حاسبة نسبة القوة إلى الوزن للسيارات) | Computes performance ratio in horsepower per ton | Engine horsepower (HP), vehicle curb weight (kg) | HP per ton, performance acceleration tier | UNIVERSAL | Low | PLANNED |
| 84 | Taxi / Ride-Hailing Profitability (حاسبة دخل وأرباح كابتن أوبر وكريم) | Calculates net hourly and monthly driver earnings after fuel & app fees | Gross fares collected, app commission (20-25%), fuel used, maintenance | Net earnings, net hourly wage | COUNTRY_CONFIGURABLE | Medium | PLANNED |
| 85 | Engine Displacement & CC (حاسبة سعة محرك السيارة بالسنتيمتر المكعب) | Calculates cylinder volume and total engine displacement | Cylinder bore diameter (mm), piston stroke (mm), cylinder count | Displacement in CC and liters | UNIVERSAL | Low | PLANNED |
| 86 | Car Air Conditioner Fuel Impact (حاسبة تكلفة استهلاك مكيف السيارة للوقود) | Isolates extra fuel consumed specifically by vehicle AC compressor | Commute duration, AC usage intensity, baseline fuel consumption | Extra fuel burned, monthly AC fuel expense | UNIVERSAL | Low | PLANNED |

---

## 6. Electricity & Energy (الكهرباء والطاقة) — 16 Calculators

| # | Calculator Name | Purpose | Key Inputs | Key Outputs | Country Mode | Implementation Complexity | Status |
|---|---|---|---|---|---|---|---|
| 87 | Electricity Progressive Bill (حاسبة فاتورة الكهرباء وشرائح الاستهلاك) | Calculates monthly residential/commercial power bill by regulatory slabs | Monthly kWh consumption, tariff category, country/provider | Energy charge, slab breakdown, meter fee, VAT, total bill | COUNTRY_REGULATED | High | PUBLISHED |
| 88 | Air Conditioner Sizing (حاسبة اختيار حجم ومقاس المكيف المناسب للغرفة) | Calculates required cooling capacity in BTUs and tons | Room length, width, ceiling height, insulation quality, sun exposure | Recommended BTU rating, AC tonnage (1.5, 2, 2.5 tons) | UNIVERSAL | Medium | PLANNED |
| 89 | AC Running Cost per Hour/Month (حاسبة تكلفة تشغيل المكيف شهرياً) | Estimates electric bill increase from running split/window AC | AC wattage / star rating, daily hours run, kWh tariff rate | Daily kWh, monthly consumption, monthly cost | COUNTRY_CONFIGURABLE | Medium | PLANNED |
| 90 | Household Appliance Power Consumption (حاسبة استهلاك الأجهزة الكهربائية المنزلية) | Calculates monthly cost of running refrigerator, TV, washing machine | Appliance wattage, operating hours per day, kWh tariff | Monthly kWh, monthly operating cost | COUNTRY_CONFIGURABLE | Low | PLANNED |
| 91 | Solar Panel Array Sizing (حاسبة حجم ونظام الطاقة الشمسية للمنازل) | Sizes rooftop solar panels to offset grid consumption | Target monthly kWh offset, daily peak sun hours (4-6 hrs), panel wattage | Number of solar panels, inverter capacity in kW | UNIVERSAL | High | PLANNED |
| 92 | Battery Backup & Inverter Runtime (حاسبة وقت تشغيل بطارية الإنفرتر) | Calculates runtime of backup battery bank during power outage | Inverter load (Watts), battery capacity (Ah), voltage (12/24V), DoD % | Runtime in hours/minutes | UNIVERSAL | Medium | PLANNED |
| 93 | Electric Water Heater Running Cost (حاسبة استهلاك سخان المياه الكهربائي) | Calculates power consumed to heat water tank | Tank capacity in liters, temperature delta, heater wattage | Daily kWh, monthly water heating cost | UNIVERSAL | Low | PLANNED |
| 94 | Standby / Phantom Power Cost (حاسبة استهلاك الأجهزة في وضع الاستعداد) | Calculates hidden annual cost of plugged-in idle electronics | Number of appliances, average standby wattage (1-5W), tariff | Annual wasted kWh, annual wasted expenditure | COUNTRY_CONFIGURABLE | Low | PLANNED |
| 95 | Diesel / Petrol Generator Fuel Consumption (حاسبة استهلاك وقود المولدات الكهربائية) | Calculates fuel burned per operating hour for backup generators | Generator capacity (kVA/kW), operating load % (50%, 75%, 100%) | Liters of fuel per hour, operating cost per hour | UNIVERSAL | Medium | PLANNED |
| 96 | LED vs Incandescent Lighting Savings (حاسبة توفير لمبات الليد مقارنة بالتقليدية) | Quantifies electricity saved by replacing incandescent bulbs with LED | Bulb count, old wattage (60W), LED wattage (9W), daily hours | Annual kWh savings, annual monetary savings, payback time | COUNTRY_CONFIGURABLE | Low | PLANNED |
| 97 | Solar Battery Storage Capacity (حاسبة سعة بنك بطاريات الطاقة الشمسية) | Sizes battery bank needed for nighttime solar autonomy | Daily critical load (kWh), days of autonomy needed (1-3), battery type | Required battery capacity in kWh and Ah | UNIVERSAL | High | PLANNED |
| 98 | 3-Phase vs Single Phase Amperage (حاسبة أمبير الكهرباء 3 فاز وسنجل فاز) | Converts power in kW/kVA to current in Amperes | Power (kW), voltage (220V/380V), power factor, phase (1 vs 3) | Full load current in Amperes | UNIVERSAL | Medium | PLANNED |
| 99 | Electric Pool Pump Cost (حاسبة استهلاك مضخة حمام السباحة) | Calculates monthly electricity cost for swimming pool filtration | Pump horsepower (HP), daily filtration hours, kWh tariff | Monthly kWh, monthly cost | COUNTRY_CONFIGURABLE | Low | PLANNED |
| 100 | Room Space Heater Cost (حاسبة تكلفة تشغيل دفاية الكهرباء) | Calculates power cost of running quartz/oil heaters in winter | Heater wattage (1000-2500W), daily hours, kWh tariff rate | Monthly electricity cost | COUNTRY_CONFIGURABLE | Low | PLANNED |
| 101 | Electricity Meter Pulse to kWh (حاسبة تحويل نبضات العداد إلى كيلوواط) | Converts digital meter LED pulses (imp/kWh) to real-time kW load | Meter constant (e.g. 1000 imp/kWh), seconds between pulses | Instantaneous power consumption in kW | UNIVERSAL | Medium | PLANNED |
| 102 | Home Energy Audit & Budget (حاسبة تدقيق وترشيد ميزانية طاقة المنزل) | Aggregates all room loads to establish whole-house energy breakdown | AC count, major appliances, lighting load, seasonal multiplier | Total expected monthly kWh, high-slab warning | COUNTRY_CONFIGURABLE | High | PLANNED |

---

## 7. Shipping & Customs (الشحن والجمارك) — 14 Calculators

| # | Calculator Name | Purpose | Key Inputs | Key Outputs | Country Mode | Implementation Complexity | Status |
|---|---|---|---|---|---|---|---|
| 103 | Volumetric vs Actual Weight (حاسبة الوزن الحجمي للشحن الجوي والبري) | Calculates dimensional weight to determine chargeable shipping weight | Length, width, height (cm), actual weight (kg), courier divisor (5000/6000) | Volumetric weight, chargeable weight | UNIVERSAL | Low | PLANNED |
| 104 | CBM & Cubic Feet Volume (حاسبة الأمتار المكعبة للشحنات CBM) | Calculates cubic meters and cubic feet for export cartons | Carton dimensions (cm or inches), carton quantity | Total volume in CBM and Cubic Feet | UNIVERSAL | Low | PLANNED |
| 105 | Shipping Container Capacity (حاسبة استيعاب حاويات الشحن 20 و 40 قدم) | Calculates carton fit inside standard 20ft, 40ft, and 40ft HC containers | Carton dimensions, carton weight, container selection | Max cartons per container by volume and weight limits | UNIVERSAL | Medium | PLANNED |
| 106 | Total Landed Cost (حاسبة التكلفة الإجمالية الواصلة للمنتج المستورد) | Aggregates FOB price, sea freight, insurance, customs, VAT, clearance | Product purchase price, freight cost, insurance, duty %, port fees | Total landed cost per unit, cost breakdown | COUNTRY_REGULATED | High | PLANNED |
| 107 | Customs Duty & Clearance Fees (حاسبة الرسوم الجمركية والتخليص) | Computes customs duty based on Harmonized System (HS) tariff rates | CIF value, HS customs tariff percentage (usually 5-15%), admin fees | Customs duty due, clearance total | COUNTRY_REGULATED | Medium | PLANNED |
| 108 | Courier Express Parcel Import VAT (حاسبة ضريبة وجمارك الطرود البريدية السريعة) | Calculates customs and VAT applied on personal online shopping parcels | Parcel value, shipping fee, statutory exemption threshold ($266/1000 SAR) | Customs duty, import VAT, courier clearance fee | COUNTRY_REGULATED | Medium | PLANNED |
| 109 | Pallet Cargo Stacking (حاسبة رص وتستيف البضائع على الطبالي) | Calculates pallet layout efficiency and stack height | Carton dimensions, standard pallet size (Euro vs US pallet), max height | Cartons per layer, total layers, total cartons per pallet | UNIVERSAL | Medium | PLANNED |
| 110 | Sea Freight LCL vs FCL Breakeven (حاسبة مقارنة شحن الحاوية الكاملة والمشتركة) | Determines when to switch from LCL (per CBM) to a full 20ft container | Total cargo volume in CBM, LCL rate per CBM, flat 20ft container rate | Cost comparison, breakeven volume in CBM | UNIVERSAL | Medium | PLANNED |
| 111 | Air Freight Transit Time & Speed (حاسبة وقت ومسار الشحن الجوي) | Estimates flight transit duration and airport ground handling turnaround | Origin airport, destination airport, direct vs transit flight | Estimated transit hours | UNIVERSAL | Low | PLANNED |
| 112 | Marine Cargo Insurance Premium (حاسبة تأمين الشحن البحري والبضائع) | Calculates insurance coverage cost based on CIF + 10% standard formula | Invoice value, freight, insurance rate (0.2% - 0.5%) | Insured value, premium payable | UNIVERSAL | Low | PLANNED |
| 113 | Demurrage & Storage Penalty (حاسبة غرامات أرضيات وتأخير الحاويات في الميناء) | Calculates terminal demurrage fees after free laytime expires | Free days allowed (e.g. 7-14), total days at port, daily penalty tiers | Total demurrage fee payable | COUNTRY_CONFIGURABLE | Medium | PLANNED |
| 114 | Refrigerated Reefer Container Energy Surcharge (حاسبة رسوم كهرباء وتبريد الحاويات) | Calculates cold-chain electrical plug-in charges at container terminal | Reefer days at port, daily electricity connection tariff | Total reefer surcharge | COUNTRY_CONFIGURABLE | Low | PLANNED |
| 115 | Package Fragile Material Ratio (حاسبة كمية مواد التغليف والفقاعات) | Estimates void fill and bubble wrap needed to protect cargo | Box dimensions, internal product dimensions | Void volume requiring protective filler | UNIVERSAL | Low | PLANNED |
| 116 | Cross-Border Delivery Fee Margin (حاسبة هامش ربح التوصيل والشحن لزبائن المتجر) | Balances actual courier cost against shipping fees charged to customer | Carrier shipping invoice, price charged to buyer, packaging cost | Net profit or subsidized loss on shipping | UNIVERSAL | Low | PLANNED |

---

## 8. E-Commerce (التجارة الإلكترونية) — 14 Calculators

| # | Calculator Name | Purpose | Key Inputs | Key Outputs | Country Mode | Implementation Complexity | Status |
|---|---|---|---|---|---|---|---|
| 117 | E-Commerce Net Product Profit (حاسبة صافي ربح منتج التجارة الإلكترونية) | Calculates net profit after COGS, ad spend, shipping, platform and payment fees | Selling price, product cost, ad cost/sale, delivery cost, return rate % | Net profit per order, net profit margin % | COUNTRY_CONFIGURABLE | Medium | PLANNED |
| 118 | Payment Gateway Fee (حاسبة عمولات بوابات الدفع الإلكتروني مدى وفيزا) | Compares net receipts across payment channels (Mada, Visa, ApplePay, BNPL) | Order value, payment method (Mada 1%, Visa 2.75%, Tabby/Tamara 6-7%) | Gateway fee deducted, net cash received | COUNTRY_CONFIGURABLE | Medium | PLANNED |
| 119 | Return & Return-to-Origin RTO Impact (حاسبة تكلفة الرجيع وإلغاء الطلبات) | Measures net loss from cash-on-delivery and returned orders | Total orders, RTO return rate %, forward shipping fee, reverse shipping fee | Total return losses, required price markup to absorb returns | UNIVERSAL | Medium | PLANNED |
| 120 | Break-Even ROAS (حاسبة العائد الإعلاني الأدنى لتحقيق التعادل) | Computes minimum Return on Ad Spend required to avoid marketing loss | Selling price, COGS, fulfillment & gateway fees | Break-even ROAS (e.g. 2.4x), minimum margin | UNIVERSAL | Low | PLANNED |
| 121 | Customer Acquisition Cost - CAC (حاسبة تكلفة اكتساب العميل) | Calculates marketing and sales dollars spent per newly acquired customer | Total marketing ad spend, creative costs, new customers acquired count | CAC per customer | UNIVERSAL | Low | PLANNED |
| 122 | Customer Lifetime Value - LTV (حاسبة القيمة الدائمة للعميل) | Computes total gross profit generated by a customer over time | Average order value, purchase frequency per year, customer retention span | Customer Lifetime Value (LTV), LTV:CAC ratio | UNIVERSAL | Medium | PLANNED |
| 123 | Conversion Rate & Traffic Sizing (حاسبة معدل التحويل ومبيعات المتجر) | Calculates store conversion rate and traffic needed to reach revenue target | Store visitors count, completed orders count, revenue target | Conversion rate %, visitors needed to reach target | UNIVERSAL | Low | PLANNED |
| 124 | Product Bundle Profitability (حاسبة ربحية العروض والحزم المجمعة) | Evaluates profit impact of bundling 2-3 products at discount | Individual retail prices, bundle discount %, combined product costs | Net bundle margin, volume uplift needed to break even | UNIVERSAL | Medium | PLANNED |
| 125 | Amazon / Noon Marketplace Fee (حاسبة عمولات البيع في نون وأمازون) | Calculates marketplace referral commissions, FBN/FBA storage and shipping | Product category, retail price, item dimensions and weight | Referral fee, fulfillment fee, net seller payout | COUNTRY_CONFIGURABLE | High | PLANNED |
| 126 | Average Order Value - AOV Growth (حاسبة متوسط قيمة السلة والطلب) | Analyzes store checkout value trends | Total sales revenue, total completed orders | Average Order Value (AOV) | UNIVERSAL | Low | PLANNED |
| 127 | Dropshipping Margin & Ad Spend (حاسبة هوامش الدروب شيبينغ والإعلانات) | Determines viability of international dropship products | Supplier cost with ePacket/air, target retail price, expected CPC | Maximum affordable CPA, net profit | UNIVERSAL | Medium | PLANNED |
| 128 | Cart Abandonment Loss (حاسبة خسائر السلات المتروكة) | Calculates potential revenue left unrecovered in abandoned carts | Total checkout initiations, completed orders, average order value | Abandonment rate %, recovered revenue potential | UNIVERSAL | Low | PLANNED |
| 129 | Cash on Delivery COD Cash Flow (حاسبة دورة سيولة الدفع عند الاستلام) | Calculates working capital trapped in courier remittance cycles | Monthly COD orders, courier remittance delay (days), RTO % | Trapped working capital, capital buffer needed | COUNTRY_CONFIGURABLE | Medium | PLANNED |
| 130 | Influencer Marketing ROI (حاسبة جدوى وعائد إعلانات مشاهير السوشيال) | Evaluates sales return from influencer sponsored coverage | Influencer fee, discount code orders generated, average basket value | Net profit from campaign, Campaign ROI % | UNIVERSAL | Medium | PLANNED |

---

## 9. Business & Profitability (الأعمال والأرباح) — 14 Calculators

| # | Calculator Name | Purpose | Key Inputs | Key Outputs | Country Mode | Implementation Complexity | Status |
|---|---|---|---|---|---|---|---|
| 131 | Break-Even Point (حاسبة نقطة التعادل للشركات والمشاريع) | Calculates units and revenue needed to cover fixed and variable costs | Fixed monthly costs, sale price per unit, variable cost per unit | Break-even unit count, break-even sales revenue | UNIVERSAL | Low | PLANNED |
| 132 | Gross & Net Profit Margin (حاسبة هامش الربح الإجمالي والصافي) | Calculates gross margin and net margin percentage from sales | Revenue, cost of goods sold (COGS), operating expenses | Gross profit, gross margin %, net profit, net margin % | UNIVERSAL | Low | PLANNED |
| 133 | Markup to Margin Converter (محول نسبة إضافة السعر إلى هامش الربح) | Converts markup percentage on cost to profit margin on selling price | Markup % or Margin % | Equivalent counterpart percentage | UNIVERSAL | Low | PLANNED |
| 134 | Restaurant Food Cost & Menu Pricing (حاسبة تكلفة أطباق المطاعم وقائمة الطعام) | Calculates ingredient recipe cost and target menu selling price | Recipe ingredients cost, target food cost % (e.g. 28-35%) | Recommended menu price, gross profit per dish | UNIVERSAL | Medium | PLANNED |
| 135 | Food Delivery App Commission (حاسبة عمولات تطبيقات توصيل الطعام هنقرستيشن وجاهز) | Calculates net restaurant revenue after 18-25% aggregator fees | Menu dish price, delivery app commission %, packaging cost | Net restaurant earnings, necessary menu markup | COUNTRY_CONFIGURABLE | Medium | PLANNED |
| 136 | Business Cash Runway & Burn Rate (حاسبة معدل حرق السيولة وعمر الشركة الناشئة) | Estimates surviving months of capital runway for startups | Current bank balance, monthly gross cash burn, monthly cash receipts | Net burn rate, runway in months | UNIVERSAL | Low | PLANNED |
| 137 | Inventory Turnover Ratio (حاسبة معدل دوران المخزون) | Evaluates how many times inventory is sold and replaced annually | Cost of Goods Sold (COGS), average inventory balance | Inventory turnover ratio, days sales of inventory (DSI) | UNIVERSAL | Low | PLANNED |
| 138 | Working Capital Ratio (حاسبة رأس المال العامل والسيولة الجارية) | Computes working capital and current liquidity ratio | Current assets, current liabilities | Net working capital, Current Ratio | UNIVERSAL | Low | PLANNED |
| 139 | Contribution Margin per Unit (حاسبة هامش المساهمة لتغطية التكاليف الثابتة) | Calculates incremental profit per product unit sold | Selling price per unit, variable costs per unit | Contribution margin ($), contribution margin ratio % | UNIVERSAL | Low | PLANNED |
| 140 | Commercial Lease Rent-to-Revenue (حاسبة نسبة إيجار المحل من المبيعات) | Evaluates whether retail shop rent is sustainable relative to gross turnover | Annual shop rent, projected annual gross sales | Rent-to-sales ratio %, benchmark safety tier (10-15%) | UNIVERSAL | Low | PLANNED |
| 141 | POS Terminal Card Transaction Cost (حاسبة تكلفة أجهزة نقاط البيع POS) | Calculates monthly card transaction fees deducted by acquirers | Monthly card volume, percentage of Mada vs Visa/Mastercard | Acquirer fee deductions, net bank deposit | COUNTRY_CONFIGURABLE | Medium | PLANNED |
| 142 | Commercial Loan Debt Service Coverage Ratio - DSCR (حاسبة تغطية خدمة الدين) | Measures business operating income ability to service debt | Net Operating Income (NOI), annual total debt service (principal + interest) | DSCR ratio, bank approval feasibility indicator | UNIVERSAL | Medium | PLANNED |
| 143 | Coffee Shop Cup Profitability (حاسبة تكلفة وربحية كوب القهوة للمقاهي) | Isolates coffee beans, milk, cup, lid, and overhead per cup | Bean cost per kg, grams per shot, milk cost per L, cup packaging | Cost per cup, gross margin % | UNIVERSAL | Low | PLANNED |
| 144 | Business Valuation Multiple (حاسبة تقييم الشركات والمشاريع الصغيرة) | Estimates rough business valuation based on SDE or EBITDA multiples | Annual net profit / EBITDA, industry multiple (2x - 5x) | Estimated business valuation range | UNIVERSAL | Medium | PLANNED |

---

## 10. Real Estate (العقارات) — 12 Calculators

| # | Calculator Name | Purpose | Key Inputs | Key Outputs | Country Mode | Implementation Complexity | Status |
|---|---|---|---|---|---|---|---|
| 145 | Gross & Net Rental Yield (حاسبة العائد الإيجاري الإجمالي والصافي للعقار) | Calculates annual rental return percentage on property investment | Purchase price, annual gross rental income, maintenance, management fees | Gross rental yield %, net rental yield % | UNIVERSAL | Low | PLANNED |
| 146 | Rent vs Buy Real Estate (حاسبة مقارنة الشراء مقابل الاستئجار السكني) | Compares 10-20 year wealth building between renting and buying a home | Home price, down payment, mortgage APR, monthly rent, home appreciation | Financial breakeven year, net wealth difference | COUNTRY_CONFIGURABLE | High | PLANNED |
| 147 | Price per Square Meter/Foot (حاسبة سعر المتر المربع والقدم المربع للعقار) | Converts and standardizes property pricing by surface area | Total property price, total area in m² or sq ft | Price per m², price per sq ft | UNIVERSAL | Low | PLANNED |
| 148 | Real Estate Brokerage Commission (حاسبة عمولة السعي والمكتب العقاري) | Calculates statutory broker commission (e.g. 2.5% SA) + VAT | Property transaction value, commission percentage (standard 2.5%) | Commission amount, VAT on commission, total | COUNTRY_REGULATED | Low | PLANNED |
| 149 | Capitalization Rate - Cap Rate (حاسبة معدل الرسملة للعقارات التجارية) | Evaluates commercial property yields independent of mortgage leverage | Net Operating Income (NOI), current property acquisition market value | Cap Rate % | UNIVERSAL | Low | PLANNED |
| 150 | Property Flipping Profit & Renovation (حاسبة أرباح شراء وتجديد وبيع العقارات) | Calculates net gain from purchasing, upgrading, and reselling | Acquisition price, renovation costs, holding taxes/costs, expected resale | Net flip profit, ROI %, annualized return | UNIVERSAL | Medium | PLANNED |
| 151 | Rent Increase Limitation (حاسبة نسبة الزيادة الإيجارية المسموح بها قانوناً) | Calculates legal rent increase cap under municipal rent index guidelines | Current rent, market benchmark rent, municipal rental cap rules | Maximum allowable rent increase, new rent ceiling | COUNTRY_REGULATED | Medium | PLANNED |
| 152 | Building Land-to-Built Area Ratio - FAR (حاسبة معامل البناء ومساحة الأدوار) | Calculates maximum allowable built-up square meters on a plot | Land plot area (m²), municipal Floor Area Ratio (FAR) or building % | Max ground footprint, max total built area | COUNTRY_REGULATED | Medium | PLANNED |
| 153 | Real Estate Service Charge / HOA (حاسبة رسوم الخدمات والصيانة لجمعية الملاك) | Computes annual building maintenance service charges per square meter | Apartment area in m², building management fee per m² | Annual service charge, monthly reserve fund | COUNTRY_CONFIGURABLE | Low | PLANNED |
| 154 | Rental Affordability by Household Income (حاسبة الميزانية المناسبة لإيجار السكن) | Calculates maximum recommended monthly rent (30% guideline) | Monthly household income, existing non-housing debt obligations | Maximum safe monthly rent, annual rent limit | UNIVERSAL | Low | PLANNED |
| 155 | Real Estate Property Depreciation (حاسبة إهلاك المباني المحاسبي والضريبي) | Calculates annual straight-line building wear for corporate balance sheets | Building value (excluding land), useful lifespan (usually 20-33 years) | Annual depreciation expense, book value over time | UNIVERSAL | Low | PLANNED |
| 156 | Short-Term Rental Airbnb Occupancy Yield (حاسبة دخل الشقق المفروشة والتأجير اليومي) | Models daily rate vs occupancy against annual long-term leasing | Nightly rate, expected occupancy % (e.g. 65%), cleaning/platform fees | Net annual income, comparison vs traditional 1-year tenant | UNIVERSAL | Medium | PLANNED |

---

## 11. Construction & Renovation (البناء والتشطيب) — 14 Calculators

| # | Calculator Name | Purpose | Key Inputs | Key Outputs | Country Mode | Implementation Complexity | Status |
|---|---|---|---|---|---|---|---|
| 157 | Wall Paint Quantity (حاسبة كمية الدهان وعدد البراميل للجدران) | Calculates liters and gallons of paint required for rooms | Room perimeter, ceiling height, door/window cutout area, coats count | Net paintable area, liters needed, bucket/can count | UNIVERSAL | Medium | PLANNED |
| 158 | Floor Tile & Ceramic Area (حاسبة مساحة السيراميك والباركيه ونسبة الهدر) | Calculates boxes and tiles needed including cutting waste | Floor length, width, tile dimensions (e.g. 60x60 cm), waste allowance (10%) | Area in m², tile count, boxes needed | UNIVERSAL | Medium | PLANNED |
| 159 | Concrete Volume for Footings & Slabs (حاسبة كمية الخرسانة المسلحة بالقواعد والسقف) | Computes cubic meters of ready-mix concrete needed | Length, width, thickness/depth (meters), waste allowance (5%) | Volume in m³ (CBM), ready-mix truckloads estimate | UNIVERSAL | Medium | PLANNED |
| 160 | Concrete Block / Brick Count (حاسبة عدد البلوك والطابوق للجدران) | Calculates masonry block count needed for perimeter walls | Wall length, height, block dimensions (e.g. 20x40 cm), opening cutouts | Total blocks needed, mortar estimate | UNIVERSAL | Medium | PLANNED |
| 161 | Rebar Steel Weight in Concrete (حاسبة أوزان حديد التسليح في الخرسانة) | Calculates steel rebar weight by diameter and total linear meters | Rebar diameter in mm (8, 10, 12, 14, 16 mm), total length in meters | Total steel weight in kg and metric tons | UNIVERSAL | Medium | PLANNED |
| 162 | Wallpaper Rolls Count (حاسبة عدد رولات ورق الجدران) | Calculates wallpaper rolls needed based on pattern repeat | Wall length, height, roll width, roll length, pattern repeat drop | Rolls count needed, waste area | UNIVERSAL | Medium | PLANNED |
| 163 | Room Plaster & Cement Render (حاسبة كميات اللياسة والمحارة للجدران) | Calculates sand and cement bags for interior/exterior wall plaster | Total wall area in m², plaster thickness (e.g. 2 cm), cement mix ratio | Cement bags count, sand volume in m³ | UNIVERSAL | Medium | PLANNED |
| 164 | Water Tank Storage Capacity (حاسبة سعة خزان المياه المنزلي) | Calculates cubic capacity and gallons of underground or roof tanks | Tank length, width, depth (or diameter and height if circular) | Capacity in m³ and Liters/US Gallons | UNIVERSAL | Low | PLANNED |
| 165 | Gypsum Board Ceiling Sheets (حاسبة ألواح الجبس بورد للأسقف) | Calculates gypsum ceiling boards and steel track framework | Ceiling length, width, board size (e.g. 1.2 x 2.4 m) | Boards count, perimeter steel track meters | UNIVERSAL | Low | PLANNED |
| 166 | Gravel & Sand Bulk Volume (حاسبة كميات الرمل والبحص والركام) | Calculates loose aggregate material volume for ground fill | Area in m², fill depth (cm), compaction factor | Total volume in m³ and pickup truckloads | UNIVERSAL | Low | PLANNED |
| 167 | Roof Thermal Insulation Sheets (حاسبة ألواح العزل الحراري والمائي للأسطح) | Calculates foam insulation boards for building envelope compliance | Roof area in m², board size, layers count | Net insulation area, board packs count | UNIVERSAL | Low | PLANNED |
| 168 | Window & Glass Area Sizing (حاسبة مساحات زجاج النوافذ وقطاعات الألمنيوم) | Calculates glazing area and perimeter frame profiles | Window width, height, unit count, single vs double glaze | Glass area in m², aluminum profile perimeter | UNIVERSAL | Low | PLANNED |
| 169 | Fence & Retaining Wall Cost (حاسبة تكلفة بناء السور الخارجي) | Estimates excavation, foundation, blockwork, and plaster for fences | Fence linear meters, height, post spacing | Total cost estimate, materials breakdown | UNIVERSAL | Medium | PLANNED |
| 170 | Staircase Steps & Riser Dimensions (حاسبة درجات السلم والارتفاع المريح) | Calculates step tread depth, riser height, and total steps count | Total floor-to-floor height, target riser height (15-18 cm) | Exact steps count, riser height, tread depth, stair run | UNIVERSAL | Medium | PLANNED |

---

## 12. Mobile & Internet (الاتصالات والإنترنت) — 10 Calculators

| # | Calculator Name | Purpose | Key Inputs | Key Outputs | Country Mode | Implementation Complexity | Status |
|---|---|---|---|---|---|---|---|
| 171 | File Download & Upload Time (حاسبة وقت سرعة تحميل ورفع الملفات) | Calculates duration to transfer video/games across broadband speeds | File size in GB/MB, connection speed in Mbps (Megabits/sec) | Transfer duration in minutes and seconds | UNIVERSAL | Low | PLANNED |
| 172 | Monthly Data Package Usage (حاسبة استهلاك باقة الإنترنت الشهرية) | Estimates required GBs based on daily video, social, browsing habits | Hours of HD video/day, social media browsing hours, gaming hours | Estimated monthly GB consumption, plan suggestion | UNIVERSAL | Medium | PLANNED |
| 173 | Video Streaming Data Usage (حاسبة استهلاك الفيديوهات وبث النت) | Calculates bandwidth consumed by Netflix, YouTube, TikTok (4K/HD/SD) | Video quality (480p, 1080p, 4K), daily watching hours | Hourly data rate, monthly GB consumed | UNIVERSAL | Low | PLANNED |
| 174 | Bandwidth Speed Converter Mbps to MB/s (محول سرعة النت من ميغابت إلى ميغابايت) | Clarifies distinction between Megabits (ISP speed) and Megabytes (storage) | Speed value, unit (Mbps, MB/s, Gbps, KB/s) | Converted value across all data units | UNIVERSAL | Low | PLANNED |
| 175 | Mobile Screen PPI Density (حاسبة كثافة بكسلات الشاشة PPI) | Calculates pixel density sharpness of smartphone and tablet displays | Screen resolution (width x height pixels), diagonal screen size (inches) | Pixels Per Inch (PPI) rating | UNIVERSAL | Low | PLANNED |
| 176 | Online Gaming Bandwidth & Ping Data (حاسبة استهلاك ألعاب الأونلاين للإنترنت) | Estimates data burned by PlayStation, Xbox, and PC multiplayer gaming | Hours played per day, game title type (Battle Royale, MMO, FPS) | Daily and monthly GB consumed | UNIVERSAL | Low | PLANNED |
| 177 | Smartphone Battery SOT & Drain (حاسبة عمر بطارية الهاتف ومعدل الاستهلاك) | Estimates screen-on-time based on battery capacity and usage profile | Battery capacity (mAh), screen refresh rate (60 vs 120Hz), usage load | Estimated Screen-On Time (SOT) in hours | UNIVERSAL | Medium | PLANNED |
| 178 | Mobile Repair vs Replace (حاسبة جدوى تصليح الجوال مقابل شراء جديد) | Evaluates if fixing a broken screen/battery makes financial sense | Repair cost quote, current used phone market value, new phone price | Repair-to-value ratio %, economic recommendation | UNIVERSAL | Low | PLANNED |
| 179 | 5G vs 4G Home Wireless Latency (حاسبة أداء ومقارنة إنترنت الجيل الخامس) | Evaluates speed and quota suitability of 5G home wireless routers | Household user count, concurrent streams, 5G average speed | Household bandwidth saturation index | UNIVERSAL | Low | PLANNED |
| 180 | Cloud Backup Storage Sizing (حاسبة سعة النسخ الاحتياطي السحابي للصور) | Estimates cloud drive storage needed for photos, 4K videos, and documents | Photo count, average photo size, 4K video minutes, document files | Required cloud storage in GB and TB | UNIVERSAL | Low | PLANNED |

---

## 13. Health & Fitness (الصحة واللياقة) — 12 Calculators

| # | Calculator Name | Purpose | Key Inputs | Key Outputs | Country Mode | Implementation Complexity | Status |
|---|---|---|---|---|---|---|---|
| 181 | Body Mass Index - BMI (حاسبة مؤشر كتلة الجسم والوزن المثالي) | Calculates BMI and WHO health categorization | Weight (kg), height (cm) | BMI value, WHO category, ideal weight range | UNIVERSAL | Low | PUBLISHED |
| 182 | Basal Metabolic Rate - BMR (حاسبة معدل الأيض الأساسي وحرق السعرات) | Calculates baseline calories burned at complete rest (Mifflin-St Jeor) | Weight (kg), height (cm), age (years), gender | BMR calories/day | UNIVERSAL | Low | PLANNED |
| 183 | Total Daily Energy Expenditure - TDEE (حاسبة احتياج السعرات الحرارية اليومية) | Calculates maintenance calories based on daily activity multiplier | BMR, physical activity level (sedentary to athlete) | TDEE maintenance calories, deficit calories for weight loss | UNIVERSAL | Medium | PLANNED |
| 184 | Daily Water Intake (حاسبة الاحتياج اليومي من الماء) | Calculates hydration requirement in liters based on weight and climate | Weight (kg), exercise minutes/day, climate temperature (hot/normal) | Recommended daily water in liters and cups | UNIVERSAL | Low | PLANNED |
| 185 | Running Pace & Split Times (حاسبة سرعة الجري وبيس الكيلومتر) | Calculates minutes per kilometer and predicts 5K/10K/Marathon finish | Running distance, total finish time | Pace in min:sec per km, speed in km/h, split times | UNIVERSAL | Medium | PLANNED |
| 186 | Target Heart Rate Zones (حاسبة نبضات القلب المستهدفة لحرق الدهون) | Calculates cardiovascular heart rate training zones (Karvonen method) | Age, resting heart rate | Zone 1 to Zone 5 heart rate beats-per-minute (BPM) | UNIVERSAL | Medium | PLANNED |
| 187 | Body Fat Percentage Navy Method (حاسبة نسبة الدهون في الجسم بالمتر) | Estimates body fat % using circumference measurements | Gender, height, neck, waist, (and hip for females) in cm | Body fat %, lean body mass, fat mass in kg | UNIVERSAL | Medium | PLANNED |
| 188 | Daily Protein Requirement (حاسبة الاحتياج اليومي من البروتين) | Calculates grams of protein needed based on fitness goals | Weight (kg), goal (muscle building, maintenance, fat loss) | Recommended protein in grams per day | UNIVERSAL | Low | PLANNED |
| 189 | Macro Breakdown Carb/Protein/Fat (حاسبة توزيع المغذيات الكبرى الماكروز) | Splits daily calorie target into gram targets of carbs, protein, fat | Daily calorie target, diet style (balanced, keto, high-protein) | Grams of protein, carbohydrates, and fats | UNIVERSAL | Low | PLANNED |
| 190 | One Rep Max - 1RM Strength (حاسبة أقصى وزن للتكرار الواحد 1RM) | Predicts maximum single lift capacity from submaximal repetitions | Weight lifted in kg, repetitions completed (1-10) | Estimated 1RM, percentages chart (90%, 80%, 70%) | UNIVERSAL | Low | PLANNED |
| 191 | Intermittent Fasting Window (حاسبة ساعات الصيام المتقطع وتوقيت الوجبات) | Schedules 16:8 or 20:4 fasting and feeding windows | Fasting protocol (16:8, 18:6, 20:4), start time of last meal | Fasting end time, eating window schedule | UNIVERSAL | Low | PLANNED |
| 192 | Pregnancy Due Date & Gestational Age (حاسبة موعد الولادة وعمر الحمل) | Calculates estimated due date using Naegele's rule | First day of last menstrual period (LMP) or conception date | Estimated delivery date, current gestational week | UNIVERSAL | Medium | PLANNED |

---

## 14. Dates & Time (التاريخ والوقت) — 12 Calculators

| # | Calculator Name | Purpose | Key Inputs | Key Outputs | Country Mode | Implementation Complexity | Status |
|---|---|---|---|---|---|---|---|
| 193 | Age in Years, Months, Days (حاسبة العمر الدقيق باليوم والشهر والساعة) | Calculates precise chronological age with upcoming birthday countdown | Date of birth, target reference date | Age in years, months, days, total days lived, next birthday | UNIVERSAL | Medium | PLANNED |
| 194 | Hijri to Gregorian Date Converter (محول التاريخ الهجري والميلادي) | Converts dates between Umm al-Qura Hijri and Gregorian calendars | Date, input calendar type (Hijri vs Gregorian) | Converted date in corresponding calendar, day of week | UNIVERSAL | High | PLANNED |
| 195 | Date Difference in Days (حاسبة الفرق بين تاريخين وعدد الأيام) | Calculates exact duration between two dates | Start date, end date, inclusion of end date toggle | Days, weeks, months, years difference | UNIVERSAL | Low | PLANNED |
| 196 | Working Business Days (حاسبة أيام العمل والدوام الرسمي بين تاريخين) | Calculates working days excluding weekends and national public holidays | Start date, end date, weekend mode (Fri/Sat vs Sat/Sun), country | Net business days count, weekend days count | COUNTRY_REGULATED | High | PLANNED |
| 197 | Add or Subtract Days from Date (حاسبة إضافة وطرح أيام وأشهر من تاريخ) | Calculates future or past date by adding/subtracting day offset | Base date, days/weeks/months to add or subtract | Target resulting date | UNIVERSAL | Low | PLANNED |
| 198 | Time Duration & Hours Between Times (حاسبة الفرق بين وقتين وساعات الدوام) | Calculates hours and minutes between punch-in and punch-out | Start time, end time, break duration in minutes | Total net working hours and minutes | UNIVERSAL | Low | PLANNED |
| 199 | Event Countdown Timer (حاسبة العد التنازلي للمناسبات والأعياد) | Calculates remaining days, hours, and minutes until target event | Target event date and time | Remaining days, hours, minutes, seconds | UNIVERSAL | Low | PLANNED |
| 200 | Time Zone Meeting Planner (حاسبة فروق التوقيت بين الدول للميتنج) | Coordinates overlapping business hours across Arab and world cities | Base city/time, comparison target cities | Local times matrix, business hours overlap | UNIVERSAL | Medium | PLANNED |
| 201 | Leap Year Identifier (حاسبة السنوات الكبيسة) | Determines whether given year is leap in Gregorian and Hijri | Year number | Leap year status, days count (366 vs 365) | UNIVERSAL | Low | PLANNED |
| 202 | Ramadan & Eid Countdown (حاسبة العد التنازلي لرمضان وعيد الفطر) | Tracks astronomical expected days remaining until holy month and Eids | Current date | Days remaining until Ramadan 1st, Eid al-Fitr, Eid al-Adha | UNIVERSAL | Medium | PLANNED |
| 203 | Service Period Duration (حاسبة مدة الخدمة العسكرية والمدنية) | Aggregates multiple discontinuous service periods | List of enlistment/service start and end dates | Total combined service in years, months, days | UNIVERSAL | Medium | PLANNED |
| 204 | Payroll Gregorian vs Hijri Payday (حاسبة موعد نزول الراتب بالهجري والميلادي) | Calculates days remaining until official monthly paydays (e.g. 27th) | Current date, salary schedule scheme (27th Gregorian vs Solar) | Days remaining until salary drop, day of week | COUNTRY_REGULATED | Medium | PLANNED |

---

## 15. Mathematics & Percentages (الرياضيات والنسب المئوية) — 14 Calculators

| # | Calculator Name | Purpose | Key Inputs | Key Outputs | Country Mode | Implementation Complexity | Status |
|---|---|---|---|---|---|---|---|
| 205 | Comprehensive Percentage (حاسبة النسبة المئوية الشاملة والتغير المئوي) | Computes X% of Y, X is what % of Y, and % increase/decrease | Mode selection, Value A, Value B | Calculated percentage, added/subtracted totals | UNIVERSAL | Low | PUBLISHED |
| 206 | Rule of Three Proportions (حاسبة التناسب والتناسب العكسي) | Solves direct and inverse proportional equations | Value A, Value B, Value C, mode (direct vs inverse) | Unknown Value X | UNIVERSAL | Low | PLANNED |
| 207 | Fraction Addition & Simplification (حاسبة تبسيط وجمع الكسور العادية) | Adds, subtracts, multiplies, and reduces fractional numbers | Fraction 1 (num/den), operation (+ - * /), Fraction 2 (num/den) | Simplified fraction result, decimal equivalent | UNIVERSAL | Low | PLANNED |
| 208 | Greatest Common Divisor - GCD (حاسبة القاسم المشترك الأكبر) | Calculates GCD/HCF of two or more integers using Euclidean algorithm | Integer numbers list | Greatest Common Divisor | UNIVERSAL | Low | PLANNED |
| 209 | Least Common Multiple - LCM (حاسبة المضاعف المشترك الأصغر) | Calculates smallest integer divisible by all input numbers | Integer numbers list | Least Common Multiple | UNIVERSAL | Low | PLANNED |
| 210 | Square & N-th Root (حاسبة الجذور والتربيع والجذر النوني) | Calculates square root, cube root, and arbitrary n-th root | Radicand number, root degree n | Root result | UNIVERSAL | Low | PLANNED |
| 211 | Exponent & Scientific Power (حاسبة الأسس والقوى والترميز العلمي) | Computes base raised to power exponent (positive/negative) | Base number, exponent power | Result, scientific notation | UNIVERSAL | Low | PLANNED |
| 212 | Ratio Simplifier (حاسبة تبسيط وتقسيم النسب) | Simplifies ratios (A:B) and divides sums according to fixed ratios | Ratio numbers (e.g. 15:25), total sum to distribute | Simplified ratio (e.g. 3:5), allocated amounts | UNIVERSAL | Low | PLANNED |
| 213 | Quadratic Equation Solver (حاسبة حل المعادلات التربيعية) | Solves ax² + bx + c = 0 using quadratic formula | Coefficients a, b, c | Roots x1, x2, discriminant delta, vertex | UNIVERSAL | Medium | PLANNED |
| 214 | Prime Number Checker & Factorization (حاسبة الأعداد الأولية والتحليل إلى العوامل) | Verifies if number is prime and decomposes into prime factors | Integer number | Prime status, prime factors breakdown | UNIVERSAL | Medium | PLANNED |
| 215 | Geometric Area & Perimeter (حاسبة مساحة ومحيط الأشكال الهندسية) | Calculates surface and boundaries of circle, triangle, trapezoid | Shape selection, dimensions (radius, base, height) | Area, perimeter | UNIVERSAL | Low | PLANNED |
| 216 | 3D Volume & Surface Area (حاسبة حجم ومساحة سطح المجسمات) | Computes volume and external surface area of cylinder, sphere, cone | Shape selection, dimensions (radius, height, depth) | Volume, total surface area | UNIVERSAL | Low | PLANNED |
| 217 | Pythagorean Theorem (حاسبة مبرهنة فيثاغورس للمثلث القائم) | Calculates hypotenuse or missing side of right triangle | Side a, Side b, (or Hypotenuse c) | Missing side length, interior angles | UNIVERSAL | Low | PLANNED |
| 218 | Logarithm & Natural Log (حاسبة اللوغاريتمات واللوغاريتم الطبيعي ln) | Computes log10, ln, and arbitrary base logarithms | Number, logarithm base | Logarithmic value | UNIVERSAL | Low | PLANNED |

---

## 16. Unit Conversion (تحويل الوحدات) — 10 Calculators

| # | Calculator Name | Purpose | Key Inputs | Key Outputs | Country Mode | Implementation Complexity | Status |
|---|---|---|---|---|---|---|---|
| 219 | Length & Distance Converter (محول وحدات الأطوال والمسافات) | Converts between meters, kilometers, feet, inches, miles, and yards | Input value, source unit, target unit | Converted length | UNIVERSAL | Low | PLANNED |
| 220 | Weight & Mass Converter (محول وحدات الأوزان والكتل) | Converts between kilograms, grams, pounds (lbs), ounces, and metric tons | Input value, source unit, target unit | Converted weight | UNIVERSAL | Low | PLANNED |
| 221 | Land & Area Converter (محول مساحات الأراضي فدان وقصبة ومتر) | Converts metric m² to traditional Arab land units (Feddan, Qirat, Sahm, Dunam) | Input value, source unit, target unit | Converted area | COUNTRY_CONFIGURABLE | Medium | PLANNED |
| 222 | Temperature Converter (محول درجات الحرارة مئوي وفهرنهايت) | Converts Celsius, Fahrenheit, and Kelvin scales | Temperature value, source scale, target scale | Converted temperature values | UNIVERSAL | Low | PLANNED |
| 223 | Tire Pressure Converter (محول ضغط الهواء والإطارات PSI و Bar) | Converts between PSI, Bar, and kPa for vehicle tire inflation | Pressure value, source unit | Converted pressure | UNIVERSAL | Low | PLANNED |
| 224 | Speed & Velocity Converter (محول وحدات السرعة كم/س وميل/س وعقدة) | Converts km/h, mph, knots, and m/s | Speed value, source unit, target unit | Converted speed | UNIVERSAL | Low | PLANNED |
| 225 | Fuel Economy Units Converter (محول استهلاك الوقود L/100km و MPG و كم/لتر) | Converts between L/100km, US MPG, UK MPG, and km/Liter | Fuel economy rating, source unit | Converted fuel economy ratings | UNIVERSAL | Low | PLANNED |
| 226 | Torque Units Converter (محول عزم الدوران نيوتن متر وقدم باوند) | Converts engine and bolt torque between Nm and lb-ft | Torque value, source unit | Converted torque | UNIVERSAL | Low | PLANNED |
| 227 | Digital Storage Units (محول وحدات التخزين الرقمي بايت وميغا وجيجا وتيرا) | Converts Byte, KB, MB, GB, TB, and PB in binary (1024) and decimal (1000) | Storage value, source unit, standard (1024 vs 1000) | Converted storage units | UNIVERSAL | Low | PLANNED |
| 228 | Power Units (محول وحدات القدرة والطاقة واط وحصان وحراري BTU) | Converts between Watts, Kilowatts, Horsepower, and BTU/hr | Power value, source unit | Converted power | UNIVERSAL | Low | PLANNED |

---

## 17. Cooking & Household (الطبخ والمنزل) — 8 Calculators

| # | Calculator Name | Purpose | Key Inputs | Key Outputs | Country Mode | Implementation Complexity | Status |
|---|---|---|---|---|---|---|---|
| 229 | Recipe Serving Scaler (حاسبة تعديل مقادير الوصفات لعدد الأشخاص) | Scales cooking ingredient quantities up or down by guest count | Original serving count, target serving count, ingredient quantity | Adjusted ingredient quantity | UNIVERSAL | Low | PLANNED |
| 230 | Gram to Cup & Spoon Converter (محول الغرامات إلى أكواب وملاعق معيارية) | Converts ingredient weights to cups/spoons based on density (flour, sugar, oil) | Ingredient type, weight in grams, or volume in cups | Converted measurement | UNIVERSAL | Medium | PLANNED |
| 231 | Baking Cake Pan Resizer (حاسبة تحويل مقاسات قوالب الكيك والصواني) | Adjusts batter volume when changing round or rectangular pan sizes | Original pan diameter/dimensions, new pan diameter/dimensions | Surface area ratio multiplier (e.g. 1.4x) | UNIVERSAL | Low | PLANNED |
| 232 | Oven Temperature Gas Mark Converter (محول درجات حرارة الفرن وغاز مارك) | Converts Celsius, Fahrenheit, and oven Gas Marks (1-9) | Temperature value, source scale | Equivalent oven settings | UNIVERSAL | Low | PLANNED |
| 233 | Food Thawing Time (حاسبة وقت تذويب اللحوم والدواجن المجمدة) | Estimates safe refrigerator and cold water defrosting duration | Meat weight in kg, defrost method (fridge vs water bath) | Safe thawing time in hours | UNIVERSAL | Low | PLANNED |
| 234 | Roast Meat Cooking Time (حاسبة وقت طهي وشواء اللحم والدجاج بالفرن) | Calculates roasting duration by weight and doneness level | Meat type (lamb, beef, poultry), weight in kg, doneness (medium/well-done) | Total oven cooking duration | UNIVERSAL | Low | PLANNED |
| 235 | Coffee Brew Water Ratio (حاسبة نسبة القهوة إلى الماء V60 و إسبريسو) | Calculates golden brew ratio (1:15 to 1:18) for specialty coffee | Coffee dose (grams) or water volume (ml), target ratio | Water required or coffee required | UNIVERSAL | Low | PLANNED |
| 236 | Household Waste Reduction (حاسبة ترشيد وتقليل الهدر المنزلي) | Measures monetary food waste based on expired groceries | Estimated monthly discarded food value, category | Annual wasted spend, reduction benchmark | UNIVERSAL | Low | PLANNED |

---

## 18. Statistics & Science (الإحصاء والعلوم) — 8 Calculators

| # | Calculator Name | Purpose | Key Inputs | Key Outputs | Country Mode | Implementation Complexity | Status |
|---|---|---|---|---|---|---|---|
| 237 | Mean, Median, Mode, Range (حاسبة المتوسط والوسيط والمنوال والمدى) | Calculates central tendency descriptive statistics on a dataset | Comma-separated list of numbers | Mean, Median, Mode, Range, Min, Max | UNIVERSAL | Low | PLANNED |
| 238 | Standard Deviation & Variance (حاسبة الانحراف المعياري والتباين) | Computes sample and population variance and standard deviation | Comma-separated dataset, type (sample vs population) | Variance, Standard Deviation, Sum of Squares | UNIVERSAL | Medium | PLANNED |
| 239 | Probability & Combinations nCr / nPr (حاسبة الاحتمالات والتوافيق والتباديل) | Computes permutations, combinations, and basic odds | n (total items), r (selected items), mode (permutation vs combination) | nPr count, nCr count | UNIVERSAL | Medium | PLANNED |
| 240 | Ohm's Law Voltage, Current, Resistance (حاسبة قانون أوم للكهرباء والفيزياء) | Solves V = I × R and Power P = V × I | Any 2 known values (Voltage, Current, Resistance, Power) | 2 remaining calculated parameters | UNIVERSAL | Low | PLANNED |
| 241 | Z-Score & Normal Distribution (حاسبة الدرجة المعيارية Z والتوزيع الطبيعي) | Calculates standard score Z and percentile rank in bell curve | Raw score x, population mean μ, standard deviation σ | Z-score, percentile ranking | UNIVERSAL | Medium | PLANNED |
| 242 | GPA Cumulative Grade Point Average (حاسبة المعدل التراكمي الجامعي من 4 ومن 5) | Calculates university GPA on 4.0 or 5.0 scale with credit weights | Courses list: letter grade, credit hours | Cumulative GPA, total credit hours, honors grade | COUNTRY_CONFIGURABLE | Medium | PLANNED |
| 243 | Percentile & Quartiles (حاسبة المئينيات والأرباع الإحصائية) | Computes Q1, Q2, Q3 and custom percentiles on dataset | Dataset numbers, target percentile p (e.g. 90th) | Percentile value, Interquartile Range (IQR) | UNIVERSAL | Medium | PLANNED |
| 244 | Kinetic & Potential Energy (حاسبة الطاقة الحركية وطاقة الوضع الفيزيائية) | Computes kinetic energy (0.5 m v²) and gravitational potential (m g h) | Mass (kg), velocity (m/s) or height (m) | Energy in Joules (J) | UNIVERSAL | Low | PLANNED |

---

## Summary of Inventory Metrics
- **Total Master Inventory Calculators Planned:** 244 calculators
- **Core Platform Categories:** 18 distinct categories
- **Currently Implemented & Verified in Initial Batch:** 8 calculators
- **Country Modes Distribution:**
  - `UNIVERSAL`: 138 calculators (56.5%)
  - `COUNTRY_CONFIGURABLE`: 68 calculators (27.9%)
  - `COUNTRY_REGULATED`: 38 calculators (15.6%)

