import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

// Cache the promise so it only runs once per session
let authReady;

export const waitForAuth = () => {
  if (!authReady) {
    authReady = new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        resolve(user);
      });
    });
  }
  return authReady;
};
