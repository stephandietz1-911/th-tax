/**
 * Currency conversion and formatting utilities for Thailand Tax App
 */

export const CURRENCY_RATES = {
  THB: 1.0,
  EUR: 0.026, // Approx 1 EUR = ~38.5 THB
  USD: 0.028, // Approx 1 USD = ~35.7 THB
  CHF: 0.025, // Approx 1 CHF = ~40.0 THB
  GBP: 0.022  // Approx 1 GBP = ~45.5 THB
};

export const CURRENCY_SYMBOLS = {
  THB: "฿",
  EUR: "€",
  USD: "$",
  CHF: "CHF",
  GBP: "£"
};

let currentCurrency = "THB";

export function setCurrency(currency) {
  if (CURRENCY_RATES[currency]) {
    currentCurrency = currency;
  }
}

export function getCurrency() {
  return currentCurrency;
}

export function convertFromTHB(amountInTHB, targetCurrency = currentCurrency) {
  const rate = CURRENCY_RATES[targetCurrency] || 1;
  return amountInTHB * rate;
}

export function convertToTHB(amountInTarget, sourceCurrency = currentCurrency) {
  const rate = CURRENCY_RATES[sourceCurrency] || 1;
  return amountInTarget / rate;
}

/**
 * Format a number into currency string
 * @param {number} amount - Amount in THB
 * @param {string} [currency] - Optional currency code
 * @param {boolean} [showSymbol=true] - Whether to include symbol
 * @returns {string} Formatted string
 */
export function formatCurrency(amount, currency = currentCurrency, showSymbol = true) {
  if (amount === undefined || amount === null || isNaN(amount)) {
    amount = 0;
  }

  const converted = currency === "THB" ? amount : convertFromTHB(amount, currency);
  const symbol = showSymbol ? (CURRENCY_SYMBOLS[currency] || currency) : "";

  const formattedNum = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: currency === "THB" ? 0 : 2,
    maximumFractionDigits: currency === "THB" ? 0 : 2
  }).format(converted);

  if (!showSymbol) {
    return formattedNum;
  }

  return currency === "THB" 
    ? `${formattedNum} ฿` 
    : `${symbol} ${formattedNum}`;
}

export function formatPercent(rate, decimals = 1) {
  if (rate === undefined || rate === null || isNaN(rate)) return "0.0 %";
  return `${rate.toFixed(decimals)} %`;
}
