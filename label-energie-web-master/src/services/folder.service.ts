import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { folderKeys } from "./keys.service";
import { FolderDocumentType, FolderType, TFolder } from "@/types/folder.type";
import { db } from "@/config/firebase";
import { collection, doc, getDocs, updateDoc, deleteDoc, addDoc, getDoc } from "firebase/firestore";
import { auth } from "@/config/firebase";
import { query, where } from "firebase/firestore";
import axios from 'axios';  // Add this import

export function useFolders() {
  return useQuery({
    queryKey: folderKeys.list(),
    queryFn: async (): Promise<TFolder[]> => {
      console.log('Fetching folders:', {
        timestamp: new Date().toISOString(),
        userId: auth.currentUser?.uid || 'not authenticated'
      });

      const user = auth.currentUser;
      if (!user) {
        console.error('Authentication error: User not logged in');
        throw new Error('User not authenticated');
      }

      const foldersRef = collection(db, 'folders');
      const q = query(foldersRef, where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      
      console.log('Folders fetched:', {
        count: querySnapshot.size,
        userId: user.uid,
        timestamp: new Date().toISOString()
      });

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TFolder[];
    },
  });
}

export function useChangeFolderStatusAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { status: FolderType; id: string }) => {
      console.log('Updating folder status:', { id, status, timestamp: new Date().toISOString() });
      await updateDoc(doc(db, 'folders', id), { status });
      const folders = await getDocs(collection(db, 'folders'));
      console.log('Status updated successfully:', { id, timestamp: new Date().toISOString() });
      return folders.docs.map(doc => ({ id: doc.id, ...doc.data() })) as TFolder[];
    },
    onSuccess(allFolders) {
      console.log('Cache updated after status change:', { timestamp: new Date().toISOString() });
      queryClient.setQueryData(folderKeys.list(), allFolders);
    },
  });
}

export function useChangeFolderNumMPRAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, numMPR }: { numMPR: string; id: string }) => {
      console.log('Updating MPR number:', { id, numMPR, timestamp: new Date().toISOString() });
      await updateDoc(doc(db, 'folders', id), { numMPR });
      const folders = await getDocs(collection(db, 'folders'));
      console.log('MPR number updated successfully:', { id, timestamp: new Date().toISOString() });
      return folders.docs.map(doc => ({ id: doc.id, ...doc.data() })) as TFolder[];
    },
    onSuccess(allFolders) {
      console.log('Cache updated after MPR change:', { timestamp: new Date().toISOString() });
      queryClient.setQueryData(folderKeys.list(), allFolders);
    },
  });
}

export function useDeleteFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      console.log('Deleting folder:', { id, timestamp: new Date().toISOString() });
      await deleteDoc(doc(db, 'folders', id));
      const folders = await getDocs(collection(db, 'folders'));
      console.log('Folder deleted successfully:', { id, timestamp: new Date().toISOString() });
      return folders.docs.map(doc => ({ id: doc.id, ...doc.data() })) as TFolder[];
    },
    onSuccess(allFolders) {
      console.log('Cache updated after deletion:', { timestamp: new Date().toISOString() });
      queryClient.setQueryData(folderKeys.list(), allFolders);
    },
  });
}

export function useCompleteFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      console.log('Completing folder:', { id, timestamp: new Date().toISOString() });
      await updateDoc(doc(db, 'folders', id), { completed: true });
      const folders = await getDocs(collection(db, 'folders'));
      console.log('Folder completed successfully:', { id, timestamp: new Date().toISOString() });
      return folders.docs.map(doc => ({ id: doc.id, ...doc.data() })) as TFolder[];
    },
    onSuccess(allFolders) {
      console.log('Cache updated after completion:', { timestamp: new Date().toISOString() });
      queryClient.setQueryData(folderKeys.list(), allFolders);
    },
  });
}

export function useAddDocumentsToFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, files }: { id: string; files: { name: string; type: FolderDocumentType }[] }) => {
      console.log('Adding documents to folder:', { 
        id, 
        fileCount: files.length, 
        timestamp: new Date().toISOString() 
      });
      const folderRef = doc(db, 'folders', id);
      await updateDoc(folderRef, { documents: files });
      const folders = await getDocs(collection(db, 'folders'));
      console.log('Documents added successfully:', { id, timestamp: new Date().toISOString() });
      return folders.docs.map(doc => ({ id: doc.id, ...doc.data() })) as TFolder[];
    },
    onSuccess(allFolders) {
      console.log('Cache updated after adding documents:', { timestamp: new Date().toISOString() });
      queryClient.setQueryData(folderKeys.list(), allFolders);
    },
  });
}

// Add this mutation to your existing folder.service.ts
export const useGeneratePdf = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (folderId: string) => {
      const user = auth.currentUser;
      if (!user) throw new Error('Utilisateur non authentifié');

      // Get folder data first to validate
      const folderRef = doc(db, 'folders', folderId);
      const folderDoc = await getDoc(folderRef);
      
      if (!folderDoc.exists()) {
        throw new Error('Dossier introuvable');
      }

      const folderData = folderDoc.data();
      
      // Get simulation data
      const simulationId = folderData.simulationId;
      if (!simulationId) {
        throw new Error('ID de simulation manquant');
      }

      // Verify simulation exists and get its data
      const simulationRef = doc(db, 'simulations', simulationId);
      const simulationDoc = await getDoc(simulationRef);
      
      if (!simulationDoc.exists()) {
        throw new Error('Simulation introuvable');
      }

      const simulationData = simulationDoc.data();
      console.log('[PDF Generation] Données complètes:', {
        folderId,
        simulationId,
        simulationData,
        folderData,
        timestamp: new Date().toISOString()
      });

      // Validate simulation data
      if (!simulationData.products || !Array.isArray(simulationData.products)) {
        throw new Error('Données de simulation invalides');
      }

      const token = await user.getIdToken(true);
      
      try {
        const response = await axios.post<{ pdfUrl: string }>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/folders/${folderId}/generate-pdf`,
          {
            simulationId,
            simulationData // Send complete simulation data
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            timeout: 180000
          }
        );

        if (!response.data?.pdfUrl) {
          throw new Error('URL du PDF manquante dans la réponse');
        }

        // Update folder with PDF URL
        await updateDoc(folderRef, {
          pdfUrl: response.data.pdfUrl,
          updatedAt: new Date().toISOString()
        });

        return response.data.pdfUrl;
      } catch (error: any) {
        console.error('[PDF Generation] Detailed error:', {
          folderId,
          error: error.response?.data || error.message,
          status: error.response?.status,
          stack: error.stack
        });
        throw new Error(
          error.response?.data?.message || 
          'Erreur lors de la génération du PDF. Veuillez réessayer.'
        );
      }
    }
  });
};
