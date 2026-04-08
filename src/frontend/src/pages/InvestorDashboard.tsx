import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  Calculator,
  Heart,
  Scale,
  Search,
  Star,
  TrendingUp,
} from "lucide-react";
import { CATEGORY_LABELS, RISK_COLORS, RISK_LABELS } from "../constants";
import { useBackend } from "../hooks/use-backend";
import { useUser } from "../hooks/use-user";
import type { Fund } from "../types";

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <Card className="bg-card border-border" data-ocid="stat-card">
      <CardContent className="p-5 flex items-center gap-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary shrink-0">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-2xl font-display font-bold text-foreground">
            {value}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function FundRow({ fund }: { fund: Fund }) {
  const ret = fund.return1Y;
  const positive = ret >= 0;
  return (
    <Link
      to="/funds/$id"
      params={{ id: fund.id.toString() }}
      className="flex items-center justify-between px-4 py-3 hover:bg-muted/40 transition-smooth rounded-md group"
      data-ocid="fund-row"
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
          {fund.name}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="outline" className="text-xs px-1.5 py-0">
            {CATEGORY_LABELS[fund.category]}
          </Badge>
          <Badge
            variant="outline"
            className={`text-xs px-1.5 py-0 ${RISK_COLORS[fund.riskLevel]}`}
          >
            {RISK_LABELS[fund.riskLevel]}
          </Badge>
        </div>
      </div>
      <div className="text-right shrink-0 ml-4">
        <p className="text-sm font-semibold text-foreground">
          ₹{fund.nav.toFixed(2)}
        </p>
        <p
          className={`text-xs font-medium ${positive ? "text-success" : "text-destructive"}`}
        >
          {positive ? "+" : ""}
          {ret.toFixed(2)}% 1Y
        </p>
      </div>
    </Link>
  );
}

function QuickNavCard({
  label,
  description,
  href,
  icon,
  ocid,
}: {
  label: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  ocid: string;
}) {
  return (
    <Link to={href} data-ocid={ocid}>
      <Card className="bg-card border-border hover:border-primary/40 hover:shadow-md transition-smooth cursor-pointer group h-full">
        <CardContent className="p-5 flex flex-col gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
            {icon}
          </div>
          <div>
            <p className="font-semibold text-sm text-foreground">{label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function InvestorDashboard() {
  const { user } = useUser();
  const { actor, isFetching } = useBackend();

  const { data: topFunds, isLoading: fundsLoading } = useQuery<Fund[]>({
    queryKey: ["topFunds", 5],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTopPerformingFunds(BigInt(5));
    },
    enabled: !!actor && !isFetching,
  });

  const { data: favorites } = useQuery<bigint[]>({
    queryKey: ["favorites"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFavorites();
    },
    enabled: !!actor && !isFetching,
  });

  const firstName = user?.name?.split(" ")[0] ?? "Investor";
  const favoriteCount = favorites?.length ?? 0;
  const topFund = topFunds?.[0];

  return (
    <div
      className="flex-1 p-6 lg:p-8 space-y-8 bg-background"
      data-ocid="investor-dashboard"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Welcome back, {firstName} 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Here's your investment overview for today
          </p>
        </div>
        <Button
          asChild
          size="sm"
          className="w-fit"
          data-ocid="btn-browse-funds"
        >
          <Link to="/funds">
            <Search className="h-4 w-4 mr-2" />
            Browse Funds
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          label="Saved Favorites"
          value={favoriteCount}
          icon={<Heart className="h-5 w-5" />}
        />
        <StatCard
          label="Top Fund Pick"
          value={topFund ? topFund.name.split(" ").slice(0, 2).join(" ") : "—"}
          icon={<Star className="h-5 w-5" />}
        />
        <StatCard
          label="Available Funds"
          value="20+"
          icon={<TrendingUp className="h-5 w-5" />}
        />
      </div>

      {/* Two column section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top performing funds */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold text-foreground">
              Top Performing Funds
            </CardTitle>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary"
              data-ocid="btn-view-all-funds"
            >
              <Link to="/funds">View All</Link>
            </Button>
          </CardHeader>
          <CardContent className="p-2">
            {fundsLoading ? (
              <div className="space-y-2 p-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-14 rounded-md" />
                ))}
              </div>
            ) : topFunds && topFunds.length > 0 ? (
              <div className="flex flex-col">
                {topFunds.map((fund) => (
                  <FundRow key={fund.id.toString()} fund={fund} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-muted-foreground text-sm">
                No funds available yet.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick navigation */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest px-1">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 gap-3">
            <QuickNavCard
              label="Fund Browser"
              description="Search and filter 20+ mutual funds"
              href="/funds"
              icon={<Search className="h-5 w-5" />}
              ocid="quick-nav-funds"
            />
            <QuickNavCard
              label="Investment Calculator"
              description="SIP & lump sum projections"
              href="/calculator"
              icon={<Calculator className="h-5 w-5" />}
              ocid="quick-nav-calculator"
            />
            <QuickNavCard
              label="Compare Funds"
              description="Side-by-side fund comparison"
              href="/compare"
              icon={<Scale className="h-5 w-5" />}
              ocid="quick-nav-compare"
            />
            <QuickNavCard
              label="Learn"
              description="Articles, guides, and FAQs"
              href="/learn"
              icon={<BookOpen className="h-5 w-5" />}
              ocid="quick-nav-learn"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
