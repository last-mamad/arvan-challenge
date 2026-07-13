import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { AuthUser, LoginResponse, RefreshResponse } from "@/lib/api/auth/interfaces";
import { deleteCookie, setCookie } from "@/lib/utils/cookies";

const AUTH_COOKIE_NAME = "auth-token";

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  justAuthenticated: boolean;
  setAuth: (auth: LoginResponse) => void;
  setTokens: (tokens: RefreshResponse) => void;
  clearAuth: () => void;
  consumeJustAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      justAuthenticated: false,
      setAuth: ({ accessToken, refreshToken, ...user }) => {
        setCookie(AUTH_COOKIE_NAME, accessToken);
        set({ user, accessToken, refreshToken, justAuthenticated: true });
      },
      setTokens: ({ accessToken, refreshToken }) => {
        setCookie(AUTH_COOKIE_NAME, accessToken);
        set({ accessToken, refreshToken });
      },
      clearAuth: () => {
        deleteCookie(AUTH_COOKIE_NAME);
        set({ user: null, accessToken: null, refreshToken: null, justAuthenticated: false });
      },
      consumeJustAuthenticated: () => {
        const wasJustAuthenticated = get().justAuthenticated;
        if (wasJustAuthenticated) {
          set({ justAuthenticated: false });
        }
        return wasJustAuthenticated;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    },
  ),
);
