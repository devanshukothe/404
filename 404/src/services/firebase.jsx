import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { getStorage } from "firebase/storage"; // ✅ Import Firebase Storage

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
  apiKey: "AIzaSyBn8JlnAbadRLipYTQLSc4TdcMaS9IBQVo",
  authDomain: "roomlo-bbf77.firebaseapp.com",
  databaseURL: "https://roomlo-bbf77-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "roomlo-bbf77",
  storageBucket: "roomlo-bbf77.appspot.com",
  messagingSenderId: "39261818332",
  appId: "1:39261818332:web:f4000b71128eabf2089319",
  measurementId: "G-GRLCQRRDJ8"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // ✅ Initialize Storage


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
  getDoc,
  storage 
};
