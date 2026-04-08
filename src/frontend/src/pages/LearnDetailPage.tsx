import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  ChevronRight,
  UserCircle,
} from "lucide-react";
import { ARTICLES } from "../constants/articles";

export default function LearnDetailPage() {
  const { id } = useParams({ from: "/learn/$id" });
  const article = ARTICLES.find((a) => a.id === id);

  if (!article) {
    return (
      <div
        className="flex-1 flex flex-col items-center justify-center gap-6 bg-background p-8"
        data-ocid="article-not-found"
      >
        <BookOpen className="h-16 w-16 text-muted-foreground/40" />
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Article Not Found
          </h2>
          <p className="text-muted-foreground">
            The article you're looking for doesn't exist.
          </p>
        </div>
        <Button asChild>
          <Link to="/learn">Back to Learn</Link>
        </Button>
      </div>
    );
  }

  const related = ARTICLES.filter(
    (a) => a.category === article.category && a.id !== article.id,
  ).slice(0, 3);

  const paragraphs = article.content
    .split("\n\n")
    .filter((p) => p.trim().length > 0);

  return (
    <div className="flex-1 bg-background">
      {/* Breadcrumb + Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6"
            data-ocid="breadcrumb"
          >
            <Link
              to="/learn"
              className="hover:text-primary transition-smooth flex items-center gap-1"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Learn
            </Link>
            <span>/</span>
            <span className="text-foreground truncate max-w-xs">
              {article.title}
            </span>
          </nav>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-4">
            <Badge
              variant="secondary"
              className="font-semibold"
              data-ocid="article-category"
            >
              {article.category}
            </Badge>
          </div>

          <h1
            className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6"
            data-ocid="article-title"
          >
            {article.title}
          </h1>

          <div className="flex items-center gap-5 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <UserCircle className="h-4 w-4" />
              {article.authorName}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {article.publishedAt}
            </span>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <article className="prose-custom space-y-5" data-ocid="article-body">
          {paragraphs.map((para) => (
            <p
              key={para.slice(0, 40)}
              className="text-base text-foreground leading-relaxed"
            >
              {para.trim()}
            </p>
          ))}
        </article>

        <Separator className="my-10" />

        {/* Related Articles */}
        {related.length > 0 && (
          <section data-ocid="related-articles">
            <h2 className="font-display text-xl font-bold text-foreground mb-5">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((rel) => (
                <Card
                  key={rel.id}
                  className="border border-border bg-card hover:shadow-md transition-smooth hover:-translate-y-0.5"
                  data-ocid={`related-article-${rel.id}`}
                >
                  <CardHeader className="pb-2">
                    <Badge variant="outline" className="w-fit text-xs mb-2">
                      {rel.category}
                    </Badge>
                    <h3 className="font-display text-sm font-bold text-foreground leading-snug line-clamp-2">
                      {rel.title}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                      {rel.content.slice(0, 100)}…
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 text-primary hover:text-primary/80 px-0 h-auto text-xs"
                      asChild
                    >
                      <Link to="/learn/$id" params={{ id: rel.id }}>
                        Read More <ChevronRight className="h-3 w-3" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Back CTA */}
        <div className="mt-10 pt-6 border-t border-border">
          <Button variant="outline" asChild data-ocid="back-to-learn">
            <Link to="/learn">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to All Articles
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
