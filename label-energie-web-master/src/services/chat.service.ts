import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { chatMessageKeys } from "./keys.service";
import { db } from "@/config/firebase";
import { TChatMessageSection } from "@/types/chat.type";
import { collection, query, where, orderBy, getDocs, addDoc, serverTimestamp } from "firebase/firestore";

export const ADMIN_ID = "b572af16-1186-4c52-a8a8-8f86b73e9319";

interface Props {
  userId: string;
}

export function useMessages(options: Props) {
  const receiverId = options.userId;

  return useQuery({
    queryKey: chatMessageKeys.list(receiverId),
    queryFn: async (): Promise<TChatMessageSection[]> => {
      const q = query(
        collection(db, 'messages'),
        where('receiverId', '==', receiverId),
        orderBy('createdAt', 'asc')
      );
      
      const querySnapshot = await getDocs(q);
      const messages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Grouper les messages par section
      return groupMessagesIntoSections(messages);
    },
  });
}

export function useSendMessage(options: Props) {
  const queryClient = useQueryClient();
  const receiverId = options.userId;

  return useMutation({
    mutationFn: async (body: { message: string }) => {
      await addDoc(collection(db, 'messages'), {
        message: body.message,
        receiverId,
        createdAt: serverTimestamp()
      });

      const q = query(
        collection(db, 'messages'),
        where('receiverId', '==', receiverId)
      );
      const querySnapshot = await getDocs(q);
      return groupMessagesIntoSections(
        querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      );
    },
    onSuccess(allMessages) {
      queryClient.setQueryData(chatMessageKeys.list(receiverId), allMessages);
    },
  });
}

function groupMessagesIntoSections(messages: any[]): TChatMessageSection[] {
  // Implémentez la logique de groupement ici
  // Cette fonction dépendra de votre structure de données exacte
  return [];
}
