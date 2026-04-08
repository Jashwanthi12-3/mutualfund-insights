import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import FundsLib "../lib/funds";
import FundTypes "../types/funds";

mixin (
  accessControlState : AccessControl.AccessControlState,
  funds : List.List<FundTypes.Fund>,
) {
  public query func getFunds(filter : FundTypes.FundFilter) : async [FundTypes.Fund] {
    FundsLib.getFunds(funds, filter)
  };

  public query func getFund(id : FundTypes.FundId) : async ?FundTypes.Fund {
    FundsLib.getFund(funds, id)
  };

  public shared ({ caller }) func updateFund(id : FundTypes.FundId, req : FundTypes.UpdateFundRequest) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update fund data");
    };
    FundsLib.updateFund(funds, id, req)
  };

  public query func getTopPerformingFunds(limit : Nat) : async [FundTypes.Fund] {
    FundsLib.getTopPerforming(funds, limit)
  };
};
