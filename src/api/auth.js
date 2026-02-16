import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";

export const registerUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  let credential;
  try {
    credential = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", credential.user.uid), {
      email,
      role: "user",
      isActive : true,
      createdAt: Timestamp.now(),
    });
  } catch (error) {
    console.log("👌 ~ registerUser ~ error:", error)
    if (credential?.user) {
      await credential.user.delete();
    }

    if (error.code === "auth/email-already-in-use") {
      throw new Error("This email is already registered");
    }

    throw new Error(error.message || "Registration failed");
  }
}

export const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);

    const userDoc = await getDoc(doc(db, "users", credential.user.uid));
    if (!userDoc.exists()) {
      throw new Error("User profile not found");
    }

    return {
      uid: credential.user.uid,
      email: credential.user.email,
      role: userDoc.data()?.role || "user",
    };
  } catch (error) {
    console.log("👌 ~ loginUser ~ error:", error)
    throw new Error(error.message || "Invalid email or password");
  }
}
