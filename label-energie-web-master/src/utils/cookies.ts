"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";

// Client-side authentication check for protected routes
export function useLoggedRoute() {
  const router = useRouter();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/app/connexion");
      }
    });
    
    return () => unsubscribe();
  }, [router]);
}

// Client-side authentication check for public routes (login, signup)
export function usePublicRoute() {
  const router = useRouter();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/app/mon-compte/mes-informations");
      }
    });
    
    return () => unsubscribe();
  }, [router]);
}

// For backward compatibility - these will be deprecated
export function loggedRoute() {
  console.warn("loggedRoute() is deprecated. Use useLoggedRoute() hook instead.");
}

export function publicRoute() {
  console.warn("publicRoute() is deprecated. Use usePublicRoute() hook instead.");
}
