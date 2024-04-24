// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnFdvA2PixeOhE4kCDvt4Uu25wh4bkXfw",
  authDomain: "graph-latex-generator.firebaseapp.com",
  projectId: "graph-latex-generator",
  storageBucket: "graph-latex-generator.appspot.com",
  messagingSenderId: "163843581862",
  appId: "1:163843581862:web:a8815100ca07a5c4cc5167",
  measurementId: "G-0S9RECX3HX",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const analytics = getAnalytics(app);
