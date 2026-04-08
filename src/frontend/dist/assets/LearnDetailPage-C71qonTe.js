import { c as createLucideIcon, i as useParams, j as jsxRuntimeExports, h as BookOpen, d as Button, L as Link, B as Badge, k as Separator } from "./index-BqQuEjuM.js";
import { C as Card, a as CardHeader, d as CardContent } from "./card-PAhuKvDj.js";
import { A as ARTICLES, a as Calendar, b as ChevronRight } from "./articles-dikpNtb-.js";
import { A as ArrowLeft } from "./arrow-left-DwXjRA_O.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
  ["path", { d: "M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662", key: "154egf" }]
];
const CircleUser = createLucideIcon("circle-user", __iconNode);
function LearnDetailPage() {
  const { id } = useParams({ from: "/learn/$id" });
  const article = ARTICLES.find((a) => a.id === id);
  if (!article) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex-1 flex flex-col items-center justify-center gap-6 bg-background p-8",
        "data-ocid": "article-not-found",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-16 w-16 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Article Not Found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "The article you're looking for doesn't exist." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/learn", children: "Back to Learn" }) })
        ]
      }
    );
  }
  const related = ARTICLES.filter(
    (a) => a.category === article.category && a.id !== article.id
  ).slice(0, 3);
  const paragraphs = article.content.split("\n\n").filter((p) => p.trim().length > 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-6 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "nav",
        {
          className: "flex items-center gap-1.5 text-sm text-muted-foreground mb-6",
          "data-ocid": "breadcrumb",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/learn",
                className: "hover:text-primary transition-smooth flex items-center gap-1",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
                  "Learn"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground truncate max-w-xs", children: article.title })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Badge,
        {
          variant: "secondary",
          className: "font-semibold",
          "data-ocid": "article-category",
          children: article.category
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h1",
        {
          className: "font-display text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6",
          "data-ocid": "article-title",
          children: article.title
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleUser, { className: "h-4 w-4" }),
          article.authorName
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
          article.publishedAt
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-6 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("article", { className: "prose-custom space-y-5", "data-ocid": "article-body", children: paragraphs.map((para) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-base text-foreground leading-relaxed",
          children: para.trim()
        },
        para.slice(0, 40)
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-10" }),
      related.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "related-articles", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground mb-5", children: "Related Articles" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: related.map((rel) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "border border-border bg-card hover:shadow-md transition-smooth hover:-translate-y-0.5",
            "data-ocid": `related-article-${rel.id}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "w-fit text-xs mb-2", children: rel.category }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-bold text-foreground leading-snug line-clamp-2", children: rel.title })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground line-clamp-2 mb-3", children: [
                  rel.content.slice(0, 100),
                  "…"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "gap-1 text-primary hover:text-primary/80 px-0 h-auto text-xs",
                    asChild: true,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/learn/$id", params: { id: rel.id }, children: [
                      "Read More ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" })
                    ] })
                  }
                )
              ] })
            ]
          },
          rel.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 pt-6 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", asChild: true, "data-ocid": "back-to-learn", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/learn", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
        " Back to All Articles"
      ] }) }) })
    ] })
  ] });
}
export {
  LearnDetailPage as default
};
