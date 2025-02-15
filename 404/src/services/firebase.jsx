import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  doc, 
  setDoc, 
  getDoc 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVHMNuNbKoYwI6jREmpBP3Q-rGU4E2xzo",
  authDomain: "hack-677b4.firebaseapp.com",
  projectId: "hack-677b4",
  storageBucket: "hack-677b4.firebasestorage.app",
  messagingSenderId: "376643070686",
  appId: "1:376643070686:web:310699c7e3cabec125b04f"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { 
  auth, 
  db, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,  // ✅ Explicitly export this
  collection, 
  getDocs, 
  addDoc, 
  doc, 
  setDoc, 
  getDoc 
};
