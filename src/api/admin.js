import { db } from "../firebase";
import { collection, doc, updateDoc, onSnapshot, query, where, } from "firebase/firestore";

export const fetchAllUsers = (callback) => {
  try {
    const userQuery = query(
      collection(db, "users"),
      where("isActive", "==", true)
    );

    const usersData = onSnapshot(userQuery,(data) => {
        const users = data.docs.map((doc) => ({
          uid: doc.id,
          ...doc.data(),
        }));

        callback(users);
      }
    );

    return usersData;
  } catch (error) {
    console.log("👌 ~ fetchAllUsers ~ error:", error);
    throw new Error(error.message || "Unable to fetch users");
  }
};


export const updateUserRole = async (userId, role) => {
  if (!userId || !role) {
    throw new Error("User ID and role are required");
  };

  try {
    await updateDoc(doc(db, "users", userId), { role });
  } catch (error) {
    console.log("👌 ~ updateUserRole ~ error:", error)
    throw new Error(error.message || "Unable to update role");
  }
};


export const deleteUser = async (userId) => {
  if (!userId) {
    throw new Error("Provide A Valid UserId.");
  };

  try {
    await updateDoc(doc(db, "users", userId), {
      isActive: false,
    });
  } catch (error) {
    console.log("👌 ~ deleteUser ~ error:", error)
    throw new Error(error.message || "Unable to delete User.");
  }
};
