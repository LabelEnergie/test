'use client';

import ForgotPassword from "@/components/ForgotPassword";
import { publicRoute } from "@/utils/cookies";

export default function ForgotPasswordPage() {
  publicRoute();

  return <ForgotPassword />;
}
