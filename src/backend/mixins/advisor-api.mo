import List "mo:core/List";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import AdvisorLib "../lib/advisor";
import AdvisorTypes "../types/advisor";
import UserTypes "../types/users";

mixin (
  accessControlState : AccessControl.AccessControlState,
  articles : List.List<AdvisorTypes.Article>,
  nextArticleId : { var value : Nat },
  users : Map.Map<Principal, UserTypes.User>,
) {
  public shared ({ caller }) func postArticle(req : AdvisorTypes.PostArticleRequest) : async AdvisorTypes.Article {
    Runtime.trap("not implemented");
  };

  public query func getArticles() : async [AdvisorTypes.Article] {
    Runtime.trap("not implemented");
  };
};
