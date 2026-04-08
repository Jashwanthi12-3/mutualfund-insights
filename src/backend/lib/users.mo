import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Types "../types/users";

module {
  public type User = Types.User;
  public type UserRole = Types.UserRole;
  public type RegisterUserRequest = Types.RegisterUserRequest;

  public func registerUser(
    users : Map.Map<Principal, User>,
    caller : Principal,
    req : RegisterUserRequest,
  ) : User {
    switch (users.get(caller)) {
      case (?_existing) { Runtime.trap("User already registered") };
      case null {};
    };
    let advisorStatus : ?Types.AdvisorStatus = switch (req.role) {
      case (#FinancialAdvisor) { ?#Pending };
      case (_) { null };
    };
    let user : User = {
      principal = caller;
      name = req.name;
      email = req.email;
      role = req.role;
      registrationDate = Time.now();
      isActive = true;
      advisorStatus = advisorStatus;
    };
    users.add(caller, user);
    user;
  };

  public func getUser(users : Map.Map<Principal, User>, principal : Principal) : ?User {
    users.get(principal);
  };

  public func getAllUsers(users : Map.Map<Principal, User>) : [User] {
    users.values().toArray();
  };

  public func toggleUserStatus(users : Map.Map<Principal, User>, principal : Principal) : Bool {
    switch (users.get(principal)) {
      case null { Runtime.trap("User not found") };
      case (?user) {
        let updated = { user with isActive = not user.isActive };
        users.add(principal, updated);
        updated.isActive;
      };
    };
  };

  public func approveAdvisor(users : Map.Map<Principal, User>, principal : Principal) : Bool {
    switch (users.get(principal)) {
      case null { Runtime.trap("User not found") };
      case (?user) {
        switch (user.role) {
          case (#FinancialAdvisor) {};
          case (_) { Runtime.trap("User is not a Financial Advisor") };
        };
        let updated = { user with advisorStatus = ?#Approved };
        users.add(principal, updated);
        true;
      };
    };
  };

  public func rejectAdvisor(users : Map.Map<Principal, User>, principal : Principal) : Bool {
    switch (users.get(principal)) {
      case null { Runtime.trap("User not found") };
      case (?user) {
        switch (user.role) {
          case (#FinancialAdvisor) {};
          case (_) { Runtime.trap("User is not a Financial Advisor") };
        };
        let updated = { user with advisorStatus = ?#Rejected };
        users.add(principal, updated);
        true;
      };
    };
  };

  public func countByRole(users : Map.Map<Principal, User>, role : UserRole) : Nat {
    users.foldLeft(
      0,
      func(acc : Nat, _k : Principal, u : User) : Nat {
        if (u.role == role) { acc + 1 } else { acc };
      },
    );
  };

  public func pendingAdvisorsCount(users : Map.Map<Principal, User>) : Nat {
    users.foldLeft(
      0,
      func(acc : Nat, _k : Principal, u : User) : Nat {
        switch (u.advisorStatus) {
          case (?#Pending) { acc + 1 };
          case (_) { acc };
        };
      },
    );
  };
};
