export type Article = {
  id: string;
  title: string;
  content: string;
  authorName: string;
  publishedAt: string;
  category: string;
};

export const CATEGORIES = ["Basics", "SIP", "Risk", "Returns", "Tax"] as const;

export const ARTICLES: Article[] = [
  {
    id: "what-are-mutual-funds",
    title: "What Are Mutual Funds?",
    category: "Basics",
    authorName: "Priya Sharma",
    publishedAt: "Jan 12, 2025",
    content: `A mutual fund is a professionally managed investment vehicle that pools money from multiple investors to invest in a diversified portfolio of stocks, bonds, money market instruments, or a combination of these assets. Each investor in a mutual fund owns units or shares, representing a proportional stake in the fund's holdings and the income it generates.

The core idea behind mutual funds is collective investing. Individual investors often lack the resources or expertise to build a well-diversified portfolio on their own. A mutual fund solves this by giving even small investors access to professionally managed, diversified portfolios at a relatively low cost.

When you invest in a mutual fund, a fund manager and their team make investment decisions on your behalf. They research companies, track economic indicators, and decide when to buy or sell securities to meet the fund's stated investment objectives — whether that's capital growth, income generation, or capital preservation.

Mutual funds are regulated by SEBI (Securities and Exchange Board of India) in India, which mandates strict disclosure norms and governance standards. Fund houses are required to publish their portfolio, returns, and expense ratios regularly, ensuring transparency.

The Net Asset Value (NAV) of a mutual fund is the per-unit price, calculated by dividing the total value of assets minus liabilities by the total number of units outstanding. NAV is typically updated once daily after market hours.

Mutual funds cater to all risk profiles — from aggressive equity funds targeting high long-term returns, to conservative debt funds focused on capital safety and steady income. Understanding the different types of mutual funds is the first step towards making smart investment decisions.`,
  },
  {
    id: "how-sip-works",
    title: "How SIP Works: Invest Small, Grow Big",
    category: "SIP",
    authorName: "Arjun Mehta",
    publishedAt: "Feb 3, 2025",
    content: `A Systematic Investment Plan, or SIP, is a method of investing a fixed sum of money in a mutual fund at regular intervals — typically monthly. Instead of making a large one-time investment, SIP allows you to invest small amounts consistently and benefit from long-term market participation.

The power of SIP lies in two key financial principles: rupee cost averaging and the magic of compounding. With rupee cost averaging, you buy more units when prices are low and fewer units when prices are high. Over time, this averages out your purchase cost, reducing the impact of market volatility on your overall investment.

Compounding means that the returns you earn are reinvested to generate further returns. Over a long horizon, this "returns on returns" effect can significantly amplify your wealth. For example, a monthly SIP of ₹5,000 at a 12% annual return over 20 years could grow to approximately ₹49 lakhs — nearly 4 times the total amount invested.

SIPs are highly flexible. You can start with as little as ₹500 per month, choose weekly, monthly, or quarterly frequency, and pause or stop at any time without penalty. Many platforms also offer a "step-up SIP" feature, which automatically increases your SIP amount annually in line with income growth.

One common misconception is that SIPs are risk-free. They are not — your returns depend on market performance. However, the discipline of regular investing helps smooth out short-term market fluctuations. SIPs are best suited for goals that are 5 years or more away, such as retirement, children's education, or home purchase.

To start a SIP, complete your KYC, select a mutual fund aligned with your goals and risk tolerance, set the SIP amount and date, and link your bank account for auto-debit. Once set up, the investment runs automatically every month.`,
  },
  {
    id: "understanding-risk-levels",
    title: "Understanding Risk Levels in Mutual Funds",
    category: "Risk",
    authorName: "Kavita Nair",
    publishedAt: "Feb 18, 2025",
    content: `Every mutual fund carries a certain degree of risk, which is defined by the type of assets it invests in, market volatility, credit quality of holdings, and the investment time horizon. SEBI mandates that all mutual funds classify themselves on a standardised risk-o-meter with six levels: Low, Low to Moderate, Moderate, Moderately High, High, and Very High.

Low-risk funds, such as overnight funds and liquid funds, invest in very short-term debt instruments with high credit ratings. They offer relatively stable returns but are not entirely risk-free, as they carry minimal interest rate and credit risk.

Moderate-risk funds include balanced or hybrid funds and short to medium-duration debt funds. They offer a blend of stability and growth by investing in both equity and fixed income, making them suitable for conservative investors with a medium-term horizon of 3-5 years.

High-risk funds include large-cap, mid-cap, and small-cap equity funds. They invest primarily in company stocks and are subject to market fluctuations. In the short term, they can decline sharply, but historically they have delivered the best inflation-beating returns over 7-10 year periods.

Very high-risk funds include sectoral and thematic funds, small-cap funds, and international funds. These are concentrated bets and can experience extreme volatility. They are only suitable for experienced investors with a high risk tolerance and long investment horizon.

When choosing a mutual fund, always match the risk level with your own risk profile — your age, income stability, financial goals, and psychological comfort with losses. A 25-year-old with a 30-year retirement horizon can typically absorb more risk than a 55-year-old nearing retirement.`,
  },
  {
    id: "equity-vs-debt-funds",
    title: "Equity vs Debt Funds: What's Right for You?",
    category: "Basics",
    authorName: "Rahul Verma",
    publishedAt: "Mar 5, 2025",
    content: `The mutual fund universe is broadly divided into two categories: equity funds and debt funds. Understanding the difference is fundamental to building the right investment portfolio for your goals.

Equity mutual funds invest predominantly in shares of companies listed on stock exchanges. Their performance is directly tied to the stock market. When the market rises, equity funds appreciate in value; when it falls, they decline. However, over long periods of 7-10 years or more, equity funds have consistently outperformed inflation and delivered superior wealth creation.

Equity funds are further classified by market capitalisation: large-cap funds invest in the top 100 companies by market cap and offer relative stability; mid-cap funds invest in companies ranked 101-250 and offer higher growth potential with more volatility; small-cap funds invest in the remaining companies and can deliver exceptional returns but with significant risk.

Debt mutual funds, on the other hand, invest in fixed-income instruments such as government securities, corporate bonds, treasury bills, and money market instruments. They aim to generate stable, regular income rather than aggressive capital appreciation. Debt funds are less volatile than equity funds but still carry interest rate risk and, in some cases, credit risk.

Hybrid or balanced funds invest in a mix of both equity and debt, offering a middle-ground between growth and stability. They are popular for investors who want equity upside with some downside protection.

The right choice depends on your financial goal, time horizon, and risk appetite. For goals under 3 years, debt funds are generally preferred. For goals between 3-5 years, hybrid funds work well. For goals 5 years and beyond, equity funds are typically the best choice for wealth creation.`,
  },
  {
    id: "expense-ratios-explained",
    title: "Expense Ratios Explained: The Hidden Cost of Investing",
    category: "Returns",
    authorName: "Anita Desai",
    publishedAt: "Mar 20, 2025",
    content: `When you invest in a mutual fund, you don't just hand over your money and receive returns. Behind the scenes, a fund house employs portfolio managers, analysts, compliance teams, and technology infrastructure to manage your money. The cost of running the fund is charged to investors as the Total Expense Ratio, or TER — also commonly called the expense ratio.

The expense ratio is expressed as an annual percentage of the fund's assets under management (AUM). For example, if a fund has an expense ratio of 1.5%, it means you pay ₹1.50 per year for every ₹100 invested. This charge is deducted daily from the fund's NAV, so it doesn't appear as a separate deduction on your statement — it's already accounted for in the NAV you see.

SEBI has capped expense ratios for mutual funds in India. For equity funds managing up to ₹500 crore, the maximum TER is 2.25%, reducing as AUM grows. Debt funds have lower caps. Direct plans — where you invest directly with the fund house without a distributor — have significantly lower expense ratios than regular plans.

Over the long term, even a small difference in expense ratio can have a profound impact on returns. Consider two funds both generating a gross return of 12% annually. Fund A charges 0.5% (direct plan), while Fund B charges 1.5% (regular plan). After 20 years, ₹10 lakhs invested in Fund A would grow to approximately ₹95 lakhs, versus ₹77 lakhs in Fund B — a difference of ₹18 lakhs purely due to expense ratio.

When comparing funds, always check the expense ratio in addition to returns. A fund with slightly lower gross returns but a much lower expense ratio can deliver better net returns to the investor. Index funds and ETFs typically have the lowest expense ratios — often under 0.2% — making them a cost-efficient way to gain broad market exposure.`,
  },
  {
    id: "how-to-compare-funds",
    title: "How to Compare Mutual Funds Like a Pro",
    category: "Returns",
    authorName: "Sanjay Kulkarni",
    publishedAt: "Apr 2, 2025",
    content: `With thousands of mutual fund schemes available in India, choosing the right one can feel overwhelming. Comparing funds systematically using the right metrics is key to making informed decisions.

Start with category consistency. Always compare funds within the same category — large-cap equity funds with large-cap equity funds, not with mid-cap or debt funds. Mixing categories leads to misleading comparisons because different categories have different risk-return profiles.

Look at returns over multiple time horizons: 1 year, 3 years, and 5 years. Short-term returns can be deceptive — a fund that topped the charts last year may have simply been lucky. Consistent performance over 3-5 year periods is a more reliable indicator of fund quality. Always compare returns against the fund's benchmark index to assess whether the manager is genuinely adding alpha.

Evaluate risk-adjusted returns using metrics like the Sharpe Ratio, which measures returns per unit of risk taken. A higher Sharpe Ratio means better risk-adjusted performance. The Alpha metric shows how much excess return the fund has generated over its benchmark — positive alpha means the fund manager has added value.

Check the expense ratio (discussed in detail in another article). Lower is generally better, particularly for passive funds tracking an index.

Examine the fund manager's track record and the fund house's stability. Consistency matters — frequent manager changes or fund house mergers can disrupt investment strategy. Look at how long the current manager has been running the fund and their performance across market cycles.

Finally, review portfolio composition: number of stocks held, top 10 holdings as a percentage of AUM, sectoral allocation, and portfolio turnover ratio. A high turnover ratio indicates active trading, which can increase costs and tax liability.`,
  },
  {
    id: "tax-on-mutual-fund-returns",
    title: "Tax on Mutual Fund Returns: What You Need to Know",
    category: "Tax",
    authorName: "Meera Joshi",
    publishedAt: "Apr 15, 2025",
    content: `Taxation is one of the most important — and often overlooked — aspects of mutual fund investing in India. Understanding how your returns are taxed helps you plan better and maximise your net take-home gains.

Mutual fund returns are taxed in two ways: capital gains (profit from selling units) and dividends (income distributed by the fund). Each is taxed differently depending on the type of fund and how long you held the investment.

For equity mutual funds (where at least 65% is invested in equities), short-term capital gains (STCG) — from investments held for less than 12 months — are taxed at 20% (as per Finance Act 2024 changes). Long-term capital gains (LTCG) — from investments held for more than 12 months — are taxed at 12.5% with no indexation benefit, but only on gains exceeding ₹1.25 lakh per year.

For debt mutual funds, the tax treatment changed significantly post-April 2023. Regardless of the holding period, gains from debt funds are now added to your income and taxed at your applicable income tax slab rate. This removed the indexation benefit that previously made debt funds attractive for investors in lower tax brackets.

Hybrid funds are taxed based on their equity exposure. If the equity allocation is 65% or more, they are treated as equity funds for tax purposes; otherwise, they are treated as debt funds.

Dividends from mutual funds are added to your income and taxed at your applicable slab rate. Additionally, the fund house deducts a 10% TDS on dividends exceeding ₹5,000 in a financial year.

Tax-Saving ELSS (Equity-Linked Savings Scheme) funds offer deductions of up to ₹1.5 lakh under Section 80C of the Income Tax Act. They have a mandatory 3-year lock-in period and are treated as equity funds for LTCG taxation.`,
  },
  {
    id: "lump-sum-vs-sip",
    title: "Lump Sum vs SIP: Which Investment Strategy Is Better?",
    category: "SIP",
    authorName: "Vikram Patel",
    publishedAt: "Apr 28, 2025",
    content: `One of the most debated questions in personal finance is whether to invest a large amount all at once (lump sum) or spread it out over time through a Systematic Investment Plan (SIP). The honest answer: it depends on market conditions, your financial situation, and your psychological comfort with risk.

Lump sum investing works best when you have a large corpus available — perhaps from a bonus, inheritance, or asset sale — and you are investing for the long term. Historically, markets trend upward over time, so staying invested for longer can be advantageous. If you invest a lump sum at market lows, the returns can be spectacular.

The obvious risk is timing. If you invest a large sum just before a market correction, your portfolio could decline sharply in the short term, potentially unsettling you and leading to panic selling at a loss. This psychological challenge is why many investors find lump sum investing difficult to execute well.

SIP, on the other hand, takes timing risk out of the equation. By investing the same amount every month, you automatically buy more units when prices are low and fewer when they are high. This rupee cost averaging smooths out volatility and makes SIP ideal for salaried individuals with regular income who want to invest systematically without worrying about market timing.

Research and simulations across various market cycles in India suggest that for most retail investors, SIP consistently delivers risk-adjusted returns that are competitive with, if not better than, lump sum — especially in volatile markets. However, during a prolonged bull market, lump sum would outperform.

A practical hybrid approach: if you have a large amount to invest, put 30-40% as a lump sum immediately and deploy the rest via STP (Systematic Transfer Plan) over 6-12 months, investing from a liquid fund into your target equity fund. This combines the benefits of both strategies.`,
  },
];
