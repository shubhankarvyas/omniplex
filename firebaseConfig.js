import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDT3xvrfp1sNcqPn6j8lVPntdQfgKtWxII",
  authDomain: "omniplex-6dfa9.firebaseapp.com",
  projectId: "omniplex-6dfa9",
  storageBucket: "omniplex-6dfa9.firebasestorage.app",
  messagingSenderId: "541855683397",
  appId: "1:541855683397:web:59a8b76b042c8df09fe42c",
  measurementId: "G-J8FFCVE9GD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Initialize Analytics (only in browser environment)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { db, storage, auth, analytics };

export const initializeFirebase = () => {
  return app;
};
