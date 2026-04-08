import Common "common";

module {
  public type Timestamp = Common.Timestamp;

  public type UserRole = {
    #Admin;
    #Investor;
    #FinancialAdvisor;
    #DataAnalyst;
  };

  public type AdvisorStatus = {
    #Pending;
    #Approved;
    #Rejected;
  };

  public type User = {
    principal : Principal;
    name : Text;
    email : Text;
    role : UserRole;
    registrationDate : Timestamp;
    isActive : Bool;
    advisorStatus : ?AdvisorStatus;
  };

  public type RegisterUserRequest = {
    name : Text;
    email : Text;
    role : UserRole;
  };
};
