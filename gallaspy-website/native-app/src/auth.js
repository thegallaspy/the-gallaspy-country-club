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

  async exchangeCode(code) {
    return supabase.auth.exchangeCodeForSession(code);
  },

  async getUser() {
    return supabase.auth.getUser();
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

  async signOut() {
    return supabase.auth.signOut();
  },
};
