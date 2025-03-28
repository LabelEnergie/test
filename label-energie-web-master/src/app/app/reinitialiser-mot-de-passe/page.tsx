'use client';

import ResetPassword from "@/components/ForgotPassword/ResetPassword";
import UnLoggedClientContainer from "@/components/shared/UnLoggedClientContainer";
import { publicRoute } from "@/utils/cookies";

export default function ResetPasswordPage() {
  publicRoute();

  return (
    <UnLoggedClientContainer
      title="Modifier votre mot de passe"
      cardTitle="Changer son mot de passe"
    >
      <ResetPassword />
    </UnLoggedClientContainer>
  );
}
