import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBR3dqHJ7PDHsc6qdQia2RE94TPUHqJUug',
  authDomain: 'gpt-ecommerce-8abd9.firebaseapp.com',
  projectId: 'gpt-ecommerce-8abd9',
  storageBucket: 'gpt-ecommerce-8abd9.appspot.com',
  messagingSenderId: '708367369372',
  appId: '1:708367369372:web:2c3d7563b5ffb340905959'
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();