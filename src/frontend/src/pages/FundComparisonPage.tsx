import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Scale, Search, TrendingUp, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  CATEGORY_LABELS,
  CHART_COLORS,
  CHART_COLOR_CLASSES,
  RISK_LABELS,
} from "../constants";
import { useBackend } from "../hooks/use-backend";
import type { Fund } from "../types";

const MAX_FUNDS = 4;

interface MetricRow {
  label: string;
  format: (f: Fund) => string;
  positive?: (f: Fund) => boolean;
}

const METRIC_ROWS: MetricRow[] = [
  { label: "Current NAV", format: (f) => `₹${f.nav.toFixed(2)}` },
  {
    label: "1Y Return",
    format: (f) => `${f.return1Y >= 0 ? "+" : ""}${f.return1Y.toFixed(2)}%`,
    positive: (f) => f.return1Y >= 0,
  },
  {
    label: "3Y Return",
    format: (f) => `${f.return3Y >= 0 ? "+" : ""}${f.return3Y.toFixed(2)}%`,
    positive: (f) => f.return3Y >= 0,
  },
  {
    label: "5Y Return",
    format: (f) => `${f.return5Y >= 0 ? "+" : ""}${f.return5Y.toFixed(2)}%`,
    positive: (f) => f.return5Y >= 0,
  },
  { label: "Expense Ratio", format: (f) => `${f.expenseRatio.toFixed(2)}%` },
  { label: "Risk Level", format: (f) => RISK_LABELS[f.riskLevel] },
  { label: "Category", format: (f) => CATEGORY_LABELS[f.category] },
  {
    label: "Min. Investment",
    format: (f) => `₹${f.minInvestment.toLocaleString("en-IN")}`,
  },
];

function buildChartData(funds: Fund[]): Record<string, number | string>[] {
  if (funds.length === 0) return [];
  // Use first fund's historical dates as shared x-axis
  const base = funds[0].historicalData.slice(-60);
  return base.map((point, i) => {
    const row: Record<string, number | string> = { date: point.date };
    for (const f of funds) {
      const p = f.historicalData.slice(-60)[i];
      if (p) row[f.name] = p.nav;
    }
    return row;
  });
}

function FundDropdown({
  allFunds,
  selectedIds,
  onSelect,
}: {
  allFunds: Fund[];
  selectedIds: Set<string>;
  onSelect: (fund: Fund) => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = allFunds
    .filter((f) => !selectedIds.has(f.id.toString()))
    .filter((f) => f.name.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 20);

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search and add a fund..."
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          className="pl-9 bg-background"
          data-ocid="input-compare-search"
        />
      </div>
      {open && filtered.length > 0 && (
        <div className="absolute z-50 mt-1 w-full max-h-60 overflow-y-auto bg-popover border border-border rounded-md shadow-lg">
          {filtered.map((fund) => (
            <button
              type="button"
              key={fund.id.toString()}
              className="w-full text-left px-4 py-2.5 hover:bg-muted/50 transition-smooth flex flex-col gap-0.5"
              onClick={() => {
                onSelect(fund);
                setQuery("");
                setOpen(false);
              }}
              data-ocid="compare-fund-option"
            >
              <span className="text-sm font-medium text-foreground line-clamp-1">
                {fund.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {CATEGORY_LABELS[fund.category]} · {RISK_LABELS[fund.riskLevel]}{" "}
                Risk · NAV ₹{fund.nav.toFixed(2)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FundComparisonPage() {
  const { actor, isFetching } = useBackend();
  const [selectedFunds, setSelectedFunds] = useState<Fund[]>([]);

  const { data: allFunds, isLoading } = useQuery<Fund[]>({
    queryKey: ["funds"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFunds({});
    },
    enabled: !!actor && !isFetching,
    staleTime: 2 * 60 * 1000,
  });

  const selectedIds = useMemo(
    () => new Set(selectedFunds.map((f) => f.id.toString())),
    [selectedFunds],
  );

  const addFund = (fund: Fund) => {
    if (selectedFunds.length >= MAX_FUNDS) return;
    setSelectedFunds((prev) => [...prev, fund]);
  };

  const removeFund = (id: string) => {
    setSelectedFunds((prev) => prev.filter((f) => f.id.toString() !== id));
  };

  const chartData = useMemo(
    () => buildChartData(selectedFunds),
    [selectedFunds],
  );

  return (
    <div className="flex-1 bg-background" data-ocid="fund-comparison-page">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-5">
        <div className="flex items-center gap-3 mb-1">
          <Scale className="h-5 w-5 text-primary" />
          <h1 className="font-display text-xl font-bold text-foreground">
            Fund Comparison
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Compare up to {MAX_FUNDS} funds side by side
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Fund selector */}
        <Card className="bg-card border-border">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">
                Selected Funds ({selectedFunds.length}/{MAX_FUNDS})
              </p>
              {selectedFunds.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground text-xs h-7"
                  onClick={() => setSelectedFunds([])}
                  data-ocid="btn-clear-all"
                >
                  Clear all
                </Button>
              )}
            </div>

            {/* Chips */}
            {selectedFunds.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedFunds.map((fund, i) => (
                  <div
                    key={fund.id.toString()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm"
                    data-ocid="fund-chip"
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full shrink-0 ${CHART_COLOR_CLASSES[i]}`}
                    />
                    <span className="text-foreground font-medium max-w-[180px] truncate">
                      {fund.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFund(fund.id.toString())}
                      aria-label={`Remove ${fund.name}`}
                      className="text-muted-foreground hover:text-destructive ml-0.5 transition-colors"
                      data-ocid="btn-remove-fund"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Search */}
            {selectedFunds.length < MAX_FUNDS &&
              (isLoading ? (
                <Skeleton className="h-10 rounded-md" />
              ) : (
                <FundDropdown
                  allFunds={allFunds ?? []}
                  selectedIds={selectedIds}
                  onSelect={addFund}
                />
              ))}
          </CardContent>
        </Card>

        {selectedFunds.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-20 text-center"
            data-ocid="empty-state-compare"
          >
            <Scale className="h-14 w-14 text-muted-foreground/30 mb-4" />
            <h3 className="font-semibold text-lg text-foreground">
              No funds selected
            </h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-sm">
              Search and add up to {MAX_FUNDS} funds above to compare their
              performance, metrics, and historical NAV charts.
            </p>
          </div>
        ) : (
          <>
            {/* Overlaid chart */}
            {chartData.length > 0 && (
              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold text-foreground">
                    Historical NAV Comparison (Last 60 Months)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={320}>
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
                        width={56}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "oklch(1.0 0.004 230)",
                          border: "1px solid oklch(0.9 0.008 230)",
                          borderRadius: "6px",
                          fontSize: "12px",
                        }}
                        formatter={(value: number) => [`₹${value.toFixed(2)}`]}
                      />
                      <Legend
                        wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
                      />
                      {selectedFunds.map((fund, i) => (
                        <Line
                          key={fund.id.toString()}
                          type="monotone"
                          dataKey={fund.name}
                          stroke={CHART_COLORS[i]}
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 4 }}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}

            {/* Metrics table */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-foreground">
                  Metrics Comparison
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/40 border-b border-border">
                        <th className="text-left px-4 py-3 font-semibold text-muted-foreground w-36 shrink-0">
                          Metric
                        </th>
                        {selectedFunds.map((fund, i) => (
                          <th
                            key={fund.id.toString()}
                            className="text-center px-4 py-3 font-semibold text-foreground min-w-[140px]"
                          >
                            <div className="flex items-center justify-center gap-1.5">
                              <span
                                className={`w-2.5 h-2.5 rounded-full shrink-0 ${CHART_COLOR_CLASSES[i]}`}
                              />
                              <span className="truncate max-w-[110px]">
                                {fund.name.split(" ").slice(0, 3).join(" ")}
                              </span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {METRIC_ROWS.map((row) => (
                        <tr
                          key={row.label}
                          className="border-b border-border last:border-0 hover:bg-muted/20 transition-smooth"
                          data-ocid="metric-row"
                        >
                          <td className="px-4 py-3 text-muted-foreground font-medium whitespace-nowrap">
                            {row.label}
                          </td>
                          {selectedFunds.map((fund) => {
                            const val = row.format(fund);
                            const pos = row.positive
                              ? row.positive(fund)
                              : null;
                            return (
                              <td
                                key={fund.id.toString()}
                                className={`text-center px-4 py-3 font-semibold ${
                                  pos === null
                                    ? "text-foreground"
                                    : pos
                                      ? "text-success"
                                      : "text-destructive"
                                }`}
                              >
                                {val}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
