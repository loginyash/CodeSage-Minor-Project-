import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace with your Firebase project configuration
const firebaseConfig = {

    apiKey: "AIzaSyDUVFQ5Wqv-yKb4v0tMXyj23pin5S_fBzE",
    authDomain: "codesage-53f84.firebaseapp.com",
    projectId: "codesage-53f84",
    storageBucket: "codesage-53f84.firebasestorage.app",
    messagingSenderId: "1014381497494",
    appId: "1:1014381497494:web:596c283bb7be7a04ec46b7"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
