import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
 // Import specific Firebase services you need



const firebaseConfig = {
    apiKey: "AIzaSyAAMPYlr_0pOw9d2vWPjTNNkoCB1AP_ybw",
    authDomain: "gpt-ecommere.firebaseapp.com",
    projectId: "gpt-ecommere",
    storageBucket: "gpt-ecommere.appspot.com",
    messagingSenderId: "478436798668",
    appId: "1:478436798668:web:ca9d90902a99f554479269"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  const db = firebase.firestore(); // Initialize Firestore instance
  
  export { firebase, db };