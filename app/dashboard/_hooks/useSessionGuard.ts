"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import { refreshSession } from "@/lib/api/auth/services";
import { useAuthStore } from "@/lib/store/auth-store";

function useSessionGuard() {
  const router = useRouter();
  const { setTokens, clearAuth } = useAuthStore((state) => state);
  const hasRun = useRef(false);

  const refreshMutation = useMutation({
    mutationFn: refreshSession,
    onSuccess: setTokens,
    onError: () => {
      clearAuth();
      router.replace("/sign-in");
    },
  });

  const { mutate } = refreshMutation;

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const { refreshToken, consumeJustAuthenticated } = useAuthStore.getState();

    if (consumeJustAuthenticated()) {
      return;
    }

    if (!refreshToken) {
      clearAuth();
      router.replace("/sign-in");
      return;
    }

    mutate({ refreshToken });
  }, [mutate, clearAuth, router]);

  return refreshMutation;
}

export { useSessionGuard };
