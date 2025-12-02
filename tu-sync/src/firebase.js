// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZvSbF_ubAnP4vagdXxzEYuS0ZmtZD_pY",
  authDomain: "tasksync-86d22.firebaseapp.com",
  projectId: "tasksync-86d22",
  storageBucket: "tasksync-86d22.firebasestorage.app",
  messagingSenderId: "877612766352",
  appId: "1:877612766352:web:89c89c32ace1bcb0d37415",
  measurementId: "G-R99FJQE8BF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
