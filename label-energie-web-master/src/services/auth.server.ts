import { auth, db } from "@/config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { TUser, TUpdateUserBody } from "@/types/auth.types";

export function getSession() {
  return auth.currentUser;
}

export async function updateUser(data: TUpdateUserBody) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Aucun utilisateur connecté");
  }

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

  const updatedUserDoc = await getDoc(userDocRef);
  return updatedUserDoc.data() as TUser;
}