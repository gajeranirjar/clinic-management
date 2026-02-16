import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const authListener = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setCurrentUser(null);
        setAuthLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        
        if (!userDoc.exists()) {
          setCurrentUser(null);
          setAuthLoading(false);
          return;
        }

        const userData = userDoc.data();
        if (userData.isActive === false) {
          await signOut(auth);
          setCurrentUser(null);
          setAuthLoading(false);
          return;
        }

        setCurrentUser({
          uid: user.uid,
          email: user.email,
          role: userData.role || "user",
          isActive: userData.isActive
        });
      } catch (error) {
        console.error("Failed to load user profile", error);
        setCurrentUser(null);
      } finally {
        setAuthLoading(false);
      }
    });

    return () => authListener();
  }, []);


  return (
    <AuthContext.Provider value={{ user: currentUser, loading: authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

