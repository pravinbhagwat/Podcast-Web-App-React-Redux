// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtqbEKjxi02dZkKOovfsVtqYrofaaWd7M",
  authDomain: "podcast-app-react-rec-ff52e.firebaseapp.com",
  projectId: "podcast-app-react-rec-ff52e",
  storageBucket: "podcast-app-react-rec-ff52e.appspot.com",
  messagingSenderId: "262386734826",
  appId: "1:262386734826:web:d882863713ec275091a993",
  measurementId: "G-M7NQSXWQ6W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, db, storage };