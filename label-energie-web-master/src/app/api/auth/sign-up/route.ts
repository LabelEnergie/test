import { auth } from "@/config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { cookies } from "next/headers";
import { apiFromServerSideEnd } from "@/services/base";

export async function POST(request: Request) {
  const body = await request.json();

  if (
    body?.email &&
    body?.password &&
    body?.firstName &&
    body?.lastName &&
    body?.address
  ) {
    try {
      // Création du compte Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        body.email,
        body.password
      );

      // Mise à jour du profil
      await updateProfile(userCredential.user, {
        displayName: `${body.firstName} ${body.lastName}`
      });

      // Récupération du token
      const token = await userCredential.user.getIdToken();

      // Envoi des données supplémentaires au backend
      await apiFromServerSideEnd.post('/auth/signup', {
        ...body,
        uid: userCredential.user.uid
      });

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

      return new Response(JSON.stringify({ token }));
    } catch (err: any) {
      console.error('Sign up error:', err);
      const errorCode = err.code;
      const status = errorCode === 'auth/email-already-in-use' ? 409 : 500;
      
      return new Response(
        JSON.stringify({ message: err.message }), 
        { status }
      );
    }
  }
}
