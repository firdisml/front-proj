import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import auth from '@react-native-firebase/auth';
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getStorage, ref } from "firebase/storage";

// Create a root reference

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBQAcaTHJcr5Tnj74A916FSBMLkAZT3hhM",
    authDomain: "tuitionsystem-73703.firebaseapp.com",
    projectId: "tuitionsystem-73703",
    storageBucket: "tuitionsystem-73703.appspot.com",
    messagingSenderId: "263604058497",
    appId: "1:263604058497:web:c3e72aa03393cc98b81080",
    measurementId: "G-R39VPLH0NE"
  };

// Initialize Firebase
const firebase  = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();


export { firebase ,auth ,db,storage};