import { e as useBackend, r as reactExports, l as useQuery, j as jsxRuntimeExports, y as Scale, d as Button, X, S as Skeleton, w as Search } from "./index-BqQuEjuM.js";
import { C as Card, d as CardContent, a as CardHeader, b as CardTitle } from "./card-PAhuKvDj.js";
import { I as Input } from "./input-Cl8bTwgy.js";
import { b as CHART_COLOR_CLASSES, c as CHART_COLORS, R as RISK_LABELS, C as CATEGORY_LABELS } from "./constants-Dx-_YjOs.js";
import { R as ResponsiveContainer, T as Tooltip, L as Legend } from "./generateCategoricalChart-K2l6w7FI.js";
import { L as LineChart, C as CartesianGrid, a as Line } from "./LineChart-BockbHbF.js";
import { X as XAxis, Y as YAxis } from "./YAxis-DIYTGhFq.js";
const MAX_FUNDS = 4;
const METRIC_ROWS = [
  { label: "Current NAV", format: (f) => `₹${f.nav.toFixed(2)}` },
  {
    label: "1Y Return",
    format: (f) => `${f.return1Y >= 0 ? "+" : ""}${f.return1Y.toFixed(2)}%`,
    positive: (f) => f.return1Y >= 0
  },
  {
    label: "3Y Return",
    format: (f) => `${f.return3Y >= 0 ? "+" : ""}${f.return3Y.toFixed(2)}%`,
    positive: (f) => f.return3Y >= 0
  },
  {
    label: "5Y Return",
    format: (f) => `${f.return5Y >= 0 ? "+" : ""}${f.return5Y.toFixed(2)}%`,
    positive: (f) => f.return5Y >= 0
  },
  { label: "Expense Ratio", format: (f) => `${f.expenseRatio.toFixed(2)}%` },
  { label: "Risk Level", format: (f) => RISK_LABELS[f.riskLevel] },
  { label: "Category", format: (f) => CATEGORY_LABELS[f.category] },
  {
    label: "Min. Investment",
    format: (f) => `₹${f.minInvestment.toLocaleString("en-IN")}`
  }
];
function buildChartData(funds) {
  if (funds.length === 0) return [];
  const base = funds[0].historicalData.slice(-60);
  return base.map((point, i) => {
    const row = { date: point.date };
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
  onSelect
}) {
  const [query, setQuery] = reactExports.useState("");
  const [open, setOpen] = reactExports.useState(false);
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);
  const filtered = allFunds.filter((f) => !selectedIds.has(f.id.toString())).filter((f) => f.name.toLowerCase().includes(query.toLowerCase())).slice(0, 20);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref, className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Search and add a fund...",
          value: query,
          onFocus: () => setOpen(true),
          onChange: (e) => {
            setQuery(e.target.value);
            setOpen(true);
          },
          className: "pl-9 bg-background",
          "data-ocid": "input-compare-search"
        }
      )
    ] }),
    open && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute z-50 mt-1 w-full max-h-60 overflow-y-auto bg-popover border border-border rounded-md shadow-lg", children: filtered.map((fund) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: "w-full text-left px-4 py-2.5 hover:bg-muted/50 transition-smooth flex flex-col gap-0.5",
        onClick: () => {
          onSelect(fund);
          setQuery("");
          setOpen(false);
        },
        "data-ocid": "compare-fund-option",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground line-clamp-1", children: fund.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            CATEGORY_LABELS[fund.category],
            " · ",
            RISK_LABELS[fund.riskLevel],
            " ",
            "Risk · NAV ₹",
            fund.nav.toFixed(2)
          ] })
        ]
      },
      fund.id.toString()
    )) })
  ] });
}
function FundComparisonPage() {
  const { actor, isFetching } = useBackend();
  const [selectedFunds, setSelectedFunds] = reactExports.useState([]);
  const { data: allFunds, isLoading } = useQuery({
    queryKey: ["funds"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFunds({});
    },
    enabled: !!actor && !isFetching,
    staleTime: 2 * 60 * 1e3
  });
  const selectedIds = reactExports.useMemo(
    () => new Set(selectedFunds.map((f) => f.id.toString())),
    [selectedFunds]
  );
  const addFund = (fund) => {
    if (selectedFunds.length >= MAX_FUNDS) return;
    setSelectedFunds((prev) => [...prev, fund]);
  };
  const removeFund = (id) => {
    setSelectedFunds((prev) => prev.filter((f) => f.id.toString() !== id));
  };
  const chartData = reactExports.useMemo(
    () => buildChartData(selectedFunds),
    [selectedFunds]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 bg-background", "data-ocid": "fund-comparison-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-b border-border px-6 py-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground", children: "Fund Comparison" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "Compare up to ",
        MAX_FUNDS,
        " funds side by side"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground", children: [
            "Selected Funds (",
            selectedFunds.length,
            "/",
            MAX_FUNDS,
            ")"
          ] }),
          selectedFunds.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "text-muted-foreground text-xs h-7",
              onClick: () => setSelectedFunds([]),
              "data-ocid": "btn-clear-all",
              children: "Clear all"
            }
          )
        ] }),
        selectedFunds.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: selectedFunds.map((fund, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm",
            "data-ocid": "fund-chip",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `w-2.5 h-2.5 rounded-full shrink-0 ${CHART_COLOR_CLASSES[i]}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium max-w-[180px] truncate", children: fund.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => removeFund(fund.id.toString()),
                  "aria-label": `Remove ${fund.name}`,
                  className: "text-muted-foreground hover:text-destructive ml-0.5 transition-colors",
                  "data-ocid": "btn-remove-fund",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
                }
              )
            ]
          },
          fund.id.toString()
        )) }),
        selectedFunds.length < MAX_FUNDS && (isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 rounded-md" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          FundDropdown,
          {
            allFunds: allFunds ?? [],
            selectedIds,
            onSelect: addFund
          }
        ))
      ] }) }),
      selectedFunds.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-20 text-center",
          "data-ocid": "empty-state-compare",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { className: "h-14 w-14 text-muted-foreground/30 mb-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg text-foreground", children: "No funds selected" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-2 max-w-sm", children: [
              "Search and add up to ",
              MAX_FUNDS,
              " funds above to compare their performance, metrics, and historical NAV charts."
            ] })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        chartData.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold text-foreground", children: "Historical NAV Comparison (Last 60 Months)" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 320, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
                    width: 56
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
                    formatter: (value) => [`₹${value.toFixed(2)}`]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Legend,
                  {
                    wrapperStyle: { fontSize: "12px", paddingTop: "12px" }
                  }
                ),
                selectedFunds.map((fund, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Line,
                  {
                    type: "monotone",
                    dataKey: fund.name,
                    stroke: CHART_COLORS[i],
                    strokeWidth: 2,
                    dot: false,
                    activeDot: { r: 4 }
                  },
                  fund.id.toString()
                ))
              ]
            }
          ) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold text-foreground", children: "Metrics Comparison" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground w-36 shrink-0", children: "Metric" }),
              selectedFunds.map((fund, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "th",
                {
                  className: "text-center px-4 py-3 font-semibold text-foreground min-w-[140px]",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `w-2.5 h-2.5 rounded-full shrink-0 ${CHART_COLOR_CLASSES[i]}`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[110px]", children: fund.name.split(" ").slice(0, 3).join(" ") })
                  ] })
                },
                fund.id.toString()
              ))
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: METRIC_ROWS.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "border-b border-border last:border-0 hover:bg-muted/20 transition-smooth",
                "data-ocid": "metric-row",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground font-medium whitespace-nowrap", children: row.label }),
                  selectedFunds.map((fund) => {
                    const val = row.format(fund);
                    const pos = row.positive ? row.positive(fund) : null;
                    return /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        className: `text-center px-4 py-3 font-semibold ${pos === null ? "text-foreground" : pos ? "text-success" : "text-destructive"}`,
                        children: val
                      },
                      fund.id.toString()
                    );
                  })
                ]
              },
              row.label
            )) })
          ] }) }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  FundComparisonPage as default
};
