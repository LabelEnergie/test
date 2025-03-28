import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { articleKeys } from "./keys.service";
import { db } from "@/config/firebase";
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { TArticle, TArticleBody, TMiniArticle } from "@/types/article.type";
import { useToast } from "@chakra-ui/react";

export function useArticles() {
  return useQuery({
    queryKey: articleKeys.list(),
    queryFn: async () => await getArticles(),
  });
}

export async function getArticles(): Promise<TMiniArticle[]> {
  const querySnapshot = await getDocs(collection(db, 'articles'));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as TMiniArticle[];
}

export async function getArticle(code: string): Promise<TArticle | null> {
  const articlesRef = collection(db, 'articles');
  const q = query(articlesRef, where("code", "==", code));
  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.empty) {
    return null;
  }
  
  const doc = querySnapshot.docs[0];
  return { 
    id: doc.id, 
    ...doc.data() 
  } as TArticle;
}

export function useDeleteArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      await deleteDoc(doc(db, 'articles', id));
      return id;
    },
    onSuccess(id) {
      queryClient.setQueryData(
        articleKeys.list(),
        (articles?: TMiniArticle[]) => {
          return articles?.filter((a) => a.id != id) ?? [];
        }
      );
    },
  });
}

export function useCreateArticle() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async (body: TArticleBody) => {
      const docRef = await addDoc(collection(db, 'articles'), body);
      const articles = await getArticles();
      return { data: articles, code: body.code };
    },
    onSuccess({ data, code }) {
      queryClient.setQueryData(articleKeys.list(), data);
      queryClient.invalidateQueries({
        queryKey: articleKeys.detail(code),
      });
    },
    onError(err: any) {
      toast({
        status: "error",
        title: "Erreur lors de la création",
        description: err.message,
        position: "top",
      });
    },
  });
}

export function useArticle(code: string) {
  return useQuery({
    queryKey: articleKeys.detail(code),
    queryFn: async () => {
      const articlesRef = collection(db, 'articles');
      const q = query(articlesRef, where("code", "==", code));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return null;
      }
      
      const doc = querySnapshot.docs[0];
      return { 
        id: doc.id, 
        ...doc.data() 
      } as TArticle;
    }
  });
}

export function useUpdateArticle() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: TArticleBody }) => {
      await updateDoc(doc(db, 'articles', id), body);
      const articles = await getArticles();
      return { data: articles, code: body.code };
    },
    onSuccess({ data, code }) {
      queryClient.setQueryData(articleKeys.list(), data);
      queryClient.invalidateQueries({
        queryKey: articleKeys.detail(code),
      });
    },
    onError(err: any) {
      toast({
        status: "error",
        title: "Erreur lors de la mise à jour",
        description: err.message,
        position: "top",
      });
    },
  });
}
