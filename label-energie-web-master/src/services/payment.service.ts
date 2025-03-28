import { TCreatePaymentBody } from "@/types/payment.type";
import { useMutation } from "@tanstack/react-query";
import { db } from "@/config/firebase";
import { addDoc, collection } from "firebase/firestore";

export function useCreateSubscription() {
  return useMutation({
    mutationFn: async (body: TCreatePaymentBody): Promise<any> => {
      const subscriptionRef = await addDoc(collection(db, 'subscriptions'), {
        ...body,
        status: 'pending',
        createdAt: new Date()
      });
      
      return {
        subscriptionId: subscriptionRef.id,
        status: 'pending'
      };
    },
  });
}
