import { r as reactExports, j as jsxRuntimeExports, h as BookOpen, B as Badge, d as Button, L as Link } from "./index-BqQuEjuM.js";
import { C as Card, a as CardHeader, d as CardContent } from "./card-PAhuKvDj.js";
import { A as ARTICLES, C as CATEGORIES, a as Calendar, b as ChevronRight } from "./articles-dikpNtb-.js";
function LearnPage() {
  const [activeCategory, setActiveCategory] = reactExports.useState("All");
  const filtered = activeCategory === "All" ? ARTICLES : ARTICLES.filter((a) => a.category === activeCategory);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-6 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-6 w-6 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-primary uppercase tracking-widest", children: "Education Centre" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl font-bold text-foreground mb-3", children: [
        "Learn About",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-primary", children: "Mutual Funds" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-xl", children: "Build your investment knowledge with expert articles on SIPs, risk, returns, taxes, and more." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-card/50 sticky top-0 z-10 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-6 py-3 flex gap-2 overflow-x-auto scrollbar-none", children: ["All", ...CATEGORIES].map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        "data-ocid": `category-filter-${cat.toLowerCase().replace(/\s/g, "-")}`,
        onClick: () => setActiveCategory(cat),
        className: `px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-smooth ${activeCategory === cat ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`,
        children: cat
      },
      cat
    )) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-6 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-6", children: [
        "Showing ",
        filtered.length,
        " article",
        filtered.length !== 1 ? "s" : "",
        activeCategory !== "All" ? ` in "${activeCategory}"` : ""
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
          "data-ocid": "articles-grid",
          children: filtered.map((article) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Card,
            {
              className: "group border border-border bg-card hover:shadow-md transition-smooth hover:-translate-y-0.5 flex flex-col",
              "data-ocid": `article-card-${article.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "secondary",
                        className: "text-xs font-semibold",
                        "data-ocid": `article-category-${article.id}`,
                        children: article.category
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3" }),
                      article.publishedAt
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-smooth line-clamp-2", children: article.title })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col flex-1 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed line-clamp-3", children: [
                    article.content.slice(0, 150),
                    "…"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                      "By ",
                      article.authorName
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "sm",
                        className: "gap-1 text-primary hover:text-primary/80 px-2",
                        asChild: true,
                        "data-ocid": `read-more-${article.id}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/learn/$id", params: { id: article.id }, children: [
                          "Read More ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" })
                        ] })
                      }
                    )
                  ] })
                ] })
              ]
            },
            article.id
          ))
        }
      )
    ] })
  ] });
}
export {
  LearnPage as default
};
