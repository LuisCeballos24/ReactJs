import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC7T6BucwR2KpNBXo9pDnfLRX8VbAz8ecE",

  authDomain: "tnandbss.firebaseapp.com",

  projectId: "tnandbss",

  storageBucket: "tnandbss.appspot.com",

  messagingSenderId: "1066383761798",

  appId: "1:1066383761798:web:0af88b4cdd0a3115658c07",

  measurementId: "G-GDHDJSCTHS"

};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage(); // Agrega esta línea
// Método para autenticar a los usuarios
export const signInWithEmailAndPassword = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export { auth, db, firebase,storage };