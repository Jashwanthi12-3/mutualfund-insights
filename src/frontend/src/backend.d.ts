import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface RegisterUserRequest {
    name: string;
    role: UserRole;
    email: string;
}
export type FundId = bigint;
export type Timestamp = bigint;
export interface HistoricalPoint {
    nav: number;
    date: string;
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
export interface PostArticleRequest {
    title: string;
    content: string;
    category: string;
}
export type ArticleId = bigint;
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
export interface Fund {
    id: FundId;
    nav: number;
    name: string;
    minInvestment: number;
    description: string;
    isActive: boolean;
    historicalData: Array<HistoricalPoint>;
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
export interface Article {
    id: ArticleId;
    title: string;
    content: string;
    authorName: string;
    publishedAt: Timestamp;
    category: string;
    authorPrincipal: Principal;
}
export enum AdvisorStatus {
    Approved = "Approved",
    Rejected = "Rejected",
    Pending = "Pending"
}
export enum FundCategory {
    Debt = "Debt",
    Balanced = "Balanced",
    MoneyMarket = "MoneyMarket",
    Equity = "Equity"
}
export enum RiskLevel {
    Low = "Low",
    High = "High",
    Medium = "Medium"
}
export enum UserRole {
    DataAnalyst = "DataAnalyst",
    FinancialAdvisor = "FinancialAdvisor",
    Admin = "Admin",
    Investor = "Investor"
}
export enum UserRole__1 {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    approveAdvisor(principal: Principal): Promise<boolean>;
    assignCallerUserRole(user: Principal, role: UserRole__1): Promise<void>;
    getArticles(): Promise<Array<Article>>;
    getCallerUser(): Promise<User | null>;
    getCallerUserRole(): Promise<UserRole__1>;
    getFavorites(): Promise<Array<FundId>>;
    getFund(id: FundId): Promise<Fund | null>;
    getFunds(filter: FundFilter): Promise<Array<Fund>>;
    getPlatformStats(): Promise<PlatformStats>;
    getTopPerformingFunds(limit: bigint): Promise<Array<Fund>>;
    getUsers(): Promise<Array<User>>;
    isCallerAdmin(): Promise<boolean>;
    postArticle(req: PostArticleRequest): Promise<Article>;
    registerUser(req: RegisterUserRequest): Promise<User>;
    rejectAdvisor(principal: Principal): Promise<boolean>;
    removeFavorite(fundId: FundId): Promise<void>;
    saveFavorite(fundId: FundId): Promise<void>;
    toggleUserStatus(principal: Principal): Promise<boolean>;
    updateFund(id: FundId, req: UpdateFundRequest): Promise<boolean>;
}
