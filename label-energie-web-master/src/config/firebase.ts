import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB9PkzSl5-_JmInPmmaV_ac3q9EsVBjZBs",
  authDomain: "site-web-47468.firebaseapp.com",
  projectId: "site-web-47468",
  storageBucket: "site-web-47468.firebasestorage.app",
  messagingSenderId: "962447562499",
  appId: "1:962447562499:web:8af31e4167500c33cb7b36",
  measurementId: "G-GR4LT0H7DT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Configure auth persistence
setPersistence(auth, browserLocalPersistence);

// Initialize Firestore
const db = getFirestore(app);
const storage = getStorage(app);  // Initialize storage

export { auth, db, storage };
