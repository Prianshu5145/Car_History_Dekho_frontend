// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  
 apiKey: "AIzaSyDagUC-lkowI-KJd-GODZcxG-ZgUJDunWA",
  authDomain: "serviceapp-3e94f.firebaseapp.com",
  projectId: "serviceapp-3e94f",
  storageBucket: "serviceapp-3e94f.firebasestorage.app",
  messagingSenderId: "178486349825",
  appId: "1:178486349825:web:cc35773732f55b930e3000",
  measurementId: "G-M6JJQEWC7Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
