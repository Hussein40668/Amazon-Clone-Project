// Import the functions you need from Firebase v11+
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // import manually
import { getFirestore } from "firebase/firestore"; // import manually
import {dotenv} from "dotenv";
dotenv.config()  // initialize

// My Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth setup
export const auth = getAuth(app); 

// Initialize Firestore
const db = getFirestore(app);

export { db };

export default app;
