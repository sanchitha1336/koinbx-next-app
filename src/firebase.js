
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZRUVUDavstqecjB6eZ1HcX73U4TMJn7E",
  authDomain: "koinbx-nextjs.firebaseapp.com",
  databaseURL: "https://koinbx-nextjs-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "koinbx-nextjs",
  storageBucket: "koinbx-nextjs.appspot.com",
  messagingSenderId: "1066119215887",
  appId: "1:1066119215887:web:1999d258c3bc70e6cc5c7a",
  measurementId: "G-5QNJG380L1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;