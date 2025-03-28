export const BASE = {
  URL: process.env.NEXT_PUBLIC_API_URL,
  API_FROM_BACK_END_URL: process.env.NEXT_PUBLIC_API_FROM_BACK_END_URL,
  MODE: process.env.NEXT_PUBLIC_MODE as "DEV" | "PROD",
  STRIPE_KEY_TEST: process.env.NEXT_PUBLIC_STRIPE_KEY_TEST ?? "",
  STRIPE_KEY: process.env.NEXT_PUBLIC_STRIPE_KEY ?? "",
};
