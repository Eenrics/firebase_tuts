import {initializeApp} from 'firebase/app'
import {
    getFirestore,
    collection
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBjaukdXyVZxcY7icfdWKSOzahFiw9YL_w",
    authDomain: "fir-tuts-7c87d.firebaseapp.com",
    projectId: "fir-tuts-7c87d",
    storageBucket: "fir-tuts-7c87d.appspot.com",
    messagingSenderId: "483313430206",
    appId: "1:483313430206:web:0032ee8d8c2e1f67feb8ef"
  };

  initializeApp(firebaseConfig)

  const db = getFirestore()

  const colRef = collection(db, 'books')