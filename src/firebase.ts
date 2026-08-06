import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAGSmd_9v5YLuOlQN3V2JRQoe3cBBoSC7s",
    authDomain: "guitara-2026.firebaseapp.com",
    projectId: "guitara-2026",
    storageBucket: "guitara-2026.firebasestorage.app",
    messagingSenderId: "783829249750",
    appId: "1:783829249750:web:b97e9ea31938913eece377"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);