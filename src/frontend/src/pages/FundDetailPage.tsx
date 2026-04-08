import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Heart, Scale, TrendingUp, User } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { CATEGORY_LABELS, RISK_COLORS, RISK_LABELS } from "../constants";
import { useAuth } from "../hooks/use-auth";
import { useBackend } from "../hooks/use-backend";
import type { Fund } from "../types";

function MetricTile({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="bg-muted/40 rounded-lg p-4 text-center">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p
        className={`text-lg font-bold font-display ${highlight ? "text-primary" : "text-foreground"}`}
      >
        {value}
      </p>
    </div>
  );
}

function ReturnBadge({ value }: { value: number }) {
  const positive = value >= 0;
  return (
    <span
      className={`font-bold ${positive ? "text-success" : "text-destructive"}`}
    >
      {positive ? "+" : ""}
      {value.toFixed(2)}%
    </span>
  );
}

function FundSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-10 w-2/3" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-20 rounded-lg" />
        ))}
      </div>
      <Skeleton className="h-72 rounded-lg" />
    </div>
  );
}

export default function FundDetailPage() {
  const { id } = useParams({ from: "/funds/$id" });
  const navigate = useNavigate();
  const { actor, isFetching } = useBackend();
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const { data: fund, isLoading } = useQuery<Fund | null>({
    queryKey: ["fund", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getFund(BigInt(id));
    },
    enabled: !!actor && !isFetching && !!id,
  });

  const { data: favorites } = useQuery<bigint[]>({
    queryKey: ["favorites"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFavorites();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });

  const isFavorited = favorites?.some((f) => f.toString() === id) ?? false;

  const saveFavMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.saveFavorite(BigInt(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      toast.success("Added to favorites");
    },
    onError: () => toast.error("Failed to save favorite"),
  });

  const removeFavMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.removeFavorite(BigInt(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      toast.success("Removed from favorites");
    },
    onError: () => toast.error("Failed to remove favorite"),
  });

  const handleFavorite = () => {
    if (!isAuthenticated) {
      toast.info("Sign in to save favorites");
      return;
    }
    if (isFavorited) removeFavMutation.mutate();
    else saveFavMutation.mutate();
  };

  // Last 60 months of historical data
  const chartData =
    fund?.historicalData
      .slice(-60)
      .map((p) => ({ date: p.date, NAV: p.nav })) ?? [];

  if (isLoading) return <FundSkeleton />;

  if (!fund) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 p-8 gap-4 bg-background">
        <TrendingUp className="h-12 w-12 text-muted-foreground/40" />
        <h2 className="text-xl font-semibold text-foreground">
          Fund not found
        </h2>
        <Button asChild variant="outline">
          <Link to="/funds">Back to Funds</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-background" data-ocid="fund-detail-page">
      {/* Header band */}
      <div className="bg-card border-b border-border px-6 py-5">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link
            to="/funds"
            className="flex items-center gap-1 hover:text-foreground transition-colors"
            data-ocid="breadcrumb-back"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Mutual Funds
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate max-w-[200px]">
            {fund.name}
          </span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="font-display text-2xl font-bold text-foreground leading-tight">
              {fund.name}
            </h1>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <Badge variant="outline">{CATEGORY_LABELS[fund.category]}</Badge>
              <Badge variant="outline" className={RISK_COLORS[fund.riskLevel]}>
                {RISK_LABELS[fund.riskLevel]} Risk
              </Badge>
              {fund.isActive ? (
                <Badge
                  variant="outline"
                  className="bg-success/10 text-success border-success/30"
                >
                  Active
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="bg-muted text-muted-foreground"
                >
                  Inactive
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleFavorite}
              className={
                isFavorited ? "text-destructive border-destructive/30" : ""
              }
              data-ocid="btn-toggle-favorite"
            >
              <Heart
                className="h-4 w-4 mr-1.5"
                fill={isFavorited ? "currentColor" : "none"}
              />
              {isFavorited ? "Saved" : "Save"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate({ to: "/compare" })}
              data-ocid="btn-compare"
            >
              <Scale className="h-4 w-4 mr-1.5" />
              Compare
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Key metrics grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <MetricTile label="NAV" value={`₹${fund.nav.toFixed(2)}`} highlight />
          <MetricTile
            label="1Y Return"
            value={`${fund.return1Y >= 0 ? "+" : ""}${fund.return1Y.toFixed(2)}%`}
          />
          <MetricTile
            label="3Y Return"
            value={`${fund.return3Y >= 0 ? "+" : ""}${fund.return3Y.toFixed(2)}%`}
          />
          <MetricTile
            label="5Y Return"
            value={`${fund.return5Y >= 0 ? "+" : ""}${fund.return5Y.toFixed(2)}%`}
          />
          <MetricTile
            label="Expense Ratio"
            value={`${fund.expenseRatio.toFixed(2)}%`}
          />
          <MetricTile
            label="Min. Investment"
            value={`₹${fund.minInvestment.toLocaleString("en-IN")}`}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <Card className="lg:col-span-2 bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-foreground">
                Historical NAV Performance (Last 60 Months)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart
                    data={chartData}
                    margin={{ top: 4, right: 12, left: 0, bottom: 4 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="oklch(0.9 0.008 230)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 11, fill: "oklch(0.5 0.012 230)" }}
                      tickLine={false}
                      axisLine={false}
                      interval={Math.floor(chartData.length / 6)}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "oklch(0.5 0.012 230)" }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => `₹${v}`}
                      width={52}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "oklch(1.0 0.004 230)",
                        border: "1px solid oklch(0.9 0.008 230)",
                        borderRadius: "6px",
                        fontSize: "12px",
                      }}
                      formatter={(value: number) => [
                        `₹${value.toFixed(2)}`,
                        "NAV",
                      ]}
                    />
                    <Line
                      type="monotone"
                      dataKey="NAV"
                      stroke="oklch(0.42 0.14 240)"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-[280px] text-muted-foreground text-sm">
                  No historical data available
                </div>
              )}
            </CardContent>
          </Card>

          {/* Right side: description + manager */}
          <div className="space-y-4">
            {/* Description */}
            {fund.description && (
              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-foreground">
                    About This Fund
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {fund.description}
                  </p>
                  {fund.inceptionDate && (
                    <p className="text-xs text-muted-foreground mt-3">
                      Inception: {fund.inceptionDate}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Manager info */}
            <Card className="bg-muted/30 border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  Fund Manager
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-semibold text-foreground">
                  {fund.managerName}
                </p>
                {fund.managerBio && (
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    {fund.managerBio}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Returns summary */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-foreground">
                  Returns Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-border">
                    {[
                      { label: "1 Year", value: fund.return1Y },
                      { label: "3 Years", value: fund.return3Y },
                      { label: "5 Years", value: fund.return5Y },
                    ].map(({ label, value }) => (
                      <tr
                        key={label}
                        className="py-1.5 flex justify-between items-center"
                      >
                        <td className="text-muted-foreground py-1.5">
                          {label}
                        </td>
                        <td className="py-1.5 font-semibold">
                          <ReturnBadge value={value} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
