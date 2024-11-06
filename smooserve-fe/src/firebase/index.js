import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Import Firebase Storage
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "",
    authDomain: "smooserve.firebaseapp.com",
    projectId: "smooserve",
    storageBucket: "smooserve.appspot.com",
    messagingSenderId: "948105636162",
    appId: "1:948105636162:web:61518758c56140f10300db",
    measurementId: "G-RWXG9HZJGN"
  };
  
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app); // Initialize Firebase Storage

export {
    db,
    storage
}
