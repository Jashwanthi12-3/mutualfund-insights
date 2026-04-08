import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  BarChart2,
  Clock,
  Coins,
  Settings,
  Shield,
  TrendingUp,
  UserCheck,
  UserCog,
  Users,
} from "lucide-react";
import { useBackend } from "../hooks/use-backend";
import { AdvisorStatus, UserRole } from "../types";
import type { PlatformStats, User } from "../types";

function StatCard({
  label,
  value,
  icon,
  isLoading,
  accent,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  isLoading: boolean;
  accent?: string;
}) {
  return (
    <Card className="bg-card border border-border shadow-xs">
      <CardContent className="p-5 flex items-center gap-4">
        <div
          className={`flex items-center justify-center w-11 h-11 rounded-lg shrink-0 ${accent ?? "bg-primary/10"}`}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest truncate">
            {label}
          </p>
          {isLoading ? (
            <Skeleton className="h-7 w-16 mt-1" />
          ) : (
            <p className="text-2xl font-bold font-display text-foreground leading-tight">
              {value}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function NavCard({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      to={href}
      data-ocid={`admin-nav-${title.toLowerCase().replace(/\s/g, "-")}`}
    >
      <Card className="bg-card border border-border shadow-xs hover:shadow-md hover:border-primary/30 transition-smooth cursor-pointer group h-full">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 shrink-0 group-hover:bg-primary/20 transition-smooth">
            {icon}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-foreground font-display">
              {title}
            </p>
            <p className="text-sm text-muted-foreground mt-0.5 truncate">
              {description}
            </p>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-smooth shrink-0" />
        </CardContent>
      </Card>
    </Link>
  );
}

export default function AdminDashboard() {
  const { actor, isFetching } = useBackend();

  const { data: stats, isLoading: statsLoading } = useQuery<PlatformStats>({
    queryKey: ["platformStats"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getPlatformStats();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60 * 1000,
  });

  const { data: users, isLoading: usersLoading } = useQuery<User[]>({
    queryKey: ["allUsers"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getUsers();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60 * 1000,
  });

  const recentUsers = users
    ? [...users]
        .sort((a, b) => Number(b.registrationDate) - Number(a.registrationDate))
        .slice(0, 6)
    : [];

  const pendingAdvisors =
    users?.filter(
      (u) =>
        u.role === UserRole.FinancialAdvisor &&
        u.advisorStatus === AdvisorStatus.Pending,
    ) ?? [];

  const roleBadgeClass: Record<UserRole, string> = {
    [UserRole.Admin]:
      "bg-destructive/20 text-destructive border-destructive/30",
    [UserRole.Investor]: "bg-primary/20 text-primary border-primary/30",
    [UserRole.FinancialAdvisor]: "bg-accent/20 text-accent border-accent/30",
    [UserRole.DataAnalyst]:
      "bg-warning/20 text-warning-foreground border-warning/30",
  };
  const roleLabel: Record<UserRole, string> = {
    [UserRole.Admin]: "Admin",
    [UserRole.Investor]: "Investor",
    [UserRole.FinancialAdvisor]: "Advisor",
    [UserRole.DataAnalyst]: "Analyst",
  };

  return (
    <div
      className="flex-1 flex flex-col bg-background"
      data-ocid="admin-dashboard"
    >
      {/* Page header */}
      <div className="bg-card border-b border-border px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-destructive/10">
            <Shield className="h-5 w-5 text-destructive" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-foreground leading-tight">
              Admin Panel
            </h1>
            <p className="text-sm text-muted-foreground">
              Platform overview and management
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6">
        {/* Stats grid */}
        <section data-ocid="admin-stats">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
            Platform Statistics
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Total Users"
              value={stats ? Number(stats.totalUsers) : "—"}
              icon={<Users className="h-5 w-5 text-primary" />}
              isLoading={statsLoading}
              accent="bg-primary/10"
            />
            <StatCard
              label="Total Funds"
              value={stats ? Number(stats.totalFunds) : "—"}
              icon={<Coins className="h-5 w-5 text-accent" />}
              isLoading={statsLoading}
              accent="bg-accent/10"
            />
            <StatCard
              label="Active Investors"
              value={stats ? Number(stats.activeInvestors) : "—"}
              icon={<TrendingUp className="h-5 w-5 text-success" />}
              isLoading={statsLoading}
              accent="bg-success/10"
            />
            <StatCard
              label="Pending Advisors"
              value={stats ? Number(stats.pendingAdvisors) : "—"}
              icon={<UserCheck className="h-5 w-5 text-warning-foreground" />}
              isLoading={statsLoading}
              accent="bg-warning/10"
            />
          </div>
        </section>

        {/* Navigation cards */}
        <section data-ocid="admin-nav-cards">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
            Management
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <NavCard
              title="User Management"
              description="View, search, and manage all registered users"
              href="/admin/users"
              icon={<UserCog className="h-6 w-6 text-primary" />}
            />
            <NavCard
              title="Fund Management"
              description="Edit NAV, returns, and risk levels for all funds"
              href="/admin/funds"
              icon={<BarChart2 className="h-6 w-6 text-accent" />}
            />
            <NavCard
              title="Platform Settings"
              description="Manage fund data, NAV updates, and risk classifications"
              href="/admin/funds"
              icon={<Settings className="h-6 w-6 text-muted-foreground" />}
            />
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent users */}
          <section data-ocid="admin-recent-users">
            <Card className="bg-card border border-border shadow-xs h-full">
              <CardHeader className="pb-2 border-b border-border/50">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-display text-base font-semibold flex items-center gap-2">
                    <Activity className="h-4 w-4 text-primary" />
                    Recent Registrations
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="h-7 text-xs"
                  >
                    <Link to="/admin/users">View all</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {usersLoading ? (
                  <div className="p-4 space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="flex-1 space-y-1">
                          <Skeleton className="h-3 w-32" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : recentUsers.length === 0 ? (
                  <p className="p-6 text-center text-sm text-muted-foreground">
                    No users registered yet.
                  </p>
                ) : (
                  <ul className="divide-y divide-border/50">
                    {recentUsers.map((u) => (
                      <li
                        key={u.principal.toString()}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-muted/20 transition-smooth"
                        data-ocid="admin-recent-user-row"
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 shrink-0">
                          <span className="text-xs font-bold text-primary">
                            {u.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-foreground truncate">
                            {u.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {u.email}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={`shrink-0 text-xs ${roleBadgeClass[u.role]}`}
                        >
                          {roleLabel[u.role]}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </section>

          {/* Pending advisors */}
          <section data-ocid="admin-pending-advisors">
            <Card className="bg-card border border-border shadow-xs h-full">
              <CardHeader className="pb-2 border-b border-border/50">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-display text-base font-semibold flex items-center gap-2">
                    <Clock className="h-4 w-4 text-warning-foreground" />
                    Pending Approvals
                    {pendingAdvisors.length > 0 && (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-warning/30 text-warning-foreground text-xs font-bold">
                        {pendingAdvisors.length}
                      </span>
                    )}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="h-7 text-xs"
                  >
                    <Link to="/admin/users">Review</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {usersLoading ? (
                  <div className="p-4 space-y-3">
                    {[1, 2].map((i) => (
                      <Skeleton key={i} className="h-12 w-full rounded-lg" />
                    ))}
                  </div>
                ) : pendingAdvisors.length === 0 ? (
                  <div className="p-6 text-center space-y-1">
                    <UserCheck className="h-8 w-8 text-success mx-auto opacity-60" />
                    <p className="text-sm text-muted-foreground">
                      No pending advisor approvals.
                    </p>
                  </div>
                ) : (
                  <ul className="divide-y divide-border/50">
                    {pendingAdvisors.map((u) => (
                      <li
                        key={u.principal.toString()}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-muted/20 transition-smooth"
                        data-ocid="admin-pending-advisor-row"
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-warning/10 shrink-0">
                          <span className="text-xs font-bold text-warning-foreground">
                            {u.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-foreground truncate">
                            {u.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {u.email}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="shrink-0 bg-warning/10 text-warning-foreground border-warning/30 text-xs"
                        >
                          Pending
                        </Badge>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
