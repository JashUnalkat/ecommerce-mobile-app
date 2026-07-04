// firebase.js

import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCD5BSXwSFXmLT2W_GcUgM1GGfb_5zfDQw",
  authDomain: "ecommerce-project-a1a64.firebaseapp.com",
  projectId: "ecommerce-project-a1a64",
  storageBucket: "ecommerce-project-a1a64.appspot.com",   // FIXED
  messagingSenderId: "214656419138",
  appId: "1:214656419138:web:e37f9d70cb8ec08750f4db",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Setup Auth with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Firestore
export const db = getFirestore(app);

// Storage
export const storage = getStorage(app);

export default app;
