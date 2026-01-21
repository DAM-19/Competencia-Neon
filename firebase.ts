import { initializeApp } from "firebase/app";
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

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);