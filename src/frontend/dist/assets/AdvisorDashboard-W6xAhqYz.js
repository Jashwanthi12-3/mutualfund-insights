import { c as createLucideIcon, a as useUser, j as jsxRuntimeExports, S as Skeleton, A as AdvisorStatus, T as TrendingUp, B as Badge, L as Link, d as Button, w as Search, x as Calculator, h as BookOpen } from "./index-BqQuEjuM.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-PAhuKvDj.js";
import { a as CircleX, C as CircleCheck } from "./circle-x-Dvg6uUfG.js";
import { C as Clock } from "./clock-5VsswyhS.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode);
function StatusSection({ status }) {
  const config = {
    [AdvisorStatus.Pending]: {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5 text-warning" }),
      badge: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Badge,
        {
          variant: "outline",
          className: "bg-warning/20 text-warning-foreground border-warning/30 gap-1.5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
            "Pending Review"
          ]
        }
      ),
      title: "Account Under Review",
      message: "Your account is pending admin approval. You can browse funds while you wait.",
      bgClass: "bg-warning/5 border-warning/20"
    },
    [AdvisorStatus.Approved]: {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-success" }),
      badge: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Badge,
        {
          variant: "outline",
          className: "bg-success/20 text-success-foreground border-success/30 gap-1.5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
            "Approved"
          ]
        }
      ),
      title: "Account Approved",
      message: "Your advisor account is active. You have full access to advisor tools and fund insights.",
      bgClass: "bg-success/5 border-success/20"
    },
    [AdvisorStatus.Rejected]: {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-5 w-5 text-destructive" }),
      badge: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Badge,
        {
          variant: "outline",
          className: "bg-destructive/20 text-destructive border-destructive/30 gap-1.5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3 w-3" }),
            "Rejected"
          ]
        }
      ),
      title: "Application Not Approved",
      message: "Your advisor application was not approved. Please contact support for more information or to reapply.",
      bgClass: "bg-destructive/5 border-destructive/20"
    }
  };
  const c = config[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `rounded-xl border p-5 flex items-start gap-4 ${c.bgClass}`,
      "data-ocid": "advisor-status-section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 shrink-0", children: c.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: c.title }),
            c.badge
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: c.message })
        ] })
      ]
    }
  );
}
const quickLinks = [
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-5 w-5" }),
    label: "Browse Funds",
    description: "Explore mutual funds by category, risk, and returns",
    href: "/funds",
    ocid: "quicklink-browse-funds",
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calculator, { className: "h-5 w-5" }),
    label: "Investment Calculator",
    description: "Simulate SIP and lump sum scenarios for clients",
    href: "/calculator",
    ocid: "quicklink-calculator",
    color: "text-accent",
    bg: "bg-accent/10"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-5 w-5" }),
    label: "Learning Resources",
    description: "Educational articles and fund analysis guides",
    href: "/learn",
    ocid: "quicklink-learn",
    color: "text-success",
    bg: "bg-success/10"
  }
];
function AdvisorDashboard() {
  const { user, isLoading } = useUser();
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex-1 p-6 space-y-6",
        "data-ocid": "advisor-dashboard-loading",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-56" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl" }, i)) })
        ]
      }
    );
  }
  const advisorStatus = (user == null ? void 0 : user.advisorStatus) ?? AdvisorStatus.Pending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 bg-background", "data-ocid": "advisor-dashboard", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-6 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-8 h-8 rounded-lg bg-accent/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground", children: "Advisor Dashboard" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Welcome back,",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: (user == null ? void 0 : user.name) ?? "Advisor" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground bg-muted/40 rounded-lg px-3 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: (user == null ? void 0 : user.email) ?? "No email on file" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6 max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border", "data-ocid": "advisor-profile-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide", children: "Profile" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-12 h-12 rounded-full bg-accent/15 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-accent text-lg", children: (user == null ? void 0 : user.name) ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "FA" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-base truncate", children: (user == null ? void 0 : user.name) ?? "Financial Advisor" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground truncate", children: (user == null ? void 0 : user.email) ?? "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "bg-accent/20 text-accent border-accent/30 shrink-0",
              children: "Financial Advisor"
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusSection, { status: advisorStatus }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground mb-3 text-sm uppercase tracking-wide text-muted-foreground", children: "Quick Access" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: quickLinks.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: link.href, "data-ocid": link.ocid, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border hover:border-primary/30 hover:shadow-md transition-smooth cursor-pointer h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-9 h-9 rounded-lg ${link.bg} flex items-center justify-center`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: link.color, children: link.icon })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm", children: link.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: link.description })
        ] }) }) }, link.href)) })
      ] }),
      advisorStatus === AdvisorStatus.Pending && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-muted/40 border border-border p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: "Explore while you wait" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "You have read access to the full mutual fund database and educational resources." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", "data-ocid": "btn-browse-funds-cta", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/funds", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 mr-2" }),
          "Browse Funds"
        ] }) })
      ] })
    ] })
  ] });
}
export {
  AdvisorDashboard as default
};
