/**
 * Thailand Tax Calculator 2026 - Universal Bilingual Standalone Application (DE / EN)
 * Works seamlessly via file:/// (direct browser open) and http:// (web server).
 */

(function () {
  'use strict';

  // ==========================================
  // 1. TRANSLATION DICTIONARY (DE / EN)
  // ==========================================

  let currentLang = 'de'; // 'de' or 'en'

  const I18N = {
    de: {
      appTitle: "Thailand Steuer-App",
      appSubtitle: "PIT (Persönliche Einkommensteuer) & CIT (Körperschaftsteuer)",
      lblCurrency: "Währung:",
      lblPrintBtn: "Drucken / PDF",
      lblTabPIT: "Persönliche Einkommensteuer (PIT)",
      lblTabCIT: "Körperschaftsteuer (CIT)",
      lblPresets: "Beispielszenarien:",
      lblPresetsMobile: "Vorlagen:",
      
      // PIT Step 1
      pitStep1Title: "Aufenthaltsstatus, Alter & Visum (2026)",
      lblTaxpayerAge: "Alter des Steuerzahlers:",
      ageSeniorActive: "≥ 65 Jahre (+190.000 ฿ Freibetrag)",
      ageUnder65: "< 65 Jahre (Standard)",
      ageInfoText: "Ab 65 Jahren erhalten Steueransässige in Thailand einen zusätzlichen Freibetrag von 190.000 THB (Sec. 42(17) Revenue Code).",
      lblDaysInThailand: "Tage in Thailand im Steuerjahr:",
      lblSliderMin: "0 Tage (Non-Resident)",
      lblSliderMid: "180 Tage Schwelle",
      lblSliderMax: "365 Tage",
      residencyResident: "Tax Resident (≥ 180 Tage)",
      residencyNonResident: "Non-Resident (< 180 Tage)",
      lblLtrTitle: "Inhaber eines LTR-Visums (Long-Term Resident)",
      lblLtrDesc: "Befreit qualifizierte Kategorien (Wealthy Pensioner, Remote Workers, High-Net-Worth) von der Steuer auf Auslandseinkommen.",
      foreignRuleResident: "Voll steuerpflichtig",
      foreignRuleLtr: "LTR Steuerbefreit",
      foreignRuleNonResident: "Nicht steuerpflichtig",
      foreignNoteResident: "Neuregelung ab 2024/2026: Da Sie ≥ 180 Tage in TH sind, unterliegt jeder Auslandstransfer nach Thailand voll der PIT im Transferjahr (Erwirtschaftungsjahr irrelevant).",
      foreignNoteLtr: "LTR-Visum aktiv: Auslandseinkommen ist von der thailändischen Steuer auf Überweisungen befreit.",
      foreignNoteNonResident: "Als Non-Resident unterliegen nur Einkünfte aus thailändischen Quellen der Steuer. Auslandstransfers sind in TH steuerfrei.",
      
      // PIT Step 2
      pitStep2Title: "Einkommensquellen (Brutto)",
      lblTaxYear: "Jahr 2026",
      lblEmploymentIncome: "Unselbstständige Arbeit (Gehalt / Bonus)",
      badgeEmployment: "50% Abzug (max. 100.000 THB)",
      lblEmpDeduction: "Automatischer Pauschalabzug:",
      lblRentalIncome: "Mieteinnahmen (Immobilien in Thailand)",
      badgeRental: "30% Standardabzug ohne Belege",
      lblRentalDeduction: "Pauschaler 30% Mietkostenabzug:",
      lblForeignIncome: "Nach Thailand transferiertes Auslandseinkommen",
      lblOtherIncome: "Sonstige Inlandseinkünfte (Gewerbe, Zinsen, Honorare)",
      
      // PIT Step 3
      pitStep3Title: "Freibeträge & Sonderabzüge (Allowances)",
      lblPersonalAllowance: "Persönlicher Grundfreibetrag",
      lblPersonalAllowanceDesc: "Steht jedem Steuerzahler automatisch zu",
      lblSeniorAllowance: "Senioren-Freibetrag (ab 65 Jahre)",
      lblSeniorAllowanceDesc: "Zusätzliche Steuerfreistellung für Einwohner ab 65 J.",
      lblSpouse: "Ehepartner (ohne eigenes Einkommen)",
      lblSpouseDesc: "+60.000 THB Freibetrag",
      lblChildren: "Kinder (leiblich/adoptiert)",
      lblChildrenDesc: "30.000 THB je Kind",
      lblParents: "Eltern ab 60 Jahren in Pflege/Unterhalt",
      lblParentsDesc: "30.000 THB je Elternteil (Einkommen ≤ 30.000 THB)",
      lblMoreDeductions: "Weitere Abzüge (Versicherungen, Vorsorge, Spenden)",
      lblSocSec: "Gesetzliche Sozialversicherung Thailand (max. 9.000 THB)",
      lblInsurance: "Kranken- & Lebensversicherung (max. 100.000 THB)",
      lblPension: "Altersvorsorgefonds (RMF / SSF / Provident Fund / ThaiESG)",
      lblDonations: "Spenden an anerkannte Institutionen (max. 10% des Einkommens)",
      
      // CIT
      citStep1Title: "SME-Klassifizierung (KMU-Kriterien)",
      lblPaidUpCapital: "Eingezahltes Stammkapital (Paid-up Capital)",
      lblCapitalLimit: "Limit: ≤ 5.000.000 THB",
      lblAnnualRevenue: "Jahresumsatz (Total Turnover / Revenue)",
      lblRevenueLimit: "Limit: ≤ 30.000.000 THB",
      smeActiveBadge: "SME-Tarif anwendbar (0% / 15% / 20%)",
      smeStandardBadge: "Standard-Tarif (20% pauschal)",
      smeExplanationActive: "<strong>SME-Vorteil aktiv:</strong> Erste 300.000 THB Gewinn steuerfrei, 300k–3 Mio. nur 15%, ab 3 Mio. 20%.",
      smeExplanationNonSme: "<strong>Kein SME-Tarif:</strong> Der Gewinn wird pauschal mit 20% Körperschaftsteuer versteuert.",
      citStep2Title: "Gewinnermittlung (Steuerlicher Reingewinn)",
      btnCitDirect: "Direkter Nettogewinn",
      btnCitBreakdown: "Umsatz minus Ausgaben",
      lblDirectNetProfit: "Steuerlicher Nettogewinn (Net Taxable Profit)",
      lblCitExpenses: "Abzugsfähige Betriebsausgaben",
      lblCalculatedProfit: "Errechneter Gewinn:",

      // Results Dashboard
      lblTaxPayableCard: "Zu zahlende Steuer (2026)",
      lblMonthlyTax: "Monatlicher Steueraufwand:",
      netLabelPIT: "Netto nach Steuern",
      netLabelCIT: "Reingewinn nach Steuern",
      lblMonthlyNet: "Monatliches Netto:",
      lblTaxableBasePIT: "Zu versteuerndes Einkommen:",
      lblTaxableBaseCIT: "Steuerpflichtiger Reingewinn:",
      marginalLabel: "Grenzsteuersatz:",
      smeSavingsLabel: "SME-Ersparnis:",
      nonSmeFlatLabel: "Non-SME (Flat 20%)",
      lblBracketBarTitle: "Progressive Steuerstufen-Auslastung",
      legZero: "0% Steuerfrei",
      lblTableTitle: "Staffelungs-Detailaufstellung (2026)",
      lblTableSub: "Rechtlich bindende Stufen",
      thBracket: "Einkommensstufe",
      thRate: "Steuersatz",
      thTaxable: "In Stufe versteuert",
      thTax: "Steuerbetrag",
      tfTotal: "Gesamtsumme",
      lblChartTitle: "Grafische Aufteilung: Einkommen, Abzüge & Steuer",
      lblChartNet: "Netto-Einkommen",
      lblChartTax: "Steuerlast",
      lblChartDeductions: "Freibeträge & Abzüge",
      lblChartNetProfit: "Reingewinn nach Steuern",
      lblChartCitTax: "Körperschaftsteuer (CIT)",
      lblTipsTitle: "Wichtige Steuerhinweise & Optimierungspotenziale (2026)",
      footerCopy: "© 2026 Thailand Steuer APP • Gemäß Thai Revenue Code Neuregelung",
      footerRates: "Progressive PIT Staffelung (0%–35%) & SME CIT (0%–20%)",

      // Print Report
      printReportTitle: "Thailand Steuer-Berechnungsbericht 2026",
      printReportSubtitlePIT: "Persönliche Einkommensteuer (PIT) 2026",
      printReportSubtitleCIT: "Körperschaftsteuer (CIT) 2026",
      printCreated: "Erstellt am:",
      printTableHeading: "Detaillierte Stufenaufstellung",
      printDisclaimer: "Hinweis: Diese Berechnung dient der Information und Planung nach dem thailändischen Revenue Code 2026. Für verbindliche steuerliche Erklärungen (P.N.D.90 / 91 / 50) wird die Konsultation eines qualifizierten thailändischen Steuerberaters empfohlen."
    },
    en: {
      appTitle: "Thailand Tax App",
      appSubtitle: "PIT (Personal Income Tax) & CIT (Corporate Income Tax)",
      lblCurrency: "Currency:",
      lblPrintBtn: "Print / PDF",
      lblTabPIT: "Personal Income Tax (PIT)",
      lblTabCIT: "Corporate Income Tax (CIT)",
      lblPresets: "Sample Presets:",
      lblPresetsMobile: "Presets:",
      
      // PIT Step 1
      pitStep1Title: "Residency, Age & Visa Status (2026)",
      lblTaxpayerAge: "Taxpayer Age:",
      ageSeniorActive: "≥ 65 Years (+190,000 ฿ Exemption)",
      ageUnder65: "< 65 Years (Standard)",
      ageInfoText: "Tax residents in Thailand aged 65 or older receive an additional personal exemption of 190,000 THB (Sec. 42(17) Revenue Code).",
      lblDaysInThailand: "Days in Thailand during tax year:",
      lblSliderMin: "0 Days (Non-Resident)",
      lblSliderMid: "180 Days Threshold",
      lblSliderMax: "365 Days",
      residencyResident: "Tax Resident (≥ 180 Days)",
      residencyNonResident: "Non-Resident (< 180 Days)",
      lblLtrTitle: "LTR Visa Holder (Long-Term Resident)",
      lblLtrDesc: "Exempts qualified categories (Wealthy Pensioners, Remote Workers, High-Net-Worth) from tax on foreign remitted income.",
      foreignRuleResident: "Fully Taxable",
      foreignRuleLtr: "LTR Tax Exempt",
      foreignRuleNonResident: "Non-Taxable",
      foreignNoteResident: "2024/2026 Rule: Since you stay ≥ 180 days in TH, all foreign income transferred to Thailand is taxable in the remittance year (earning year irrelevant).",
      foreignNoteLtr: "LTR Visa active: Foreign-sourced income remitted to Thailand is fully exempt from Thai personal income tax.",
      foreignNoteNonResident: "As a Non-Resident, only Thai-sourced income is taxed. Foreign transfers to Thailand are tax-free in Thailand.",
      
      // PIT Step 2
      pitStep2Title: "Income Sources (Gross)",
      lblTaxYear: "Tax Year 2026",
      lblEmploymentIncome: "Employment Income (Salary / Bonus)",
      badgeEmployment: "50% Deduction (max 100,000 THB)",
      lblEmpDeduction: "Standard Expense Deduction:",
      lblRentalIncome: "Rental Income (Thai Real Estate)",
      badgeRental: "30% Standard Expense Deduction",
      lblRentalDeduction: "30% Standard Rental Deduction:",
      lblForeignIncome: "Foreign Income Remitted to Thailand",
      lblOtherIncome: "Other Local Income (Business, Interest, Dividends)",
      
      // PIT Step 3
      pitStep3Title: "Allowances & Deductions",
      lblPersonalAllowance: "Personal Basic Allowance",
      lblPersonalAllowanceDesc: "Automatically granted to every taxpayer",
      lblSeniorAllowance: "Senior Citizen Exemption (Age 65+)",
      lblSeniorAllowanceDesc: "Additional income exemption for residents aged 65+",
      lblSpouse: "Spouse (without own income)",
      lblSpouseDesc: "+60,000 THB Allowance",
      lblChildren: "Children (biological/adopted)",
      lblChildrenDesc: "30,000 THB per child",
      lblParents: "Dependent Elderly Parents (60+ yrs)",
      lblParentsDesc: "30,000 THB per parent (income ≤ 30,000 THB)",
      lblMoreDeductions: "Additional Deductions (Insurance, Pension, Donations)",
      lblSocSec: "Thai Social Security Fund (max 9,000 THB)",
      lblInsurance: "Health & Life Insurance (max 100,000 THB)",
      lblPension: "Retirement Funds (RMF / SSF / Provident Fund / ThaiESG)",
      lblDonations: "Charitable Donations (max 10% of net income)",
      
      // CIT
      citStep1Title: "SME Classification (Criteria)",
      lblPaidUpCapital: "Paid-up Capital",
      lblCapitalLimit: "Limit: ≤ 5,000,000 THB",
      lblAnnualRevenue: "Annual Revenue / Turnover",
      lblRevenueLimit: "Limit: ≤ 30,000,000 THB",
      smeActiveBadge: "SME Rates Applicable (0% / 15% / 20%)",
      smeStandardBadge: "Standard Flat Rate (20%)",
      smeExplanationActive: "<strong>SME Benefit Active:</strong> First 300,000 THB profit is tax-free, 300k–3M taxed at 15%, over 3M at 20%.",
      smeExplanationNonSme: "<strong>Standard CIT:</strong> Profit is taxed at the flat corporate income tax rate of 20%.",
      citStep2Title: "Net Profit Calculation",
      btnCitDirect: "Direct Net Profit",
      btnCitBreakdown: "Revenue minus Expenses",
      lblDirectNetProfit: "Net Taxable Profit",
      lblCitExpenses: "Allowable Business Expenses",
      lblCalculatedProfit: "Calculated Profit:",

      // Results Dashboard
      lblTaxPayableCard: "Tax Payable (2026)",
      lblMonthlyTax: "Monthly Tax Burden:",
      netLabelPIT: "Net Income After Tax",
      netLabelCIT: "Net Profit After Tax",
      lblMonthlyNet: "Monthly Net:",
      lblTaxableBasePIT: "Taxable Income:",
      lblTaxableBaseCIT: "Taxable Net Profit:",
      marginalLabel: "Marginal Tax Rate:",
      smeSavingsLabel: "SME Tax Savings:",
      nonSmeFlatLabel: "Non-SME (Flat 20%)",
      lblBracketBarTitle: "Progressive Tax Bracket Utilization",
      legZero: "0% Tax-Free",
      lblTableTitle: "Detailed Tax Bracket Breakdown (2026)",
      lblTableSub: "Statutory Tax Rates",
      thBracket: "Income Bracket",
      thRate: "Tax Rate",
      thTaxable: "Taxable in Bracket",
      thTax: "Tax Amount",
      tfTotal: "Total",
      lblChartTitle: "Visual Breakdown: Income, Deductions & Tax",
      lblChartNet: "Net Income",
      lblChartTax: "Tax Burden",
      lblChartDeductions: "Allowances & Deductions",
      lblChartNetProfit: "Net Profit After Tax",
      lblChartCitTax: "Corporate Tax (CIT)",
      lblTipsTitle: "Key Tax Insights & Optimization Tips (2026)",
      footerCopy: "© 2026 Thailand Tax App • Compliant with Thai Revenue Code Updates",
      footerRates: "Progressive PIT Brackets (0%–35%) & SME CIT (0%–20%)",

      // Print Report
      printReportTitle: "Thailand Tax Assessment Report 2026",
      printReportSubtitlePIT: "Personal Income Tax (PIT) 2026",
      printReportSubtitleCIT: "Corporate Income Tax (CIT) 2026",
      printCreated: "Generated on:",
      printTableHeading: "Detailed Bracket Breakdown",
      printDisclaimer: "Disclaimer: This calculation is for informational and planning purposes under the Thai Revenue Code 2026. For official tax filings (P.N.D.90 / 91 / 50), consultation with a qualified Thai tax professional is recommended."
    }
  };

  // ==========================================
  // 2. TAX ENGINE PARAMETERS & BRACKETS
  // ==========================================

  const PIT_TAX_BRACKETS = [
    { min: 0, max: 150000, rate: 0.00, labelDe: "0 – 150.000 THB", labelEn: "0 – 150,000 THB", maxTaxInBracket: 0 },
    { min: 150000, max: 300000, rate: 0.05, labelDe: "150.001 – 300.000 THB", labelEn: "150,001 – 300,000 THB", maxTaxInBracket: 7500 },
    { min: 300000, max: 500000, rate: 0.10, labelDe: "300.001 – 500.000 THB", labelEn: "300,001 – 500,000 THB", maxTaxInBracket: 20000 },
    { min: 500000, max: 750000, rate: 0.15, labelDe: "500.001 – 750.000 THB", labelEn: "500,001 – 750,000 THB", maxTaxInBracket: 37500 },
    { min: 750000, max: 1000000, rate: 0.20, labelDe: "750.001 – 1.000.000 THB", labelEn: "750,001 – 1,000,000 THB", maxTaxInBracket: 50000 },
    { min: 1000000, max: 2000000, rate: 0.25, labelDe: "1.000.001 – 2.000.000 THB", labelEn: "1,000,001 – 2,000,000 THB", maxTaxInBracket: 250000 },
    { min: 2000000, max: 5000000, rate: 0.30, labelDe: "2.000.001 – 5.000.000 THB", labelEn: "2,000,001 – 5,000,000 THB", maxTaxInBracket: 900000 },
    { min: 5000000, max: Infinity, rate: 0.35, labelDe: "Über 5.000.000 THB", labelEn: "Over 5,000,000 THB", maxTaxInBracket: Infinity }
  ];

  const TAX_CONSTANTS = {
    PERSONAL_ALLOWANCE: 60000,
    SENIOR_ALLOWANCE: 190000, // Age 65+ & Resident (Sec. 42(17) Thai Revenue Code)
    SPOUSE_ALLOWANCE: 60000,
    CHILD_ALLOWANCE_PER_CHILD: 30000,
    PARENT_ALLOWANCE_PER_PARENT: 30000, // Dependent parent aged 60+
    EMPLOYMENT_EXPENSE_RATE: 0.50,
    EMPLOYMENT_EXPENSE_MAX: 100000,
    RENTAL_EXPENSE_RATE: 0.30,
    SME_CAPITAL_LIMIT: 5000000,
    SME_REVENUE_LIMIT: 30000000,
    STANDARD_CIT_RATE: 0.20
  };

  const SME_CIT_BRACKETS = [
    { min: 0, max: 300000, rate: 0.00, labelDe: "0 – 300.000 THB (steuerfrei)", labelEn: "0 – 300,000 THB (Tax-Free)" },
    { min: 300000, max: 3000000, rate: 0.15, labelDe: "300.001 – 3.000.000 THB (15%)", labelEn: "300,001 – 3,000,000 THB (15%)" },
    { min: 3000000, max: Infinity, rate: 0.20, labelDe: "Über 3.000.000 THB (20%)", labelEn: "Over 3,000,000 THB (20%)" }
  ];

  function calculatePIT(params) {
    const age = Number(params.age) || 50;
    const daysInThailand = Number(params.daysInThailand) || 0;
    const hasLtrVisa = Boolean(params.hasLtrVisa);
    const employmentIncome = Math.max(0, Number(params.employmentIncome) || 0);
    const rentalIncome = Math.max(0, Number(params.rentalIncome) || 0);
    const otherLocalIncome = Math.max(0, Number(params.otherLocalIncome) || 0);
    const foreignRemittedIncome = Math.max(0, Number(params.foreignRemittedIncome) || 0);
    const hasSpouse = Boolean(params.hasSpouse);
    const numberOfChildren = Math.max(0, Number(params.numberOfChildren) || 0);
    const numberOfParents = Math.max(0, Number(params.numberOfParents) || 0);
    const socialSecurity = Math.max(0, Number(params.socialSecurity) || 0);
    const lifeHealthInsurance = Math.max(0, Number(params.lifeHealthInsurance) || 0);
    const pensionInvestments = Math.max(0, Number(params.pensionInvestments) || 0);
    const donations = Math.max(0, Number(params.donations) || 0);

    const isTaxResident = daysInThailand >= 180;
    const isSenior = age >= 65;

    let taxableForeignIncome = 0;
    let foreignIncomeStatus = "nicht_steuerpflichtig";
    
    if (isTaxResident) {
      if (hasLtrVisa) {
        taxableForeignIncome = 0;
        foreignIncomeStatus = "ltr_steuerbefreit";
      } else {
        taxableForeignIncome = foreignRemittedIncome;
        foreignIncomeStatus = "steuerpflichtig_resident";
      }
    } else {
      taxableForeignIncome = 0;
      foreignIncomeStatus = "nicht_resident_befreit";
    }

    const totalLocalIncome = employmentIncome + rentalIncome + otherLocalIncome;
    const totalGrossIncome = totalLocalIncome + foreignRemittedIncome;
    const totalAssessableIncome = totalLocalIncome + taxableForeignIncome;

    // 1. Standard Deductions
    const employmentDeduction = Math.min(
      employmentIncome * TAX_CONSTANTS.EMPLOYMENT_EXPENSE_RATE,
      TAX_CONSTANTS.EMPLOYMENT_EXPENSE_MAX
    );
    const rentalDeduction = rentalIncome * TAX_CONSTANTS.RENTAL_EXPENSE_RATE;
    const totalExpenseDeductions = employmentDeduction + rentalDeduction;
    const incomeAfterExpenseDeductions = Math.max(0, totalAssessableIncome - totalExpenseDeductions);

    // 2. Senior Citizen Exemption (Age 65+ & Tax Resident: 190,000 THB)
    const seniorExemption = (isSenior && isTaxResident) ? TAX_CONSTANTS.SENIOR_ALLOWANCE : 0;

    // 3. Personal & Family Allowances
    const personalAllowance = TAX_CONSTANTS.PERSONAL_ALLOWANCE; // 60k
    const spouseAllowanceAmount = hasSpouse ? TAX_CONSTANTS.SPOUSE_ALLOWANCE : 0;
    const childrenAllowanceAmount = numberOfChildren * TAX_CONSTANTS.CHILD_ALLOWANCE_PER_CHILD;
    const parentsAllowanceAmount = numberOfParents * TAX_CONSTANTS.PARENT_ALLOWANCE_PER_PARENT;
    const socialSecurityDeduction = Math.min(socialSecurity, 9000);
    const insuranceDeduction = Math.min(lifeHealthInsurance, 100000);
    const pensionDeduction = pensionInvestments;

    const totalStandardAllowances = personalAllowance + 
      seniorExemption +
      spouseAllowanceAmount + 
      childrenAllowanceAmount + 
      parentsAllowanceAmount +
      socialSecurityDeduction + 
      insuranceDeduction + 
      pensionDeduction;

    const incomeAfterAllowances = Math.max(0, incomeAfterExpenseDeductions - totalStandardAllowances);

    // 4. Donations (capped at 10% of income after allowances)
    const maxAllowedDonations = incomeAfterAllowances * 0.10;
    const actualDonationsDeduction = Math.min(donations, maxAllowedDonations);

    // 5. Net Taxable Income
    const netTaxableIncome = Math.max(0, incomeAfterAllowances - actualDonationsDeduction);

    // 6. Progressive Tax Brackets
    let totalTax = 0;
    const bracketBreakdown = [];

    for (const bracket of PIT_TAX_BRACKETS) {
      const label = currentLang === 'en' ? bracket.labelEn : bracket.labelDe;
      if (netTaxableIncome > bracket.min) {
        const taxableAmountInBracket = Math.min(
          netTaxableIncome - bracket.min,
          bracket.max - bracket.min
        );
        const taxForBracket = taxableAmountInBracket * bracket.rate;
        totalTax += taxForBracket;

        bracketBreakdown.push({
          label: label,
          rate: bracket.rate,
          ratePercent: `${(bracket.rate * 100).toFixed(0)}%`,
          min: bracket.min,
          max: bracket.max,
          taxableAmount: taxableAmountInBracket,
          taxAmount: taxForBracket,
          isActive: true
        });
      } else {
        bracketBreakdown.push({
          label: label,
          rate: bracket.rate,
          ratePercent: `${(bracket.rate * 100).toFixed(0)}%`,
          min: bracket.min,
          max: bracket.max,
          taxableAmount: 0,
          taxAmount: 0,
          isActive: false
        });
      }
    }

    const effectiveTaxRateOnAssessable = totalAssessableIncome > 0 ? (totalTax / totalAssessableIncome) * 100 : 0;
    const effectiveTaxRateOnGross = totalGrossIncome > 0 ? (totalTax / totalGrossIncome) * 100 : 0;
    
    const highestActiveBracket = bracketBreakdown.slice().reverse().find(b => b.taxableAmount > 0) || bracketBreakdown[0];
    const marginalTaxRate = highestActiveBracket ? highestActiveBracket.rate * 100 : 0;

    const netIncomeAfterTax = totalGrossIncome - totalTax;

    return {
      age,
      isSenior,
      isTaxResident,
      hasLtrVisa,
      foreignIncomeStatus,
      incomes: {
        employmentIncome,
        rentalIncome,
        otherLocalIncome,
        foreignRemittedIncome,
        taxableForeignIncome,
        totalLocalIncome,
        totalGrossIncome,
        totalAssessableIncome
      },
      deductions: {
        employmentDeduction,
        rentalDeduction,
        totalExpenseDeductions,
        personalAllowance,
        seniorExemption,
        spouseAllowanceAmount,
        childrenAllowanceAmount,
        parentsAllowanceAmount,
        socialSecurityDeduction,
        insuranceDeduction,
        pensionDeduction,
        totalStandardAllowances,
        actualDonationsDeduction,
        totalAllDeductions: totalExpenseDeductions + totalStandardAllowances + actualDonationsDeduction
      },
      netTaxableIncome,
      totalTax,
      netIncomeAfterTax,
      effectiveTaxRateOnAssessable,
      effectiveTaxRateOnGross,
      marginalTaxRate,
      bracketBreakdown,
      monthly: {
        grossIncome: totalGrossIncome / 12,
        tax: totalTax / 12,
        netIncome: netIncomeAfterTax / 12
      }
    };
  }

  function calculateCIT(params) {
    const paidUpCapital = Math.max(0, Number(params.paidUpCapital) || 0);
    const annualRevenue = Math.max(0, Number(params.annualRevenue) || 0);
    const annualExpenses = Math.max(0, Number(params.annualExpenses) || 0);
    
    let calculatedNetProfit = 0;
    if (params.netProfit !== undefined && params.netProfit !== null && !isNaN(Number(params.netProfit))) {
      calculatedNetProfit = Math.max(0, Number(params.netProfit));
    } else {
      calculatedNetProfit = Math.max(0, annualRevenue - annualExpenses);
    }

    const isSME = paidUpCapital <= TAX_CONSTANTS.SME_CAPITAL_LIMIT && annualRevenue <= TAX_CONSTANTS.SME_REVENUE_LIMIT;

    let totalTax = 0;
    const bracketBreakdown = [];

    if (isSME) {
      for (const bracket of SME_CIT_BRACKETS) {
        const label = currentLang === 'en' ? bracket.labelEn : bracket.labelDe;
        if (calculatedNetProfit > bracket.min) {
          const taxableAmountInBracket = Math.min(
            calculatedNetProfit - bracket.min,
            bracket.max - bracket.min
          );
          const taxForBracket = taxableAmountInBracket * bracket.rate;
          totalTax += taxForBracket;

          bracketBreakdown.push({
            label: label,
            rate: bracket.rate,
            ratePercent: `${(bracket.rate * 100).toFixed(0)}%`,
            min: bracket.min,
            max: bracket.max,
            taxableAmount: taxableAmountInBracket,
            taxAmount: taxForBracket,
            isActive: true
          });
        } else {
          bracketBreakdown.push({
            label: label,
            rate: bracket.rate,
            ratePercent: `${(bracket.rate * 100).toFixed(0)}%`,
            min: bracket.min,
            max: bracket.max,
            taxableAmount: 0,
            taxAmount: 0,
            isActive: false
          });
        }
      }
    } else {
      totalTax = calculatedNetProfit * TAX_CONSTANTS.STANDARD_CIT_RATE;
      bracketBreakdown.push({
        label: currentLang === 'en' ? "Standard Corporate Tax (Non-SME, flat 20%)" : "Standard-Körperschaftsteuer (Non-SME, pauschal 20%)",
        rate: TAX_CONSTANTS.STANDARD_CIT_RATE,
        ratePercent: "20%",
        min: 0,
        max: Infinity,
        taxableAmount: calculatedNetProfit,
        taxAmount: totalTax,
        isActive: true
      });
    }

    const standardTaxWithoutSme = calculatedNetProfit * TAX_CONSTANTS.STANDARD_CIT_RATE;
    const smeTaxSavings = isSME ? Math.max(0, standardTaxWithoutSme - totalTax) : 0;

    const effectiveTaxRateOnProfit = calculatedNetProfit > 0 ? (totalTax / calculatedNetProfit) * 100 : 0;
    const effectiveTaxRateOnRevenue = annualRevenue > 0 ? (totalTax / annualRevenue) * 100 : 0;
    const netProfitAfterTax = calculatedNetProfit - totalTax;

    return {
      paidUpCapital,
      annualRevenue,
      annualExpenses,
      calculatedNetProfit,
      isSME,
      smeReasons: {
        capitalOk: paidUpCapital <= TAX_CONSTANTS.SME_CAPITAL_LIMIT,
        revenueOk: annualRevenue <= TAX_CONSTANTS.SME_REVENUE_LIMIT
      },
      totalTax,
      netProfitAfterTax,
      effectiveTaxRateOnProfit,
      effectiveTaxRateOnRevenue,
      standardTaxWithoutSme,
      smeTaxSavings,
      bracketBreakdown,
      monthly: {
        profit: calculatedNetProfit / 12,
        tax: totalTax / 12,
        netProfit: netProfitAfterTax / 12
      }
    };
  }

  // ==========================================
  // 3. CURRENCY FORMATTING & CONVERSION
  // ==========================================

  const CURRENCY_RATES = {
    THB: 1.0,
    EUR: 0.026,
    USD: 0.028,
    CHF: 0.025,
    GBP: 0.022
  };

  const CURRENCY_SYMBOLS = {
    THB: "฿",
    EUR: "€",
    USD: "$",
    CHF: "CHF",
    GBP: "£"
  };

  let currentCurrency = "THB";

  function setCurrency(currency) {
    if (CURRENCY_RATES[currency]) {
      currentCurrency = currency;
    }
  }

  function getCurrency() {
    return currentCurrency;
  }

  function convertFromTHB(amountInTHB, targetCurrency = currentCurrency) {
    const rate = CURRENCY_RATES[targetCurrency] || 1;
    return amountInTHB * rate;
  }

  function formatCurrency(amount, currency = currentCurrency, showSymbol = true) {
    if (amount === undefined || amount === null || isNaN(amount)) {
      amount = 0;
    }
    const converted = currency === "THB" ? amount : convertFromTHB(amount, currency);
    const symbol = showSymbol ? (CURRENCY_SYMBOLS[currency] || currency) : "";

    const locale = currentLang === 'en' ? 'en-US' : 'de-DE';
    const formattedNum = new Intl.NumberFormat(locale, {
      minimumFractionDigits: currency === "THB" ? 0 : 2,
      maximumFractionDigits: currency === "THB" ? 0 : 2
    }).format(converted);

    if (!showSymbol) return formattedNum;

    return currency === "THB" 
      ? `${formattedNum} ฿` 
      : `${symbol} ${formattedNum}`;
  }

  function formatPercent(rate, decimals = 1) {
    if (rate === undefined || rate === null || isNaN(rate)) return "0.0 %";
    return `${rate.toFixed(decimals)} %`;
  }

  // ==========================================
  // 4. PRESETS (BILINGUAL)
  // ==========================================

  const PRESETS = {
    expat_senior: {
      nameDe: "Expat Senior (70 J., Rente)",
      nameEn: "Expat Senior (70y, Pension)",
      mode: "PIT",
      age: 70,
      days: 200,
      hasLtrVisa: false,
      employment: 0,
      rental: 0,
      other: 0,
      foreign: 1800000,
      hasSpouse: true,
      children: 0,
      parents: 0,
      socialSecurity: 0,
      insurance: 50000,
      pension: 0,
      donations: 0
    },
    expat_50: {
      nameDe: "Expat (50 J., Ausland)",
      nameEn: "Expat (50y, Foreign)",
      mode: "PIT",
      age: 50,
      days: 200,
      hasLtrVisa: false,
      employment: 0,
      rental: 0,
      other: 0,
      foreign: 1800000,
      hasSpouse: true,
      children: 0,
      parents: 0,
      socialSecurity: 0,
      insurance: 50000,
      pension: 0,
      donations: 0
    },
    employee_bangkok: {
      nameDe: "Angestellter Bangkok (35 J.)",
      nameEn: "Bangkok Employee (35y)",
      mode: "PIT",
      age: 35,
      days: 365,
      hasLtrVisa: false,
      employment: 1200000,
      rental: 0,
      other: 0,
      foreign: 0,
      hasSpouse: false,
      children: 1,
      parents: 1,
      socialSecurity: 9000,
      insurance: 50000,
      pension: 100000,
      donations: 10000
    },
    landlord_phuket: {
      nameDe: "Immobilien-Vermieter",
      nameEn: "Property Landlord",
      mode: "PIT",
      age: 58,
      days: 190,
      hasLtrVisa: false,
      employment: 0,
      rental: 800000,
      other: 200000,
      foreign: 0,
      hasSpouse: false,
      children: 0,
      parents: 0,
      socialSecurity: 0,
      insurance: 0,
      pension: 0,
      donations: 0
    },
    digital_nomad_ltr: {
      nameDe: "Digital Nomad (LTR-Visum)",
      nameEn: "Digital Nomad (LTR Visa)",
      mode: "PIT",
      age: 38,
      days: 220,
      hasLtrVisa: true,
      employment: 0,
      rental: 0,
      other: 0,
      foreign: 2500000,
      hasSpouse: false,
      children: 0,
      parents: 0,
      socialSecurity: 0,
      insurance: 0,
      pension: 0,
      donations: 0
    },
    sme_company: {
      nameDe: "SME Thai Co., Ltd.",
      nameEn: "SME Thai Co., Ltd.",
      mode: "CIT",
      paidUpCapital: 2000000,
      annualRevenue: 15000000,
      annualExpenses: 12500000,
      directProfit: 2500000,
      citMethod: 'direct'
    },
    large_enterprise: {
      nameDe: "Großunternehmen (Non-SME)",
      nameEn: "Large Enterprise (Non-SME)",
      mode: "CIT",
      paidUpCapital: 10000000,
      annualRevenue: 45000000,
      annualExpenses: 39000000,
      directProfit: 6000000,
      citMethod: 'direct'
    }
  };

  // Application State
  const state = {
    mode: 'PIT',
    citCalculationMethod: 'direct',
    pitResult: null,
    citResult: null,
    chartInstance: null
  };

  let elements = {};

  function queryElements() {
    elements = {
      // Language buttons
      langDE: document.getElementById('langDE'),
      langEN: document.getElementById('langEN'),

      // App text headers
      appTitle: document.getElementById('appTitle'),
      appSubtitle: document.getElementById('appSubtitle'),
      lblCurrency: document.getElementById('lblCurrency'),
      lblPrintBtn: document.getElementById('lblPrintBtn'),
      lblTabPIT: document.getElementById('lblTabPIT'),
      lblTabCIT: document.getElementById('lblTabCIT'),
      lblPresets: document.getElementById('lblPresets'),
      lblPresetsMobile: document.getElementById('lblPresetsMobile'),

      // Forms
      tabPIT: document.getElementById('tabPIT'),
      tabCIT: document.getElementById('tabCIT'),
      currencySelector: document.getElementById('currencySelector'),
      printBtn: document.getElementById('printBtn'),
      presetsContainer: document.getElementById('presetsContainer'),
      presetsContainerMobile: document.getElementById('presetsContainerMobile'),
      pitFormCard: document.getElementById('pitFormCard'),
      citFormCard: document.getElementById('citFormCard'),

      // PIT Inputs & Labels
      pitStep1Title: document.getElementById('pitStep1Title'),
      taxpayerAge: document.getElementById('taxpayerAge'),
      seniorBadge: document.getElementById('seniorBadge'),
      lblTaxpayerAge: document.getElementById('lblTaxpayerAge'),
      lblAgeInfo: document.getElementById('lblAgeInfo'),
      ageInfoText: document.getElementById('ageInfoText'),
      daysInThailand: document.getElementById('daysInThailand'),
      lblDaysInThailand: document.getElementById('lblDaysInThailand'),
      daysValueDisplay: document.getElementById('daysValueDisplay'),
      lblSliderMin: document.getElementById('lblSliderMin'),
      lblSliderMid: document.getElementById('lblSliderMid'),
      lblSliderMax: document.getElementById('lblSliderMax'),
      residencyBadge: document.getElementById('residencyBadge'),
      hasLtrVisa: document.getElementById('hasLtrVisa'),
      lblLtrTitle: document.getElementById('lblLtrTitle'),
      lblLtrDesc: document.getElementById('lblLtrDesc'),

      pitStep2Title: document.getElementById('pitStep2Title'),
      lblTaxYear: document.getElementById('lblTaxYear'),
      employmentIncome: document.getElementById('employmentIncome'),
      lblEmploymentIncome: document.getElementById('lblEmploymentIncome'),
      badgeEmployment: document.getElementById('badgeEmployment'),
      lblEmpDeduction: document.getElementById('lblEmpDeduction'),
      empDeductionDisplay: document.getElementById('empDeductionDisplay'),
      rentalIncome: document.getElementById('rentalIncome'),
      lblRentalIncome: document.getElementById('lblRentalIncome'),
      badgeRental: document.getElementById('badgeRental'),
      lblRentalDeduction: document.getElementById('lblRentalDeduction'),
      rentalDeductionDisplay: document.getElementById('rentalDeductionDisplay'),
      foreignRemittedIncome: document.getElementById('foreignRemittedIncome'),
      lblForeignIncome: document.getElementById('lblForeignIncome'),
      foreignRuleTag: document.getElementById('foreignRuleTag'),
      foreignIncomeNote: document.getElementById('foreignIncomeNote'),
      foreignNoteText: document.getElementById('foreignNoteText'),
      otherLocalIncome: document.getElementById('otherLocalIncome'),
      lblOtherIncome: document.getElementById('lblOtherIncome'),

      pitStep3Title: document.getElementById('pitStep3Title'),
      totalAllowancesBadge: document.getElementById('totalAllowancesBadge'),
      lblPersonalAllowance: document.getElementById('lblPersonalAllowance'),
      lblPersonalAllowanceDesc: document.getElementById('lblPersonalAllowanceDesc'),
      seniorAllowanceRow: document.getElementById('seniorAllowanceRow'),
      lblSeniorAllowance: document.getElementById('lblSeniorAllowance'),
      lblSeniorAllowanceDesc: document.getElementById('lblSeniorAllowanceDesc'),
      seniorDisplay: document.getElementById('seniorDisplay'),
      hasSpouse: document.getElementById('hasSpouse'),
      lblSpouse: document.getElementById('lblSpouse'),
      lblSpouseDesc: document.getElementById('lblSpouseDesc'),
      spouseDisplay: document.getElementById('spouseDisplay'),
      numberOfChildren: document.getElementById('numberOfChildren'),
      lblChildren: document.getElementById('lblChildren'),
      lblChildrenDesc: document.getElementById('lblChildrenDesc'),
      childrenDisplay: document.getElementById('childrenDisplay'),
      numberOfParents: document.getElementById('numberOfParents'),
      lblParents: document.getElementById('lblParents'),
      lblParentsDesc: document.getElementById('lblParentsDesc'),
      parentsDisplay: document.getElementById('parentsDisplay'),
      lblMoreDeductions: document.getElementById('lblMoreDeductions'),
      socialSecurity: document.getElementById('socialSecurity'),
      lblSocSec: document.getElementById('lblSocSec'),
      lifeHealthInsurance: document.getElementById('lifeHealthInsurance'),
      lblInsurance: document.getElementById('lblInsurance'),
      pensionInvestments: document.getElementById('pensionInvestments'),
      lblPension: document.getElementById('lblPension'),
      donations: document.getElementById('donations'),
      lblDonations: document.getElementById('lblDonations'),

      // CIT Inputs & Labels
      citStep1Title: document.getElementById('citStep1Title'),
      smeStatusBadge: document.getElementById('smeStatusBadge'),
      paidUpCapital: document.getElementById('paidUpCapital'),
      lblPaidUpCapital: document.getElementById('lblPaidUpCapital'),
      lblCapitalLimit: document.getElementById('lblCapitalLimit'),
      annualRevenue: document.getElementById('annualRevenue'),
      lblAnnualRevenue: document.getElementById('lblAnnualRevenue'),
      lblRevenueLimit: document.getElementById('lblRevenueLimit'),
      smeCriteriaExplanation: document.getElementById('smeCriteriaExplanation'),
      smeExplanationText: document.getElementById('smeExplanationText'),
      citStep2Title: document.getElementById('citStep2Title'),
      citModeDirect: document.getElementById('citModeDirect'),
      citModeBreakdown: document.getElementById('citModeBreakdown'),
      citDirectGroup: document.getElementById('citDirectGroup'),
      citBreakdownGroup: document.getElementById('citBreakdownGroup'),
      directNetProfit: document.getElementById('directNetProfit'),
      lblDirectNetProfit: document.getElementById('lblDirectNetProfit'),
      citExpenses: document.getElementById('citExpenses'),
      lblCitExpenses: document.getElementById('lblCitExpenses'),
      lblCalculatedProfit: document.getElementById('lblCalculatedProfit'),
      citCalculatedProfitDisplay: document.getElementById('citCalculatedProfitDisplay'),

      // Dashboard
      lblTaxPayableCard: document.getElementById('lblTaxPayableCard'),
      totalTaxDisplay: document.getElementById('totalTaxDisplay'),
      effectiveRateBadge: document.getElementById('effectiveRateBadge'),
      lblMonthlyTax: document.getElementById('lblMonthlyTax'),
      monthlyTaxDisplay: document.getElementById('monthlyTaxDisplay'),
      netLabel: document.getElementById('netLabel'),
      marginalRateBadge: document.getElementById('marginalRateBadge'),
      netIncomeDisplay: document.getElementById('netIncomeDisplay'),
      lblMonthlyNet: document.getElementById('lblMonthlyNet'),
      monthlyNetDisplay: document.getElementById('monthlyNetDisplay'),
      lblBracketBarTitle: document.getElementById('lblBracketBarTitle'),
      taxableBaseDisplay: document.getElementById('taxableBaseDisplay'),
      bracketProgressBar: document.getElementById('bracketProgressBar'),
      legZero: document.getElementById('legZero'),
      lblTableTitle: document.getElementById('lblTableTitle'),
      lblTableSub: document.getElementById('lblTableSub'),
      thBracket: document.getElementById('thBracket'),
      thRate: document.getElementById('thRate'),
      thTaxable: document.getElementById('thTaxable'),
      thTax: document.getElementById('thTax'),
      bracketTableBody: document.getElementById('bracketTableBody'),
      tfTotal: document.getElementById('tfTotal'),
      tableTotalTaxable: document.getElementById('tableTotalTaxable'),
      tableTotalTax: document.getElementById('tableTotalTax'),
      lblChartTitle: document.getElementById('lblChartTitle'),
      taxChartCanvas: document.getElementById('taxChart'),
      lblTipsTitle: document.getElementById('lblTipsTitle'),
      taxTipsContainer: document.getElementById('taxTipsContainer'),
      footerCopy: document.getElementById('footerCopy'),
      footerRates: document.getElementById('footerRates')
    };
  }

  function init() {
    queryElements();
    setupEventListeners();
    applyLanguage(currentLang);
    renderPresetButtons();
    loadPreset('expat_senior');
    safeCreateIcons();
  }

  function setLanguage(lang) {
    if (lang === 'de' || lang === 'en') {
      currentLang = lang;
      applyLanguage(lang);
      renderPresetButtons();
      recalculate();
    }
  }

  function applyLanguage(lang) {
    const t = I18N[lang] || I18N.de;

    // Toggle button styles
    if (elements.langDE && elements.langEN) {
      if (lang === 'de') {
        elements.langDE.className = "px-2.5 py-1 text-xs font-bold rounded bg-blue-600 text-white transition";
        elements.langEN.className = "px-2.5 py-1 text-xs font-bold rounded text-slate-400 hover:text-white transition";
      } else {
        elements.langEN.className = "px-2.5 py-1 text-xs font-bold rounded bg-blue-600 text-white transition";
        elements.langDE.className = "px-2.5 py-1 text-xs font-bold rounded text-slate-400 hover:text-white transition";
      }
    }

    // Apply header & text
    if (elements.appSubtitle) elements.appSubtitle.textContent = t.appSubtitle;
    if (elements.lblCurrency) elements.lblCurrency.innerHTML = `<i data-lucide="coins" class="w-3.5 h-3.5 mr-1"></i>${t.lblCurrency}`;
    if (elements.lblPrintBtn) elements.lblPrintBtn.textContent = t.lblPrintBtn;
    if (elements.lblTabPIT) elements.lblTabPIT.textContent = t.lblTabPIT;
    if (elements.lblTabCIT) elements.lblTabCIT.textContent = t.lblTabCIT;
    if (elements.lblPresets) elements.lblPresets.textContent = t.lblPresets;
    if (elements.lblPresetsMobile) elements.lblPresetsMobile.textContent = t.lblPresetsMobile;

    // Step 1
    if (elements.pitStep1Title) elements.pitStep1Title.innerHTML = `<span class="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center justify-center font-bold">1</span>${t.pitStep1Title}`;
    if (elements.lblTaxpayerAge) elements.lblTaxpayerAge.textContent = t.lblTaxpayerAge;
    if (elements.ageInfoText) elements.ageInfoText.textContent = t.ageInfoText;
    if (elements.lblDaysInThailand) elements.lblDaysInThailand.textContent = t.lblDaysInThailand;
    if (elements.lblSliderMin) elements.lblSliderMin.textContent = t.lblSliderMin;
    if (elements.lblSliderMid) elements.lblSliderMid.textContent = t.lblSliderMid;
    if (elements.lblSliderMax) elements.lblSliderMax.textContent = t.lblSliderMax;
    if (elements.lblLtrTitle) elements.lblLtrTitle.textContent = t.lblLtrTitle;
    if (elements.lblLtrDesc) elements.lblLtrDesc.textContent = t.lblLtrDesc;

    // Step 2
    if (elements.pitStep2Title) elements.pitStep2Title.innerHTML = `<span class="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center justify-center font-bold">2</span>${t.pitStep2Title}`;
    if (elements.lblTaxYear) elements.lblTaxYear.textContent = t.lblTaxYear;
    if (elements.lblEmploymentIncome) elements.lblEmploymentIncome.textContent = t.lblEmploymentIncome;
    if (elements.badgeEmployment) elements.badgeEmployment.textContent = t.badgeEmployment;
    if (elements.lblEmpDeduction) elements.lblEmpDeduction.textContent = t.lblEmpDeduction;
    if (elements.lblRentalIncome) elements.lblRentalIncome.textContent = t.lblRentalIncome;
    if (elements.badgeRental) elements.badgeRental.textContent = t.badgeRental;
    if (elements.lblRentalDeduction) elements.lblRentalDeduction.textContent = t.lblRentalDeduction;
    if (elements.lblForeignIncome) elements.lblForeignIncome.textContent = t.lblForeignIncome;
    if (elements.lblOtherIncome) elements.lblOtherIncome.textContent = t.lblOtherIncome;

    // Step 3
    if (elements.pitStep3Title) elements.pitStep3Title.innerHTML = `<span class="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center justify-center font-bold">3</span>${t.pitStep3Title}`;
    if (elements.lblPersonalAllowance) elements.lblPersonalAllowance.textContent = t.lblPersonalAllowance;
    if (elements.lblPersonalAllowanceDesc) elements.lblPersonalAllowanceDesc.textContent = t.lblPersonalAllowanceDesc;
    if (elements.lblSeniorAllowance) elements.lblSeniorAllowance.textContent = t.lblSeniorAllowance;
    if (elements.lblSeniorAllowanceDesc) elements.lblSeniorAllowanceDesc.textContent = t.lblSeniorAllowanceDesc;
    if (elements.lblSpouse) elements.lblSpouse.textContent = t.lblSpouse;
    if (elements.lblSpouseDesc) elements.lblSpouseDesc.textContent = t.lblSpouseDesc;
    if (elements.lblChildren) elements.lblChildren.textContent = t.lblChildren;
    if (elements.lblChildrenDesc) elements.lblChildrenDesc.textContent = t.lblChildrenDesc;
    if (elements.lblParents) elements.lblParents.textContent = t.lblParents;
    if (elements.lblParentsDesc) elements.lblParentsDesc.textContent = t.lblParentsDesc;
    if (elements.lblMoreDeductions) elements.lblMoreDeductions.textContent = t.lblMoreDeductions;
    if (elements.lblSocSec) elements.lblSocSec.textContent = t.lblSocSec;
    if (elements.lblInsurance) elements.lblInsurance.textContent = t.lblInsurance;
    if (elements.lblPension) elements.lblPension.textContent = t.lblPension;
    if (elements.lblDonations) elements.lblDonations.textContent = t.lblDonations;

    // CIT
    if (elements.citStep1Title) elements.citStep1Title.innerHTML = `<span class="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center font-bold">1</span>${t.citStep1Title}`;
    if (elements.lblPaidUpCapital) elements.lblPaidUpCapital.textContent = t.lblPaidUpCapital;
    if (elements.lblCapitalLimit) elements.lblCapitalLimit.textContent = t.lblCapitalLimit;
    if (elements.lblAnnualRevenue) elements.lblAnnualRevenue.textContent = t.lblAnnualRevenue;
    if (elements.lblRevenueLimit) elements.lblRevenueLimit.textContent = t.lblRevenueLimit;
    if (elements.citStep2Title) elements.citStep2Title.innerHTML = `<span class="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center font-bold">2</span>${t.citStep2Title}`;
    if (elements.citModeDirect) elements.citModeDirect.textContent = t.btnCitDirect;
    if (elements.citModeBreakdown) elements.citModeBreakdown.textContent = t.btnCitBreakdown;
    if (elements.lblDirectNetProfit) elements.lblDirectNetProfit.textContent = t.lblDirectNetProfit;
    if (elements.lblCitExpenses) elements.lblCitExpenses.textContent = t.lblCitExpenses;
    if (elements.lblCalculatedProfit) elements.lblCalculatedProfit.textContent = t.lblCalculatedProfit;

    // Dashboard
    if (elements.lblTaxPayableCard) elements.lblTaxPayableCard.innerHTML = `<i data-lucide="receipt" class="w-4 h-4 mr-1 inline"></i>${t.lblTaxPayableCard}`;
    if (elements.lblMonthlyTax) elements.lblMonthlyTax.textContent = t.lblMonthlyTax;
    if (elements.netLabel) elements.netLabel.textContent = state.mode === 'PIT' ? t.netLabelPIT : t.netLabelCIT;
    if (elements.lblMonthlyNet) elements.lblMonthlyNet.textContent = t.lblMonthlyNet;
    if (elements.lblBracketBarTitle) elements.lblBracketBarTitle.innerHTML = `<i data-lucide="layers" class="w-4 h-4 text-indigo-400 mr-1 inline"></i>${t.lblBracketBarTitle}`;
    if (elements.legZero) elements.legZero.textContent = t.legZero;
    if (elements.lblTableTitle) elements.lblTableTitle.innerHTML = `<i data-lucide="table" class="w-4 h-4 text-blue-400 mr-1 inline"></i>${t.lblTableTitle}`;
    if (elements.lblTableSub) elements.lblTableSub.textContent = t.lblTableSub;
    if (elements.thBracket) elements.thBracket.textContent = t.thBracket;
    if (elements.thRate) elements.thRate.textContent = t.thRate;
    if (elements.thTaxable) elements.thTaxable.textContent = t.thTaxable;
    if (elements.thTax) elements.thTax.textContent = t.thTax;
    if (elements.tfTotal) elements.tfTotal.textContent = t.tfTotal;
    if (elements.lblChartTitle) elements.lblChartTitle.innerHTML = `<i data-lucide="pie-chart" class="w-4 h-4 text-purple-400 mr-1 inline"></i>${t.lblChartTitle}`;
    if (elements.lblTipsTitle) elements.lblTipsTitle.innerHTML = `<i data-lucide="sparkles" class="w-4 h-4 mr-1 inline"></i>${t.lblTipsTitle}`;
    if (elements.footerCopy) elements.footerCopy.textContent = t.footerCopy;
    if (elements.footerRates) elements.footerRates.textContent = t.footerRates;

    safeCreateIcons();
  }

  function safeCreateIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      try {
        window.lucide.createIcons();
      } catch (e) {
        console.warn('Lucide icons render warning:', e);
      }
    }
  }

  function setupEventListeners() {
    // Language Switcher
    if (elements.langDE) elements.langDE.addEventListener('click', () => setLanguage('de'));
    if (elements.langEN) elements.langEN.addEventListener('click', () => setLanguage('en'));

    // Mode Switch Tabs
    if (elements.tabPIT) elements.tabPIT.addEventListener('click', () => setMode('PIT'));
    if (elements.tabCIT) elements.tabCIT.addEventListener('click', () => setMode('CIT'));

    // Currency Switcher
    if (elements.currencySelector) {
      elements.currencySelector.addEventListener('change', (e) => {
        setCurrency(e.target.value);
        document.querySelectorAll('.currency-label').forEach(el => el.textContent = getCurrency());
        recalculate();
      });
    }

    // Print Action
    if (elements.printBtn) elements.printBtn.addEventListener('click', handlePrint);

    // PIT Input Listeners
    const pitInputs = [
      elements.taxpayerAge,
      elements.employmentIncome,
      elements.rentalIncome,
      elements.foreignRemittedIncome,
      elements.otherLocalIncome,
      elements.numberOfChildren,
      elements.numberOfParents,
      elements.socialSecurity,
      elements.lifeHealthInsurance,
      elements.pensionInvestments,
      elements.donations
    ];

    pitInputs.forEach(input => {
      if (input) {
        input.addEventListener('input', recalculate);
        input.addEventListener('change', recalculate);
        input.addEventListener('keyup', recalculate);
        input.addEventListener('focus', (e) => {
          if (e.target.value === '0') e.target.select();
        });
      }
    });

    if (elements.daysInThailand) {
      elements.daysInThailand.addEventListener('input', (e) => {
        const d = e.target.value;
        const daysUnit = currentLang === 'en' ? 'Days' : 'Tage';
        if (elements.daysValueDisplay) elements.daysValueDisplay.textContent = `${d} ${daysUnit}`;
        updateResidencyStatus(parseInt(d) || 0);
        recalculate();
      });
      elements.daysInThailand.addEventListener('change', recalculate);
    }

    if (elements.hasLtrVisa) elements.hasLtrVisa.addEventListener('change', recalculate);
    if (elements.hasSpouse) elements.hasSpouse.addEventListener('change', recalculate);

    // CIT Input Listeners
    const citInputs = [
      elements.paidUpCapital,
      elements.annualRevenue,
      elements.directNetProfit,
      elements.citExpenses
    ];

    citInputs.forEach(input => {
      if (input) {
        input.addEventListener('input', recalculate);
        input.addEventListener('change', recalculate);
        input.addEventListener('keyup', recalculate);
        input.addEventListener('focus', (e) => {
          if (e.target.value === '0') e.target.select();
        });
      }
    });

    if (elements.citModeDirect) {
      elements.citModeDirect.addEventListener('click', () => {
        state.citCalculationMethod = 'direct';
        elements.citModeDirect.className = "flex-1 py-1.5 rounded-md bg-blue-600 text-white font-semibold transition";
        elements.citModeBreakdown.className = "flex-1 py-1.5 rounded-md text-slate-400 hover:text-slate-200 transition";
        if (elements.citDirectGroup) elements.citDirectGroup.classList.remove('hidden');
        if (elements.citBreakdownGroup) elements.citBreakdownGroup.classList.add('hidden');
        recalculate();
      });
    }

    if (elements.citModeBreakdown) {
      elements.citModeBreakdown.addEventListener('click', () => {
        state.citCalculationMethod = 'breakdown';
        elements.citModeBreakdown.className = "flex-1 py-1.5 rounded-md bg-blue-600 text-white font-semibold transition";
        elements.citModeDirect.className = "flex-1 py-1.5 rounded-md text-slate-400 hover:text-slate-200 transition";
        if (elements.citDirectGroup) elements.citDirectGroup.classList.add('hidden');
        if (elements.citBreakdownGroup) elements.citBreakdownGroup.classList.remove('hidden');
        recalculate();
      });
    }
  }

  function setMode(mode) {
    const t = I18N[currentLang] || I18N.de;
    state.mode = mode;
    if (mode === 'PIT') {
      if (elements.tabPIT) elements.tabPIT.className = "flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 bg-blue-600 text-white shadow-md";
      if (elements.tabCIT) elements.tabCIT.className = "flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 text-slate-400 hover:text-slate-200";
      if (elements.pitFormCard) elements.pitFormCard.classList.remove('hidden');
      if (elements.citFormCard) elements.citFormCard.classList.add('hidden');
      if (elements.netLabel) elements.netLabel.textContent = t.netLabelPIT;
    } else {
      if (elements.tabCIT) elements.tabCIT.className = "flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 bg-emerald-600 text-white shadow-md";
      if (elements.tabPIT) elements.tabPIT.className = "flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 text-slate-400 hover:text-slate-200";
      if (elements.citFormCard) elements.citFormCard.classList.remove('hidden');
      if (elements.pitFormCard) elements.pitFormCard.classList.add('hidden');
      if (elements.netLabel) elements.netLabel.textContent = t.netLabelCIT;
    }
    recalculate();
  }

  function renderPresetButtons() {
    const container = elements.presetsContainer;
    const mobileContainer = elements.presetsContainerMobile;
    if (!container && !mobileContainer) return;

    if (container) container.innerHTML = '';
    if (mobileContainer) mobileContainer.innerHTML = '';

    Object.entries(PRESETS).forEach(([key, preset]) => {
      const name = currentLang === 'en' ? preset.nameEn : preset.nameDe;
      const btn = document.createElement('button');
      btn.className = "px-2.5 py-1 text-xs font-medium bg-slate-800/90 hover:bg-blue-600/30 text-slate-300 hover:text-blue-300 rounded-lg border border-slate-700/80 transition whitespace-nowrap";
      btn.textContent = name;
      btn.onclick = () => loadPreset(key);
      if (container) container.appendChild(btn);

      if (mobileContainer) {
        const mBtn = btn.cloneNode(true);
        mBtn.onclick = () => loadPreset(key);
        mobileContainer.appendChild(mBtn);
      }
    });
  }

  function loadPreset(presetKey) {
    const preset = PRESETS[presetKey];
    if (!preset) return;

    setMode(preset.mode);

    if (preset.mode === 'PIT') {
      if (elements.taxpayerAge) elements.taxpayerAge.value = preset.age || 50;
      if (elements.daysInThailand) elements.daysInThailand.value = preset.days;
      const daysUnit = currentLang === 'en' ? 'Days' : 'Tage';
      if (elements.daysValueDisplay) elements.daysValueDisplay.textContent = `${preset.days} ${daysUnit}`;
      if (elements.hasLtrVisa) elements.hasLtrVisa.checked = preset.hasLtrVisa;
      if (elements.employmentIncome) elements.employmentIncome.value = preset.employment;
      if (elements.rentalIncome) elements.rentalIncome.value = preset.rental;
      if (elements.foreignRemittedIncome) elements.foreignRemittedIncome.value = preset.foreign;
      if (elements.otherLocalIncome) elements.otherLocalIncome.value = preset.other;
      if (elements.hasSpouse) elements.hasSpouse.checked = preset.hasSpouse;
      if (elements.numberOfChildren) elements.numberOfChildren.value = preset.children;
      if (elements.numberOfParents) elements.numberOfParents.value = preset.parents || 0;
      if (elements.socialSecurity) elements.socialSecurity.value = preset.socialSecurity;
      if (elements.lifeHealthInsurance) elements.lifeHealthInsurance.value = preset.insurance;
      if (elements.pensionInvestments) elements.pensionInvestments.value = preset.pension;
      if (elements.donations) elements.donations.value = preset.donations;
      updateResidencyStatus(preset.days);
    } else {
      if (elements.paidUpCapital) elements.paidUpCapital.value = preset.paidUpCapital;
      if (elements.annualRevenue) elements.annualRevenue.value = preset.annualRevenue;
      if (elements.directNetProfit) elements.directNetProfit.value = preset.directProfit;
      if (elements.citExpenses) elements.citExpenses.value = preset.annualExpenses;
      if (preset.citMethod === 'breakdown') {
        if (elements.citModeBreakdown) elements.citModeBreakdown.click();
      } else {
        if (elements.citModeDirect) elements.citModeDirect.click();
      }
    }

    recalculate();
  }

  function updateResidencyStatus(days) {
    const t = I18N[currentLang] || I18N.de;
    const isResident = days >= 180;
    const hasLtr = elements.hasLtrVisa ? elements.hasLtrVisa.checked : false;

    if (isResident) {
      if (elements.residencyBadge) {
        elements.residencyBadge.textContent = t.residencyResident;
        elements.residencyBadge.className = "text-xs px-2.5 py-1 rounded-full font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
      }
      
      if (hasLtr) {
        if (elements.foreignRuleTag) {
          elements.foreignRuleTag.textContent = t.foreignRuleLtr;
          elements.foreignRuleTag.className = "text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20";
        }
        if (elements.foreignNoteText) {
          elements.foreignNoteText.textContent = t.foreignNoteLtr;
        }
      } else {
        if (elements.foreignRuleTag) {
          elements.foreignRuleTag.textContent = t.foreignRuleResident;
          elements.foreignRuleTag.className = "text-[11px] text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20";
        }
        if (elements.foreignNoteText) {
          elements.foreignNoteText.textContent = t.foreignNoteResident;
        }
      }
    } else {
      if (elements.residencyBadge) {
        elements.residencyBadge.textContent = t.residencyNonResident;
        elements.residencyBadge.className = "text-xs px-2.5 py-1 rounded-full font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30";
      }
      if (elements.foreignRuleTag) {
        elements.foreignRuleTag.textContent = t.foreignRuleNonResident;
        elements.foreignRuleTag.className = "text-[11px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20";
      }
      if (elements.foreignNoteText) {
        elements.foreignNoteText.textContent = t.foreignNoteNonResident;
      }
    }
  }

  function recalculate() {
    try {
      if (state.mode === 'PIT') {
        runPITCalculation();
      } else {
        runCITCalculation();
      }
      safeCreateIcons();
    } catch (err) {
      console.error('Calculation error:', err);
    }
  }

  function runPITCalculation() {
    const t = I18N[currentLang] || I18N.de;
    const age = parseInt(elements.taxpayerAge ? elements.taxpayerAge.value : 50) || 50;
    const days = parseInt(elements.daysInThailand ? elements.daysInThailand.value : 180) || 0;
    const hasLtr = elements.hasLtrVisa ? elements.hasLtrVisa.checked : false;
    const emp = parseFloat(elements.employmentIncome ? elements.employmentIncome.value : 0) || 0;
    const rental = parseFloat(elements.rentalIncome ? elements.rentalIncome.value : 0) || 0;
    const foreign = parseFloat(elements.foreignRemittedIncome ? elements.foreignRemittedIncome.value : 0) || 0;
    const other = parseFloat(elements.otherLocalIncome ? elements.otherLocalIncome.value : 0) || 0;
    const spouse = elements.hasSpouse ? elements.hasSpouse.checked : false;
    const children = parseInt(elements.numberOfChildren ? elements.numberOfChildren.value : 0) || 0;
    const parents = parseInt(elements.numberOfParents ? elements.numberOfParents.value : 0) || 0;
    const socSec = parseFloat(elements.socialSecurity ? elements.socialSecurity.value : 0) || 0;
    const insurance = parseFloat(elements.lifeHealthInsurance ? elements.lifeHealthInsurance.value : 0) || 0;
    const pension = parseFloat(elements.pensionInvestments ? elements.pensionInvestments.value : 0) || 0;
    const donations = parseFloat(elements.donations ? elements.donations.value : 0) || 0;

    // Update Age Badge
    if (elements.seniorBadge) {
      if (age >= 65) {
        elements.seniorBadge.textContent = t.ageSeniorActive;
        elements.seniorBadge.className = "text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30";
      } else {
        elements.seniorBadge.textContent = t.ageUnder65;
        elements.seniorBadge.className = "text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700";
      }
    }

    updateResidencyStatus(days);

    const result = calculatePIT({
      age,
      daysInThailand: days,
      hasLtrVisa: hasLtr,
      employmentIncome: emp,
      rentalIncome: rental,
      foreignRemittedIncome: foreign,
      otherLocalIncome: other,
      hasSpouse: spouse,
      numberOfChildren: children,
      numberOfParents: parents,
      socialSecurity: socSec,
      lifeHealthInsurance: insurance,
      pensionInvestments: pension,
      donations: donations
    });

    state.pitResult = result;

    // Update Deduction displays
    if (elements.empDeductionDisplay) elements.empDeductionDisplay.textContent = formatCurrency(result.deductions.employmentDeduction);
    if (elements.rentalDeductionDisplay) elements.rentalDeductionDisplay.textContent = formatCurrency(result.deductions.rentalDeduction);
    if (elements.seniorDisplay) {
      elements.seniorDisplay.textContent = formatCurrency(result.deductions.seniorExemption);
      if (result.deductions.seniorExemption > 0) {
        elements.seniorDisplay.className = "text-xs font-bold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded border border-purple-500/20";
      } else {
        elements.seniorDisplay.className = "text-xs font-semibold text-slate-500";
      }
    }
    if (elements.spouseDisplay) elements.spouseDisplay.textContent = spouse ? formatCurrency(60000) : "0 ฿";
    if (elements.childrenDisplay) elements.childrenDisplay.textContent = formatCurrency(result.deductions.childrenAllowanceAmount);
    if (elements.parentsDisplay) elements.parentsDisplay.textContent = formatCurrency(result.deductions.parentsAllowanceAmount);
    if (elements.totalAllowancesBadge) elements.totalAllowancesBadge.textContent = `${formatCurrency(result.deductions.totalStandardAllowances)}`;

    // Update Top Metric KPI Cards
    if (elements.totalTaxDisplay) elements.totalTaxDisplay.textContent = formatCurrency(result.totalTax);
    if (elements.effectiveRateBadge) elements.effectiveRateBadge.textContent = `${formatPercent(result.effectiveTaxRateOnAssessable)} eff.`;
    if (elements.monthlyTaxDisplay) elements.monthlyTaxDisplay.textContent = `${formatCurrency(result.monthly.tax)} / Mo.`;
    if (elements.netIncomeDisplay) elements.netIncomeDisplay.textContent = formatCurrency(result.netIncomeAfterTax);
    if (elements.marginalRateBadge) elements.marginalRateBadge.textContent = `${t.marginalLabel} ${formatPercent(result.marginalTaxRate, 0)}`;
    if (elements.monthlyNetDisplay) elements.monthlyNetDisplay.textContent = `${formatCurrency(result.monthly.netIncome)} / Mo.`;
    if (elements.taxableBaseDisplay) elements.taxableBaseDisplay.textContent = `${t.lblTaxableBasePIT} ${formatCurrency(result.netTaxableIncome)}`;

    // Visual Progress Bar & Table
    renderBracketProgressBar(result.bracketBreakdown, result.netTaxableIncome);
    renderBracketTable(result.bracketBreakdown, result.netTaxableIncome, result.totalTax);
    renderChartPIT(result);
    renderTaxTipsPIT(result);
  }

  function runCITCalculation() {
    const t = I18N[currentLang] || I18N.de;
    const capital = parseFloat(elements.paidUpCapital ? elements.paidUpCapital.value : 0) || 0;
    const revenue = parseFloat(elements.annualRevenue ? elements.annualRevenue.value : 0) || 0;
    const expenses = parseFloat(elements.citExpenses ? elements.citExpenses.value : 0) || 0;
    
    let netProfitVal = 0;
    if (state.citCalculationMethod === 'direct') {
      netProfitVal = parseFloat(elements.directNetProfit ? elements.directNetProfit.value : 0) || 0;
    } else {
      netProfitVal = Math.max(0, revenue - expenses);
      if (elements.citCalculatedProfitDisplay) elements.citCalculatedProfitDisplay.textContent = formatCurrency(netProfitVal);
    }

    const result = calculateCIT({
      paidUpCapital: capital,
      annualRevenue: revenue,
      netProfit: netProfitVal,
      annualExpenses: expenses
    });

    state.citResult = result;

    if (result.isSME) {
      if (elements.smeStatusBadge) {
        elements.smeStatusBadge.textContent = t.smeActiveBadge;
        elements.smeStatusBadge.className = "text-xs px-2.5 py-1 rounded-full font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
      }
      if (elements.smeCriteriaExplanation) {
        elements.smeCriteriaExplanation.className = "text-xs p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300";
        elements.smeCriteriaExplanation.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4 inline mr-1 text-emerald-400"></i>${t.smeExplanationActive} ${t.smeSavingsLabel} <strong>${formatCurrency(result.smeTaxSavings)}</strong>.`;
      }
    } else {
      if (elements.smeStatusBadge) {
        elements.smeStatusBadge.textContent = t.smeStandardBadge;
        elements.smeStatusBadge.className = "text-xs px-2.5 py-1 rounded-full font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30";
      }
      if (elements.smeCriteriaExplanation) {
        elements.smeCriteriaExplanation.className = "text-xs p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300";
        elements.smeCriteriaExplanation.innerHTML = `<i data-lucide="alert-circle" class="w-4 h-4 inline mr-1 text-amber-400"></i>${t.smeExplanationNonSme}`;
      }
    }

    if (elements.totalTaxDisplay) elements.totalTaxDisplay.textContent = formatCurrency(result.totalTax);
    if (elements.effectiveRateBadge) elements.effectiveRateBadge.textContent = `${formatPercent(result.effectiveTaxRateOnProfit)} eff.`;
    if (elements.monthlyTaxDisplay) elements.monthlyTaxDisplay.textContent = `${formatCurrency(result.monthly.tax)} / Mo.`;
    if (elements.netIncomeDisplay) elements.netIncomeDisplay.textContent = formatCurrency(result.netProfitAfterTax);
    if (elements.marginalRateBadge) {
      elements.marginalRateBadge.textContent = result.isSME 
        ? `${t.smeSavingsLabel} ${formatCurrency(result.smeTaxSavings)}` 
        : t.nonSmeFlatLabel;
    }
    if (elements.monthlyNetDisplay) elements.monthlyNetDisplay.textContent = `${formatCurrency(result.monthly.netProfit)} / Mo.`;
    if (elements.taxableBaseDisplay) elements.taxableBaseDisplay.textContent = `${t.lblTaxableBaseCIT} ${formatCurrency(result.calculatedNetProfit)}`;

    renderBracketProgressBar(result.bracketBreakdown, result.calculatedNetProfit);
    renderBracketTable(result.bracketBreakdown, result.calculatedNetProfit, result.totalTax);
    renderChartCIT(result);
    renderTaxTipsCIT(result);
  }

  function renderBracketProgressBar(brackets, totalTaxable) {
    const container = elements.bracketProgressBar;
    if (!container) return;
    container.innerHTML = '';

    if (totalTaxable <= 0) {
      const msg = currentLang === 'en' ? 'No taxable amount' : 'Kein zu versteuernder Betrag';
      container.innerHTML = `<div class="w-full h-full bg-slate-800/80 rounded flex items-center justify-center text-[10px] text-slate-500">${msg}</div>`;
      return;
    }

    const activeBrackets = brackets.filter(b => b.taxableAmount > 0);
    const colorMap = [
      'bg-emerald-500',
      'bg-blue-500',
      'bg-indigo-500',
      'bg-cyan-500',
      'bg-amber-500',
      'bg-orange-500',
      'bg-rose-500',
      'bg-red-600'
    ];

    activeBrackets.forEach((b, idx) => {
      const percentage = Math.max(2, (b.taxableAmount / totalTaxable) * 100);
      const seg = document.createElement('div');
      seg.className = `h-full rounded-sm ${colorMap[idx % colorMap.length]} transition-all duration-300`;
      seg.style.width = `${percentage}%`;
      seg.title = `${b.label}: ${formatCurrency(b.taxableAmount)} (${b.ratePercent})`;
      container.appendChild(seg);
    });
  }

  function renderBracketTable(brackets, totalTaxable, totalTax) {
    const tbody = elements.bracketTableBody;
    if (!tbody) return;
    tbody.innerHTML = '';

    brackets.forEach(b => {
      const row = document.createElement('tr');
      const isActive = b.taxableAmount > 0;
      row.className = isActive ? "bg-slate-800/40 text-slate-200" : "text-slate-500";

      row.innerHTML = `
        <td class="py-2.5 px-3 font-medium flex items-center gap-2">
          <span class="w-2 h-2 rounded-full ${isActive ? 'bg-blue-400' : 'bg-slate-700'}"></span>
          ${b.label}
        </td>
        <td class="py-2.5 px-3 text-center font-semibold ${isActive ? 'text-blue-400' : ''}">
          ${b.ratePercent}
        </td>
        <td class="py-2.5 px-3 text-right">
          ${formatCurrency(b.taxableAmount)}
        </td>
        <td class="py-2.5 px-3 text-right font-bold ${isActive && b.taxAmount > 0 ? 'text-rose-400' : ''}">
          ${formatCurrency(b.taxAmount)}
        </td>
      `;
      tbody.appendChild(row);
    });

    if (elements.tableTotalTaxable) elements.tableTotalTaxable.textContent = formatCurrency(totalTaxable);
    if (elements.tableTotalTax) elements.tableTotalTax.textContent = formatCurrency(totalTax);
  }

  function renderChartPIT(result) {
    if (!elements.taxChartCanvas || typeof Chart === 'undefined') return;

    if (state.chartInstance) {
      state.chartInstance.destroy();
      state.chartInstance = null;
    }

    try {
      const ctx = elements.taxChartCanvas.getContext('2d');
      const gross = result.incomes.totalGrossIncome;
      const deductions = result.deductions.totalAllDeductions;
      const tax = result.totalTax;
      const net = result.netIncomeAfterTax;

      const t = I18N[currentLang] || I18N.de;

      state.chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: [t.lblChartNet, t.lblChartTax, t.lblChartDeductions],
          datasets: [{
            data: [
              Math.max(0, net),
              Math.max(0, tax),
              Math.min(gross, deductions)
            ],
            backgroundColor: [
              '#10b981',
              '#f43f5e',
              '#3b82f6'
            ],
            borderWidth: 2,
            borderColor: '#0f172a'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#94a3b8',
                font: { size: 11, family: 'Inter' },
                padding: 15
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const val = context.raw;
                  const total = gross > 0 ? gross : 1;
                  const pct = ((val / total) * 100).toFixed(1);
                  return ` ${context.label}: ${formatCurrency(val)} (${pct}%)`;
                }
              }
            }
          },
          cutout: '70%'
        }
      });
    } catch (e) {
      console.warn('Chart render error:', e);
    }
  }

  function renderChartCIT(result) {
    if (!elements.taxChartCanvas || typeof Chart === 'undefined') return;

    if (state.chartInstance) {
      state.chartInstance.destroy();
      state.chartInstance = null;
    }

    try {
      const ctx = elements.taxChartCanvas.getContext('2d');
      const profit = result.calculatedNetProfit;
      const tax = result.totalTax;
      const netProfit = result.netProfitAfterTax;

      const t = I18N[currentLang] || I18N.de;

      state.chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: [t.lblChartNetProfit, t.lblChartCitTax],
          datasets: [{
            data: [
              Math.max(0, netProfit),
              Math.max(0, tax)
            ],
            backgroundColor: [
              '#10b981',
              '#f43f5e'
            ],
            borderWidth: 2,
            borderColor: '#0f172a'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#94a3b8',
                font: { size: 11, family: 'Inter' },
                padding: 15
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const val = context.raw;
                  const pct = profit > 0 ? ((val / profit) * 100).toFixed(1) : 0;
                  return ` ${context.label}: ${formatCurrency(val)} (${pct}%)`;
                }
              }
            }
          },
          cutout: '70%'
        }
      });
    } catch (e) {
      console.warn('Chart render error:', e);
    }
  }

  function renderTaxTipsPIT(result) {
    const container = elements.taxTipsContainer;
    if (!container) return;
    container.innerHTML = '';

    const tips = [];
    const isDe = currentLang === 'de';

    // Tip 1: Senior Exemption Info
    if (result.isSenior && result.isTaxResident) {
      tips.push({
        icon: 'award',
        color: 'text-purple-400',
        title: isDe ? 'Senioren-Freibetrag (65+) aktiv' : 'Senior Exemption (65+) Active',
        text: isDe 
          ? `Als über 65-jähriger Steueransässiger erhalten Sie automatisch die volle Steuerfreistellung von 190.000 THB (Section 42(17) Thai Revenue Code). Ihr steuerfreies Basiseinkommen liegt somit bei 400.000 THB (60k Grundfreibetrag + 190k Seniorenfreibetrag + 150k 0%-Stufe).`
          : `As a tax resident aged 65 or older, you automatically receive the 190,000 THB senior citizen exemption (Section 42(17) Revenue Code). Your effective tax-free threshold is 400,000 THB (60k personal + 190k senior + 150k zero bracket).`
      });
    } else if (!result.isSenior && result.age >= 50) {
      tips.push({
        icon: 'info',
        color: 'text-blue-400',
        title: isDe ? 'Altersstaffelung: 50 vs. 70 Jahre' : 'Age Tiering: 50 vs. 70 Years',
        text: isDe
          ? `Ein 50-jähriger Steuerzahler erhält den Standardfreibetrag von 60.000 THB. Sobald Sie das 65. Lebensjahr erreichen, erhöht sich dieser durch die Senioren-Befreiung auf insgesamt 250.000 THB (+190.000 THB).`
          : `A 50-year-old taxpayer receives the standard 60,000 THB allowance. Upon reaching age 65, the senior exemption increases your base deductions to 250,000 THB (+190,000 THB).`
      });
    }

    // Tip 2: Foreign Remittance & LTR
    if (result.isTaxResident && result.incomes.foreignRemittedIncome > 0 && !result.hasLtrVisa) {
      tips.push({
        icon: 'alert-triangle',
        color: 'text-amber-400',
        title: isDe ? 'Neuregelung Auslandseinkommen 2026' : 'Foreign Remittance Rule 2026',
        text: isDe 
          ? 'Da Sie Tax Resident sind (≥ 180 Tage), wird nach Thailand überwiesenes Auslandseinkommen voll versteuert. Prüfen Sie das LTR-Visum für vollständige Steuerbefreiung.'
          : 'As a Tax Resident (≥ 180 days), foreign income remitted to Thailand is subject to full PIT. Consider the LTR Visa for total tax exemption on remitted income.'
      });
    } else if (!result.isTaxResident && result.incomes.foreignRemittedIncome > 0) {
      tips.push({
        icon: 'check-circle-2',
        color: 'text-emerald-400',
        title: isDe ? 'Non-Resident Status (< 180 Tage)' : 'Non-Resident Status (< 180 Days)',
        text: isDe
          ? 'Ihr Aufenthalt liegt unter 180 Tagen. Nach Thailand transferierte Auslandsgelder lösen nach thailändischem Steuerrecht keine persönliche Einkommensteuer aus.'
          : 'Your stay is under 180 days. Foreign funds transferred into Thailand are non-taxable under Thai tax law.'
      });
    }

    // Tip 3: Insurance & Pensions
    if (result.deductions.insuranceDeduction === 0) {
      tips.push({
        icon: 'shield-plus',
        color: 'text-blue-400',
        title: isDe ? 'Versicherungs-Freibetrag ungenutzt' : 'Insurance Allowance Unused',
        text: isDe
          ? 'Beiträge zu Kranken- und Lebensversicherungen in Thailand können bis zu 100.000 THB steuermindernd geltend gemacht werden.'
          : 'Premiums for Thai health and life insurance policies can be deducted up to 100,000 THB.'
      });
    }

    if (result.deductions.pensionDeduction === 0 && result.netTaxableIncome > 500000) {
      tips.push({
        icon: 'piggy-bank',
        color: 'text-purple-400',
        title: isDe ? 'Altersvorsorgefonds (RMF / SSF / ThaiESG)' : 'Retirement Funds (RMF / SSF / ThaiESG)',
        text: isDe
          ? 'Investitionen in thailändische Altersvorsorgefonds (RMF, SSF oder ThaiESG) können das zu versteuernde Einkommen spürbar senken.'
          : 'Investments in qualifying Thai retirement funds (RMF, SSF, ThaiESG) provide significant tax deductions.'
      });
    }

    tips.forEach(t => {
      const card = document.createElement('div');
      card.className = "flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800";
      card.innerHTML = `
        <i data-lucide="${t.icon}" class="w-4 h-4 mt-0.5 flex-shrink-0 ${t.color}"></i>
        <div>
          <span class="font-semibold text-slate-200">${t.title}:</span>
          <span class="text-slate-400 ml-1">${t.text}</span>
        </div>
      `;
      container.appendChild(card);
    });
  }

  function renderTaxTipsCIT(result) {
    const container = elements.taxTipsContainer;
    if (!container) return;
    container.innerHTML = '';

    const tips = [];
    const isDe = currentLang === 'de';

    if (result.isSME) {
      tips.push({
        icon: 'check-circle-2',
        color: 'text-emerald-400',
        title: isDe ? 'SME-Steuerersparnis voll aktiv' : 'SME Tax Benefit Active',
        text: isDe
          ? `Ihr Unternehmen spart durch die SME-Staffelung (0% bis 300k, 15% bis 3M) aktuell ${formatCurrency(result.smeTaxSavings)} im Vergleich zur regulären Körperschaftsteuer (20%).`
          : `Your company currently saves ${formatCurrency(result.smeTaxSavings)} via SME progressive brackets (0% up to 300k, 15% up to 3M) compared to standard 20% CIT.`
      });
    } else {
      tips.push({
        icon: 'trending-up',
        color: 'text-amber-400',
        title: isDe ? 'Standard-Körperschaftsteuer (20%)' : 'Standard CIT Rate (20%)',
        text: isDe
          ? 'Da Kapital > 5 Mio. THB oder Umsatz > 30 Mio. THB liegt, greift der reguläre Satz von 20%. Prüfen Sie BOI-Förderungen für Steuerprivilegien.'
          : 'As capital > 5M THB or revenue > 30M THB, standard 20% flat CIT applies. Check Board of Investment (BOI) incentives for potential exemptions.'
      });
    }

    tips.forEach(t => {
      const card = document.createElement('div');
      card.className = "flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800";
      card.innerHTML = `
        <i data-lucide="${t.icon}" class="w-4 h-4 mt-0.5 flex-shrink-0 ${t.color}"></i>
        <div>
          <span class="font-semibold text-slate-200">${t.title}:</span>
          <span class="text-slate-400 ml-1">${t.text}</span>
        </div>
      `;
      container.appendChild(card);
    });
  }

  function handlePrint() {
    const t = I18N[currentLang] || I18N.de;
    const now = new Date();
    const locale = currentLang === 'en' ? 'en-US' : 'de-DE';
    
    const printReportTitle = document.getElementById('printReportTitle');
    const subtitle = document.getElementById('printReportSubtitle');
    const dateEl = document.getElementById('printDate');
    const summaryGrid = document.getElementById('printSummaryGrid');
    const printTable = document.getElementById('printTable');
    const printTableHeading = document.getElementById('printTableHeading');
    const printDisclaimer = document.getElementById('printDisclaimer');

    if (printReportTitle) printReportTitle.textContent = t.printReportTitle;
    if (printTableHeading) printTableHeading.textContent = t.printTableHeading;
    if (printDisclaimer) printDisclaimer.textContent = t.printDisclaimer;
    if (dateEl) dateEl.textContent = `${t.printCreated} ${now.toLocaleDateString(locale)} ${now.toLocaleTimeString(locale)}`;

    const isPIT = state.mode === 'PIT';

    if (isPIT && state.pitResult) {
      const r = state.pitResult;
      const statusText = r.isTaxResident ? (currentLang === 'en' ? 'Tax Resident' : 'Steueransässiger') : (currentLang === 'en' ? 'Non-Resident' : 'Nicht-Ansässiger');
      if (subtitle) subtitle.textContent = `${t.printReportSubtitlePIT} • Status: ${statusText} • Age: ${r.age} yrs`;
      
      const daysUnit = currentLang === 'en' ? 'Days' : 'Tage';
      if (summaryGrid) {
        summaryGrid.innerHTML = `
          <div class="border p-3 rounded">
            <p><strong>${currentLang === 'en' ? 'Taxpayer Age' : 'Alter'}:</strong> ${r.age} ${currentLang === 'en' ? 'years' : 'Jahre'} ${r.isSenior ? (currentLang === 'en' ? '(Senior 65+ Exemption: 190k ฿)' : '(Seniorenfreibetrag 65+: 190k ฿)') : ''}</p>
            <p><strong>${currentLang === 'en' ? 'Stay in Thailand' : 'Aufenthalt'}:</strong> ${elements.daysInThailand ? elements.daysInThailand.value : 0} ${daysUnit} ${r.hasLtrVisa ? '(LTR-Visum)' : ''}</p>
            <p><strong>${currentLang === 'en' ? 'Gross Income' : 'Gesamteinkommen (Brutto)'}:</strong> ${formatCurrency(r.incomes.totalGrossIncome)}</p>
            <p><strong>${currentLang === 'en' ? 'Assessable Income' : 'Steuerpflichtiges Einkommen'}:</strong> ${formatCurrency(r.incomes.totalAssessableIncome)}</p>
          </div>
          <div class="border p-3 rounded">
            <p><strong>${currentLang === 'en' ? 'Total Deductions & Allowances' : 'Gesamtabzüge & Freibeträge'}:</strong> ${formatCurrency(r.deductions.totalAllDeductions)}</p>
            <p><strong>${currentLang === 'en' ? 'Net Taxable Income' : 'Zu versteuerndes Einkommen'}:</strong> ${formatCurrency(r.netTaxableIncome)}</p>
            <p><strong>${currentLang === 'en' ? 'Total Tax' : 'Steuerlast gesamt'}:</strong> <span class="font-bold text-red-600">${formatCurrency(r.totalTax)}</span> (${formatPercent(r.effectiveTaxRateOnAssessable)} eff.)</p>
            <p><strong>${currentLang === 'en' ? 'Net Income After Tax' : 'Nettoeinkommen nach Steuer'}:</strong> ${formatCurrency(r.netIncomeAfterTax)}</p>
          </div>
        `;
      }

      if (printTable) {
        printTable.innerHTML = `
          <thead class="bg-gray-100 font-bold">
            <tr>
              <th class="p-2 border">${t.thBracket}</th>
              <th class="p-2 border text-center">${t.thRate}</th>
              <th class="p-2 border text-right">${t.thTaxable}</th>
              <th class="p-2 border text-right">${t.thTax}</th>
            </tr>
          </thead>
          <tbody>
            ${r.bracketBreakdown.map(b => `
              <tr class="${b.taxableAmount > 0 ? 'bg-gray-50' : ''}">
                <td class="p-2 border">${b.label}</td>
                <td class="p-2 border text-center">${b.ratePercent}</td>
                <td class="p-2 border text-right">${formatCurrency(b.taxableAmount)}</td>
                <td class="p-2 border text-right font-bold">${formatCurrency(b.taxAmount)}</td>
              </tr>
            `).join('')}
          </tbody>
          <tfoot class="font-bold bg-gray-100">
            <tr>
              <td colspan="2" class="p-2 border">${t.tfTotal}</td>
              <td class="p-2 border text-right">${formatCurrency(r.netTaxableIncome)}</td>
              <td class="p-2 border text-right text-red-600">${formatCurrency(r.totalTax)}</td>
            </tr>
          </tfoot>
        `;
      }
    } else if (!isPIT && state.citResult) {
      const r = state.citResult;
      if (subtitle) subtitle.textContent = `${t.printReportSubtitleCIT} • Typ: ${r.isSME ? 'SME (KMU)' : 'Standard Non-SME'}`;
      
      if (summaryGrid) {
        summaryGrid.innerHTML = `
          <div class="border p-3 rounded">
            <p><strong>${t.lblPaidUpCapital}:</strong> ${formatCurrency(r.paidUpCapital)}</p>
            <p><strong>${t.lblAnnualRevenue}:</strong> ${formatCurrency(r.annualRevenue)}</p>
            <p><strong>SME-Status:</strong> ${r.isSME ? (currentLang === 'en' ? 'Yes (SME brackets active)' : 'Ja (Sonderstaffelung aktiv)') : (currentLang === 'en' ? 'No (Flat 20%)' : 'Nein (20% pauschal)')}</p>
          </div>
          <div class="border p-3 rounded">
            <p><strong>${t.lblDirectNetProfit}:</strong> ${formatCurrency(r.calculatedNetProfit)}</p>
            <p><strong>${currentLang === 'en' ? 'Corporate Tax (CIT)' : 'Körperschaftsteuer'}:</strong> <span class="font-bold text-red-600">${formatCurrency(r.totalTax)}</span> (${formatPercent(r.effectiveTaxRateOnProfit)} eff.)</p>
            <p><strong>${t.netLabelCIT}:</strong> ${formatCurrency(r.netProfitAfterTax)}</p>
          </div>
        `;
      }

      if (printTable) {
        printTable.innerHTML = `
          <thead class="bg-gray-100 font-bold">
            <tr>
              <th class="p-2 border">${t.thBracket}</th>
              <th class="p-2 border text-center">${t.thRate}</th>
              <th class="p-2 border text-right">${t.thTaxable}</th>
              <th class="p-2 border text-right">${t.thTax}</th>
            </tr>
          </thead>
          <tbody>
            ${r.bracketBreakdown.map(b => `
              <tr class="${b.taxableAmount > 0 ? 'bg-gray-50' : ''}">
                <td class="p-2 border">${b.label}</td>
                <td class="p-2 border text-center">${b.ratePercent}</td>
                <td class="p-2 border text-right">${formatCurrency(b.taxableAmount)}</td>
                <td class="p-2 border text-right font-bold">${formatCurrency(b.taxAmount)}</td>
              </tr>
            `).join('')}
          </tbody>
          <tfoot class="font-bold bg-gray-100">
            <tr>
              <td colspan="2" class="p-2 border">${t.tfTotal}</td>
              <td class="p-2 border text-right">${formatCurrency(r.calculatedNetProfit)}</td>
              <td class="p-2 border text-right text-red-600">${formatCurrency(r.totalTax)}</td>
            </tr>
          </tfoot>
        `;
      }
    }

    window.print();
  }

  // Automatic Start
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
