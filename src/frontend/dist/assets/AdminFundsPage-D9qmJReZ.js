import { c as createLucideIcon, e as useBackend, f as useQueryClient, r as reactExports, l as useQuery, j as jsxRuntimeExports, S as Skeleton, B as Badge, R as RiskLevel, d as Button, X, g as ue, F as FundCategory } from "./index-BqQuEjuM.js";
import { C as Card } from "./card-PAhuKvDj.js";
import { I as Input } from "./input-Cl8bTwgy.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, C as Check } from "./select-BTBQce0A.js";
import { u as useMutation } from "./useMutation-_zBYk2MD.js";
import { C as CATEGORY_LABELS, R as RISK_LABELS, a as RISK_COLORS } from "./constants-Dx-_YjOs.js";
import "./index-IXOTxK3N.js";
import "./index-B-_Cle5v.js";
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
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode);
function toEditState(fund) {
  return {
    nav: fund.nav.toString(),
    return1Y: fund.return1Y.toString(),
    return3Y: fund.return3Y.toString(),
    return5Y: fund.return5Y.toString(),
    expenseRatio: fund.expenseRatio.toString(),
    riskLevel: fund.riskLevel
  };
}
function toUpdateRequest(s) {
  return {
    nav: Number.parseFloat(s.nav) || 0,
    return1Y: Number.parseFloat(s.return1Y) || 0,
    return3Y: Number.parseFloat(s.return3Y) || 0,
    return5Y: Number.parseFloat(s.return5Y) || 0,
    expenseRatio: Number.parseFloat(s.expenseRatio) || 0,
    riskLevel: s.riskLevel
  };
}
const CATEGORY_BADGE = {
  [FundCategory.Equity]: "bg-primary/15 text-primary border-primary/30",
  [FundCategory.Debt]: "bg-accent/15 text-accent border-accent/30",
  [FundCategory.Balanced]: "bg-warning/15 text-warning-foreground border-warning/30",
  [FundCategory.MoneyMarket]: "bg-success/15 text-success border-success/30"
};
function NumInput({
  value,
  onChange,
  prefix,
  step,
  "data-ocid": ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-24", children: [
    prefix && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none", children: prefix }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        type: "number",
        value,
        onChange: (e) => onChange(e.target.value),
        step: step ?? "0.01",
        className: `h-7 text-xs w-full ${prefix ? "pl-5" : ""}`,
        "data-ocid": ocid
      }
    )
  ] });
}
function AdminFundsPage() {
  const { actor, isFetching } = useBackend();
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = reactExports.useState(null);
  const [editState, setEditState] = reactExports.useState(null);
  const [savingId, setSavingId] = reactExports.useState(null);
  const { data: funds = [], isLoading } = useQuery({
    queryKey: ["adminFunds"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getFunds({
        searchText: void 0,
        category: void 0,
        riskLevel: void 0
      });
    },
    enabled: !!actor && !isFetching,
    staleTime: 30 * 1e3
  });
  const updateMutation = useMutation({
    mutationFn: async ({ id, req }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateFund(id, req);
    },
    onSuccess: (_data, _vars) => {
      queryClient.invalidateQueries({ queryKey: ["adminFunds"] });
      queryClient.invalidateQueries({ queryKey: ["funds"] });
      setSavingId(null);
      setEditingId(null);
      setEditState(null);
      ue.success("Fund updated successfully.");
    },
    onError: (_err, _vars) => {
      setSavingId(null);
      ue.error("Failed to update fund. Please try again.");
    }
  });
  function startEdit(fund) {
    setEditingId(fund.id);
    setEditState(toEditState(fund));
  }
  function cancelEdit() {
    setEditingId(null);
    setEditState(null);
  }
  function saveEdit(fund) {
    if (!editState) return;
    setSavingId(fund.id);
    updateMutation.mutate({ id: fund.id, req: toUpdateRequest(editState) });
  }
  function patch(key, value) {
    setEditState((prev) => prev ? { ...prev, [key]: value } : prev);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex-1 flex flex-col bg-background",
      "data-ocid": "admin-funds-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-6 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-9 h-9 rounded-lg bg-accent/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "svg",
            {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: 2,
              className: "h-5 w-5 text-accent",
              "aria-label": "Fund chart icon",
              role: "img",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "22 12 18 12 15 21 9 3 6 12 2 12" })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground leading-tight", children: "Fund Management" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Inline-edit NAV, returns, expense ratio, and risk level" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border border-border shadow-xs overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/30 border-b border-border", children: [
            "Fund Name",
            "Category",
            "Manager",
            "NAV (₹)",
            "1Y Return",
            "3Y Return",
            "5Y Return",
            "Expense",
            "Risk",
            "Actions"
          ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: "px-3 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-widest whitespace-nowrap first:pl-4 last:pr-4",
              children: h
            },
            h
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: isLoading ? ["f1", "f2", "f3", "f4", "f5", "f6", "f7"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border/50", children: [
            "c1",
            "c2",
            "c3",
            "c4",
            "c5",
            "c6",
            "c7",
            "c8",
            "c9",
            "c10"
          ].map((ck) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 first:pl-4 last:pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }) }, ck)) }, sk)) : funds.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "td",
            {
              colSpan: 10,
              className: "px-4 py-10 text-center text-muted-foreground text-sm",
              children: "No funds found."
            }
          ) }) : funds.map((fund) => {
            const isEditing = editingId === fund.id && editState !== null;
            const isSaving = savingId === fund.id;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: `border-b border-border/50 transition-smooth ${isEditing ? "bg-primary/3" : "hover:bg-muted/10"}`,
                "data-ocid": "fund-row",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "pl-4 pr-3 py-3 max-w-[180px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-medium text-foreground truncate",
                      title: fund.name,
                      children: fund.name
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: `text-xs ${CATEGORY_BADGE[fund.category]}`,
                      children: CATEGORY_LABELS[fund.category]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-muted-foreground whitespace-nowrap max-w-[120px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "truncate block",
                      title: fund.managerName,
                      children: fund.managerName
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    NumInput,
                    {
                      value: editState.nav,
                      onChange: (v) => patch("nav", v),
                      prefix: "₹",
                      "data-ocid": "edit-nav"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-foreground", children: [
                    "₹",
                    fund.nav.toFixed(2)
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    NumInput,
                    {
                      value: editState.return1Y,
                      onChange: (v) => patch("return1Y", v),
                      prefix: "%",
                      "data-ocid": "edit-return1y"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `font-mono ${fund.return1Y >= 0 ? "text-success" : "text-destructive"}`,
                      children: [
                        fund.return1Y >= 0 ? "+" : "",
                        fund.return1Y.toFixed(2),
                        "%"
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    NumInput,
                    {
                      value: editState.return3Y,
                      onChange: (v) => patch("return3Y", v),
                      prefix: "%",
                      "data-ocid": "edit-return3y"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `font-mono ${fund.return3Y >= 0 ? "text-success" : "text-destructive"}`,
                      children: [
                        fund.return3Y >= 0 ? "+" : "",
                        fund.return3Y.toFixed(2),
                        "%"
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    NumInput,
                    {
                      value: editState.return5Y,
                      onChange: (v) => patch("return5Y", v),
                      prefix: "%",
                      "data-ocid": "edit-return5y"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `font-mono ${fund.return5Y >= 0 ? "text-success" : "text-destructive"}`,
                      children: [
                        fund.return5Y >= 0 ? "+" : "",
                        fund.return5Y.toFixed(2),
                        "%"
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    NumInput,
                    {
                      value: editState.expenseRatio,
                      onChange: (v) => patch("expenseRatio", v),
                      prefix: "%",
                      step: "0.001",
                      "data-ocid": "edit-expense"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-foreground", children: [
                    fund.expenseRatio.toFixed(2),
                    "%"
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Select,
                    {
                      value: editState.riskLevel,
                      onValueChange: (v) => patch("riskLevel", v),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          SelectTrigger,
                          {
                            className: "h-7 text-xs w-24",
                            "data-ocid": "edit-risk",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.values(RiskLevel).map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          SelectItem,
                          {
                            value: r,
                            className: "text-xs",
                            children: RISK_LABELS[r]
                          },
                          r
                        )) })
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: `text-xs ${RISK_COLORS[fund.riskLevel]}`,
                      children: RISK_LABELS[fund.riskLevel]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "pr-4 pl-3 py-3", children: isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "icon",
                        variant: "default",
                        className: "h-7 w-7 bg-primary hover:bg-primary/90",
                        onClick: () => saveEdit(fund),
                        disabled: isSaving,
                        "aria-label": "Save changes",
                        "data-ocid": "btn-save-fund",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "icon",
                        variant: "outline",
                        className: "h-7 w-7",
                        onClick: cancelEdit,
                        disabled: isSaving,
                        "aria-label": "Cancel edit",
                        "data-ocid": "btn-cancel-fund",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
                      }
                    )
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "icon",
                      variant: "ghost",
                      className: "h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10",
                      onClick: () => startEdit(fund),
                      "aria-label": `Edit ${fund.name}`,
                      "data-ocid": "btn-edit-fund",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" })
                    }
                  ) })
                ]
              },
              fund.id.toString()
            );
          }) })
        ] }) }) }) })
      ]
    }
  );
}
export {
  AdminFundsPage as default
};
