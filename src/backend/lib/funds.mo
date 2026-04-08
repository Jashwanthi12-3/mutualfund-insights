import List "mo:core/List";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Float "mo:core/Float";
import Order "mo:core/Order";
import Types "../types/funds";

module {
  public type FundId = Types.FundId;
  public type Fund = Types.Fund;
  public type FundFilter = Types.FundFilter;
  public type UpdateFundRequest = Types.UpdateFundRequest;
  public type HistoricalPoint = Types.HistoricalPoint;

  // Generate 60 monthly historical NAV points starting from baseNav and growing at annualRate
  func makeHistory(baseNav : Float, annualReturn : Float) : [HistoricalPoint] {
    let months = [
      "2020-01", "2020-02", "2020-03", "2020-04", "2020-05", "2020-06",
      "2020-07", "2020-08", "2020-09", "2020-10", "2020-11", "2020-12",
      "2021-01", "2021-02", "2021-03", "2021-04", "2021-05", "2021-06",
      "2021-07", "2021-08", "2021-09", "2021-10", "2021-11", "2021-12",
      "2022-01", "2022-02", "2022-03", "2022-04", "2022-05", "2022-06",
      "2022-07", "2022-08", "2022-09", "2022-10", "2022-11", "2022-12",
      "2023-01", "2023-02", "2023-03", "2023-04", "2023-05", "2023-06",
      "2023-07", "2023-08", "2023-09", "2023-10", "2023-11", "2023-12",
      "2024-01", "2024-02", "2024-03", "2024-04", "2024-05", "2024-06",
      "2024-07", "2024-08", "2024-09", "2024-10", "2024-11", "2024-12",
    ];
    // monthly multiplier from annual return
    let monthlyMult = 1.0 + annualReturn / 100.0 / 12.0;
    Array.tabulate<HistoricalPoint>(
      60,
      func(i) {
        var nav = baseNav;
        var j = 0;
        while (j < i) {
          nav := nav * monthlyMult;
          j += 1;
        };
        { date = months[i]; nav }
      }
    )
  };

  public func seedFunds(funds : List.List<Fund>) {
    let data : [Fund] = [
      // ── Equity Funds (8) ────────────────────────────────────────────────
      {
        id = 1; name = "SBI Blue Chip Fund";
        category = #Equity; riskLevel = #Medium;
        nav = 68.45; return1Y = 18.2; return3Y = 15.4; return5Y = 17.8;
        expenseRatio = 1.05; managerName = "Rohit Sharma";
        managerBio = "Rohit Sharma has 14 years of experience in equity research and fund management at SBI Mutual Fund.";
        inceptionDate = "2006-02-14"; minInvestment = 5000.0;
        description = "A large-cap equity fund investing in blue-chip companies with a consistent dividend track record.";
        isActive = true;
        historicalData = makeHistory(38.0, 14.0);
      },
      {
        id = 2; name = "HDFC Mid-Cap Opportunities Fund";
        category = #Equity; riskLevel = #High;
        nav = 112.30; return1Y = 22.1; return3Y = 18.3; return5Y = 20.5;
        expenseRatio = 1.62; managerName = "Chirag Setalvad";
        managerBio = "Chirag Setalvad brings 18 years of mid-cap investing expertise and has consistently outperformed benchmark indices.";
        inceptionDate = "2007-06-25"; minInvestment = 5000.0;
        description = "Focused on mid-sized companies with high growth potential across sectors like manufacturing, IT, and consumer goods.";
        isActive = true;
        historicalData = makeHistory(52.0, 16.0);
      },
      {
        id = 3; name = "Axis Long Term Equity Fund";
        category = #Equity; riskLevel = #Medium;
        nav = 74.80; return1Y = 14.5; return3Y = 13.2; return5Y = 15.9;
        expenseRatio = 1.73; managerName = "Jinesh Gopani";
        managerBio = "Jinesh Gopani is known for his GARP (Growth at Reasonable Price) investing philosophy with over 16 years of experience.";
        inceptionDate = "2009-12-29"; minInvestment = 500.0;
        description = "An ELSS fund offering tax benefits under Section 80C with a 3-year lock-in, investing in quality growth companies.";
        isActive = true;
        historicalData = makeHistory(35.0, 12.5);
      },
      {
        id = 4; name = "Mirae Asset Emerging Bluechip Fund";
        category = #Equity; riskLevel = #High;
        nav = 98.65; return1Y = 20.7; return3Y = 17.1; return5Y = 19.3;
        expenseRatio = 1.68; managerName = "Neelesh Surana";
        managerBio = "Neelesh Surana is Chief Investment Officer at Mirae Asset with 20+ years of Indian and global equity experience.";
        inceptionDate = "2010-07-09"; minInvestment = 5000.0;
        description = "Invests in emerging large-cap and mid-cap companies poised to become tomorrow's blue chips.";
        isActive = true;
        historicalData = makeHistory(44.0, 15.5);
      },
      {
        id = 5; name = "Nippon India Large Cap Fund";
        category = #Equity; riskLevel = #Low;
        nav = 55.20; return1Y = 12.4; return3Y = 11.8; return5Y = 13.6;
        expenseRatio = 1.15; managerName = "Sailesh Raj Bhan";
        managerBio = "Sailesh Raj Bhan has managed Nippon's flagship large-cap funds for over 15 years with a value-oriented approach.";
        inceptionDate = "2004-08-08"; minInvestment = 5000.0;
        description = "A low-risk equity fund tracking top-100 companies by market capitalisation with stable long-term returns.";
        isActive = true;
        historicalData = makeHistory(30.0, 10.0);
      },
      {
        id = 6; name = "Kotak Small Cap Fund";
        category = #Equity; riskLevel = #High;
        nav = 186.40; return1Y = 21.8; return3Y = 17.9; return5Y = 20.1;
        expenseRatio = 1.78; managerName = "Pankaj Tibrewal";
        managerBio = "Pankaj Tibrewal specialises in small-cap analysis and has built a disciplined bottom-up stock selection process.";
        inceptionDate = "2005-02-24"; minInvestment = 5000.0;
        description = "Focuses on high-growth small-cap companies with strong fundamentals and scalable business models.";
        isActive = true;
        historicalData = makeHistory(80.0, 17.0);
      },
      {
        id = 7; name = "ICICI Prudential Technology Fund";
        category = #Equity; riskLevel = #High;
        nav = 142.75; return1Y = 19.3; return3Y = 16.2; return5Y = 18.4;
        expenseRatio = 1.94; managerName = "Vaibhav Dusad";
        managerBio = "Vaibhav Dusad is a sector specialist with deep expertise in technology stocks, domestic and global IT companies.";
        inceptionDate = "2000-03-03"; minInvestment = 1000.0;
        description = "A thematic fund investing in Indian and global technology companies riding the digital transformation wave.";
        isActive = true;
        historicalData = makeHistory(62.0, 15.0);
      },
      {
        id = 8; name = "DSP Equity Opportunities Fund";
        category = #Equity; riskLevel = #Medium;
        nav = 430.50; return1Y = 15.8; return3Y = 14.0; return5Y = 16.2;
        expenseRatio = 1.25; managerName = "Rohit Singhania";
        managerBio = "Rohit Singhania brings 17 years of experience running multi-cap and focused equity strategies at DSP Asset Managers.";
        inceptionDate = "2000-05-16"; minInvestment = 1000.0;
        description = "A diversified equity fund covering large and mid-cap opportunities with a blend of growth and value stocks.";
        isActive = true;
        historicalData = makeHistory(200.0, 13.0);
      },

      // ── Debt Funds (6) ──────────────────────────────────────────────────
      {
        id = 9; name = "HDFC Corporate Bond Fund";
        category = #Debt; riskLevel = #Low;
        nav = 27.85; return1Y = 7.4; return3Y = 7.1; return5Y = 7.8;
        expenseRatio = 0.35; managerName = "Anil Bamboli";
        managerBio = "Anil Bamboli manages fixed income strategies with a focus on credit quality and duration management at HDFC AMC.";
        inceptionDate = "2010-06-29"; minInvestment = 5000.0;
        description = "Invests predominantly in AA+ and AAA-rated corporate bonds for stable income with low credit risk.";
        isActive = true;
        historicalData = makeHistory(19.0, 6.5);
      },
      {
        id = 10; name = "SBI Short Term Debt Fund";
        category = #Debt; riskLevel = #Low;
        nav = 25.10; return1Y = 6.8; return3Y = 6.5; return5Y = 7.0;
        expenseRatio = 0.28; managerName = "Dinesh Ahuja";
        managerBio = "Dinesh Ahuja focuses on short-duration bond portfolios to deliver consistent risk-adjusted income for investors.";
        inceptionDate = "2002-07-29"; minInvestment = 5000.0;
        description = "A short-duration debt fund investing in government securities and high-quality corporate bonds for 1–3 year horizons.";
        isActive = true;
        historicalData = makeHistory(18.0, 6.0);
      },
      {
        id = 11; name = "ICICI Prudential Gilt Fund";
        category = #Debt; riskLevel = #Medium;
        nav = 84.65; return1Y = 8.2; return3Y = 8.0; return5Y = 8.5;
        expenseRatio = 0.52; managerName = "Manish Banthia";
        managerBio = "Manish Banthia is a veteran fixed-income specialist known for navigating interest-rate cycles effectively.";
        inceptionDate = "1999-08-19"; minInvestment = 5000.0;
        description = "Invests exclusively in government securities, providing sovereign safety with moderate duration risk.";
        isActive = true;
        historicalData = makeHistory(56.0, 7.0);
      },
      {
        id = 12; name = "Axis Banking & PSU Debt Fund";
        category = #Debt; riskLevel = #Low;
        nav = 21.35; return1Y = 7.0; return3Y = 6.8; return5Y = 7.2;
        expenseRatio = 0.22; managerName = "Devang Shah";
        managerBio = "Devang Shah has 12 years in fixed income managing banking sector and PSU bond portfolios with low default risk.";
        inceptionDate = "2012-05-08"; minInvestment = 5000.0;
        description = "Focuses on high-quality bonds issued by banks and public sector undertakings for capital preservation.";
        isActive = true;
        historicalData = makeHistory(15.0, 6.2);
      },
      {
        id = 13; name = "Kotak Dynamic Bond Fund";
        category = #Debt; riskLevel = #Medium;
        nav = 32.90; return1Y = 8.6; return3Y = 8.3; return5Y = 9.0;
        expenseRatio = 0.68; managerName = "Deepak Agrawal";
        managerBio = "Deepak Agrawal actively manages duration across market cycles to optimise fixed-income returns for long-term investors.";
        inceptionDate = "2008-05-26"; minInvestment = 5000.0;
        description = "A flexible bond fund that dynamically adjusts duration based on interest-rate outlook and market conditions.";
        isActive = true;
        historicalData = makeHistory(22.0, 7.5);
      },
      {
        id = 14; name = "Nippon India Income Fund";
        category = #Debt; riskLevel = #Medium;
        nav = 68.20; return1Y = 8.0; return3Y = 7.8; return5Y = 8.2;
        expenseRatio = 0.75; managerName = "Vivek Sharma";
        managerBio = "Vivek Sharma manages medium-to-long duration debt strategies at Nippon India with strong macro-economic insight.";
        inceptionDate = "1997-01-01"; minInvestment = 5000.0;
        description = "A medium-duration income fund investing across government securities and investment-grade corporate bonds.";
        isActive = true;
        historicalData = makeHistory(46.0, 7.0);
      },

      // ── Balanced / Hybrid Funds (6) ─────────────────────────────────────
      {
        id = 15; name = "HDFC Balanced Advantage Fund";
        category = #Balanced; riskLevel = #Medium;
        nav = 375.60; return1Y = 14.2; return3Y = 12.8; return5Y = 14.5;
        expenseRatio = 1.42; managerName = "Prashant Jain";
        managerBio = "Prashant Jain is one of India's most celebrated fund managers with over 25 years of experience in dynamic asset allocation.";
        inceptionDate = "2000-02-01"; minInvestment = 5000.0;
        description = "Dynamically allocates between equity and debt based on valuations, aiming for steady compounding with lower volatility.";
        isActive = true;
        historicalData = makeHistory(200.0, 11.5);
      },
      {
        id = 16; name = "ICICI Prudential Equity & Debt Fund";
        category = #Balanced; riskLevel = #Medium;
        nav = 278.40; return1Y = 15.3; return3Y = 13.5; return5Y = 15.0;
        expenseRatio = 1.57; managerName = "Sankaran Naren";
        managerBio = "Sankaran Naren is widely regarded for his contrarian value-investing approach and expertise in asset allocation strategies.";
        inceptionDate = "1999-11-01"; minInvestment = 5000.0;
        description = "A balanced fund that combines equity growth with debt stability through tactical allocation across asset classes.";
        isActive = true;
        historicalData = makeHistory(148.0, 12.5);
      },
      {
        id = 17; name = "SBI Equity Hybrid Fund";
        category = #Balanced; riskLevel = #Medium;
        nav = 224.85; return1Y = 13.8; return3Y = 12.2; return5Y = 14.0;
        expenseRatio = 1.50; managerName = "R. Srinivasan";
        managerBio = "R. Srinivasan leads SBI's equity hybrid strategies with a focus on fundamental research and disciplined portfolio construction.";
        inceptionDate = "2005-09-09"; minInvestment = 1000.0;
        description = "Maintains a balanced portfolio of 65–80% equity and 20–35% debt to deliver steady capital appreciation.";
        isActive = true;
        historicalData = makeHistory(120.0, 11.0);
      },
      {
        id = 18; name = "Mirae Asset Hybrid Equity Fund";
        category = #Balanced; riskLevel = #Medium;
        nav = 26.75; return1Y = 14.6; return3Y = 13.0; return5Y = 14.8;
        expenseRatio = 1.72; managerName = "Vrijesh Kasera";
        managerBio = "Vrijesh Kasera manages hybrid equity portfolios at Mirae Asset with expertise in equity analysis and strategic debt allocation.";
        inceptionDate = "2015-07-29"; minInvestment = 5000.0;
        description = "A newer hybrid fund leveraging Mirae's strong equity research combined with smart debt portfolio management.";
        isActive = true;
        historicalData = makeHistory(14.0, 12.0);
      },
      {
        id = 19; name = "Kotak Equity Hybrid Fund";
        category = #Balanced; riskLevel = #Medium;
        nav = 46.90; return1Y = 13.2; return3Y = 11.9; return5Y = 13.5;
        expenseRatio = 1.65; managerName = "Abhishek Bisen";
        managerBio = "Abhishek Bisen manages Kotak's balanced funds with deep sector rotation expertise and macro-driven asset allocation.";
        inceptionDate = "2014-11-25"; minInvestment = 5000.0;
        description = "Blends equity momentum with quality fixed-income instruments for risk-adjusted, all-weather performance.";
        isActive = true;
        historicalData = makeHistory(25.0, 11.0);
      },
      {
        id = 20; name = "DSP Dynamic Asset Allocation Fund";
        category = #Balanced; riskLevel = #Medium;
        nav = 23.15; return1Y = 12.5; return3Y = 11.4; return5Y = 12.8;
        expenseRatio = 1.38; managerName = "Atul Bhole";
        managerBio = "Atul Bhole uses quantitative models alongside fundamental research to dynamically balance equity-debt exposure.";
        inceptionDate = "2014-02-03"; minInvestment = 500.0;
        description = "Adjusts equity and debt weights based on market signals, targeting consistent returns across economic cycles.";
        isActive = true;
        historicalData = makeHistory(13.0, 10.5);
      },

      // ── Money Market Funds (5) ──────────────────────────────────────────
      {
        id = 21; name = "HDFC Money Market Fund";
        category = #MoneyMarket; riskLevel = #Low;
        nav = 5142.30; return1Y = 7.0; return3Y = 6.5; return5Y = 6.8;
        expenseRatio = 0.18; managerName = "Anil Bamboli";
        managerBio = "Anil Bamboli also oversees money market operations ensuring high liquidity and capital preservation for short-term investors.";
        inceptionDate = "2003-09-15"; minInvestment = 5000.0;
        description = "Invests in short-term, high-quality money market instruments such as T-bills and CPs for capital safety and liquidity.";
        isActive = true;
        historicalData = makeHistory(3400.0, 5.5);
      },
      {
        id = 22; name = "SBI Savings Fund";
        category = #MoneyMarket; riskLevel = #Low;
        nav = 36.85; return1Y = 6.8; return3Y = 6.4; return5Y = 6.6;
        expenseRatio = 0.15; managerName = "Ravi Kumar";
        managerBio = "Ravi Kumar oversees liquidity management strategies at SBI Mutual Fund with expertise in short-term treasury instruments.";
        inceptionDate = "2004-07-21"; minInvestment = 1000.0;
        description = "A savings-oriented fund investing in certificates of deposit and commercial papers for stable, near-cash returns.";
        isActive = true;
        historicalData = makeHistory(25.0, 5.5);
      },
      {
        id = 23; name = "Nippon India Money Market Fund";
        category = #MoneyMarket; riskLevel = #Low;
        nav = 3286.15; return1Y = 7.1; return3Y = 6.6; return5Y = 6.9;
        expenseRatio = 0.20; managerName = "Anju Chhajer";
        managerBio = "Anju Chhajer manages Nippon's money market desk with a focus on NAV stability and same-day liquidity for institutional investors.";
        inceptionDate = "2005-03-07"; minInvestment = 5000.0;
        description = "Focuses on treasury bills and top-rated commercial papers with residual maturities under 1 year.";
        isActive = true;
        historicalData = makeHistory(2160.0, 5.8);
      },
      {
        id = 24; name = "Kotak Money Market Fund";
        category = #MoneyMarket; riskLevel = #Low;
        nav = 3780.50; return1Y = 6.9; return3Y = 6.3; return5Y = 6.7;
        expenseRatio = 0.10; managerName = "Deepak Agrawal";
        managerBio = "Deepak Agrawal also heads Kotak's ultra-short duration solutions, blending liquidity management with competitive yield.";
        inceptionDate = "2007-08-08"; minInvestment = 5000.0;
        description = "Optimal parking destination for surplus cash, providing better post-tax returns than savings accounts.";
        isActive = true;
        historicalData = makeHistory(2500.0, 5.5);
      },
      {
        id = 25; name = "ICICI Prudential Money Market Fund";
        category = #MoneyMarket; riskLevel = #Low;
        nav = 340.20; return1Y = 7.2; return3Y = 6.8; return5Y = 7.0;
        expenseRatio = 0.12; managerName = "Rahul Goswami";
        managerBio = "Rahul Goswami manages ICICI Pru's money market desk leveraging deep relationships with issuers to source the best yields.";
        inceptionDate = "2006-05-30"; minInvestment = 500.0;
        description = "Provides daily liquidity while investing only in AAA-rated money market instruments with minimal duration risk.";
        isActive = true;
        historicalData = makeHistory(225.0, 6.0);
      },
    ];

    for (fund in data.vals()) {
      funds.add(fund);
    };
  };

  func matchesFilter(fund : Fund, filter : FundFilter) : Bool {
    let categoryMatch = switch (filter.category) {
      case null true;
      case (?cat) fund.category == cat;
    };
    let riskMatch = switch (filter.riskLevel) {
      case null true;
      case (?risk) fund.riskLevel == risk;
    };
    let textMatch = switch (filter.searchText) {
      case null true;
      case (?q) {
        let lower = q.toLower();
        fund.name.toLower().contains(#text lower) or
        fund.managerName.toLower().contains(#text lower) or
        fund.description.toLower().contains(#text lower)
      };
    };
    categoryMatch and riskMatch and textMatch and fund.isActive
  };

  public func getFunds(funds : List.List<Fund>, filter : FundFilter) : [Fund] {
    funds.filter(func(f) { matchesFilter(f, filter) }).toArray()
  };

  public func getFund(funds : List.List<Fund>, id : FundId) : ?Fund {
    funds.find(func(f) { f.id == id })
  };

  public func updateFund(funds : List.List<Fund>, id : FundId, req : UpdateFundRequest) : Bool {
    var updated = false;
    funds.mapInPlace(
      func(f) {
        if (f.id == id) {
          updated := true;
          {
            f with
            nav = req.nav;
            return1Y = req.return1Y;
            return3Y = req.return3Y;
            return5Y = req.return5Y;
            expenseRatio = req.expenseRatio;
            riskLevel = req.riskLevel;
          }
        } else { f }
      }
    );
    updated
  };

  public func getTopPerforming(funds : List.List<Fund>, limit : Nat) : [Fund] {
    let active = funds.filter(func(f) { f.isActive });
    let sorted = active.sort(func(a : Fund, b : Fund) : Order.Order {
      if (a.return1Y > b.return1Y) #less
      else if (a.return1Y < b.return1Y) #greater
      else #equal
    });
    let arr = sorted.toArray();
    if (limit >= arr.size()) arr
    else Array.tabulate<Fund>(limit, func(i) { arr[i] })
  };

  public func activeFundsCount(funds : List.List<Fund>) : Nat {
    funds.filter(func(f) { f.isActive }).size()
  };
};
