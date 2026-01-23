import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  Timestamp,
} from "firebase/firestore";

export const addPrescription = async (patientId, notes) => {
  await addDoc(collection(db, "prescriptions"), {
    patientId,
    notes,
    date: Timestamp.now(),
  });
};

export const getPrescriptions = async () => {
  const snapshot = await getDocs(collection(db, "prescriptions"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};
