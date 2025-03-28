import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { simulatorKeys, folderKeys } from "./keys.service";
import { TSimulatorTree, TSimulatorResult } from "@/types/simulator.types";
import { api } from "./base";
import { auth, db } from "@/config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { FolderType } from "@/types/folder.type";
import { useRouter } from "next/navigation"; // Ajout de l'import

export function useSimulatorTree() {
  return useQuery<TSimulatorTree[]>({
    queryKey: simulatorKeys.tree(),
    queryFn: async () => {
      try {
        const token = await auth.currentUser?.getIdToken();
        const { data } = await api.get("/api/simulator/tree", {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        return data;
      } catch (error) {
        console.error("Failed to fetch simulator tree:", error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2
  });
}

const operationLock = new Set<string>();

export function useCreateSimulation() {
  const queryClient = useQueryClient();
  const router = useRouter(); // Ajout du router

  return useMutation({
    mutationFn: async (body: { simulation: TSimulatorResult[] }) => {
      const opId = Date.now().toString();
      if (operationLock.size > 0) {
        throw new Error("Une opération est déjà en cours");
      }
      operationLock.add(opId);

      try {
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");

        const currentDate = new Date();
        const folderData = {
          name: `Simulation ${currentDate.toLocaleDateString('fr-FR')}`,
          userId: user.uid,
          status: {
            id: FolderType.Pending,
            label: "En attente",
            color: "#FFA500",
          },
          products: body.simulation.map(item => ({
            id: item.id,
            type: item.type,
            value: Array.isArray(item.value) ? item.value : [item.value]
          })),
          documents: [],
          date: currentDate,
          createdAt: currentDate.toISOString(),
          updatedAt: currentDate.toISOString()
        };

        const docRef = await addDoc(collection(db, "folders"), folderData);
        return docRef.id;
      } finally {
        operationLock.delete(opId);
      }
    },
    onSuccess: (folderId) => {
      queryClient.invalidateQueries({ 
        queryKey: folderKeys.list(),
        exact: true
      });
      console.log("Dossier créé avec succès:", folderId);
      router.push('/app/mon-compte/mes-dossiers'); // Ajout de la redirection
    },
    onError: (error) => {
      console.error("Erreur création simulation:", error);
    }
  });
}