
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// =================================================================
// PASTE YOUR FIREBASE CONFIGURATION OBJECT HERE
// =================================================================
// 1. Go to your Firebase project console.
// 2. Click the gear icon > Project settings.
// 3. In the "Your apps" card, select your web app.
// 4. Find the `firebaseConfig` object and copy it here.
// =================================================================
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
