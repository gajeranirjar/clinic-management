// src/api/auth.js
import { auth, db } from "../firebase.js";
import { signInWithEmailAndPassword , createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc , setDoc } from "firebase/firestore";

// REGISTER
export const registerUser = async (email, password, role) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  // Save role in Firestore
  await setDoc(doc(db, "users", user.uid), {
    email,
    role,
  });

  return user;
};


export const loginUser = async (email, password) => {
  // 1. Firebase Authentication
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  // 2. Fetch role from Firestore
  const userDoc = await getDoc(doc(db, "users", user.uid));

  if (!userDoc.exists()) {
    throw new Error("User role not found");
  }

  return {
    uid: user.uid,
    ...userDoc.data(), // email, role
  };
};
