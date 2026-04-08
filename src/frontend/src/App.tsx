import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { UserRole } from "./types";

// Lazy page imports
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LearnPage = lazy(() => import("./pages/LearnPage"));
const LearnDetailPage = lazy(() => import("./pages/LearnDetailPage"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminUsersPage = lazy(() => import("./pages/AdminUsersPage"));
const AdminFundsPage = lazy(() => import("./pages/AdminFundsPage"));
const InvestorDashboard = lazy(() => import("./pages/InvestorDashboard"));
const FundBrowserPage = lazy(() => import("./pages/FundBrowserPage"));
const FundDetailPage = lazy(() => import("./pages/FundDetailPage"));
const FundComparisonPage = lazy(() => import("./pages/FundComparisonPage"));
const CalculatorPage = lazy(() => import("./pages/CalculatorPage"));

// Role-specific dashboard pages
const AdvisorDashboard = lazy(() => import("./pages/AdvisorDashboard"));
const AnalystDashboard = lazy(() => import("./pages/AnalystDashboard"));

// Placeholder pages for routes not yet implemented in this wave

const PageLoader = () => (
  <div className="flex-1 p-8 space-y-4">
    <Skeleton className="h-8 w-64" />
    <Skeleton className="h-4 w-96" />
    <div className="grid grid-cols-3 gap-4 mt-6">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-32 rounded-lg" />
      ))}
    </div>
  </div>
);

// Root layout
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
      <Toaster richColors position="top-right" />
    </Layout>
  ),
});

// Public routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Navigate to="/funds" />,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});

// Protected routes
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <ProtectedRoute roles={[UserRole.Investor]}>
      <InvestorDashboard />
    </ProtectedRoute>
  ),
});

const fundsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/funds",
  component: FundBrowserPage,
});

const fundDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/funds/$id",
  component: FundDetailPage,
});

const compareRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/compare",
  component: () => (
    <ProtectedRoute roles={[UserRole.Investor, UserRole.Admin]}>
      <FundComparisonPage />
    </ProtectedRoute>
  ),
});

const calculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator",
  component: () => (
    <ProtectedRoute roles={[UserRole.Investor, UserRole.Admin]}>
      <CalculatorPage />
    </ProtectedRoute>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <ProtectedRoute roles={[UserRole.Admin]}>
      <AdminDashboard />
    </ProtectedRoute>
  ),
});

const adminUsersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/users",
  component: () => (
    <ProtectedRoute roles={[UserRole.Admin]}>
      <AdminUsersPage />
    </ProtectedRoute>
  ),
});

const adminFundsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/funds",
  component: () => (
    <ProtectedRoute roles={[UserRole.Admin]}>
      <AdminFundsPage />
    </ProtectedRoute>
  ),
});

const advisorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/advisor",
  component: () => (
    <ProtectedRoute roles={[UserRole.FinancialAdvisor, UserRole.Admin]}>
      <AdvisorDashboard />
    </ProtectedRoute>
  ),
});

const analystRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/analyst",
  component: () => (
    <ProtectedRoute roles={[UserRole.DataAnalyst, UserRole.Admin]}>
      <AnalystDashboard />
    </ProtectedRoute>
  ),
});

const learnRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/learn",
  component: LearnPage,
});

const learnDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/learn/$id",
  component: LearnDetailPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  dashboardRoute,
  fundsRoute,
  fundDetailRoute,
  compareRoute,
  calculatorRoute,
  adminRoute,
  adminUsersRoute,
  adminFundsRoute,
  advisorRoute,
  analystRoute,
  learnRoute,
  learnDetailRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
