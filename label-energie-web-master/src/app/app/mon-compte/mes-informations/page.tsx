"use client";

import Home from "@/components/Home";
import { useMe } from "@/services/auth.services";
import LoadingPage from "@/components/shared/LoadingPage";
import { auth } from "@/config/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { data: user, isLoading } = useMe();
  const router = useRouter();
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthReady(true); // L'utilisateur est connecté
      } else {
        setIsAuthReady(false); // Aucun utilisateur connecté
      }
    });

    return () => unsubscribe(); // Nettoyer l'écouteur
  }, []);

  useEffect(() => {
    if (!isAuthReady || isLoading) return; // Attendre que l'authentification soit prête

    if (!user) {
      console.log("Page: Aucun utilisateur trouvé, redirection vers connexion");
      router.replace("/app/connexion");
    }
  }, [user, isLoading, router, isAuthReady]);

  if (!isAuthReady || isLoading) {
    return <LoadingPage h="100vh">Chargement du compte...</LoadingPage>;
  }

  if (!user) {
    return <LoadingPage h="100vh">Vérification de l'authentification...</LoadingPage>;
  }

  return <Home user={user} />;
}