"use client";

import UnLoggedClientContainer from "../shared/UnLoggedClientContainer";

import SignUpForm from "./SignUpForm";

export default function SignUp() {
  return (
    <UnLoggedClientContainer
      title="Pas encore de compte ?"
      cardTitle="Créer votre compte en quelques clics"
      canGoBack
    >
      <SignUpForm />
    </UnLoggedClientContainer>
  );
}
