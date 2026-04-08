import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Pencil, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { CATEGORY_LABELS, RISK_COLORS, RISK_LABELS } from "../constants";
import { useBackend } from "../hooks/use-backend";
import { FundCategory, RiskLevel } from "../types";
import type { Fund, UpdateFundRequest } from "../types";

interface EditState {
  nav: string;
  return1Y: string;
  return3Y: string;
  return5Y: string;
  expenseRatio: string;
  riskLevel: RiskLevel;
}

function toEditState(fund: Fund): EditState {
  return {
    nav: fund.nav.toString(),
    return1Y: fund.return1Y.toString(),
    return3Y: fund.return3Y.toString(),
    return5Y: fund.return5Y.toString(),
    expenseRatio: fund.expenseRatio.toString(),
    riskLevel: fund.riskLevel,
  };
}

function toUpdateRequest(s: EditState): UpdateFundRequest {
  return {
    nav: Number.parseFloat(s.nav) || 0,
    return1Y: Number.parseFloat(s.return1Y) || 0,
    return3Y: Number.parseFloat(s.return3Y) || 0,
    return5Y: Number.parseFloat(s.return5Y) || 0,
    expenseRatio: Number.parseFloat(s.expenseRatio) || 0,
    riskLevel: s.riskLevel,
  };
}

const CATEGORY_BADGE: Record<FundCategory, string> = {
  [FundCategory.Equity]: "bg-primary/15 text-primary border-primary/30",
  [FundCategory.Debt]: "bg-accent/15 text-accent border-accent/30",
  [FundCategory.Balanced]:
    "bg-warning/15 text-warning-foreground border-warning/30",
  [FundCategory.MoneyMarket]: "bg-success/15 text-success border-success/30",
};

function NumInput({
  value,
  onChange,
  prefix,
  step,
  "data-ocid": ocid,
}: {
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  step?: string;
  "data-ocid"?: string;
}) {
  return (
    <div className="relative w-24">
      {prefix && (
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
          {prefix}
        </span>
      )}
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        step={step ?? "0.01"}
        className={`h-7 text-xs w-full ${prefix ? "pl-5" : ""}`}
        data-ocid={ocid}
      />
    </div>
  );
}

export default function AdminFundsPage() {
  const { actor, isFetching } = useBackend();
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<bigint | null>(null);
  const [editState, setEditState] = useState<EditState | null>(null);
  const [savingId, setSavingId] = useState<bigint | null>(null);

  const { data: funds = [], isLoading } = useQuery<Fund[]>({
    queryKey: ["adminFunds"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getFunds({
        searchText: undefined,
        category: undefined,
        riskLevel: undefined,
      });
    },
    enabled: !!actor && !isFetching,
    staleTime: 30 * 1000,
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, req }: { id: bigint; req: UpdateFundRequest }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateFund(id, req);
    },
    onSuccess: (_data, _vars) => {
      queryClient.invalidateQueries({ queryKey: ["adminFunds"] });
      queryClient.invalidateQueries({ queryKey: ["funds"] });
      setSavingId(null);
      setEditingId(null);
      setEditState(null);
      toast.success("Fund updated successfully.");
    },
    onError: (_err, _vars) => {
      setSavingId(null);
      toast.error("Failed to update fund. Please try again.");
    },
  });

  function startEdit(fund: Fund) {
    setEditingId(fund.id);
    setEditState(toEditState(fund));
  }

  function cancelEdit() {
    setEditingId(null);
    setEditState(null);
  }

  function saveEdit(fund: Fund) {
    if (!editState) return;
    setSavingId(fund.id);
    updateMutation.mutate({ id: fund.id, req: toUpdateRequest(editState) });
  }

  function patch(key: keyof EditState, value: string) {
    setEditState((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  return (
    <div
      className="flex-1 flex flex-col bg-background"
      data-ocid="admin-funds-page"
    >
      {/* Page header */}
      <div className="bg-card border-b border-border px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent/10">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5 text-accent"
              aria-label="Fund chart icon"
              role="img"
            >
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-foreground leading-tight">
              Fund Management
            </h1>
            <p className="text-sm text-muted-foreground">
              Inline-edit NAV, returns, expense ratio, and risk level
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        <Card className="bg-card border border-border shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/30 border-b border-border">
                  {[
                    "Fund Name",
                    "Category",
                    "Manager",
                    "NAV (₹)",
                    "1Y Return",
                    "3Y Return",
                    "5Y Return",
                    "Expense",
                    "Risk",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-3 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-widest whitespace-nowrap first:pl-4 last:pr-4"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  ["f1", "f2", "f3", "f4", "f5", "f6", "f7"].map((sk) => (
                    <tr key={sk} className="border-b border-border/50">
                      {[
                        "c1",
                        "c2",
                        "c3",
                        "c4",
                        "c5",
                        "c6",
                        "c7",
                        "c8",
                        "c9",
                        "c10",
                      ].map((ck) => (
                        <td key={ck} className="px-3 py-3 first:pl-4 last:pr-4">
                          <Skeleton className="h-4 w-full" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : funds.length === 0 ? (
                  <tr>
                    <td
                      colSpan={10}
                      className="px-4 py-10 text-center text-muted-foreground text-sm"
                    >
                      No funds found.
                    </td>
                  </tr>
                ) : (
                  funds.map((fund) => {
                    const isEditing =
                      editingId === fund.id && editState !== null;
                    const isSaving = savingId === fund.id;

                    return (
                      <tr
                        key={fund.id.toString()}
                        className={`border-b border-border/50 transition-smooth ${
                          isEditing ? "bg-primary/3" : "hover:bg-muted/10"
                        }`}
                        data-ocid="fund-row"
                      >
                        {/* Name — read-only */}
                        <td className="pl-4 pr-3 py-3 max-w-[180px]">
                          <p
                            className="font-medium text-foreground truncate"
                            title={fund.name}
                          >
                            {fund.name}
                          </p>
                        </td>

                        {/* Category — read-only */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <Badge
                            variant="outline"
                            className={`text-xs ${CATEGORY_BADGE[fund.category]}`}
                          >
                            {CATEGORY_LABELS[fund.category]}
                          </Badge>
                        </td>

                        {/* Manager — read-only */}
                        <td className="px-3 py-3 text-muted-foreground whitespace-nowrap max-w-[120px]">
                          <span
                            className="truncate block"
                            title={fund.managerName}
                          >
                            {fund.managerName}
                          </span>
                        </td>

                        {/* NAV — editable */}
                        <td className="px-3 py-3">
                          {isEditing ? (
                            <NumInput
                              value={editState!.nav}
                              onChange={(v) => patch("nav", v)}
                              prefix="₹"
                              data-ocid="edit-nav"
                            />
                          ) : (
                            <span className="font-mono text-foreground">
                              ₹{fund.nav.toFixed(2)}
                            </span>
                          )}
                        </td>

                        {/* 1Y return — editable */}
                        <td className="px-3 py-3">
                          {isEditing ? (
                            <NumInput
                              value={editState!.return1Y}
                              onChange={(v) => patch("return1Y", v)}
                              prefix="%"
                              data-ocid="edit-return1y"
                            />
                          ) : (
                            <span
                              className={`font-mono ${fund.return1Y >= 0 ? "text-success" : "text-destructive"}`}
                            >
                              {fund.return1Y >= 0 ? "+" : ""}
                              {fund.return1Y.toFixed(2)}%
                            </span>
                          )}
                        </td>

                        {/* 3Y return — editable */}
                        <td className="px-3 py-3">
                          {isEditing ? (
                            <NumInput
                              value={editState!.return3Y}
                              onChange={(v) => patch("return3Y", v)}
                              prefix="%"
                              data-ocid="edit-return3y"
                            />
                          ) : (
                            <span
                              className={`font-mono ${fund.return3Y >= 0 ? "text-success" : "text-destructive"}`}
                            >
                              {fund.return3Y >= 0 ? "+" : ""}
                              {fund.return3Y.toFixed(2)}%
                            </span>
                          )}
                        </td>

                        {/* 5Y return — editable */}
                        <td className="px-3 py-3">
                          {isEditing ? (
                            <NumInput
                              value={editState!.return5Y}
                              onChange={(v) => patch("return5Y", v)}
                              prefix="%"
                              data-ocid="edit-return5y"
                            />
                          ) : (
                            <span
                              className={`font-mono ${fund.return5Y >= 0 ? "text-success" : "text-destructive"}`}
                            >
                              {fund.return5Y >= 0 ? "+" : ""}
                              {fund.return5Y.toFixed(2)}%
                            </span>
                          )}
                        </td>

                        {/* Expense ratio — editable */}
                        <td className="px-3 py-3">
                          {isEditing ? (
                            <NumInput
                              value={editState!.expenseRatio}
                              onChange={(v) => patch("expenseRatio", v)}
                              prefix="%"
                              step="0.001"
                              data-ocid="edit-expense"
                            />
                          ) : (
                            <span className="font-mono text-foreground">
                              {fund.expenseRatio.toFixed(2)}%
                            </span>
                          )}
                        </td>

                        {/* Risk level — editable */}
                        <td className="px-3 py-3">
                          {isEditing ? (
                            <Select
                              value={editState!.riskLevel}
                              onValueChange={(v) => patch("riskLevel", v)}
                            >
                              <SelectTrigger
                                className="h-7 text-xs w-24"
                                data-ocid="edit-risk"
                              >
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.values(RiskLevel).map((r) => (
                                  <SelectItem
                                    key={r}
                                    value={r}
                                    className="text-xs"
                                  >
                                    {RISK_LABELS[r]}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Badge
                              variant="outline"
                              className={`text-xs ${RISK_COLORS[fund.riskLevel]}`}
                            >
                              {RISK_LABELS[fund.riskLevel]}
                            </Badge>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="pr-4 pl-3 py-3">
                          {isEditing ? (
                            <div className="flex items-center gap-1.5">
                              <Button
                                size="icon"
                                variant="default"
                                className="h-7 w-7 bg-primary hover:bg-primary/90"
                                onClick={() => saveEdit(fund)}
                                disabled={isSaving}
                                aria-label="Save changes"
                                data-ocid="btn-save-fund"
                              >
                                <Check className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-7 w-7"
                                onClick={cancelEdit}
                                disabled={isSaving}
                                aria-label="Cancel edit"
                                data-ocid="btn-cancel-fund"
                              >
                                <X className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10"
                              onClick={() => startEdit(fund)}
                              aria-label={`Edit ${fund.name}`}
                              data-ocid="btn-edit-fund"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
