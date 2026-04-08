import { c as createLucideIcon, e as useBackend, u as useAuth, f as useQueryClient, r as reactExports, l as useQuery, g as ue, j as jsxRuntimeExports, T as TrendingUp, d as Button, w as Search, F as FundCategory, R as RiskLevel, S as Skeleton, L as Link, B as Badge } from "./index-BqQuEjuM.js";
import { C as Card, d as CardContent } from "./card-PAhuKvDj.js";
import { I as Input } from "./input-Cl8bTwgy.js";
import { L as Label } from "./label-B5geBl3E.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BTBQce0A.js";
import { u as useMutation } from "./useMutation-_zBYk2MD.js";
import { C as CATEGORY_LABELS, R as RISK_LABELS, a as RISK_COLORS } from "./constants-Dx-_YjOs.js";
import { H as Heart } from "./heart-CQgtvyJq.js";
import "./index-IXOTxK3N.js";
import "./index-B-_Cle5v.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
const PAGE_SIZE = 12;
function FundCard({
  fund,
  isFavorited,
  onToggleFavorite,
  isAuthenticated
}) {
  const ret = fund.return1Y;
  const positive = ret >= 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: "bg-card border-border hover:border-primary/40 hover:shadow-md transition-smooth group flex flex-col",
      "data-ocid": "fund-card",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex flex-col gap-4 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/funds/$id",
              params: { id: fund.id.toString() },
              className: "block",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug", children: fund.name })
            }
          ) }),
          isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "aria-label": isFavorited ? "Remove from favorites" : "Add to favorites",
              onClick: () => onToggleFavorite(fund.id, isFavorited),
              className: `shrink-0 p-1.5 rounded-md transition-smooth hover:bg-muted ${isFavorited ? "text-destructive" : "text-muted-foreground hover:text-destructive"}`,
              "data-ocid": "btn-favorite-toggle",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Heart,
                {
                  className: "h-4 w-4",
                  fill: isFavorited ? "currentColor" : "none"
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs px-1.5 py-0", children: CATEGORY_LABELS[fund.category] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: `text-xs px-1.5 py-0 ${RISK_COLORS[fund.riskLevel]}`,
              children: RISK_LABELS[fund.riskLevel]
            }
          ),
          fund.isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "text-xs px-1.5 py-0 bg-success/10 text-success border-success/30",
              children: "Active"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "text-xs px-1.5 py-0 bg-muted text-muted-foreground",
              children: "Inactive"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 pt-1 mt-auto border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "NAV" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-foreground", children: [
              "₹",
              fund.nav.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "1Y Return" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: `text-sm font-bold ${positive ? "text-success" : "text-destructive"}`,
                children: [
                  positive ? "+" : "",
                  ret.toFixed(2),
                  "%"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            size: "sm",
            variant: "outline",
            className: "w-full",
            "data-ocid": "btn-view-fund",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/funds/$id", params: { id: fund.id.toString() }, children: "View Details" })
          }
        )
      ] })
    }
  );
}
function FundBrowserPage() {
  const { actor, isFetching } = useBackend();
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [searchRaw, setSearchRaw] = reactExports.useState("");
  const [search, setSearch] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("all");
  const [risk, setRisk] = reactExports.useState("all");
  const [sortBy, setSortBy] = reactExports.useState("return1Y");
  const [page, setPage] = reactExports.useState(1);
  const [showFilters, setShowFilters] = reactExports.useState(false);
  const debounceRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearch(searchRaw);
      setPage(1);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchRaw]);
  const { data: allFunds, isLoading } = useQuery({
    queryKey: ["funds"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFunds({});
    },
    enabled: !!actor && !isFetching,
    staleTime: 2 * 60 * 1e3
  });
  const { data: favorites } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFavorites();
    },
    enabled: !!actor && !isFetching && isAuthenticated
  });
  const favSet = reactExports.useMemo(
    () => new Set((favorites ?? []).map((f) => f.toString())),
    [favorites]
  );
  const saveFavMutation = useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("No actor");
      return actor.saveFavorite(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      ue.success("Added to favorites");
    },
    onError: () => ue.error("Failed to save favorite")
  });
  const removeFavMutation = useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("No actor");
      return actor.removeFavorite(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      ue.success("Removed from favorites");
    },
    onError: () => ue.error("Failed to remove favorite")
  });
  const handleToggleFavorite = reactExports.useCallback(
    (id, current) => {
      if (!isAuthenticated) {
        ue.info("Sign in to save favorites");
        return;
      }
      if (current) removeFavMutation.mutate(id);
      else saveFavMutation.mutate(id);
    },
    [isAuthenticated, saveFavMutation, removeFavMutation]
  );
  const filtered = reactExports.useMemo(() => {
    let list = allFunds ?? [];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((f) => f.name.toLowerCase().includes(q));
    }
    if (category !== "all") list = list.filter((f) => f.category === category);
    if (risk !== "all") list = list.filter((f) => f.riskLevel === risk);
    return [...list].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return b[sortBy] - a[sortBy];
    });
  }, [allFunds, search, category, risk, sortBy]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex-1 flex flex-col bg-background",
      "data-ocid": "fund-browser-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-b border-border px-6 py-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-xl font-bold text-foreground flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5 text-primary" }),
                "Browse Mutual Funds"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: isLoading ? "Loading..." : `${filtered.length} funds available` })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "w-fit gap-2",
                onClick: () => setShowFilters((v) => !v),
                "data-ocid": "btn-toggle-filters",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-4 w-4" }),
                  showFilters ? "Hide Filters" : "Filters"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Search by fund name...",
                  value: searchRaw,
                  onChange: (e) => setSearchRaw(e.target.value),
                  className: "pl-9 bg-background",
                  "data-ocid": "input-fund-search"
                }
              )
            ] }),
            showFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Category" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: category,
                    onValueChange: (v) => {
                      setCategory(v);
                      setPage(1);
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          className: "bg-background",
                          "data-ocid": "select-category",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Categories" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Categories" }),
                        Object.values(FundCategory).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: CATEGORY_LABELS[c] }, c))
                      ] })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Risk Level" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: risk,
                    onValueChange: (v) => {
                      setRisk(v);
                      setPage(1);
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          className: "bg-background",
                          "data-ocid": "select-risk",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Risk Levels" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Risk Levels" }),
                        Object.values(RiskLevel).map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, children: RISK_LABELS[r] }, r))
                      ] })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Sort By" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: sortBy,
                    onValueChange: (v) => setSortBy(v),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          className: "bg-background",
                          "data-ocid": "select-sort",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "return1Y", children: "1Y Return" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "return3Y", children: "3Y Return" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "return5Y", children: "5Y Return" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "nav", children: "NAV" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "name", children: "Name" })
                      ] })
                    ]
                  }
                )
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 p-6", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: [
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "l"
        ].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 rounded-lg" }, k)) }) : paginated.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-20 text-center",
            "data-ocid": "empty-state-funds",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-12 w-12 text-muted-foreground/40 mb-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "No funds found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Try adjusting your filters or search query" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "mt-4",
                  onClick: () => {
                    setSearchRaw("");
                    setCategory("all");
                    setRisk("all");
                  },
                  children: "Clear filters"
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: paginated.map((fund) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            FundCard,
            {
              fund,
              isFavorited: favSet.has(fund.id.toString()),
              onToggleFavorite: handleToggleFavorite,
              isAuthenticated
            },
            fund.id.toString()
          )) }),
          totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-center gap-2 mt-8",
              "data-ocid": "pagination",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    disabled: page === 1,
                    onClick: () => setPage((p) => Math.max(1, p - 1)),
                    "data-ocid": "btn-prev-page",
                    children: "Previous"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground px-3", children: [
                  "Page ",
                  page,
                  " of ",
                  totalPages
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    disabled: page === totalPages,
                    onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
                    "data-ocid": "btn-next-page",
                    children: "Next"
                  }
                )
              ]
            }
          )
        ] }) })
      ]
    }
  );
}
export {
  FundBrowserPage as default
};
