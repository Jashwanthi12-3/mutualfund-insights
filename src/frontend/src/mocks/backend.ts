import type { backendInterface } from "../backend";
import {
  AdvisorStatus,
  FundCategory,
  RiskLevel,
  UserRole,
  UserRole__1,
} from "../backend";

const sampleFunds = [
  {
    id: BigInt(1),
    nav: 45.23,
    name: "HDFC Top 100 Fund",
    minInvestment: 5000,
    description: "A large-cap equity fund investing in top 100 companies by market cap.",
    isActive: true,
    historicalData: [
      { nav: 38.5, date: "2023-01-01" },
      { nav: 40.2, date: "2023-04-01" },
      { nav: 42.1, date: "2023-07-01" },
      { nav: 44.0, date: "2023-10-01" },
      { nav: 45.23, date: "2024-01-01" },
    ],
    category: FundCategory.Equity,
    inceptionDate: "2010-01-15",
    managerBio: "Experienced fund manager with 15+ years in equity markets.",
    expenseRatio: 1.2,
    riskLevel: RiskLevel.High,
    return1Y: 18.5,
    return3Y: 14.2,
    return5Y: 16.8,
    managerName: "Prashant Jain",
  },
  {
    id: BigInt(2),
    nav: 28.76,
    name: "SBI Bluechip Fund",
    minInvestment: 1000,
    description: "Invests in large-cap bluechip companies with strong fundamentals.",
    isActive: true,
    historicalData: [
      { nav: 24.0, date: "2023-01-01" },
      { nav: 25.5, date: "2023-04-01" },
      { nav: 26.8, date: "2023-07-01" },
      { nav: 27.9, date: "2023-10-01" },
      { nav: 28.76, date: "2024-01-01" },
    ],
    category: FundCategory.Equity,
    inceptionDate: "2012-03-20",
    managerBio: "Seasoned analyst with expertise in bluechip investments.",
    expenseRatio: 1.5,
    riskLevel: RiskLevel.Medium,
    return1Y: 16.2,
    return3Y: 12.8,
    return5Y: 14.5,
    managerName: "R. Srinivasan",
  },
  {
    id: BigInt(3),
    nav: 15.42,
    name: "ICICI Prudential Balanced Fund",
    minInvestment: 5000,
    description: "A balanced fund with 60% equity and 40% debt allocation.",
    isActive: true,
    historicalData: [
      { nav: 13.0, date: "2023-01-01" },
      { nav: 13.8, date: "2023-04-01" },
      { nav: 14.5, date: "2023-07-01" },
      { nav: 15.0, date: "2023-10-01" },
      { nav: 15.42, date: "2024-01-01" },
    ],
    category: FundCategory.Balanced,
    inceptionDate: "2015-06-10",
    managerBio: "Fund manager specializing in balanced portfolio strategies.",
    expenseRatio: 1.8,
    riskLevel: RiskLevel.Medium,
    return1Y: 12.4,
    return3Y: 10.6,
    return5Y: 11.8,
    managerName: "Manish Kumar",
  },
  {
    id: BigInt(4),
    nav: 22.18,
    name: "Axis Liquid Fund",
    minInvestment: 500,
    description: "A low-risk money market fund for short-term investments.",
    isActive: true,
    historicalData: [
      { nav: 20.5, date: "2023-01-01" },
      { nav: 21.0, date: "2023-04-01" },
      { nav: 21.5, date: "2023-07-01" },
      { nav: 21.8, date: "2023-10-01" },
      { nav: 22.18, date: "2024-01-01" },
    ],
    category: FundCategory.MoneyMarket,
    inceptionDate: "2009-08-05",
    managerBio: "Expert in money market instruments and liquidity management.",
    expenseRatio: 0.3,
    riskLevel: RiskLevel.Low,
    return1Y: 7.2,
    return3Y: 6.8,
    return5Y: 6.9,
    managerName: "Anil Bamboli",
  },
  {
    id: BigInt(5),
    nav: 32.55,
    name: "Kotak Debt Fund",
    minInvestment: 1000,
    description: "Invests in government bonds and corporate debt securities.",
    isActive: true,
    historicalData: [
      { nav: 29.0, date: "2023-01-01" },
      { nav: 30.0, date: "2023-04-01" },
      { nav: 31.0, date: "2023-07-01" },
      { nav: 31.8, date: "2023-10-01" },
      { nav: 32.55, date: "2024-01-01" },
    ],
    category: FundCategory.Debt,
    inceptionDate: "2013-11-22",
    managerBio: "Debt market specialist with focus on credit quality.",
    expenseRatio: 0.8,
    riskLevel: RiskLevel.Low,
    return1Y: 8.5,
    return3Y: 7.9,
    return5Y: 8.2,
    managerName: "Deepak Agrawal",
  },
];

const sampleUsers = [
  {
    principal: { toText: () => "abc123-user1" } as any,
    name: "Rahul Sharma",
    role: UserRole.Investor,
    isActive: true,
    email: "rahul@example.com",
    advisorStatus: undefined,
    registrationDate: BigInt(1700000000),
  },
  {
    principal: { toText: () => "abc124-user2" } as any,
    name: "Priya Mehta",
    role: UserRole.FinancialAdvisor,
    isActive: true,
    email: "priya@example.com",
    advisorStatus: AdvisorStatus.Pending,
    registrationDate: BigInt(1700100000),
  },
  {
    principal: { toText: () => "abc125-user3" } as any,
    name: "Arjun Nair",
    role: UserRole.DataAnalyst,
    isActive: true,
    email: "arjun@example.com",
    advisorStatus: undefined,
    registrationDate: BigInt(1700200000),
  },
];

const sampleArticles = [
  {
    id: BigInt(1),
    title: "Understanding Mutual Fund NAV",
    content: "NAV (Net Asset Value) is the price per unit of a mutual fund. It is calculated by dividing the total assets minus liabilities by the number of outstanding units. Understanding NAV helps investors make informed decisions about when to buy or sell fund units.",
    authorName: "Priya Mehta",
    publishedAt: BigInt(1700000000),
    category: "Education",
    authorPrincipal: { toText: () => "abc124-user2" } as any,
  },
  {
    id: BigInt(2),
    title: "SIP vs Lump Sum: Which is Better?",
    content: "Systematic Investment Plans (SIP) allow you to invest small amounts regularly, reducing market timing risk through rupee cost averaging. Lump sum investments work better in falling markets. Both strategies have merits depending on your financial goals and market conditions.",
    authorName: "Priya Mehta",
    publishedAt: BigInt(1700050000),
    category: "Investment Strategy",
    authorPrincipal: { toText: () => "abc124-user2" } as any,
  },
];

export const mockBackend: backendInterface = {
  _initializeAccessControl: async () => undefined,

  approveAdvisor: async (_principal) => true,

  assignCallerUserRole: async (_user, _role) => undefined,

  getArticles: async () => sampleArticles,

  getCallerUser: async () => ({
    principal: { toText: () => "current-user-principal" } as any,
    name: "Demo Admin",
    role: UserRole.Admin,
    isActive: true,
    email: "admin@example.com",
    advisorStatus: undefined,
    registrationDate: BigInt(1699900000),
  }),

  getCallerUserRole: async () => UserRole__1.admin,

  getFavorites: async () => [BigInt(1), BigInt(3)],

  getFund: async (id) => sampleFunds.find((f) => f.id === id) || null,

  getFunds: async (_filter) => sampleFunds,

  getPlatformStats: async () => ({
    totalFunds: BigInt(20),
    activeInvestors: BigInt(1250),
    totalUsers: BigInt(1580),
    pendingAdvisors: BigInt(3),
  }),

  getTopPerformingFunds: async (_limit) => sampleFunds.slice(0, 3),

  getUsers: async () => sampleUsers,

  isCallerAdmin: async () => true,

  postArticle: async (req) => ({
    id: BigInt(99),
    title: req.title,
    content: req.content,
    authorName: "Demo Admin",
    publishedAt: BigInt(Date.now()),
    category: req.category,
    authorPrincipal: { toText: () => "current-user-principal" } as any,
  }),

  registerUser: async (req) => ({
    principal: { toText: () => "new-user-principal" } as any,
    name: req.name,
    role: req.role,
    isActive: true,
    email: req.email,
    advisorStatus: undefined,
    registrationDate: BigInt(Date.now()),
  }),

  rejectAdvisor: async (_principal) => true,

  removeFavorite: async (_fundId) => undefined,

  saveFavorite: async (_fundId) => undefined,

  toggleUserStatus: async (_principal) => true,

  updateFund: async (_id, _req) => true,
};
