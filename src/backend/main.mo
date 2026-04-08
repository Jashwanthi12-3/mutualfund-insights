import List "mo:core/List";
import Map "mo:core/Map";
import Set "mo:core/Set";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import FundTypes "types/funds";
import UserTypes "types/users";
import AdvisorTypes "types/advisor";
import FundsMixin "mixins/funds-api";
import UsersMixin "mixins/users-api";
import FavoritesMixin "mixins/favorites-api";
import AdvisorMixin "mixins/advisor-api";
import ReportsMixin "mixins/reports-api";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Funds state
  let funds = List.empty<FundTypes.Fund>();

  // Users state
  let users = Map.empty<Principal, UserTypes.User>();
  let nextUserId = { var value : Nat = 0 };

  // Favorites state
  let favorites = Map.empty<Principal, Set.Set<FundTypes.FundId>>();

  // Advisor content state
  let articles = List.empty<AdvisorTypes.Article>();
  let nextArticleId = { var value : Nat = 0 };

  // Mixins
  include FundsMixin(accessControlState, funds);
  include UsersMixin(accessControlState, users, nextUserId);
  include FavoritesMixin(accessControlState, favorites);
  include AdvisorMixin(accessControlState, articles, nextArticleId, users);
  include ReportsMixin(accessControlState, funds, users);
};
