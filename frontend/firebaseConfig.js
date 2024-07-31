// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCNSlxdlj3GpvjOfBCVEnXTjOYRtTojiI",
  authDomain: "incident-report-app-4f2df.firebaseapp.com",
  projectId: "incident-report-app-4f2df",
  storageBucket: "incident-report-app-4f2df.appspot.com",
  messagingSenderId: "414346206094",
  appId: "1:414346206094:web:c73a05b64ca3eb4ec5a2df",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

// this is the reference to the users collection
export const usersRef = collection(db, "users");
export const roomsRef = collection(db, "rooms");
