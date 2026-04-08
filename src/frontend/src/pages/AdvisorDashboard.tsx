import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  BookOpen,
  Calculator,
  CheckCircle2,
  Clock,
  Search,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { useUser } from "../hooks/use-user";
import { AdvisorStatus } from "../types";

function StatusSection({ status }: { status: AdvisorStatus }) {
  const config = {
    [AdvisorStatus.Pending]: {
      icon: <Clock className="h-5 w-5 text-warning" />,
      badge: (
        <Badge
          variant="outline"
          className="bg-warning/20 text-warning-foreground border-warning/30 gap-1.5"
        >
          <Clock className="h-3 w-3" />
          Pending Review
        </Badge>
      ),
      title: "Account Under Review",
      message:
        "Your account is pending admin approval. You can browse funds while you wait.",
      bgClass: "bg-warning/5 border-warning/20",
    },
    [AdvisorStatus.Approved]: {
      icon: <CheckCircle2 className="h-5 w-5 text-success" />,
      badge: (
        <Badge
          variant="outline"
          className="bg-success/20 text-success-foreground border-success/30 gap-1.5"
        >
          <CheckCircle2 className="h-3 w-3" />
          Approved
        </Badge>
      ),
      title: "Account Approved",
      message:
        "Your advisor account is active. You have full access to advisor tools and fund insights.",
      bgClass: "bg-success/5 border-success/20",
    },
    [AdvisorStatus.Rejected]: {
      icon: <XCircle className="h-5 w-5 text-destructive" />,
      badge: (
        <Badge
          variant="outline"
          className="bg-destructive/20 text-destructive border-destructive/30 gap-1.5"
        >
          <XCircle className="h-3 w-3" />
          Rejected
        </Badge>
      ),
      title: "Application Not Approved",
      message:
        "Your advisor application was not approved. Please contact support for more information or to reapply.",
      bgClass: "bg-destructive/5 border-destructive/20",
    },
  };

  const c = config[status];

  return (
    <div
      className={`rounded-xl border p-5 flex items-start gap-4 ${c.bgClass}`}
      data-ocid="advisor-status-section"
    >
      <div className="mt-0.5 shrink-0">{c.icon}</div>
      <div className="space-y-1.5 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-display font-semibold text-foreground">
            {c.title}
          </h3>
          {c.badge}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {c.message}
        </p>
      </div>
    </div>
  );
}

const quickLinks = [
  {
    icon: <Search className="h-5 w-5" />,
    label: "Browse Funds",
    description: "Explore mutual funds by category, risk, and returns",
    href: "/funds",
    ocid: "quicklink-browse-funds",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: <Calculator className="h-5 w-5" />,
    label: "Investment Calculator",
    description: "Simulate SIP and lump sum scenarios for clients",
    href: "/calculator",
    ocid: "quicklink-calculator",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    label: "Learning Resources",
    description: "Educational articles and fund analysis guides",
    href: "/learn",
    ocid: "quicklink-learn",
    color: "text-success",
    bg: "bg-success/10",
  },
];

export default function AdvisorDashboard() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div
        className="flex-1 p-6 space-y-6"
        data-ocid="advisor-dashboard-loading"
      >
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const advisorStatus = user?.advisorStatus ?? AdvisorStatus.Pending;

  return (
    <div className="flex-1 bg-background" data-ocid="advisor-dashboard">
      {/* Page header */}
      <div className="bg-card border-b border-border px-6 py-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/15">
                <TrendingUp className="h-4 w-4 text-accent" />
              </div>
              <h1 className="font-display text-xl font-bold text-foreground">
                Advisor Dashboard
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Welcome back,{" "}
              <span className="font-medium text-foreground">
                {user?.name ?? "Advisor"}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/40 rounded-lg px-3 py-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">
              {user?.email ?? "No email on file"}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6 max-w-3xl">
        {/* Profile card */}
        <Card className="border-border" data-ocid="advisor-profile-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/15 shrink-0">
                <span className="font-display font-bold text-accent text-lg">
                  {user?.name
                    ? user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)
                    : "FA"}
                </span>
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <p className="font-display font-semibold text-foreground text-base truncate">
                  {user?.name ?? "Financial Advisor"}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  {user?.email ?? "—"}
                </p>
              </div>
              <Badge
                variant="outline"
                className="bg-accent/20 text-accent border-accent/30 shrink-0"
              >
                Financial Advisor
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Approval status */}
        <StatusSection status={advisorStatus} />

        {/* Quick links */}
        <div>
          <h2 className="font-display font-semibold text-foreground mb-3 text-sm uppercase tracking-wide text-muted-foreground">
            Quick Access
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickLinks.map((link) => (
              <Link key={link.href} to={link.href} data-ocid={link.ocid}>
                <Card className="border-border hover:border-primary/30 hover:shadow-md transition-smooth cursor-pointer h-full">
                  <CardContent className="p-4 space-y-2">
                    <div
                      className={`w-9 h-9 rounded-lg ${link.bg} flex items-center justify-center`}
                    >
                      <span className={link.color}>{link.icon}</span>
                    </div>
                    <p className="font-display font-semibold text-foreground text-sm">
                      {link.label}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {link.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA for pending */}
        {advisorStatus === AdvisorStatus.Pending && (
          <div className="rounded-xl bg-muted/40 border border-border p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1 space-y-1">
              <p className="font-semibold text-foreground text-sm">
                Explore while you wait
              </p>
              <p className="text-xs text-muted-foreground">
                You have read access to the full mutual fund database and
                educational resources.
              </p>
            </div>
            <Button asChild size="sm" data-ocid="btn-browse-funds-cta">
              <Link to="/funds">
                <Search className="h-4 w-4 mr-2" />
                Browse Funds
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
