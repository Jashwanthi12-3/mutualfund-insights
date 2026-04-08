import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";

export interface UseAuthReturn {
  isAuthenticated: boolean;
  principal: Principal | null;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
}

export function useAuth(): UseAuthReturn {
  const {
    identity,
    login,
    clear,
    isLoginSuccess,
    isLoggingIn,
    isInitializing,
  } = useInternetIdentity();

  const isLoading = isLoggingIn || isInitializing;
  const isAuthenticated = isLoginSuccess && identity != null;
  const principal = isAuthenticated ? identity!.getPrincipal() : null;

  return {
    isAuthenticated,
    principal,
    login,
    logout: clear,
    isLoading,
  };
}
