import List "mo:core/List";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import UsersLib "../lib/users";
import FundTypes "../types/funds";
import UserTypes "../types/users";
import ReportTypes "../types/reports";

mixin (
  accessControlState : AccessControl.AccessControlState,
  funds : List.List<FundTypes.Fund>,
  users : Map.Map<Principal, UserTypes.User>,
) {
  public query ({ caller }) func getPlatformStats() : async ReportTypes.PlatformStats {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view platform stats");
    };
    {
      totalUsers = users.size();
      totalFunds = funds.size();
      activeInvestors = UsersLib.countByRole(users, #Investor);
      pendingAdvisors = UsersLib.pendingAdvisorsCount(users);
    };
  };
};
