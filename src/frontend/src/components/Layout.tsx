import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "@tanstack/react-router";
import {
  BarChart2,
  BookOpen,
  Calculator,
  ChevronDown,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Scale,
  Search,
  Shield,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { useUser } from "../hooks/use-user";
import { UserRole } from "../types";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

function getRoleNavItems(role?: UserRole): NavItem[] {
  const base: NavItem[] = [
    {
      label: "Browse Funds",
      href: "/funds",
      icon: <TrendingUp className="h-4 w-4" />,
    },
    { label: "Learn", href: "/learn", icon: <BookOpen className="h-4 w-4" /> },
  ];

  if (!role) return base;

  switch (role) {
    case UserRole.Admin:
      return [
        {
          label: "Dashboard",
          href: "/dashboard",
          icon: <LayoutDashboard className="h-4 w-4" />,
        },
        {
          label: "Users",
          href: "/admin/users",
          icon: <Users className="h-4 w-4" />,
        },
        {
          label: "Funds",
          href: "/admin/funds",
          icon: <TrendingUp className="h-4 w-4" />,
        },
        {
          label: "Learn",
          href: "/learn",
          icon: <BookOpen className="h-4 w-4" />,
        },
      ];
    case UserRole.Investor:
      return [
        {
          label: "Dashboard",
          href: "/dashboard",
          icon: <LayoutDashboard className="h-4 w-4" />,
        },
        {
          label: "Browse Funds",
          href: "/funds",
          icon: <Search className="h-4 w-4" />,
        },
        {
          label: "Compare",
          href: "/compare",
          icon: <Scale className="h-4 w-4" />,
        },
        {
          label: "Calculator",
          href: "/calculator",
          icon: <Calculator className="h-4 w-4" />,
        },
        {
          label: "Learn",
          href: "/learn",
          icon: <BookOpen className="h-4 w-4" />,
        },
      ];
    case UserRole.FinancialAdvisor:
      return [
        {
          label: "Dashboard",
          href: "/advisor",
          icon: <LayoutDashboard className="h-4 w-4" />,
        },
        {
          label: "Browse Funds",
          href: "/funds",
          icon: <Search className="h-4 w-4" />,
        },
        {
          label: "Learn",
          href: "/learn",
          icon: <BookOpen className="h-4 w-4" />,
        },
      ];
    case UserRole.DataAnalyst:
      return [
        {
          label: "Dashboard",
          href: "/analyst",
          icon: <BarChart2 className="h-4 w-4" />,
        },
        {
          label: "Browse Funds",
          href: "/funds",
          icon: <Search className="h-4 w-4" />,
        },
        {
          label: "Learn",
          href: "/learn",
          icon: <BookOpen className="h-4 w-4" />,
        },
      ];
    default:
      return base;
  }
}

function getRoleBadge(role: UserRole) {
  const config: Record<UserRole, { label: string; className: string }> = {
    [UserRole.Admin]: {
      label: "Admin",
      className: "bg-destructive/20 text-destructive border-destructive/30",
    },
    [UserRole.Investor]: {
      label: "Investor",
      className: "bg-primary/20 text-primary border-primary/30",
    },
    [UserRole.FinancialAdvisor]: {
      label: "Advisor",
      className: "bg-accent/20 text-accent border-accent/30",
    },
    [UserRole.DataAnalyst]: {
      label: "Analyst",
      className: "bg-warning/20 text-warning-foreground border-warning/30",
    },
  };
  const c = config[role];
  return (
    <Badge variant="outline" className={c.className}>
      {c.label}
    </Badge>
  );
}

interface SidebarNavProps {
  items: NavItem[];
  currentPath: string;
  onNavigate?: () => void;
}

function SidebarNav({ items, currentPath, onNavigate }: SidebarNavProps) {
  return (
    <nav className="flex flex-col gap-1 py-2">
      {items.map((item) => {
        const isActive =
          currentPath === item.href || currentPath.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            to={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
              isActive
                ? "bg-sidebar-primary/15 text-sidebar-primary font-semibold"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
            data-ocid={`nav-${item.href.replace(/\//g, "-").slice(1) || "home"}`}
          >
            <span
              className={
                isActive ? "text-sidebar-primary" : "text-muted-foreground"
              }
            >
              {item.icon}
            </span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isAuthenticated, login, logout } = useAuth();
  const { user } = useUser();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = getRoleNavItems(user?.role);
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  const sidebarContent = (
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-4 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
          <TrendingUp className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-display font-bold text-base text-sidebar-foreground tracking-tight">
          MutualFunds
        </span>
      </div>

      {/* User profile */}
      {user && (
        <div className="px-4 py-3 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user.name}
              </p>
              <div className="mt-0.5">{getRoleBadge(user.role)}</div>
            </div>
          </div>
        </div>
      )}

      {/* Nav items */}
      <div className="flex-1 overflow-y-auto px-2">
        <div className="py-2">
          <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            {user?.role ? `${user.role} Menu` : "Navigation"}
          </p>
          <SidebarNav
            items={navItems}
            currentPath={location.pathname}
            onNavigate={() => setMobileOpen(false)}
          />
        </div>

        {user?.role === UserRole.Admin && (
          <>
            <Separator className="my-2" />
            <div className="py-2">
              <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                Admin
              </p>
              <Link
                to="/admin"
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                  location.pathname === "/admin"
                    ? "bg-destructive/15 text-destructive"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
                data-ocid="nav-admin"
              >
                <Shield className="h-4 w-4" />
                Admin Panel
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border">
        {isAuthenticated ? (
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-muted-foreground"
            onClick={logout}
            data-ocid="btn-logout"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-primary"
            onClick={login}
            data-ocid="btn-login-sidebar"
          >
            <LogIn className="h-4 w-4" />
            Sign In
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top header */}
      <header
        className="sticky top-0 z-40 bg-card border-b border-border shadow-xs h-14 flex items-center px-4 gap-3"
        data-ocid="header"
      >
        {/* Mobile menu trigger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
              data-ocid="btn-mobile-menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            {sidebarContent}
          </SheetContent>
        </Sheet>

        {/* Logo (header) — visible on mobile only */}
        <Link to="/" className="flex items-center gap-2 md:hidden">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary">
            <TrendingUp className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-sm text-foreground">
            MutualFunds
          </span>
        </Link>

        {/* Desktop nav (top bar) */}
        <nav
          className="hidden md:flex items-center gap-1 flex-1"
          aria-label="Primary navigation"
        >
          {navItems.slice(0, 5).map((item) => {
            const isActive =
              location.pathname === item.href ||
              location.pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-smooth ${
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
                data-ocid={`topnav-${item.href.replace(/\//g, "-").slice(1) || "home"}`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2">
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 h-8 px-2"
                  data-ocid="btn-user-menu"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:block text-sm font-medium max-w-[120px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown className="h-3 w-3 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5">
                  <p className="text-xs text-muted-foreground">Signed in as</p>
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <div className="mt-1">{getRoleBadge(user.role)}</div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    to={
                      user.role === UserRole.Admin
                        ? "/admin"
                        : user.role === UserRole.FinancialAdvisor
                          ? "/advisor"
                          : user.role === UserRole.DataAnalyst
                            ? "/analyst"
                            : "/dashboard"
                    }
                    className="cursor-pointer"
                    data-ocid="dropdown-dashboard"
                  >
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="text-destructive cursor-pointer"
                  data-ocid="dropdown-logout"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              size="sm"
              onClick={login}
              className="gap-2"
              data-ocid="btn-login-header"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </Button>
          )}
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-56 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
          <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border">
            {/* User info */}
            {user && (
              <div className="px-4 py-3 border-b border-sidebar-border">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-sidebar-foreground truncate">
                      {user.name}
                    </p>
                    <div className="mt-0.5">{getRoleBadge(user.role)}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Nav */}
            <div className="flex-1 overflow-y-auto px-2">
              <div className="py-2">
                {user?.role && (
                  <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                    {user.role === UserRole.Admin
                      ? "Admin"
                      : user.role === UserRole.FinancialAdvisor
                        ? "Advisor"
                        : user.role === UserRole.DataAnalyst
                          ? "Analyst"
                          : "Investor"}
                  </p>
                )}
                <SidebarNav items={navItems} currentPath={location.pathname} />
              </div>
            </div>

            {/* Sign out */}
            <div className="p-3 border-t border-sidebar-border">
              {isAuthenticated ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-2 text-muted-foreground"
                  onClick={logout}
                  data-ocid="btn-logout-desktop"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-2 text-primary"
                  onClick={login}
                  data-ocid="btn-login-sidebar-desktop"
                >
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 flex flex-col">{children}</main>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-5 h-5 rounded bg-primary/20">
            <TrendingUp className="h-3 w-3 text-primary" />
          </div>
          <span className="font-display font-semibold text-foreground">
            MutualFunds
          </span>
          <span>— Investment Insights Platform</span>
        </div>
        <span>
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </span>
      </footer>
    </div>
  );
}
