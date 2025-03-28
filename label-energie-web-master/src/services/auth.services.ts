'use client';

import { useQuery } from "@tanstack/react-query";
import { auth, db } from "@/config/firebase";
import { authKeys } from "./keys.service";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { TUser, TUpdateUserBody } from "@/types/auth.types";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { TSignUpBody } from "@/types/auth.types";
import { sendPasswordResetEmail, confirmPasswordReset } from "firebase/auth";

// Configuration des logs
const isDev = process.env.NODE_ENV === "development";
export function getSession() {
  return auth.currentUser;
}
function log(message: string, ...args: any[]) {
  if (isDev) {
    console.log(message, ...args);
  }
}

function logError(message: string, ...args: any[]) {
  if (isDev) {
    console.error(message, ...args);
  }
}

// Écouteur global d'authentification
let globalAuthListener: (() => void) | null = null;
let currentAuthUser: User | null = null;
const authStateListeners = new Set<(user: User | null) => void>();

/**
 * Met à jour les informations de l'utilisateur dans Firestore.
 */
export async function updateUser(data: TUpdateUserBody) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Aucun utilisateur connecté");
  }

  // Mettre à jour le document utilisateur dans Firestore
  const userDocRef = doc(db, "users", user.uid);
  await updateDoc(userDocRef, {
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    address: {
      address: data.address.address,
      address2: data.address.address2 || "",
      city: data.address.city,
      zipCode: data.address.zipCode,
    },
  });

  // Retourner les nouvelles données utilisateur
  const updatedUserDoc = await getDoc(userDocRef);
  return updatedUserDoc.data() as TUser;
}

/**
 * Initialise un écouteur global pour surveiller les changements d'état d'authentification.
 */
function initGlobalAuthListener() {
  if (globalAuthListener) return;

  log("Auth Service: Initialisation de l'écouteur global d'authentification");
  globalAuthListener = onAuthStateChanged(auth, (user) => {
    log(
      "Auth Service: État d'authentification global changé",
      user ? `Utilisateur connecté (UID: ${user.uid})` : "Aucun utilisateur"
    );
    currentAuthUser = user;

    // Notifier tous les écouteurs enregistrés
    authStateListeners.forEach((listener) => listener(user));
  });
}

// Initialiser l'écouteur global
initGlobalAuthListener();

/**
 * Hook pour récupérer les informations de l'utilisateur connecté.
 */
export function useMe() {
  const [authUser, setAuthUser] = useState<User | null>(currentAuthUser);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const localListener = (user: User | null) => {
      setAuthUser(user);
      setIsAuthLoading(false);
    };

    authStateListeners.add(localListener);
    if (currentAuthUser) {
      setAuthUser(currentAuthUser);
      setIsAuthLoading(false);
    }

    return () => {
      authStateListeners.delete(localListener);
    };
  }, []);

  return useQuery({
    queryKey: authKeys.me(),
    queryFn: async () => {
      log(
        "useMe: Exécution de la requête",
        authUser ? `UID: ${authUser.uid}` : "Pas d'utilisateur"
      );

      if (!authUser) {
        log("useMe: Aucun utilisateur authentifié trouvé");
        return null;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", authUser.uid));

        if (!userDoc.exists()) {
          logError("useMe: Document utilisateur non trouvé pour l'utilisateur authentifié");
          throw new Error("Document utilisateur non trouvé");
        }

        log("useMe: Document utilisateur récupéré avec succès");
        return userDoc.data() as TUser;
      } catch (error) {
        logError("useMe: Erreur lors de la récupération du document utilisateur", error);
        throw new Error("Erreur lors de la récupération des données utilisateur");
      }
    },
    enabled: !!authUser && !isAuthLoading,
  });
}
export function useSignUp() {
  return useMutation({
    mutationFn: async (data: TSignUpBody) => {
      const { email, password, firstName, lastName, address } = data;

      // Créer l'utilisateur dans Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Créer le document utilisateur dans Firestore
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        email,
        firstName,
        lastName,
        address,
      });

      // Mettre à jour le profil Firebase Auth (optionnel)
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });

      return user;
    },
    onSuccess: () => {
      console.log("Inscription réussie");
    },
    onError: (error) => {
      console.error("Erreur lors de l'inscription", error);
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: async (email: string) => {
      await sendPasswordResetEmail(auth, email);
    }
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: async ({ code, newPassword }: { code: string; newPassword: string }) => {
      await confirmPasswordReset(auth, code, newPassword);
    }
  });
}
// Remove getSession and updateUser as they're now in auth.server.ts
// Keep the rest of the file the same