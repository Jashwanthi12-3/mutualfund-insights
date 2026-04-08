import { useActor } from "@caffeineai/core-infrastructure";
import { createActor } from "../backend";
import type { Backend } from "../backend";

export interface UseBackendReturn {
  actor: Backend | null;
  isFetching: boolean;
}

export function useBackend(): UseBackendReturn {
  const { actor, isFetching } = useActor(createActor);
  return {
    actor: actor as Backend | null,
    isFetching,
  };
}
