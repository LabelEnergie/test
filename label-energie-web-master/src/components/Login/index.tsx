"use client";

import UnLoggedClientContainer from "../shared/UnLoggedClientContainer";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <UnLoggedClientContainer
      title="Suivez vos projets sur votre espace client"
      cardTitle="Identifiant"
      displaySignUp={true}
    >
      <LoginForm />
    </UnLoggedClientContainer>
  );
}
