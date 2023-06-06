// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCv1-0bCabaVBMkcMxUFf1QLSRQ1zdpP8E",
  authDomain: "react-journal-app-e0157.firebaseapp.com",
  projectId: "react-journal-app-e0157",
  storageBucket: "react-journal-app-e0157.appspot.com",
  messagingSenderId: "55404006256",
  appId: "1:55404006256:web:ce1b98d85b4f656f6c9db5"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);