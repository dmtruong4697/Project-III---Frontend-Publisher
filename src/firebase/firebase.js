import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB4dr4mAEVMbTFN99YADus01bjluJKXUAU",
  authDomain: "project-iii-4a905.firebaseapp.com",
  projectId: "project-iii-4a905",
  storageBucket: "project-iii-4a905.appspot.com",
  messagingSenderId: "70852556244",
  appId: "1:70852556244:web:188b89a5f88d5ffbc25241",
  measurementId: "G-53W95V28GH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage(app);

export {app,  storage}