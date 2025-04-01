import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { folderKeys } from "./keys.service";
import { FolderDocumentType, FolderType, TFolder } from "@/types/folder.type";
import { db } from "@/config/firebase";
import { collection, doc, getDocs, updateDoc, deleteDoc, addDoc, getDoc } from "firebase/firestore";
import { auth } from "@/config/firebase"; // Add this import
import { query, where } from "firebase/firestore"; // Add this import

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
// Modification de la fonction de création
const createFolder = async (data: Partial<TFolder>) => {
  const token = await auth.currentUser?.getIdToken(true);
  
  const response = await fetch('/api/folders', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error('Failed to create folder');
  }
  
  return response.json();
};

// Add this new function to download PDF
export async function downloadFolderPdf(folderId: string) {
  try {
    const token = await auth.currentUser?.getIdToken(true);
    
    const folderRef = doc(db, 'folders', folderId);
    const folderSnapshot = await getDoc(folderRef);
    const folderData = folderSnapshot.data();

    if (!folderData) {
      throw new Error('Dossier non trouvé');
    }

    // Rename this response variable to pdfResponse
    const pdfResponse = await fetch(
      `http://localhost:3002/api/folders/${folderId}/pdf`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );

    if (!pdfResponse.ok) {
      throw new Error('Failed to download PDF');
    }

    const blob = await pdfResponse.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `synthese-${folderId}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Error downloading PDF:', error);
    throw error;
  }
}
