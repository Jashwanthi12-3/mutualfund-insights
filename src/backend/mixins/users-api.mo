import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import UsersLib "../lib/users";
import UserTypes "../types/users";

mixin (
  accessControlState : AccessControl.AccessControlState,
  users : Map.Map<Principal, UserTypes.User>,
  nextUserId : { var value : Nat },
) {
  public shared ({ caller }) func registerUser(req : UserTypes.RegisterUserRequest) : async UserTypes.User {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be authenticated to register");
    };
    UsersLib.registerUser(users, caller, req);
  };

  public query ({ caller }) func getCallerUser() : async ?UserTypes.User {
    UsersLib.getUser(users, caller);
  };

  public query ({ caller }) func getUsers() : async [UserTypes.User] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list users");
    };
    UsersLib.getAllUsers(users);
  };

  public shared ({ caller }) func toggleUserStatus(principal : Principal) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can toggle user status");
    };
    UsersLib.toggleUserStatus(users, principal);
  };

  public shared ({ caller }) func approveAdvisor(principal : Principal) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can approve advisors");
    };
    UsersLib.approveAdvisor(users, principal);
  };

  public shared ({ caller }) func rejectAdvisor(principal : Principal) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can reject advisors");
    };
    UsersLib.rejectAdvisor(users, principal);
  };
};
