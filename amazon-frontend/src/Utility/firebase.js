// Import the functions you need from Firebase v11+
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // import manually
import { getFirestore } from "firebase/firestore"; // import manually

// My Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-FHeaO6396ukp2quuZwFyNHzXEjn8oGk",
  authDomain: "clone-e0507.firebaseapp.com",
  projectId: "clone-e0507",
  storageBucket: "clone-e0507.appspot.com",
  messagingSenderId: "655021594831",
  appId: "1:655021594831:web:9864b1654b6400aedbbfba",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth setup
export const auth = getAuth(app); 

// Initialize Firestore
const db = getFirestore(app);

export { db };

export default app;
