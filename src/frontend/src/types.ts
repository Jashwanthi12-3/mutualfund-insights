import type { Principal } from "@icp-sdk/core/principal";

export enum AdvisorStatus {
  Approved = "Approved",
  Rejected = "Rejected",
  Pending = "Pending",
}

export enum FundCategory {
  Debt = "Debt",
  Balanced = "Balanced",
  MoneyMarket = "MoneyMarket",
  Equity = "Equity",
}

export enum RiskLevel {
  Low = "Low",
  High = "High",
  Medium = "Medium",
}

export enum UserRole {
  DataAnalyst = "DataAnalyst",
  FinancialAdvisor = "FinancialAdvisor",
  Admin = "Admin",
  Investor = "Investor",
}

export type FundId = bigint;
export type Timestamp = bigint;

export interface HistoricalPoint {
  nav: number;
  date: string;
}

export interface Fund {
  id: FundId;
  nav: number;
  name: string;
  minInvestment: number;
  description: string;
  isActive: boolean;
  historicalData: HistoricalPoint[];
  category: FundCategory;
  inceptionDate: string;
  managerBio: string;
  expenseRatio: number;
  riskLevel: RiskLevel;
  return1Y: number;
  return3Y: number;
  return5Y: number;
  managerName: string;
}

export interface User {
  principal: Principal;
  name: string;
  role: UserRole;
  isActive: boolean;
  email: string;
  advisorStatus?: AdvisorStatus;
  registrationDate: Timestamp;
}

export interface RegisterUserRequest {
  name: string;
  role: UserRole;
  email: string;
}

export interface FundFilter {
  searchText?: string;
  category?: FundCategory;
  riskLevel?: RiskLevel;
}

export interface UpdateFundRequest {
  nav: number;
  expenseRatio: number;
  riskLevel: RiskLevel;
  return1Y: number;
  return3Y: number;
  return5Y: number;
}

export interface PlatformStats {
  totalFunds: bigint;
  activeInvestors: bigint;
  totalUsers: bigint;
  pendingAdvisors: bigint;
}

export interface Article {
  id: bigint;
  title: string;
  content: string;
  authorName: string;
  publishedAt: Timestamp;
  category: string;
  authorPrincipal: Principal;
}
