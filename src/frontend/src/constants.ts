import { FundCategory, RiskLevel } from "./types";

export const CATEGORY_LABELS: Record<FundCategory, string> = {
  [FundCategory.Equity]: "Equity",
  [FundCategory.Debt]: "Debt",
  [FundCategory.Balanced]: "Balanced",
  [FundCategory.MoneyMarket]: "Money Market",
};

export const RISK_LABELS: Record<RiskLevel, string> = {
  [RiskLevel.Low]: "Low",
  [RiskLevel.Medium]: "Medium",
  [RiskLevel.High]: "High",
};

export const RISK_COLORS: Record<RiskLevel, string> = {
  [RiskLevel.Low]: "bg-success/20 text-success border-success/30",
  [RiskLevel.Medium]: "bg-warning/20 text-warning-foreground border-warning/30",
  [RiskLevel.High]: "bg-destructive/20 text-destructive border-destructive/30",
};

/** Five distinct colors for fund comparison charts */
export const CHART_COLORS = [
  "oklch(0.42 0.14 240)", // deep blue (primary)
  "oklch(0.6 0.15 170)", // teal (accent)
  "oklch(0.65 0.18 55)", // orange
  "oklch(0.55 0.16 290)", // purple
  "oklch(0.55 0.16 150)", // green
] as const;

/** Tailwind-safe class names for chart legend dots */
export const CHART_COLOR_CLASSES = [
  "bg-[oklch(0.42_0.14_240)]",
  "bg-[oklch(0.6_0.15_170)]",
  "bg-[oklch(0.65_0.18_55)]",
  "bg-[oklch(0.55_0.16_290)]",
  "bg-[oklch(0.55_0.16_150)]",
] as const;

export const DEFAULT_ANNUAL_RETURN = 12; // percent
