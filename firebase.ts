
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuiqsOS2jdGhP5MxGyrLVjie8xODVSusg",
  authDomain: "web-neocore.firebaseapp.com",
  projectId: "web-neocore",
  storageBucket: "web-neocore.appspot.com",
  messagingSenderId: "950888954615",
  appId: "1:950888954615:web:120b5abcfec7fe40dff12",
};

// Inicialización controlada de Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Inicialización de servicios con la instancia única de la app
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, app };
