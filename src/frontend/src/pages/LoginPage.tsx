import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import { BarChart3, Lock, ShieldCheck, TrendingUp } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "../hooks/use-auth";
import { useUser } from "../hooks/use-user";

const features = [
  {
    icon: <TrendingUp className="h-5 w-5 text-primary" />,
    title: "20+ Mutual Funds",
    description:
      "Browse curated funds across equity, debt, balanced, and money market categories",
  },
  {
    icon: <BarChart3 className="h-5 w-5 text-accent" />,
    title: "Smart Comparison",
    description:
      "Compare up to 4 funds side-by-side with overlapping performance charts",
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-success" />,
    title: "Role-Based Access",
    description:
      "Tailored views for Investors, Advisors, Data Analysts, and Administrators",
  },
];

export default function LoginPage() {
  const { isAuthenticated, login, isLoading } = useAuth();
  const { user, isLoading: userLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate({ to: "/dashboard" });
    } else if (isAuthenticated && !userLoading && user === null) {
      navigate({ to: "/register" });
    }
  }, [isAuthenticated, user, userLoading, navigate]);

  return (
    <div
      className="flex-1 flex items-center justify-center p-6 bg-background"
      data-ocid="login-page"
    >
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: branding + features */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary shadow-md">
                <TrendingUp className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-2xl text-foreground">
                MutualFunds
              </span>
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground leading-tight">
              Your Gateway to Smarter{" "}
              <span className="text-gradient-primary">Investments</span>
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed">
              Analyze, compare, and simulate mutual fund investments with
              professional-grade tools. Make informed decisions backed by real
              data.
            </p>
          </div>

          <div className="space-y-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border"
              >
                <div className="mt-0.5">{f.icon}</div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {f.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/30 text-xs"
            >
              Investor
            </Badge>
            <Badge
              variant="outline"
              className="bg-accent/10 text-accent border-accent/30 text-xs"
            >
              Financial Advisor
            </Badge>
            <Badge
              variant="outline"
              className="bg-warning/10 text-warning-foreground border-warning/30 text-xs"
            >
              Data Analyst
            </Badge>
            <Badge
              variant="outline"
              className="bg-destructive/10 text-destructive border-destructive/30 text-xs"
            >
              Admin
            </Badge>
          </div>
        </div>

        {/* Right: login card */}
        <div>
          <Card className="shadow-lg border-border" data-ocid="login-card">
            <CardHeader className="space-y-1 text-center pb-4">
              <div className="flex justify-center mb-2">
                <div className="p-3 rounded-full bg-primary/10">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="font-display text-xl">
                Sign In Securely
              </CardTitle>
              <CardDescription className="text-sm">
                Use Internet Identity — a privacy-preserving, password-free
                authentication
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {isLoading || userLoading ? (
                <div className="space-y-3" data-ocid="login-loading">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-4 w-3/4 mx-auto" />
                </div>
              ) : (
                <>
                  <Button
                    className="w-full gap-2 font-semibold"
                    size="lg"
                    onClick={login}
                    data-ocid="btn-internet-identity-login"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Sign In with Internet Identity
                  </Button>
                  <p className="text-xs text-muted-foreground text-center leading-relaxed">
                    No password required. Your identity is secured by Internet
                    Computer cryptography.
                  </p>
                </>
              )}

              <div className="border-t border-border pt-4">
                <p className="text-xs text-muted-foreground text-center">
                  New users will be prompted to create their profile after
                  signing in.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
