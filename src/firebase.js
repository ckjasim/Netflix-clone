import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyD785EbpDUNNz3mqkIwB0qcJJkPCuTHC8M",
  authDomain: "netflix-clone-d9c65.firebaseapp.com",
  projectId: "netflix-clone-d9c65",
  storageBucket: "netflix-clone-d9c65.appspot.com",
  messagingSenderId: "367961713094",
  appId: "1:367961713094:web:e0a74a68db3f24702deac7",
  measurementId: "G-97JHFZ9FWD",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));

  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, login, signup, logout };
