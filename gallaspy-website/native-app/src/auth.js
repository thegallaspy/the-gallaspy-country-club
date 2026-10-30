import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error("Public Supabase configuration is missing.");
}

const preferences = window.Capacitor?.Plugins?.Preferences;

if (!preferences) {
  throw new Error("Capacitor Preferences is required for native authentication.");
}

const nativeStorage = {
  async getItem(key) {
    const result = await preferences.get({ key });
    return result.value;
  },
  async setItem(key, value) {
    await preferences.set({ key, value });
  },
  async removeItem(key) {
    await preferences.remove({ key });
  },
};

export const supabase = createClient(url, anonKey, {
  auth: {
    flowType: "pkce",
    detectSessionInUrl: false,
    autoRefreshToken: true,
    persistSession: true,
    storage: nativeStorage,
    storageKey: "gallaspy-native-auth-v1",
  },
});

window.gallaspyAuth = {
  async signIn(email) {
    return supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        emailRedirectTo:
          "com.thegallaspy.app://auth/callback",
        shouldCreateUser: true,
      },
    });
  },

  async verifyEmailCode(email, token) {
    return supabase.auth.verifyOtp({
      email: email.trim().toLowerCase(),
      token: token.trim(),
      type: "email",
    });
  },

  async exchangeCode(code) {
    return supabase.auth.exchangeCodeForSession(code);
  },

  async getUser() {
    return supabase.auth.getUser();
  },

  async getCheckoutAccessToken() {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      throw new Error("Unable to verify your Gallaspy session.");
    }

    return data?.session?.access_token || null;
  },

  async foursomeRequest(path = "", method = "GET", body) {
    const { data, error } = await supabase.auth.getSession();

    if (error || !data?.session?.access_token) {
      throw new Error("Please sign in to your Gallaspy account.");
    }

    const response = await fetch(
      "https://thegallaspy.com/api/mobile/foursomes" + path,
      {
        method,
        headers: {
          Authorization: "Bearer " + data.session.access_token,
          ...(body === undefined
            ? {}
            : { "Content-Type": "application/json" }),
        },
        ...(body === undefined ? {} : { body: JSON.stringify(body) }),
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || "Unable to load foursomes.");
    }

    return result;
  },

  async getAdminAccess() {
    const { data, error } = await supabase.auth.getSession();

    if (error || !data?.session?.access_token) {
      throw new Error("Please sign in to your Gallaspy account.");
    }

    const response = await fetch(
      "https://thegallaspy.com/api/mobile/admin/access",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + data.session.access_token,
        },
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok || result.success !== true) {
      throw new Error(
        result.error || "Unable to check administrator access."
      );
    }

    return result;
  },

  async verifyOfficialRound(eventId, playerId, isHost) {
    const { data, error } = await supabase.auth.getSession();

    if (error || !data?.session?.access_token) {
      throw new Error("Please sign in to verify a Gallaspy Round.");
    }

    const response = await fetch(
      "https://thegallaspy.com/api/mobile/admin/rounds/verify",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + data.session.access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_id: eventId,
          player_id: playerId,
          is_host: isHost,
        }),
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok || result.success !== true) {
      throw new Error(
        result.error || "Unable to verify this Gallaspy Round."
      );
    }

    return result;
  },

  async getClubPoints() {
    const { data, error } = await supabase.auth.getSession();

    if (error || !data?.session?.access_token) {
      throw new Error("Please sign in to view your Club Points.");
    }

    const response = await fetch(
      "https://thegallaspy.com/api/mobile/club-points",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + data.session.access_token,
        },
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok || result.success !== true) {
      throw new Error(
        result.error || "Unable to load Club Points."
      );
    }

    return result;
  },

  async getMembership() {
    const { data, error } = await supabase.auth.getSession();

    if (error || !data?.session?.access_token) {
      throw new Error("Please sign in to view your membership.");
    }

    const response = await fetch(
      "https://thegallaspy.com/api/mobile/membership",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + data.session.access_token,
        },
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok || result.success !== true) {
      throw new Error(
        result.error || "Unable to load membership."
      );
    }

    return result;
  },

  async getPlayer() {
    const { data, error } = await supabase.auth.getSession();

    if (error || !data?.session?.access_token) {
      throw new Error("Authentication required.");
    }

    const response = await fetch(
      "https://thegallaspy.com/api/mobile/player",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + data.session.access_token,
        },
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || "Unable to load player.");
    }

    return result;
  },

  async aiCaddieRequest(shot) {
    const { data, error } = await supabase.auth.getSession();

    if (error || !data?.session?.access_token) {
      throw new Error("Please sign in to your Gallaspy account.");
    }

    const response = await fetch(
      "https://thegallaspy.com/api/mobile/ai-caddie",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + data.session.access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shot),
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok || result.success !== true) {
      throw new Error(
        result.error || "Unable to reach AI Caddie."
      );
    }

    return result;
  },

  async signOut() {
    return supabase.auth.signOut();
  },
};
