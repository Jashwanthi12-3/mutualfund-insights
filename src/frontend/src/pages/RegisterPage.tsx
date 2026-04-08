import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  Briefcase,
  ShieldCheck,
  TrendingUp,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useBackend } from "../hooks/use-backend";
import { UserRole } from "../types";

interface RoleOption {
  value: UserRole;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const roleOptions: RoleOption[] = [
  {
    value: UserRole.Investor,
    label: "Investor",
    description: "Browse funds, compare performance, and plan investments",
    icon: <TrendingUp className="h-5 w-5" />,
  },
  {
    value: UserRole.FinancialAdvisor,
    label: "Financial Advisor",
    description: "Access advisor tools, share insights, and assist clients",
    icon: <Briefcase className="h-5 w-5" />,
  },
  {
    value: UserRole.DataAnalyst,
    label: "Data Analyst",
    description: "Analyze fund data, generate insights and trend reports",
    icon: <BarChart3 className="h-5 w-5" />,
  },
];

const roleColors: Record<UserRole, string> = {
  [UserRole.Investor]: "border-primary/50 bg-primary/5 text-primary",
  [UserRole.FinancialAdvisor]: "border-accent/50 bg-accent/5 text-accent",
  [UserRole.DataAnalyst]:
    "border-warning/50 bg-warning/5 text-warning-foreground",
  [UserRole.Admin]: "border-destructive/50 bg-destructive/5 text-destructive",
};

export default function RegisterPage() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.Investor);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const registerMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.registerUser({
        name: name.trim(),
        email: email.trim(),
        role: selectedRole,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerUser"] });
      toast.success("Profile created! Welcome to MutualFunds.");
      navigate({ to: "/dashboard" });
    },
    onError: (err: unknown) => {
      const message =
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again.";
      toast.error(message);
    },
  });

  function validateAndSubmit(e: React.FormEvent) {
    e.preventDefault();
    let valid = true;

    if (!name.trim()) {
      setNameError("Name is required");
      valid = false;
    } else if (name.trim().length < 2) {
      setNameError("Name must be at least 2 characters");
      valid = false;
    } else {
      setNameError("");
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError("Enter a valid email address");
      valid = false;
    } else {
      setEmailError("");
    }

    if (valid) registerMutation.mutate();
  }

  return (
    <div
      className="flex-1 flex items-center justify-center p-6 bg-background"
      data-ocid="register-page"
    >
      <div className="w-full max-w-lg space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-primary/10">
              <User className="h-7 w-7 text-primary" />
            </div>
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Create Your Profile
          </h1>
          <p className="text-muted-foreground text-sm">
            You&apos;re authenticated. Just complete your profile to get
            started.
          </p>
        </div>

        <Card className="shadow-md" data-ocid="register-card">
          <CardHeader className="pb-3">
            <CardTitle className="font-display text-lg">
              Profile Details
            </CardTitle>
            <CardDescription>
              Tell us about yourself to personalize your experience
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={validateAndSubmit} className="space-y-5">
              {/* Name */}
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => {
                    if (!name.trim()) setNameError("Name is required");
                    else setNameError("");
                  }}
                  className={
                    nameError
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }
                  data-ocid="input-name"
                />
                {nameError && (
                  <p className="text-xs text-destructive">{nameError}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="rahul@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => {
                    if (!email.trim()) setEmailError("Email is required");
                    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
                      setEmailError("Enter a valid email");
                    else setEmailError("");
                  }}
                  className={
                    emailError
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }
                  data-ocid="input-email"
                />
                {emailError && (
                  <p className="text-xs text-destructive">{emailError}</p>
                )}
              </div>

              {/* Role selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Select Your Role <span className="text-destructive">*</span>
                </Label>
                <div className="grid grid-cols-1 gap-2">
                  {roleOptions.map((opt) => {
                    const isSelected = selectedRole === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setSelectedRole(opt.value)}
                        className={`flex items-start gap-3 p-3 rounded-lg border-2 text-left transition-smooth ${
                          isSelected
                            ? `${roleColors[opt.value]} border-opacity-100`
                            : "border-border bg-card hover:bg-muted/30"
                        }`}
                        data-ocid={`role-option-${opt.value.toLowerCase()}`}
                      >
                        <div
                          className={`mt-0.5 ${isSelected ? "" : "text-muted-foreground"}`}
                        >
                          {opt.icon}
                        </div>
                        <div className="min-w-0">
                          <p
                            className={`text-sm font-semibold ${isSelected ? "" : "text-foreground"}`}
                          >
                            {opt.label}
                          </p>
                          <p
                            className={`text-xs mt-0.5 ${isSelected ? "opacity-80" : "text-muted-foreground"}`}
                          >
                            {opt.description}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="ml-auto mt-0.5">
                            <ShieldCheck className="h-4 w-4" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-muted-foreground">
                  Note: Admin access is granted separately by the platform
                  administrator.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full gap-2 font-semibold"
                size="lg"
                disabled={registerMutation.isPending || !actor}
                data-ocid="btn-create-profile"
              >
                {registerMutation.isPending ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
                    Creating Profile…
                  </>
                ) : (
                  <>
                    <User className="h-4 w-4" />
                    Create My Profile
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
