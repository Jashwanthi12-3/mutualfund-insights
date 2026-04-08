import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { BookOpen, Calendar, ChevronRight } from "lucide-react";
import { useState } from "react";
import { ARTICLES, CATEGORIES } from "../constants/articles";

export default function LearnPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered =
    activeCategory === "All"
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === activeCategory);

  return (
    <div className="flex-1 bg-background">
      {/* Hero Banner */}
      <div className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">
              Education Centre
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-3">
            Learn About{" "}
            <span className="text-gradient-primary">Mutual Funds</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl">
            Build your investment knowledge with expert articles on SIPs, risk,
            returns, taxes, and more.
          </p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="border-b border-border bg-card/50 sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-3 flex gap-2 overflow-x-auto scrollbar-none">
          {["All", ...CATEGORIES].map((cat) => (
            <button
              type="button"
              key={cat}
              data-ocid={`category-filter-${cat.toLowerCase().replace(/\s/g, "-")}`}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-smooth ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <p className="text-sm text-muted-foreground mb-6">
          Showing {filtered.length} article{filtered.length !== 1 ? "s" : ""}
          {activeCategory !== "All" ? ` in "${activeCategory}"` : ""}
        </p>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          data-ocid="articles-grid"
        >
          {filtered.map((article) => (
            <Card
              key={article.id}
              className="group border border-border bg-card hover:shadow-md transition-smooth hover:-translate-y-0.5 flex flex-col"
              data-ocid={`article-card-${article.id}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-3">
                  <Badge
                    variant="secondary"
                    className="text-xs font-semibold"
                    data-ocid={`article-category-${article.id}`}
                  >
                    {article.category}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {article.publishedAt}
                  </span>
                </div>
                <h2 className="font-display text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-smooth line-clamp-2">
                  {article.title}
                </h2>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 gap-4">
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {article.content.slice(0, 150)}…
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    By {article.authorName}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-primary hover:text-primary/80 px-2"
                    asChild
                    data-ocid={`read-more-${article.id}`}
                  >
                    <Link to="/learn/$id" params={{ id: article.id }}>
                      Read More <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
