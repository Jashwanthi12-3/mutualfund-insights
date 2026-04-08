import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Heart, Search, SlidersHorizontal, TrendingUp } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { CATEGORY_LABELS, RISK_COLORS, RISK_LABELS } from "../constants";
import { useAuth } from "../hooks/use-auth";
import { useBackend } from "../hooks/use-backend";
import { type Fund, FundCategory, RiskLevel } from "../types";

const PAGE_SIZE = 12;

type SortKey = "nav" | "return1Y" | "return3Y" | "return5Y" | "name";

function FundCard({
  fund,
  isFavorited,
  onToggleFavorite,
  isAuthenticated,
}: {
  fund: Fund;
  isFavorited: boolean;
  onToggleFavorite: (id: bigint, current: boolean) => void;
  isAuthenticated: boolean;
}) {
  const ret = fund.return1Y;
  const positive = ret >= 0;

  return (
    <Card
      className="bg-card border-border hover:border-primary/40 hover:shadow-md transition-smooth group flex flex-col"
      data-ocid="fund-card"
    >
      <CardContent className="p-5 flex flex-col gap-4 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <Link
              to="/funds/$id"
              params={{ id: fund.id.toString() }}
              className="block"
            >
              <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                {fund.name}
              </h3>
            </Link>
          </div>
          {isAuthenticated && (
            <button
              type="button"
              aria-label={
                isFavorited ? "Remove from favorites" : "Add to favorites"
              }
              onClick={() => onToggleFavorite(fund.id, isFavorited)}
              className={`shrink-0 p-1.5 rounded-md transition-smooth hover:bg-muted ${isFavorited ? "text-destructive" : "text-muted-foreground hover:text-destructive"}`}
              data-ocid="btn-favorite-toggle"
            >
              <Heart
                className="h-4 w-4"
                fill={isFavorited ? "currentColor" : "none"}
              />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className="text-xs px-1.5 py-0">
            {CATEGORY_LABELS[fund.category]}
          </Badge>
          <Badge
            variant="outline"
            className={`text-xs px-1.5 py-0 ${RISK_COLORS[fund.riskLevel]}`}
          >
            {RISK_LABELS[fund.riskLevel]}
          </Badge>
          {fund.isActive ? (
            <Badge
              variant="outline"
              className="text-xs px-1.5 py-0 bg-success/10 text-success border-success/30"
            >
              Active
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="text-xs px-1.5 py-0 bg-muted text-muted-foreground"
            >
              Inactive
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1 mt-auto border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">NAV</p>
            <p className="text-sm font-bold text-foreground">
              ₹{fund.nav.toFixed(2)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">1Y Return</p>
            <p
              className={`text-sm font-bold ${positive ? "text-success" : "text-destructive"}`}
            >
              {positive ? "+" : ""}
              {ret.toFixed(2)}%
            </p>
          </div>
        </div>

        <Button
          asChild
          size="sm"
          variant="outline"
          className="w-full"
          data-ocid="btn-view-fund"
        >
          <Link to="/funds/$id" params={{ id: fund.id.toString() }}>
            View Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default function FundBrowserPage() {
  const { actor, isFetching } = useBackend();
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const [searchRaw, setSearchRaw] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<FundCategory | "all">("all");
  const [risk, setRisk] = useState<RiskLevel | "all">("all");
  const [sortBy, setSortBy] = useState<SortKey>("return1Y");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearch(searchRaw);
      setPage(1);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchRaw]);

  const { data: allFunds, isLoading } = useQuery<Fund[]>({
    queryKey: ["funds"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFunds({});
    },
    enabled: !!actor && !isFetching,
    staleTime: 2 * 60 * 1000,
  });

  const { data: favorites } = useQuery<bigint[]>({
    queryKey: ["favorites"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFavorites();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });

  const favSet = useMemo(
    () => new Set((favorites ?? []).map((f) => f.toString())),
    [favorites],
  );

  const saveFavMutation = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.saveFavorite(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      toast.success("Added to favorites");
    },
    onError: () => toast.error("Failed to save favorite"),
  });

  const removeFavMutation = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.removeFavorite(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      toast.success("Removed from favorites");
    },
    onError: () => toast.error("Failed to remove favorite"),
  });

  const handleToggleFavorite = useCallback(
    (id: bigint, current: boolean) => {
      if (!isAuthenticated) {
        toast.info("Sign in to save favorites");
        return;
      }
      if (current) removeFavMutation.mutate(id);
      else saveFavMutation.mutate(id);
    },
    [isAuthenticated, saveFavMutation, removeFavMutation],
  );

  const filtered = useMemo(() => {
    let list = allFunds ?? [];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((f) => f.name.toLowerCase().includes(q));
    }
    if (category !== "all") list = list.filter((f) => f.category === category);
    if (risk !== "all") list = list.filter((f) => f.riskLevel === risk);

    return [...list].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return (b[sortBy] as number) - (a[sortBy] as number);
    });
  }, [allFunds, search, category, risk, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div
      className="flex-1 flex flex-col bg-background"
      data-ocid="fund-browser-page"
    >
      {/* Page header */}
      <div className="bg-card border-b border-border px-6 py-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Browse Mutual Funds
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isLoading ? "Loading..." : `${filtered.length} funds available`}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-fit gap-2"
            onClick={() => setShowFilters((v) => !v)}
            data-ocid="btn-toggle-filters"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {showFilters ? "Hide Filters" : "Filters"}
          </Button>
        </div>

        {/* Search + filters */}
        <div className="mt-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by fund name..."
              value={searchRaw}
              onChange={(e) => setSearchRaw(e.target.value)}
              className="pl-9 bg-background"
              data-ocid="input-fund-search"
            />
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  Category
                </Label>
                <Select
                  value={category}
                  onValueChange={(v) => {
                    setCategory(v as FundCategory | "all");
                    setPage(1);
                  }}
                >
                  <SelectTrigger
                    className="bg-background"
                    data-ocid="select-category"
                  >
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {Object.values(FundCategory).map((c) => (
                      <SelectItem key={c} value={c}>
                        {CATEGORY_LABELS[c]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  Risk Level
                </Label>
                <Select
                  value={risk}
                  onValueChange={(v) => {
                    setRisk(v as RiskLevel | "all");
                    setPage(1);
                  }}
                >
                  <SelectTrigger
                    className="bg-background"
                    data-ocid="select-risk"
                  >
                    <SelectValue placeholder="All Risk Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risk Levels</SelectItem>
                    {Object.values(RiskLevel).map((r) => (
                      <SelectItem key={r} value={r}>
                        {RISK_LABELS[r]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Sort By</Label>
                <Select
                  value={sortBy}
                  onValueChange={(v) => setSortBy(v as SortKey)}
                >
                  <SelectTrigger
                    className="bg-background"
                    data-ocid="select-sort"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="return1Y">1Y Return</SelectItem>
                    <SelectItem value="return3Y">3Y Return</SelectItem>
                    <SelectItem value="return5Y">5Y Return</SelectItem>
                    <SelectItem value="nav">NAV</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 p-6">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {(
              [
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
                "l",
              ] as const
            ).map((k) => (
              <Skeleton key={k} className="h-52 rounded-lg" />
            ))}
          </div>
        ) : paginated.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-20 text-center"
            data-ocid="empty-state-funds"
          >
            <TrendingUp className="h-12 w-12 text-muted-foreground/40 mb-4" />
            <h3 className="font-semibold text-foreground">No funds found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Try adjusting your filters or search query
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                setSearchRaw("");
                setCategory("all");
                setRisk("all");
              }}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {paginated.map((fund) => (
                <FundCard
                  key={fund.id.toString()}
                  fund={fund}
                  isFavorited={favSet.has(fund.id.toString())}
                  onToggleFavorite={handleToggleFavorite}
                  isAuthenticated={isAuthenticated}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div
                className="flex items-center justify-center gap-2 mt-8"
                data-ocid="pagination"
              >
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  data-ocid="btn-prev-page"
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground px-3">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  data-ocid="btn-next-page"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
