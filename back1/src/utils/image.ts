import { TAuth } from 'src/auth/auth.types';
import { ENV } from 'src/constants';
import { FirebaseService } from '../firebase/firebase.service';

export async function getFirebaseStorageUrl(path: string): Promise<string> {
  const firebaseService = new FirebaseService();
  const bucket = firebaseService.storage.bucket();
  const file = bucket.file(path);
  const [url] = await file.getSignedUrl({
    action: 'read',
    expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  });
  return url;
}

export function getStaticFilePath(name: string) {
  return `${ENV().BASE_URL}/files/${name}`;
}

export async function getUserFilePath(auth: TAuth, name?: string) {
  if (!name) return null;
  return await getFirebaseStorageUrl(`users/${auth.id}/${name}`);
}

export async function getBlogFilePath(articleCode: string, fileName: string) {
  return await getFirebaseStorageUrl(`blog/${articleCode}/${fileName}`);
}
