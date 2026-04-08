import { c as createLucideIcon, a as useUser, e as useBackend, l as useQuery, j as jsxRuntimeExports, d as Button, L as Link, w as Search, T as TrendingUp, S as Skeleton, x as Calculator, y as Scale, h as BookOpen, B as Badge } from "./index-BqQuEjuM.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-PAhuKvDj.js";
import { C as CATEGORY_LABELS, R as RISK_LABELS, a as RISK_COLORS } from "./constants-Dx-_YjOs.js";
import { H as Heart } from "./heart-CQgtvyJq.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
function StatCard({
  label,
  value,
  icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", "data-ocid": "stat-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary shrink-0", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: label })
    ] })
  ] }) });
}
function FundRow({ fund }) {
  const ret = fund.return1Y;
  const positive = ret >= 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/funds/$id",
      params: { id: fund.id.toString() },
      className: "flex items-center justify-between px-4 py-3 hover:bg-muted/40 transition-smooth rounded-md group",
      "data-ocid": "fund-row",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors", children: fund.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs px-1.5 py-0", children: CATEGORY_LABELS[fund.category] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: `text-xs px-1.5 py-0 ${RISK_COLORS[fund.riskLevel]}`,
                children: RISK_LABELS[fund.riskLevel]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0 ml-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
            "₹",
            fund.nav.toFixed(2)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: `text-xs font-medium ${positive ? "text-success" : "text-destructive"}`,
              children: [
                positive ? "+" : "",
                ret.toFixed(2),
                "% 1Y"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function QuickNavCard({
  label,
  description,
  href,
  icon,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: href, "data-ocid": ocid, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border hover:border-primary/40 hover:shadow-md transition-smooth cursor-pointer group h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-smooth", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: description })
    ] })
  ] }) }) });
}
function InvestorDashboard() {
  var _a;
  const { user } = useUser();
  const { actor, isFetching } = useBackend();
  const { data: topFunds, isLoading: fundsLoading } = useQuery({
    queryKey: ["topFunds", 5],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTopPerformingFunds(BigInt(5));
    },
    enabled: !!actor && !isFetching
  });
  const { data: favorites } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFavorites();
    },
    enabled: !!actor && !isFetching
  });
  const firstName = ((_a = user == null ? void 0 : user.name) == null ? void 0 : _a.split(" ")[0]) ?? "Investor";
  const favoriteCount = (favorites == null ? void 0 : favorites.length) ?? 0;
  const topFund = topFunds == null ? void 0 : topFunds[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex-1 p-6 lg:p-8 space-y-8 bg-background",
      "data-ocid": "investor-dashboard",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl font-bold text-foreground", children: [
              "Welcome back, ",
              firstName,
              " 👋"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Here's your investment overview for today" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              size: "sm",
              className: "w-fit",
              "data-ocid": "btn-browse-funds",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/funds", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 mr-2" }),
                "Browse Funds"
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Saved Favorites",
              value: favoriteCount,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-5 w-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Top Fund Pick",
              value: topFund ? topFund.name.split(" ").slice(0, 2).join(" ") : "—",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-5 w-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Available Funds",
              value: "20+",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2 bg-card border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2 flex flex-row items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold text-foreground", children: "Top Performing Funds" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  variant: "ghost",
                  size: "sm",
                  className: "text-primary hover:text-primary",
                  "data-ocid": "btn-view-all-funds",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/funds", children: "View All" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-2", children: fundsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 p-2", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded-md" }, i)) }) : topFunds && topFunds.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col", children: topFunds.map((fund) => /* @__PURE__ */ jsxRuntimeExports.jsx(FundRow, { fund }, fund.id.toString())) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-12 text-center text-muted-foreground text-sm", children: "No funds available yet." }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-widest px-1", children: "Quick Actions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                QuickNavCard,
                {
                  label: "Fund Browser",
                  description: "Search and filter 20+ mutual funds",
                  href: "/funds",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-5 w-5" }),
                  ocid: "quick-nav-funds"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                QuickNavCard,
                {
                  label: "Investment Calculator",
                  description: "SIP & lump sum projections",
                  href: "/calculator",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calculator, { className: "h-5 w-5" }),
                  ocid: "quick-nav-calculator"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                QuickNavCard,
                {
                  label: "Compare Funds",
                  description: "Side-by-side fund comparison",
                  href: "/compare",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { className: "h-5 w-5" }),
                  ocid: "quick-nav-compare"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                QuickNavCard,
                {
                  label: "Learn",
                  description: "Articles, guides, and FAQs",
                  href: "/learn",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-5 w-5" }),
                  ocid: "quick-nav-learn"
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  InvestorDashboard as default
};
