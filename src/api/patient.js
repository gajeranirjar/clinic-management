import { db } from "../firebase";
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";

export const addPatient = async (name, age) => {
  const token = Math.floor(1000 + Math.random() * 9000);

  await addDoc(collection(db, "patients"), {
    name,
    age,
    token,
    createdAt: Timestamp.now(),
  });
};

export const getPatients = async () => {
  const snapshot = await getDocs(collection(db, "patients"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};
