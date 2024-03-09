// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth,initializeAuth,getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDfTbdVog6WshjEpUPOGm-SEitaLjuiTlE",
    authDomain: "cropdoc-4e88d.firebaseapp.com",
    projectId: "cropdoc-4e88d",
    storageBucket: "cropdoc-4e88d.appspot.com",
    messagingSenderId: "577393819889",
    appId: "1:577393819889:web:d83a84c0fadbd99de82950",
    measurementId: "G-8RSSCVMFS6"
  };

// Initialize Firebase
const firebase=initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig)
const db = getFirestore(firebase);
const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export {firebase, db, auth}