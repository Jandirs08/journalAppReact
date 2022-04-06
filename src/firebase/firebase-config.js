import "firebase/firestore";
import "firebase/auth";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDWxdmCwOEKIPsDZ8tJAz3NPfffFj_ca5E",
  authDomain: "react-app-cursos-1bf0b.firebaseapp.com",
  projectId: "react-app-cursos-1bf0b",
  storageBucket: "react-app-cursos-1bf0b.appspot.com",
  messagingSenderId: "683184873059",
  appId: "1:683184873059:web:51c4bc41c159d8db906256",
  measurementId: "G-ZYMRZWQGN0",
};

// // Initialize Firebase LA BASE DE DATOS
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// // const analytics = getAnalytics(app);

// // grabar informacion y google auth
// // LA REFERENCIA A FIRESTORE
// const googleAuthProvider = new GoogleAuthProvider();

// export { db, googleAuthProvider };
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const googleAuthProvider = new GoogleAuthProvider();

googleAuthProvider.setCustomParameters({
  prompt: "select_account",
});

export { db, googleAuthProvider, signInWithPopup, getAuth };
