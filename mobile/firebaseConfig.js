import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJtlB28cl6Cdgy83GmBCkb8CUnJiEzIKY",
    authDomain: "new-app-ce704.firebaseapp.com",
    projectId: "new-app-ce704",
    storageBucket: "new-app-ce704.firebasestorage.app",
    messagingSenderId: "480161269157",
    appId: "1:480161269157:web:68a12b38500a49e859144c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Lazy load auth instance
let auth;
function getFirebaseAuth() {
    // auth= getAuth(app);
    if (!auth) {
  
        auth = initializeAuth(app, {
            persistence: getReactNativePersistence(AsyncStorage),
        });

    }

    if (!auth) {
        return null;
    }
    // console.log('Firebase Auth initialized hkwwwwwww',auth);
   
    return auth;
}

export { getFirebaseAuth };
