import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";
import { cookies } from "next/headers";

export async function POST() {
  try {
    // Déconnexion de Firebase
    await signOut(auth);
    
    // Suppression du cookie
    cookies().delete("token");

    return new Response(null, { status: 200 });
  } catch (error) {
    console.error('Logout error:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to logout' }), 
      { status: 500 }
    );
  }
}
