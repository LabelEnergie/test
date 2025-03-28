"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { theme } from "@/style/theme";
import { queryClient } from "@/services/base";
import { createContext, useContext, useState, useEffect } from "react";
import { TUser } from "@/types/auth.types";
import { auth } from "@/config/firebase"; // Importez Firebase ou votre service d'authentification

type AppContextType = {
  user: TUser | null;
  logOut: () => Promise<void>;
  setUser: (user: TUser | null) => void; // Ajoutez une fonction pour mettre à jour l'utilisateur
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProviders");
  return context;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<TUser | null>(null);

  // Fonction de déconnexion
  const logOut = async () => {
    await auth.signOut(); // Déconnexion via Firebase
    setUser(null); // Mettre à jour l'état de l'utilisateur
  };

  // Écouter les changements d'état de l'utilisateur
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        // Mettre à jour l'utilisateur dans le contexte
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email || "",
          firstName: firebaseUser.displayName || "", // Utilisez displayName ou une autre propriété Firebase
          lastName: "", // Valeur par défaut si Firebase ne fournit pas cette information
          address: {
            address: "", // Valeur par défaut
            zipCode: "", // Valeur par défaut
            city: "", // Valeur par défaut
          },
          isAdmin: false, // Valeur par défaut
          photo: firebaseUser.photoURL || "", // Utilisez photoURL si disponible
        });
      } else {
        setUser(null); // Aucun utilisateur connecté
      }
    });

    return () => unsubscribe(); // Nettoyer l'écouteur
  }, []);

  return (
    <AppContext.Provider value={{ user, logOut, setUser }}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          {children}
        </ChakraProvider>
      </QueryClientProvider>
    </AppContext.Provider>
  );
}