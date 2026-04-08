import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle2,
  Clock,
  Search,
  Shield,
  UserCheck,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useBackend } from "../hooks/use-backend";
import { AdvisorStatus, UserRole } from "../types";
import type { User } from "../types";

const ROLE_BADGE: Record<UserRole, { label: string; cls: string }> = {
  [UserRole.Admin]: {
    label: "Admin",
    cls: "bg-destructive/20 text-destructive border-destructive/30",
  },
  [UserRole.Investor]: {
    label: "Investor",
    cls: "bg-primary/20 text-primary border-primary/30",
  },
  [UserRole.FinancialAdvisor]: {
    label: "Advisor",
    cls: "bg-accent/20 text-accent border-accent/30",
  },
  [UserRole.DataAnalyst]: {
    label: "Analyst",
    cls: "bg-warning/20 text-warning-foreground border-warning/30",
  },
};

export default function AdminUsersPage() {
  const { actor, isFetching } = useBackend();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  const { data: users = [], isLoading } = useQuery<User[]>({
    queryKey: ["allUsers"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getUsers();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30 * 1000,
  });

  const toggleStatusMutation = useMutation({
    mutationFn: async (principal: Principal) => {
      if (!actor) throw new Error("No actor");
      return actor.toggleUserStatus(principal);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      toast.success("User status updated.");
    },
    onError: () => toast.error("Failed to update user status."),
  });

  const approveAdvisorMutation = useMutation({
    mutationFn: async (principal: Principal) => {
      if (!actor) throw new Error("No actor");
      return actor.approveAdvisor(principal);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      toast.success("Advisor approved.");
    },
    onError: () => toast.error("Failed to approve advisor."),
  });

  const rejectAdvisorMutation = useMutation({
    mutationFn: async (principal: Principal) => {
      if (!actor) throw new Error("No actor");
      return actor.rejectAdvisor(principal);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      toast.success("Advisor rejected.");
    },
    onError: () => toast.error("Failed to reject advisor."),
  });

  const pendingAdvisors = users.filter(
    (u) =>
      u.role === UserRole.FinancialAdvisor &&
      u.advisorStatus === AdvisorStatus.Pending,
  );

  const filteredUsers = users.filter((u) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  });

  return (
    <div
      className="flex-1 flex flex-col bg-background"
      data-ocid="admin-users-page"
    >
      {/* Page header */}
      <div className="bg-card border-b border-border px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-foreground leading-tight">
              User Management
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage users, roles, and advisor approvals
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6">
        {/* Pending advisors */}
        {(isLoading || pendingAdvisors.length > 0) && (
          <section data-ocid="pending-advisors-section">
            <Card className="bg-card border border-warning/30 shadow-xs">
              <CardHeader className="pb-2 border-b border-border/50">
                <CardTitle className="font-display text-base font-semibold flex items-center gap-2">
                  <Clock className="h-4 w-4 text-warning-foreground" />
                  Pending Advisor Approvals
                  {pendingAdvisors.length > 0 && (
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-warning/30 text-warning-foreground text-xs font-bold">
                      {pendingAdvisors.length}
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="p-4 space-y-3">
                    {[1, 2].map((i) => (
                      <Skeleton key={i} className="h-14 w-full rounded-lg" />
                    ))}
                  </div>
                ) : (
                  <ul className="divide-y divide-border/50">
                    {pendingAdvisors.map((u) => (
                      <li
                        key={u.principal.toString()}
                        className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-3"
                        data-ocid="pending-advisor-row"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-warning/10 shrink-0">
                            <span className="text-sm font-bold text-warning-foreground">
                              {u.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-foreground truncate">
                              {u.name}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {u.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs gap-1.5 border-success/40 text-success hover:bg-success/10"
                            onClick={() =>
                              approveAdvisorMutation.mutate(u.principal)
                            }
                            disabled={
                              approveAdvisorMutation.isPending ||
                              rejectAdvisorMutation.isPending
                            }
                            data-ocid="btn-approve-advisor"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs gap-1.5 border-destructive/40 text-destructive hover:bg-destructive/10"
                            onClick={() =>
                              rejectAdvisorMutation.mutate(u.principal)
                            }
                            disabled={
                              approveAdvisorMutation.isPending ||
                              rejectAdvisorMutation.isPending
                            }
                            data-ocid="btn-reject-advisor"
                          >
                            <XCircle className="h-3.5 w-3.5" />
                            Reject
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </section>
        )}

        {/* All users table */}
        <section data-ocid="all-users-section">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <h2 className="font-display text-base font-semibold text-foreground flex items-center gap-2 flex-1">
              <Shield className="h-4 w-4 text-muted-foreground" />
              All Users
              {!isLoading && (
                <span className="text-sm font-normal text-muted-foreground">
                  ({filteredUsers.length})
                </span>
              )}
            </h2>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search by name or email…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 text-sm"
                data-ocid="search-users"
              />
            </div>
          </div>

          <Card className="bg-card border border-border shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/30 border-b border-border">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-widest whitespace-nowrap">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-widest whitespace-nowrap">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-widest whitespace-nowrap">
                      Role
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-widest whitespace-nowrap">
                      Status
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-widest whitespace-nowrap">
                      Active
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    ["s1", "s2", "s3", "s4", "s5"].map((sk) => (
                      <tr key={sk} className="border-b border-border/50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-7 w-7 rounded-full" />
                            <Skeleton className="h-4 w-28" />
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Skeleton className="h-4 w-40" />
                        </td>
                        <td className="px-4 py-3">
                          <Skeleton className="h-5 w-16 rounded-md" />
                        </td>
                        <td className="px-4 py-3">
                          <Skeleton className="h-5 w-16 rounded-md" />
                        </td>
                        <td className="px-4 py-3 flex justify-center">
                          <Skeleton className="h-5 w-9 rounded-full" />
                        </td>
                      </tr>
                    ))
                  ) : filteredUsers.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-10 text-center text-muted-foreground text-sm"
                      >
                        {search
                          ? "No users match your search."
                          : "No users registered yet."}
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((u) => {
                      const rb = ROLE_BADGE[u.role];
                      return (
                        <tr
                          key={u.principal.toString()}
                          className="border-b border-border/50 hover:bg-muted/10 transition-smooth"
                          data-ocid="user-row"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 shrink-0">
                                <span className="text-xs font-bold text-primary">
                                  {u.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <span className="font-medium text-foreground whitespace-nowrap">
                                {u.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                            {u.email}
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              variant="outline"
                              className={`text-xs ${rb.cls}`}
                            >
                              {rb.label}
                            </Badge>
                            {u.role === UserRole.FinancialAdvisor &&
                              u.advisorStatus && (
                                <Badge
                                  variant="outline"
                                  className={`ml-1 text-xs ${
                                    u.advisorStatus === AdvisorStatus.Approved
                                      ? "bg-success/15 text-success border-success/30"
                                      : u.advisorStatus ===
                                          AdvisorStatus.Rejected
                                        ? "bg-destructive/15 text-destructive border-destructive/30"
                                        : "bg-warning/15 text-warning-foreground border-warning/30"
                                  }`}
                                >
                                  {u.advisorStatus}
                                </Badge>
                              )}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                u.isActive
                                  ? "bg-success/15 text-success"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {u.isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <Switch
                              checked={u.isActive}
                              onCheckedChange={() =>
                                toggleStatusMutation.mutate(u.principal)
                              }
                              disabled={toggleStatusMutation.isPending}
                              aria-label={`Toggle ${u.name} active status`}
                              data-ocid="toggle-user-status"
                            />
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
