import { initializeApp } from "../../node_modules/firebase/app";
import { getAnalytics } from "../../node_modules/firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyC3XjE_4u8tlqUglGbHBYmm6J_LB-G5Pog",
    authDomain: "wompwomp-1.firebaseapp.com",
    projectId: "wompwomp-1",
    storageBucket: "wompwomp-1.appspot.com",
    messagingSenderId: "775847038422",
    appId: "1:775847038422:web:1aa21943d5306e43ac2877",
    measurementId: "G-C2W7EDPWPJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
