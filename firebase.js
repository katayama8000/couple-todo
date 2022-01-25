// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB0Z8-comrotnzyqKK_VEtPUuBB20EFm5Y",
    authDomain: "couple-shopping-e6db6.firebaseapp.com",
    projectId: "couple-shopping-e6db6",
    storageBucket: "couple-shopping-e6db6.appspot.com",
    messagingSenderId: "915436075452",
    appId: "1:915436075452:web:29478c103a5e3678a653b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)