"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import { refreshSession } from "@/lib/api/auth/services";
import { useAuthStore } from "@/lib/store/auth-store";

// Guards the dashboard: on mount, validates the session and redirects to /login if it's invalid.
function useSessionGuard() {
  const router = useRouter();
  const { setTokens, clearAuth } = useAuthStore((state) => state);
  // Ensures the guard runs only once, even with React StrictMode's double effect invocation.
  const hasRun = useRef(false);

  const refreshMutation = useMutation({
    mutationFn: refreshSession,
    onSuccess: setTokens, // refreshed tokens -> store them
    onError: () => {
      // refresh failed -> the session is dead, so clear it and send the user to login
      clearAuth();
      router.replace("/login");
    },
  });

  const { mutate } = refreshMutation;

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    // Read imperatively (not via subscription) so this runs once without re-triggering the effect.
    const { refreshToken, consumeJustAuthenticated } = useAuthStore.getState();

    // Fresh login: tokens are already valid, so skip the refresh entirely.
    if (consumeJustAuthenticated()) {
      return;
    }

    // No token to refresh with -> not authenticated, bounce to login.
    if (!refreshToken) {
      clearAuth();
      router.replace("/login");
      return;
    }

    // Returning user with a token -> try to refresh the session.
    mutate({ refreshToken });
  }, [mutate, clearAuth, router]);

  return refreshMutation;
}

export { useSessionGuard };
