import Map "mo:core/Map";
import Set "mo:core/Set";
import Types "../types/funds";

module {
  public type FundId = Types.FundId;

  public func saveFavorite(
    favorites : Map.Map<Principal, Set.Set<FundId>>,
    caller : Principal,
    fundId : FundId,
  ) {
    let callerSet = switch (favorites.get(caller)) {
      case (?s) { s };
      case null {
        let s = Set.empty<FundId>();
        favorites.add(caller, s);
        s;
      };
    };
    callerSet.add(fundId);
  };

  public func getFavorites(
    favorites : Map.Map<Principal, Set.Set<FundId>>,
    caller : Principal,
  ) : [FundId] {
    switch (favorites.get(caller)) {
      case null { [] };
      case (?s) { s.toArray() };
    };
  };

  public func removeFavorite(
    favorites : Map.Map<Principal, Set.Set<FundId>>,
    caller : Principal,
    fundId : FundId,
  ) {
    switch (favorites.get(caller)) {
      case null {};
      case (?s) { s.remove(fundId) };
    };
  };
};
