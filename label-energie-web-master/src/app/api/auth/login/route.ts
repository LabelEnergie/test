import { auth } from "@/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();

  if (body?.email && body?.password) {
    try {
      // Authentification avec Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        body.email,
        body.password
      );

      // Récupération du token Firebase
      const token = await userCredential.user.getIdToken();

      // Configuration du cookie
      cookies().set({
        name: "token",
        value: token,
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 1 semaine
        // secure: true,
      });

      return new Response(JSON.stringify({ token }), { status: 200 });
    } catch (err: any) {
      console.error(err);
      const errorCode = err.code;
      const errorMessage = err.message;
      
      // Gestion des erreurs Firebase
      const status = errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password' 
        ? 401 
        : 500;

      return new Response(
        JSON.stringify({ message: errorMessage }), 
        { status }
      );
    }
  }
}
