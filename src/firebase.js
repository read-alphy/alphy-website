import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAftNqdmHko_5vQWM4m-p9x2cOH3DQ-AEQ",
    authDomain: "coinwatchlist-54212.firebaseapp.com",
    databaseURL: "https://coinwatchlist-54212-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "coinwatchlist-54212",
    storageBucket: "coinwatchlist-54212.appspot.com",
    messagingSenderId: "1013921194655",
    appId: "1:1013921194655:web:c3f7a391340f040d0138aa",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)

export default app;