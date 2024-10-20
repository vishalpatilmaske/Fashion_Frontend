// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "fashionflickshop.firebaseapp.com",
  projectId: "fashionflickshop",
  storageBucket: "fashionflickshop.appspot.com",
  messagingSenderId: "650518959868",
  appId: "1:650518959868:web:cbb4fd3630a22029e2a979",
  measurementId: "G-C9RGCDGJMT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
