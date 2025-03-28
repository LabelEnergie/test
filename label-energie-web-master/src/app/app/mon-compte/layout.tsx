"use client";

import { Box, Flex } from "@chakra-ui/react";
import AppHeader from "./AppHeader";
import { useMe } from "@/services/auth.services";
import AppHeaderMobile from "./AppHeaderMobile";
import LoadingPage from "@/components/shared/LoadingPage";
import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/config/firebase";
import { User } from "firebase/auth";  // Add this import

const BASIC_ROUTES = [
  {
    name: "Mes informations",
    href: "/app/mon-compte/mes-informations",
  },
  {
    name: "Mes dossiers",
    href: "/app/mon-compte/mes-dossiers",
  },
];

const ADMIN_ROUTES = [
  {
    name: "Blog",
    href: "/app/mon-compte/admin/articles",
  },
  {
    name: "Dossiers",
    href: "/app/mon-compte/admin/dossiers",
  },
];

interface AuthState {
  isReady: boolean;
  firebaseUser: User | null;
  error: Error | null;
}

export default function RootApp({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data: user, isLoading: userLoading } = useMe();
  const router = useRouter();
  const pathname = usePathname();
  const hasRedirected = useRef(false);
  const [authState, setAuthState] = useState<AuthState>({
    isReady: false,
    firebaseUser: null,
    error: null
  });

  useEffect(() => {
    console.log('Démarrage de la surveillance auth Firebase');
    let mounted = true;

    const unsubscribe = auth.onAuthStateChanged(
      async (firebaseUser) => {
        if (!mounted) return;
        
        console.log('État Firebase détaillé:', {
          connecté: !!firebaseUser,
          uid: firebaseUser?.uid,
          token: firebaseUser ? await firebaseUser.getIdToken() : null,
          timestamp: new Date().toISOString()
        });
        
        if (firebaseUser) {
          try {
            await firebaseUser.getIdToken(true); // Force le rafraîchissement du token
          } catch (error) {
            console.error('Erreur de rafraîchissement du token:', error);
          }
        }

        setAuthState({
          isReady: true,
          firebaseUser,
          error: null
        });
      },
      (error: Error) => {
        if (!mounted) return;
        console.error('Erreur détaillée Firebase Auth:', {
          message: error.message,
          code: error instanceof Error ? error.name : 'UnknownError',
          timestamp: new Date().toISOString()
        });
        setAuthState({
          isReady: true,
          firebaseUser: null,
          error
        });
      }
    );

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!authState.isReady) return;
    
    if (!authState.firebaseUser && !hasRedirected.current) {
      hasRedirected.current = true;
      console.log('Redirection vers connexion - utilisateur non authentifié');
      router.replace("/app/connexion");
      return;
    }

    // Attendre que les données utilisateur soient chargées
    if (userLoading || !user) return;

    console.log('Vérification des permissions:', {
      estAdmin: user.isAdmin,
      chemin: pathname,
      uid: authState.firebaseUser?.uid
    });
    
    if (pathname.includes("/admin") && !user.isAdmin) {
      router.replace(BASIC_ROUTES[0].href);
    } else if (!pathname.includes("/admin") && user.isAdmin) {
      router.replace(ADMIN_ROUTES[0].href);
    }
  }, [authState.isReady, authState.firebaseUser, user, userLoading, pathname]);

  // Show loading states
  if (!authState.isReady || userLoading) {
    return <LoadingPage h="100vh">Initialisation de l'application...</LoadingPage>;
  }

  if (!authState.firebaseUser || !user) {
    return <LoadingPage h="100vh">Vérification des accès...</LoadingPage>;
  }

  return (
    <Flex h={{ md: "100vh" }} flexDir={{ base: "column", md: "row" }}>
      <AppHeader display={{ base: "none", md: "flex" }} w="300px" />
      <AppHeaderMobile display={{ base: "flex", md: "none" }} />
      <Box w="full" maxH="100vh" overflowY={{ md: "auto" }}>
        {children}
      </Box>
    </Flex>
  );
}