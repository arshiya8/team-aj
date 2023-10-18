import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAgKx3_LJ7p6gVydWXtKbzXJcaBBnYLkjY",
    authDomain: "smooserve.firebaseapp.com",
    projectId: "smooserve",
    storageBucket: "smooserve.appspot.com",
    messagingSenderId: "948105636162",
    appId: "1:948105636162:web:61518758c56140f10300db",
    measurementId: "G-RWXG9HZJGN"
  };
  
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {
    db
}