import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDBlfr2y4Leu_a8sp043QODSgRMUqJk0zg",
    authDomain: "booksland-6b111.firebaseapp.com",
    projectId: "booksland-6b111",
    storageBucket: "booksland-6b111.appspot.com",
    messagingSenderId: "546030046147",
    appId: "1:546030046147:web:7807c27c32cce128aa8b76",
    measurementId: "G-3BJN9R3C8G"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app