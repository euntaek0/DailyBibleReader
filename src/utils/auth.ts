import type { SupabaseAuthSession } from "../stores/authStore.ts";

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL ?? "").trim().replace(/\/+$/, "");
const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? "").trim();

const AUTH_BASE_URL = SUPABASE_URL ? `${SUPABASE_URL}/auth/v1` : "";

function requireAuthConfig(): void {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Supabase env is missing (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY)");
  }
}

function baseHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  };
}

function toErrorMessage(payload: unknown, fallback: string): string {
  if (!payload || typeof payload !== "object") {
    return fallback;
  }

  const obj = payload as Record<string, unknown>;
  const message =
    obj.error_description ??
    obj.msg ??
    obj.message ??
    obj.error;

  return typeof message === "string" && message.trim() ? message : fallback;
}

export async function signInWithPassword(email: string, password: string): Promise<SupabaseAuthSession> {
  requireAuthConfig();

  const response = await fetch(`${AUTH_BASE_URL}/token?grant_type=password`, {
    method: "POST",
    headers: baseHeaders(),
    body: JSON.stringify({ email, password }),
  });

  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(toErrorMessage(payload, `Sign-in failed (${response.status})`));
  }

  return payload as SupabaseAuthSession;
}

export async function refreshSession(refreshToken: string): Promise<SupabaseAuthSession> {
  requireAuthConfig();

  const response = await fetch(`${AUTH_BASE_URL}/token?grant_type=refresh_token`, {
    method: "POST",
    headers: baseHeaders(),
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(toErrorMessage(payload, `Refresh failed (${response.status})`));
  }

  return payload as SupabaseAuthSession;
}

