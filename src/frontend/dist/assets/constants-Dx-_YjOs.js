import { F as FundCategory, R as RiskLevel } from "./index-BqQuEjuM.js";
const CATEGORY_LABELS = {
  [FundCategory.Equity]: "Equity",
  [FundCategory.Debt]: "Debt",
  [FundCategory.Balanced]: "Balanced",
  [FundCategory.MoneyMarket]: "Money Market"
};
const RISK_LABELS = {
  [RiskLevel.Low]: "Low",
  [RiskLevel.Medium]: "Medium",
  [RiskLevel.High]: "High"
};
const RISK_COLORS = {
  [RiskLevel.Low]: "bg-success/20 text-success border-success/30",
  [RiskLevel.Medium]: "bg-warning/20 text-warning-foreground border-warning/30",
  [RiskLevel.High]: "bg-destructive/20 text-destructive border-destructive/30"
};
const CHART_COLORS = [
  "oklch(0.42 0.14 240)",
  // deep blue (primary)
  "oklch(0.6 0.15 170)",
  // teal (accent)
  "oklch(0.65 0.18 55)",
  // orange
  "oklch(0.55 0.16 290)",
  // purple
  "oklch(0.55 0.16 150)"
  // green
];
const CHART_COLOR_CLASSES = [
  "bg-[oklch(0.42_0.14_240)]",
  "bg-[oklch(0.6_0.15_170)]",
  "bg-[oklch(0.65_0.18_55)]",
  "bg-[oklch(0.55_0.16_290)]",
  "bg-[oklch(0.55_0.16_150)]"
];
const DEFAULT_ANNUAL_RETURN = 12;
export {
  CATEGORY_LABELS as C,
  DEFAULT_ANNUAL_RETURN as D,
  RISK_LABELS as R,
  RISK_COLORS as a,
  CHART_COLOR_CLASSES as b,
  CHART_COLORS as c
};
