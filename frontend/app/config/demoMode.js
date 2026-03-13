/**
 * Demo mode is controlled only by the EXPO_PUBLIC_DEMO_MODE env variable.
 * See .env.example for how to set it.
 * Restart the dev server (expo start -c) after changing .env so the value is picked up.
 */
export const isDemoMode =
  String(process.env.EXPO_PUBLIC_DEMO_MODE || "").toLowerCase().trim() === "true";
