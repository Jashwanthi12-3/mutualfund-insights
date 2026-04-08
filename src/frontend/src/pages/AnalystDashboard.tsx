import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { BarChart2, Layers, TrendingUp, Trophy } from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CATEGORY_LABELS, CHART_COLORS, RISK_COLORS } from "../constants";
import { useBackend } from "../hooks/use-backend";
import { useUser } from "../hooks/use-user";
import { FundCategory, RiskLevel } from "../types";
import type { Fund } from "../types";

function useAllFunds() {
  const { actor, isFetching } = useBackend();
  return useQuery<Fund[]>({
    queryKey: ["allFunds"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFunds({});
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

function useTopFunds(limit: bigint) {
  const { actor, isFetching } = useBackend();
  return useQuery<Fund[]>({
    queryKey: ["topFunds", limit.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTopPerformingFunds(limit);
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

const CATEGORY_ORDER = [
  FundCategory.Equity,
  FundCategory.Debt,
  FundCategory.Balanced,
  FundCategory.MoneyMarket,
] as const;

const RISK_ORDER = [RiskLevel.Low, RiskLevel.Medium, RiskLevel.High] as const;

const RISK_CHART_COLORS: Record<RiskLevel, string> = {
  [RiskLevel.Low]: "oklch(0.55 0.16 150)",
  [RiskLevel.Medium]: "oklch(0.7 0.15 85)",
  [RiskLevel.High]: "oklch(0.55 0.22 25)",
};

const RISK_BADGE_CLASSES: Record<RiskLevel, string> = {
  [RiskLevel.Low]: "bg-success/20 text-success-foreground border-success/30",
  [RiskLevel.Medium]: "bg-warning/20 text-warning-foreground border-warning/30",
  [RiskLevel.High]: "bg-destructive/20 text-destructive border-destructive/30",
};

function StatCard({
  icon,
  label,
  value,
  sub,
  ocid,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  ocid: string;
}) {
  return (
    <Card className="border-border" data-ocid={ocid}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              {label}
            </p>
            <p className="font-display font-bold text-2xl text-foreground">
              {value}
            </p>
            {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
          </div>
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-primary">{icon}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AnalystDashboard() {
  const { user, isLoading: userLoading } = useUser();
  const { data: allFunds = [], isLoading: fundsLoading } = useAllFunds();
  const { data: topFunds = [], isLoading: topLoading } = useTopFunds(5n);

  const isLoading = userLoading || fundsLoading || topLoading;

  // Compute category distribution
  const categoryData = CATEGORY_ORDER.map((cat, i) => ({
    name: CATEGORY_LABELS[cat],
    value: allFunds.filter((f) => f.category === cat).length,
    color: CHART_COLORS[i],
  })).filter((d) => d.value > 0);

  // Compute risk distribution
  const riskData = RISK_ORDER.map((risk) => ({
    name: risk,
    count: allFunds.filter((f) => f.riskLevel === risk).length,
    color: RISK_CHART_COLORS[risk],
  }));

  if (isLoading) {
    return (
      <div
        className="flex-1 p-6 space-y-6"
        data-ocid="analyst-dashboard-loading"
      >
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-72 rounded-xl" />
          <Skeleton className="h-72 rounded-xl" />
        </div>
      </div>
    );
  }

  const avgReturn1Y =
    allFunds.length > 0
      ? (
          allFunds.reduce((s, f) => s + f.return1Y, 0) / allFunds.length
        ).toFixed(1)
      : "—";

  return (
    <div className="flex-1 bg-background" data-ocid="analyst-dashboard">
      {/* Page header */}
      <div className="bg-card border-b border-border px-6 py-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-warning/15">
                <BarChart2 className="h-4 w-4 text-warning" />
              </div>
              <h1 className="font-display text-xl font-bold text-foreground">
                Analyst Dashboard
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Fund distribution and performance analytics for{" "}
              <span className="font-medium text-foreground">
                {user?.name ?? "Analyst"}
              </span>
            </p>
          </div>
          <Badge
            variant="outline"
            className="bg-warning/20 text-warning-foreground border-warning/30"
          >
            Data Analyst
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Stat cards */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          data-ocid="analyst-stats"
        >
          <StatCard
            icon={<Layers className="h-4 w-4" />}
            label="Total Funds"
            value={allFunds.length}
            sub="In database"
            ocid="stat-total-funds"
          />
          <StatCard
            icon={<Trophy className="h-4 w-4" />}
            label="Top Performers"
            value={topFunds.length}
            sub="By 1Y returns"
            ocid="stat-top-performers"
          />
          <StatCard
            icon={<TrendingUp className="h-4 w-4" />}
            label="Avg 1Y Return"
            value={avgReturn1Y !== "—" ? `${avgReturn1Y}%` : "—"}
            sub="Across all funds"
            ocid="stat-avg-return"
          />
          <StatCard
            icon={<BarChart2 className="h-4 w-4" />}
            label="Categories"
            value={categoryData.length}
            sub="Fund types"
            ocid="stat-categories"
          />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category distribution pie */}
          <Card
            className="border-border"
            data-ocid="chart-category-distribution"
          >
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-base font-semibold text-foreground">
                Fund Distribution by Category
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Breakdown across all {allFunds.length} funds
              </p>
            </CardHeader>
            <CardContent>
              {categoryData.length === 0 ? (
                <div className="flex items-center justify-center h-56 text-muted-foreground text-sm">
                  No fund data available
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                      nameKey="name"
                    >
                      {categoryData.map((entry, idx) => (
                        <Cell
                          key={entry.name}
                          fill={CHART_COLORS[idx % CHART_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                      formatter={(value: number) => [value, "Funds"]}
                    />
                    <Legend
                      iconType="circle"
                      iconSize={8}
                      formatter={(value) => (
                        <span
                          style={{
                            fontSize: 12,
                            color: "var(--muted-foreground)",
                          }}
                        >
                          {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Risk distribution bar */}
          <Card className="border-border" data-ocid="chart-risk-distribution">
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-base font-semibold text-foreground">
                Fund Distribution by Risk Level
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Low / Medium / High risk breakdown
              </p>
            </CardHeader>
            <CardContent>
              {allFunds.length === 0 ? (
                <div className="flex items-center justify-center h-56 text-muted-foreground text-sm">
                  No fund data available
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart
                    data={riskData}
                    margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
                  >
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                      formatter={(value: number) => [value, "Funds"]}
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={64}>
                      {riskData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Top performers table */}
        <Card className="border-border" data-ocid="analyst-top-performers">
          <CardHeader className="pb-2">
            <CardTitle className="font-display text-base font-semibold text-foreground">
              Top Performing Funds
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Ranked by 1-year return
            </p>
          </CardHeader>
          <CardContent className="p-0">
            {topFunds.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground text-sm">
                No data available
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left">#</th>
                      <th className="px-4 py-3 text-left">Fund Name</th>
                      <th className="px-4 py-3 text-left">Category</th>
                      <th className="px-4 py-3 text-left">Risk</th>
                      <th className="px-4 py-3 text-right">1Y Return</th>
                      <th className="px-4 py-3 text-right">3Y Return</th>
                      <th className="px-4 py-3 text-right">5Y Return</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topFunds.map((fund, i) => (
                      <tr
                        key={fund.id.toString()}
                        data-ocid={`top-fund-row-${i}`}
                      >
                        <td className="px-4 py-3 text-muted-foreground text-sm font-mono">
                          {i + 1}
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-medium text-foreground text-sm truncate max-w-[180px]">
                            {fund.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            NAV ₹{fund.nav.toFixed(2)}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                            variant="outline"
                            className="bg-primary/10 text-primary border-primary/20 text-xs"
                          >
                            {CATEGORY_LABELS[fund.category]}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                            variant="outline"
                            className={`text-xs ${RISK_BADGE_CLASSES[fund.riskLevel]}`}
                          >
                            {fund.riskLevel}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-sm text-success font-semibold">
                          +{fund.return1Y.toFixed(1)}%
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-sm text-muted-foreground">
                          +{fund.return3Y.toFixed(1)}%
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-sm text-muted-foreground">
                          +{fund.return5Y.toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
