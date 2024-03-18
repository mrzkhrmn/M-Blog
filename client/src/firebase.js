// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "m-blog-1c79f.firebaseapp.com",
  projectId: "m-blog-1c79f",
  storageBucket: "m-blog-1c79f.appspot.com",
  messagingSenderId: "449271543658",
  appId: "1:449271543658:web:010f3ebf92860bfafdd713",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
