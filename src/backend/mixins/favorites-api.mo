import Map "mo:core/Map";
import Set "mo:core/Set";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import FavoritesLib "../lib/favorites";
import FundTypes "../types/funds";

mixin (
  accessControlState : AccessControl.AccessControlState,
  favorites : Map.Map<Principal, Set.Set<FundTypes.FundId>>,
) {
  public shared ({ caller }) func saveFavorite(fundId : FundTypes.FundId) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be authenticated to save favorites");
    };
    FavoritesLib.saveFavorite(favorites, caller, fundId);
  };

  public query ({ caller }) func getFavorites() : async [FundTypes.FundId] {
    if (caller.isAnonymous()) {
      return [];
    };
    FavoritesLib.getFavorites(favorites, caller);
  };

  public shared ({ caller }) func removeFavorite(fundId : FundTypes.FundId) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be authenticated to remove favorites");
    };
    FavoritesLib.removeFavorite(favorites, caller, fundId);
  };
};
