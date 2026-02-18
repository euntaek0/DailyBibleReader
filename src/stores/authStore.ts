import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type AuthUser = {
  id: string;
  email?: string | null;
};

export type SupabaseAuthSession = {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
  expires_at?: number;
  user?: { id: string; email?: string | null } | null;
};

function resolveExpiresAtSeconds(session: SupabaseAuthSession): number | null {
  if (typeof session.expires_at === "number" && Number.isFinite(session.expires_at)) {
    return session.expires_at;
  }

  if (typeof session.expires_in === "number" && Number.isFinite(session.expires_in)) {
    return Math.floor(Date.now() / 1000) + session.expires_in;
  }

  return null;
}

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null; // unix seconds
  user: AuthUser | null;
  setSession: (session: SupabaseAuthSession) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      expiresAt: null,
      user: null,
      setSession: (session) => {
        set(() => ({
          accessToken: session.access_token ?? null,
          refreshToken: session.refresh_token ?? null,
          expiresAt: resolveExpiresAtSeconds(session),
          user: session.user ? { id: session.user.id, email: session.user.email } : null,
        }));
      },
      clearSession: () => {
        set(() => ({
          accessToken: null,
          refreshToken: null,
          expiresAt: null,
          user: null,
        }));
      },
    }),
    {
      name: "daily-bible-reader-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        expiresAt: state.expiresAt,
        user: state.user,
      }),
    }
  )
);

