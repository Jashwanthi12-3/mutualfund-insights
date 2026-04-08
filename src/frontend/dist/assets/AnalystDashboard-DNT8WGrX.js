import { c as createLucideIcon, a as useUser, F as FundCategory, R as RiskLevel, j as jsxRuntimeExports, S as Skeleton, C as ChartNoAxesColumn, B as Badge, T as TrendingUp, e as useBackend, l as useQuery } from "./index-BqQuEjuM.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-PAhuKvDj.js";
import { c as CHART_COLORS, C as CATEGORY_LABELS } from "./constants-Dx-_YjOs.js";
import { t as generateCategoricalChart, B as Bar, v as formatAxisMap, R as ResponsiveContainer, x as Cell, T as Tooltip, L as Legend } from "./generateCategoricalChart-K2l6w7FI.js";
import { P as PieChart, a as Pie } from "./PieChart-CFAcK2vR.js";
import { X as XAxis, Y as YAxis } from "./YAxis-DIYTGhFq.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("layers", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", key: "17hqa7" }],
  ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", key: "lmptdp" }],
  ["path", { d: "M4 22h16", key: "57wxv0" }],
  ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", key: "1nw9bq" }],
  ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", key: "1np0yb" }],
  ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", key: "u46fv3" }]
];
const Trophy = createLucideIcon("trophy", __iconNode);
var BarChart = generateCategoricalChart({
  chartName: "BarChart",
  GraphicalChild: Bar,
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: ["axis", "item"],
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: XAxis
  }, {
    axisType: "yAxis",
    AxisComp: YAxis
  }],
  formatAxisMap
});
function useAllFunds() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["allFunds"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFunds({});
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1e3
  });
}
function useTopFunds(limit) {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["topFunds", limit.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTopPerformingFunds(limit);
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1e3
  });
}
const CATEGORY_ORDER = [
  FundCategory.Equity,
  FundCategory.Debt,
  FundCategory.Balanced,
  FundCategory.MoneyMarket
];
const RISK_ORDER = [RiskLevel.Low, RiskLevel.Medium, RiskLevel.High];
const RISK_CHART_COLORS = {
  [RiskLevel.Low]: "oklch(0.55 0.16 150)",
  [RiskLevel.Medium]: "oklch(0.7 0.15 85)",
  [RiskLevel.High]: "oklch(0.55 0.22 25)"
};
const RISK_BADGE_CLASSES = {
  [RiskLevel.Low]: "bg-success/20 text-success-foreground border-success/30",
  [RiskLevel.Medium]: "bg-warning/20 text-warning-foreground border-warning/30",
  [RiskLevel.High]: "bg-destructive/20 text-destructive border-destructive/30"
};
function StatCard({
  icon,
  label,
  value,
  sub,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border", "data-ocid": ocid, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-2xl text-foreground", children: value }),
      sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: sub })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: icon }) })
  ] }) }) });
}
function AnalystDashboard() {
  const { user, isLoading: userLoading } = useUser();
  const { data: allFunds = [], isLoading: fundsLoading } = useAllFunds();
  const { data: topFunds = [], isLoading: topLoading } = useTopFunds(5n);
  const isLoading = userLoading || fundsLoading || topLoading;
  const categoryData = CATEGORY_ORDER.map((cat, i) => ({
    name: CATEGORY_LABELS[cat],
    value: allFunds.filter((f) => f.category === cat).length,
    color: CHART_COLORS[i]
  })).filter((d) => d.value > 0);
  const riskData = RISK_ORDER.map((risk) => ({
    name: risk,
    count: allFunds.filter((f) => f.riskLevel === risk).length,
    color: RISK_CHART_COLORS[risk]
  }));
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex-1 p-6 space-y-6",
        "data-ocid": "analyst-dashboard-loading",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-64" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl" }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72 rounded-xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72 rounded-xl" })
          ] })
        ]
      }
    );
  }
  const avgReturn1Y = allFunds.length > 0 ? (allFunds.reduce((s, f) => s + f.return1Y, 0) / allFunds.length).toFixed(1) : "—";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 bg-background", "data-ocid": "analyst-dashboard", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-6 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-8 h-8 rounded-lg bg-warning/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "h-4 w-4 text-warning" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground", children: "Analyst Dashboard" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Fund distribution and performance analytics for",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: (user == null ? void 0 : user.name) ?? "Analyst" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Badge,
        {
          variant: "outline",
          className: "bg-warning/20 text-warning-foreground border-warning/30",
          children: "Data Analyst"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
          "data-ocid": "analyst-stats",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-4 w-4" }),
                label: "Total Funds",
                value: allFunds.length,
                sub: "In database",
                ocid: "stat-total-funds"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4" }),
                label: "Top Performers",
                value: topFunds.length,
                sub: "By 1Y returns",
                ocid: "stat-top-performers"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4" }),
                label: "Avg 1Y Return",
                value: avgReturn1Y !== "—" ? `${avgReturn1Y}%` : "—",
                sub: "Across all funds",
                ocid: "stat-avg-return"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "h-4 w-4" }),
                label: "Categories",
                value: categoryData.length,
                sub: "Fund types",
                ocid: "stat-categories"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "border-border",
            "data-ocid": "chart-category-distribution",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-base font-semibold text-foreground", children: "Fund Distribution by Category" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "Breakdown across all ",
                  allFunds.length,
                  " funds"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: categoryData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-56 text-muted-foreground text-sm", children: "No fund data available" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 240, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Pie,
                  {
                    data: categoryData,
                    cx: "50%",
                    cy: "50%",
                    innerRadius: 55,
                    outerRadius: 90,
                    paddingAngle: 3,
                    dataKey: "value",
                    nameKey: "name",
                    children: categoryData.map((entry, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Cell,
                      {
                        fill: CHART_COLORS[idx % CHART_COLORS.length]
                      },
                      entry.name
                    ))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Tooltip,
                  {
                    contentStyle: {
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      fontSize: "12px"
                    },
                    formatter: (value) => [value, "Funds"]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Legend,
                  {
                    iconType: "circle",
                    iconSize: 8,
                    formatter: (value) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          fontSize: 12,
                          color: "var(--muted-foreground)"
                        },
                        children: value
                      }
                    )
                  }
                )
              ] }) }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border", "data-ocid": "chart-risk-distribution", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-base font-semibold text-foreground", children: "Fund Distribution by Risk Level" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Low / Medium / High risk breakdown" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: allFunds.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-56 text-muted-foreground text-sm", children: "No fund data available" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 240, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            BarChart,
            {
              data: riskData,
              margin: { top: 8, right: 8, left: -20, bottom: 0 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  XAxis,
                  {
                    dataKey: "name",
                    tick: { fontSize: 12, fill: "var(--muted-foreground)" },
                    axisLine: false,
                    tickLine: false
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  YAxis,
                  {
                    allowDecimals: false,
                    tick: { fontSize: 12, fill: "var(--muted-foreground)" },
                    axisLine: false,
                    tickLine: false
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Tooltip,
                  {
                    contentStyle: {
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      fontSize: "12px"
                    },
                    formatter: (value) => [value, "Funds"]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "count", radius: [4, 4, 0, 0], maxBarSize: 64, children: riskData.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: entry.color }, entry.name)) })
              ]
            }
          ) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border", "data-ocid": "analyst-top-performers", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-base font-semibold text-foreground", children: "Top Performing Funds" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Ranked by 1-year return" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: topFunds.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 text-center text-muted-foreground text-sm", children: "No data available" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "data-table", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "#" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Fund Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Risk" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right", children: "1Y Return" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right", children: "3Y Return" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right", children: "5Y Return" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: topFunds.map((fund, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              "data-ocid": `top-fund-row-${i}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-sm font-mono", children: i + 1 }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm truncate max-w-[180px]", children: fund.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    "NAV ₹",
                    fund.nav.toFixed(2)
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "bg-primary/10 text-primary border-primary/20 text-xs",
                    children: CATEGORY_LABELS[fund.category]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: `text-xs ${RISK_BADGE_CLASSES[fund.riskLevel]}`,
                    children: fund.riskLevel
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-mono text-sm text-success font-semibold", children: [
                  "+",
                  fund.return1Y.toFixed(1),
                  "%"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-mono text-sm text-muted-foreground", children: [
                  "+",
                  fund.return3Y.toFixed(1),
                  "%"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-mono text-sm text-muted-foreground", children: [
                  "+",
                  fund.return5Y.toFixed(1),
                  "%"
                ] })
              ]
            },
            fund.id.toString()
          )) })
        ] }) }) })
      ] })
    ] })
  ] });
}
export {
  AnalystDashboard as default
};
