import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDySz-lybD2WscZ1efpcPvj5icutsgUWCA",
  authDomain: "study-tracker-c6887.firebaseapp.com",
  projectId: "study-tracker-c6887",
  storageBucket: "study-tracker-c6887.firebasestorage.app",
  messagingSenderId: "125468198204",
  appId: "1:125468198204:web:40cda932c906e7c3064a39"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
