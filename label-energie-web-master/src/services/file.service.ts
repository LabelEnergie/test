import { storage } from "@/config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadFiles(
  files: File[],
  options?: { blogArticleCode?: string }
): Promise<string[]> {
  if (files.length == 0) return [];

  try {
    const uploadPromises = files.map(async (file, i) => {
      const path = options?.blogArticleCode 
        ? `articles/${options.blogArticleCode}/${file.name}`
        : `uploads/${file.name}`;
      
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      return await getDownloadURL(snapshot.ref);
    });

    return await Promise.all(uploadPromises);
  } catch (err) {
    console.error(err);
    return [];
  }
}
