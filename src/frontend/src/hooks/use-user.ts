import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { User } from "../types";
import { useAuth } from "./use-auth";
import { useBackend } from "./use-backend";

export interface UseUserReturn {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export function useUser(): UseUserReturn {
  const { isAuthenticated } = useAuth();
  const { actor, isFetching } = useBackend();
  const queryClient = useQueryClient();

  const query = useQuery<User | null>({
    queryKey: ["callerUser"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUser();
    },
    enabled: isAuthenticated && !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return {
    user: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: () => {
      queryClient.invalidateQueries({ queryKey: ["callerUser"] });
    },
  };
}
