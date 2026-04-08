import { i as useParams, b as useNavigate, e as useBackend, u as useAuth, f as useQueryClient, l as useQuery, j as jsxRuntimeExports, T as TrendingUp, d as Button, L as Link, B as Badge, y as Scale, g as ue, S as Skeleton } from "./index-BqQuEjuM.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-PAhuKvDj.js";
import { u as useMutation } from "./useMutation-_zBYk2MD.js";
import { C as CATEGORY_LABELS, R as RISK_LABELS, a as RISK_COLORS } from "./constants-Dx-_YjOs.js";
import { A as ArrowLeft } from "./arrow-left-DwXjRA_O.js";
import { H as Heart } from "./heart-CQgtvyJq.js";
import { R as ResponsiveContainer, T as Tooltip } from "./generateCategoricalChart-K2l6w7FI.js";
import { L as LineChart, C as CartesianGrid, a as Line } from "./LineChart-BockbHbF.js";
import { X as XAxis, Y as YAxis } from "./YAxis-DIYTGhFq.js";
import { U as User } from "./user-BQu-mowt.js";
function MetricTile({
  label,
  value,
  highlight
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-4 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: `text-lg font-bold font-display ${highlight ? "text-primary" : "text-foreground"}`,
        children: value
      }
    )
  ] });
}
function ReturnBadge({ value }) {
  const positive = value >= 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `font-bold ${positive ? "text-success" : "text-destructive"}`,
      children: [
        positive ? "+" : "",
        value.toFixed(2),
        "%"
      ]
    }
  );
}
function FundSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-32" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-2/3" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-lg" }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72 rounded-lg" })
  ] });
}
function FundDetailPage() {
  const { id } = useParams({ from: "/funds/$id" });
  const navigate = useNavigate();
  const { actor, isFetching } = useBackend();
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const { data: fund, isLoading } = useQuery({
    queryKey: ["fund", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getFund(BigInt(id));
    },
    enabled: !!actor && !isFetching && !!id
  });
  const { data: favorites } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFavorites();
    },
    enabled: !!actor && !isFetching && isAuthenticated
  });
  const isFavorited = (favorites == null ? void 0 : favorites.some((f) => f.toString() === id)) ?? false;
  const saveFavMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.saveFavorite(BigInt(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      ue.success("Added to favorites");
    },
    onError: () => ue.error("Failed to save favorite")
  });
  const removeFavMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.removeFavorite(BigInt(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      ue.success("Removed from favorites");
    },
    onError: () => ue.error("Failed to remove favorite")
  });
  const handleFavorite = () => {
    if (!isAuthenticated) {
      ue.info("Sign in to save favorites");
      return;
    }
    if (isFavorited) removeFavMutation.mutate();
    else saveFavMutation.mutate();
  };
  const chartData = (fund == null ? void 0 : fund.historicalData.slice(-60).map((p) => ({ date: p.date, NAV: p.nav }))) ?? [];
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(FundSkeleton, {});
  if (!fund) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center flex-1 p-8 gap-4 bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-12 w-12 text-muted-foreground/40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-foreground", children: "Fund not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/funds", children: "Back to Funds" }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 bg-background", "data-ocid": "fund-detail-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-b border-border px-6 py-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-2 text-sm text-muted-foreground mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/funds",
            className: "flex items-center gap-1 hover:text-foreground transition-colors",
            "data-ocid": "breadcrumb-back",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
              "Mutual Funds"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium truncate max-w-[200px]", children: fund.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground leading-tight", children: fund.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: CATEGORY_LABELS[fund.category] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: RISK_COLORS[fund.riskLevel], children: [
              RISK_LABELS[fund.riskLevel],
              " Risk"
            ] }),
            fund.isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "bg-success/10 text-success border-success/30",
                children: "Active"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "bg-muted text-muted-foreground",
                children: "Inactive"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: handleFavorite,
              className: isFavorited ? "text-destructive border-destructive/30" : "",
              "data-ocid": "btn-toggle-favorite",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Heart,
                  {
                    className: "h-4 w-4 mr-1.5",
                    fill: isFavorited ? "currentColor" : "none"
                  }
                ),
                isFavorited ? "Saved" : "Save"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              onClick: () => navigate({ to: "/compare" }),
              "data-ocid": "btn-compare",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { className: "h-4 w-4 mr-1.5" }),
                "Compare"
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MetricTile, { label: "NAV", value: `₹${fund.nav.toFixed(2)}`, highlight: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MetricTile,
          {
            label: "1Y Return",
            value: `${fund.return1Y >= 0 ? "+" : ""}${fund.return1Y.toFixed(2)}%`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MetricTile,
          {
            label: "3Y Return",
            value: `${fund.return3Y >= 0 ? "+" : ""}${fund.return3Y.toFixed(2)}%`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MetricTile,
          {
            label: "5Y Return",
            value: `${fund.return5Y >= 0 ? "+" : ""}${fund.return5Y.toFixed(2)}%`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MetricTile,
          {
            label: "Expense Ratio",
            value: `${fund.expenseRatio.toFixed(2)}%`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MetricTile,
          {
            label: "Min. Investment",
            value: `₹${fund.minInvestment.toLocaleString("en-IN")}`
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2 bg-card border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold text-foreground", children: "Historical NAV Performance (Last 60 Months)" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: chartData.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            LineChart,
            {
              data: chartData,
              margin: { top: 4, right: 12, left: 0, bottom: 4 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CartesianGrid,
                  {
                    strokeDasharray: "3 3",
                    stroke: "oklch(0.9 0.008 230)",
                    vertical: false
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  XAxis,
                  {
                    dataKey: "date",
                    tick: { fontSize: 11, fill: "oklch(0.5 0.012 230)" },
                    tickLine: false,
                    axisLine: false,
                    interval: Math.floor(chartData.length / 6)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  YAxis,
                  {
                    tick: { fontSize: 11, fill: "oklch(0.5 0.012 230)" },
                    tickLine: false,
                    axisLine: false,
                    tickFormatter: (v) => `₹${v}`,
                    width: 52
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Tooltip,
                  {
                    contentStyle: {
                      backgroundColor: "oklch(1.0 0.004 230)",
                      border: "1px solid oklch(0.9 0.008 230)",
                      borderRadius: "6px",
                      fontSize: "12px"
                    },
                    formatter: (value) => [
                      `₹${value.toFixed(2)}`,
                      "NAV"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Line,
                  {
                    type: "monotone",
                    dataKey: "NAV",
                    stroke: "oklch(0.42 0.14 240)",
                    strokeWidth: 2,
                    dot: false,
                    activeDot: { r: 4 }
                  }
                )
              ]
            }
          ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-[280px] text-muted-foreground text-sm", children: "No historical data available" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          fund.description && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: "About This Fund" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: fund.description }),
              fund.inceptionDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-3", children: [
                "Inception: ",
                fund.inceptionDate
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-muted/30 border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 text-primary" }),
              "Fund Manager"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: fund.managerName }),
              fund.managerBio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2 leading-relaxed", children: fund.managerBio })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: "Returns Summary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("table", { className: "w-full text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: [
              { label: "1 Year", value: fund.return1Y },
              { label: "3 Years", value: fund.return3Y },
              { label: "5 Years", value: fund.return5Y }
            ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "py-1.5 flex justify-between items-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-muted-foreground py-1.5", children: label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 font-semibold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReturnBadge, { value }) })
                ]
              },
              label
            )) }) }) })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  FundDetailPage as default
};
