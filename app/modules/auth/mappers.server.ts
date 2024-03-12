import type { AuthSession } from "server/session";
import type { SupabaseAuthSession } from "~/integrations/supabase";

import type { ErrorLabel } from "~/utils/error";
import { ShelfError } from "~/utils/error";

const label: ErrorLabel = "Auth";

export async function mapAuthSession(
  supabaseAuthSession: SupabaseAuthSession
): Promise<AuthSession> {
  if (!supabaseAuthSession.user.email) {
    throw new ShelfError({
      cause: null,
      message: "User should have an email",
      additionalData: {
        userId: supabaseAuthSession.user.id,
      },
      label,
    });
  }

  return {
    accessToken: supabaseAuthSession.access_token,
    refreshToken: supabaseAuthSession.refresh_token,
    userId: supabaseAuthSession.user.id,
    email: supabaseAuthSession.user.email,
    expiresIn: supabaseAuthSession.expires_in ?? -1,
    expiresAt: supabaseAuthSession.expires_at ?? -1,
  };
}
