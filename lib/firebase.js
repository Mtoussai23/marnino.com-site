import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEA6_5hHNzzhNeA3R4FebHn7_Nd4V6Aqw",
  authDomain: "marnino-stories-f3502.firebaseapp.com",
  projectId: "marnino-stories-f3502",
  storageBucket: "marnino-stories-f3502.firebasestorage.app",
  messagingSenderId: "819652445982",
  appId: "1:819652445982:web:8f17aeb3f64e4eccd1eb0f"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// ✅ Enable Anonymous Sign-in
signInAnonymously(auth).catch((error) => {
  console.error("Anonymous sign-in failed", error);
});

export { db, auth, storage };
