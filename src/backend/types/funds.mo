import Common "common";

module {
  public type FundId = Common.FundId;

  public type FundCategory = {
    #Equity;
    #Debt;
    #Balanced;
    #MoneyMarket;
  };

  public type RiskLevel = {
    #Low;
    #Medium;
    #High;
  };

  public type HistoricalPoint = {
    date : Text;
    nav : Float;
  };

  public type Fund = {
    id : FundId;
    name : Text;
    category : FundCategory;
    riskLevel : RiskLevel;
    nav : Float;
    return1Y : Float;
    return3Y : Float;
    return5Y : Float;
    expenseRatio : Float;
    managerName : Text;
    managerBio : Text;
    inceptionDate : Text;
    minInvestment : Float;
    description : Text;
    isActive : Bool;
    historicalData : [HistoricalPoint];
  };

  public type FundFilter = {
    category : ?FundCategory;
    riskLevel : ?RiskLevel;
    searchText : ?Text;
  };

  public type UpdateFundRequest = {
    nav : Float;
    return1Y : Float;
    return3Y : Float;
    return5Y : Float;
    expenseRatio : Float;
    riskLevel : RiskLevel;
  };
};
