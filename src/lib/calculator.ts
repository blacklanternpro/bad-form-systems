export type CalculatorInputs = {
  hours: number;
  rate: number;
  lag: number;
  leakage: number;
};

export type GhostTaxResult = {
  directLaborYear: number;
  leakageYear: number;
  totalGhostTax: number;
  cashTrapDays: number;
};

export function calculateGhostTax(input: CalculatorInputs): GhostTaxResult {
  const directLaborYear = input.hours * input.rate * 52;
  const leakageYear = input.leakage * 12;
  return {
    directLaborYear,
    leakageYear,
    totalGhostTax: directLaborYear + leakageYear,
    cashTrapDays: input.lag,
  };
}

export function formatAud(value: number): string {
  return `$${value.toLocaleString("en-AU")}`;
}
