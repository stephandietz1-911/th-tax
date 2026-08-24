/**
 * Thailand Tax Calculator 2026 Engine
 * Handles Personal Income Tax (PIT) and Corporate Income Tax (CIT) calculations.
 */

// PIT Progressive Tax Brackets (2026)
export const PIT_TAX_BRACKETS = [
  { min: 0, max: 150000, rate: 0.00, label: "0 – 150.000 THB", labelEn: "0 – 150,000 THB", maxTaxInBracket: 0 },
  { min: 150000, max: 300000, rate: 0.05, label: "150.001 – 300.000 THB", labelEn: "150,001 – 300,000 THB", maxTaxInBracket: 7500 },
  { min: 300000, max: 500000, rate: 0.10, label: "300.001 – 500.000 THB", labelEn: "300,001 – 500,000 THB", maxTaxInBracket: 20000 },
  { min: 500000, max: 750000, rate: 0.15, label: "500.001 – 750.000 THB", labelEn: "500,001 – 750,000 THB", maxTaxInBracket: 37500 },
  { min: 750000, max: 1000000, rate: 0.20, label: "750.001 – 1.000.000 THB", labelEn: "750,001 – 1,000,000 THB", maxTaxInBracket: 50000 },
  { min: 1000000, max: 2000000, rate: 0.25, label: "1.000.001 – 2.000.000 THB", labelEn: "1,000,001 – 2,000,000 THB", maxTaxInBracket: 250000 },
  { min: 2000000, max: 5000000, rate: 0.30, label: "2.000.001 – 5.000.000 THB", labelEn: "2,000,001 – 5,000,000 THB", maxTaxInBracket: 900000 },
  { min: 5000000, max: Infinity, rate: 0.35, label: "Über 5.000.000 THB", labelEn: "Over 5,000,000 THB", maxTaxInBracket: Infinity }
];

// Standard Allowances & Deduction constants
export const TAX_CONSTANTS = {
  PERSONAL_ALLOWANCE: 60000,
  SENIOR_ALLOWANCE: 190000, // For Tax Residents aged 65+ (Sec. 42(17) Revenue Code)
  SPOUSE_ALLOWANCE: 60000,
  CHILD_ALLOWANCE_PER_CHILD: 30000,
  PARENT_ALLOWANCE_PER_PARENT: 30000, // Dependent parents aged 60+
  EMPLOYMENT_EXPENSE_RATE: 0.50,
  EMPLOYMENT_EXPENSE_MAX: 100000,
  RENTAL_EXPENSE_RATE: 0.30,
  SME_CAPITAL_LIMIT: 5000000,
  SME_REVENUE_LIMIT: 30000000,
  STANDARD_CIT_RATE: 0.20
};

// SME Corporate Tax Brackets
export const SME_CIT_BRACKETS = [
  { min: 0, max: 300000, rate: 0.00, label: "0 – 300.000 THB (steuerfrei)", labelEn: "0 – 300,000 THB (Tax Exempt)" },
  { min: 300000, max: 3000000, rate: 0.15, label: "300.001 – 3.000.000 THB (15%)", labelEn: "300,001 – 3,000,000 THB (15%)" },
  { min: 3000000, max: Infinity, rate: 0.20, label: "Über 3.000.000 THB (20%)", labelEn: "Over 3,000,000 THB (20%)" }
];

/**
 * Calculates Personal Income Tax (PIT)
 * @param {Object} params
 * @param {number} [params.age=50] - Taxpayer's age in the tax year
 * @param {number} params.daysInThailand - Days stayed in Thailand in the calendar year
 * @param {boolean} params.hasLtrVisa - Long-Term Resident visa status
 * @param {number} params.employmentIncome - Gross salary / employment income
 * @param {number} params.rentalIncome - Gross rental income
 * @param {number} params.otherLocalIncome - Other local Thai income (business, freelance, etc.)
 * @param {number} params.foreignRemittedIncome - Foreign-sourced income transferred to Thailand in 2026
 * @param {boolean} [params.hasSpouse=false] - Eligible non-working spouse
 * @param {number} [params.numberOfChildren=0] - 30,000 per child
 * @param {number} [params.numberOfParents=0] - 30,000 per dependent parent (60+ years old)
 * @param {number} [params.socialSecurity=0] - Social security contribution (max 9,000)
 * @param {number} [params.lifeHealthInsurance=0] - Health/Life insurance (max 100,000)
 * @param {number} [params.pensionInvestments=0] - RMF/SSF/ThaiESG/Provident Fund
 * @param {number} [params.donations=0] - Eligible charitable donations
 * @returns {Object} Detailed PIT calculation results
 */
export function calculatePIT(params) {
  const {
    age = 50,
    daysInThailand = 0,
    hasLtrVisa = false,
    employmentIncome = 0,
    rentalIncome = 0,
    otherLocalIncome = 0,
    foreignRemittedIncome = 0,
    hasSpouse = false,
    numberOfChildren = 0,
    numberOfParents = 0,
    socialSecurity = 0,
    lifeHealthInsurance = 0,
    pensionInvestments = 0,
    donations = 0
  } = params;

  const numAge = Number(age) || 0;
  const numDays = Number(daysInThailand) || 0;
  const isTaxResident = numDays >= 180;
  const isSenior = numAge >= 65;

  // Foreign income rule:
  let taxableForeignIncome = 0;
  let foreignIncomeStatus = "nicht_steuerpflichtig";
  
  if (isTaxResident) {
    if (hasLtrVisa) {
      taxableForeignIncome = 0;
      foreignIncomeStatus = "ltr_steuerbefreit";
    } else {
      taxableForeignIncome = Number(foreignRemittedIncome) || 0;
      foreignIncomeStatus = "steuerpflichtig_resident";
    }
  } else {
    taxableForeignIncome = 0;
    foreignIncomeStatus = "nicht_resident_befreit";
  }

  const numEmployment = Number(employmentIncome) || 0;
  const numRental = Number(rentalIncome) || 0;
  const numOtherLocal = Number(otherLocalIncome) || 0;
  const numForeignRemitted = Number(foreignRemittedIncome) || 0;

  // Calculate gross incomes
  const totalLocalIncome = numEmployment + numRental + numOtherLocal;
  const totalGrossIncome = totalLocalIncome + numForeignRemitted;
  const totalAssessableIncome = totalLocalIncome + taxableForeignIncome;

  // 1. Standard Expense Deductions
  const employmentDeduction = Math.min(
    numEmployment * TAX_CONSTANTS.EMPLOYMENT_EXPENSE_RATE,
    TAX_CONSTANTS.EMPLOYMENT_EXPENSE_MAX
  );

  const rentalDeduction = numRental * TAX_CONSTANTS.RENTAL_EXPENSE_RATE;
  const totalExpenseDeductions = employmentDeduction + rentalDeduction;
  const incomeAfterExpenseDeductions = Math.max(0, totalAssessableIncome - totalExpenseDeductions);

  // 2. Senior Citizen Exemption (Age 65+ & Tax Resident: 190,000 THB)
  const seniorExemption = (isSenior && isTaxResident) ? TAX_CONSTANTS.SENIOR_ALLOWANCE : 0;

  // 3. Personal & Family Allowances
  const personalAllowance = TAX_CONSTANTS.PERSONAL_ALLOWANCE; // Automatic 60,000 THB
  const spouseAllowanceAmount = hasSpouse ? TAX_CONSTANTS.SPOUSE_ALLOWANCE : 0;
  const childrenAllowanceAmount = Math.max(0, Number(numberOfChildren) || 0) * TAX_CONSTANTS.CHILD_ALLOWANCE_PER_CHILD;
  const parentsAllowanceAmount = Math.max(0, Number(numberOfParents) || 0) * TAX_CONSTANTS.PARENT_ALLOWANCE_PER_PARENT;
  const socialSecurityDeduction = Math.min(Math.max(0, Number(socialSecurity) || 0), 9000);
  const insuranceDeduction = Math.min(Math.max(0, Number(lifeHealthInsurance) || 0), 100000);
  const pensionDeduction = Math.max(0, Number(pensionInvestments) || 0);

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
  const actualDonationsDeduction = Math.min(Math.max(0, Number(donations) || 0), maxAllowedDonations);

  // 5. Net Taxable Income
  const netTaxableIncome = Math.max(0, incomeAfterAllowances - actualDonationsDeduction);

  // 6. Progressive Tax Calculation across Brackets
  let totalTax = 0;
  const bracketBreakdown = [];

  for (const bracket of PIT_TAX_BRACKETS) {
    if (netTaxableIncome > bracket.min) {
      const taxableAmountInBracket = Math.min(
        netTaxableIncome - bracket.min,
        bracket.max - bracket.min
      );
      const taxForBracket = taxableAmountInBracket * bracket.rate;
      totalTax += taxForBracket;

      bracketBreakdown.push({
        label: bracket.label,
        labelEn: bracket.labelEn,
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
        label: bracket.label,
        labelEn: bracket.labelEn,
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

  // Effective and marginal tax rate
  const effectiveTaxRateOnAssessable = totalAssessableIncome > 0 ? (totalTax / totalAssessableIncome) * 100 : 0;
  const effectiveTaxRateOnGross = totalGrossIncome > 0 ? (totalTax / totalGrossIncome) * 100 : 0;
  
  const highestBracket = bracketBreakdown.slice().reverse().find(b => b.taxableAmount > 0) || bracketBreakdown[0];
  const marginalTaxRate = highestBracket ? highestBracket.rate * 100 : 0;

  const netIncomeAfterTax = totalGrossIncome - totalTax;

  return {
    age: numAge,
    isSenior,
    isTaxResident,
    hasLtrVisa,
    foreignIncomeStatus,
    incomes: {
      employmentIncome: numEmployment,
      rentalIncome: numRental,
      otherLocalIncome: numOtherLocal,
      foreignRemittedIncome: numForeignRemitted,
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

/**
 * Calculates Corporate Income Tax (CIT)
 */
export function calculateCIT(params) {
  const {
    paidUpCapital = 0,
    annualRevenue = 0,
    netProfit = undefined,
    annualExpenses = 0
  } = params;

  const numCapital = Number(paidUpCapital) || 0;
  const numRevenue = Number(annualRevenue) || 0;
  const numExpenses = Number(annualExpenses) || 0;

  let calculatedNetProfit = 0;
  if (netProfit !== undefined && netProfit !== null && !isNaN(Number(netProfit))) {
    calculatedNetProfit = Math.max(0, Number(netProfit));
  } else {
    calculatedNetProfit = Math.max(0, numRevenue - numExpenses);
  }

  const isSME = numCapital <= TAX_CONSTANTS.SME_CAPITAL_LIMIT && numRevenue <= TAX_CONSTANTS.SME_REVENUE_LIMIT;

  let totalTax = 0;
  const bracketBreakdown = [];

  if (isSME) {
    for (const bracket of SME_CIT_BRACKETS) {
      if (calculatedNetProfit > bracket.min) {
        const taxableAmountInBracket = Math.min(
          calculatedNetProfit - bracket.min,
          bracket.max - bracket.min
        );
        const taxForBracket = taxableAmountInBracket * bracket.rate;
        totalTax += taxForBracket;

        bracketBreakdown.push({
          label: bracket.label,
          labelEn: bracket.labelEn,
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
          label: bracket.label,
          labelEn: bracket.labelEn,
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
      label: "Standard-Körperschaftsteuer (Non-SME, pauschal 20%)",
      labelEn: "Standard Corporate Tax (Non-SME, flat 20%)",
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
  const effectiveTaxRateOnRevenue = numRevenue > 0 ? (totalTax / numRevenue) * 100 : 0;
  const netProfitAfterTax = calculatedNetProfit - totalTax;

  return {
    paidUpCapital: numCapital,
    annualRevenue: numRevenue,
    annualExpenses: numExpenses,
    calculatedNetProfit,
    isSME,
    smeReasons: {
      capitalOk: numCapital <= TAX_CONSTANTS.SME_CAPITAL_LIMIT,
      revenueOk: numRevenue <= TAX_CONSTANTS.SME_REVENUE_LIMIT
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
