import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBxg-xNZ63SoBLNOquOZff4JSCG_i39tew",
  authDomain: "proyectoi-tbdii.firebaseapp.com",
  projectId: "proyectoi-tbdii",
  storageBucket: "proyectoi-tbdii.appspot.com",
  messagingSenderId: "977387253347",
  appId: "1:977387253347:web:a7e899ff65df33935e1256",
  measurementId: "G-NL3N5G74BF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db =getFirestore(app);
export {db};
