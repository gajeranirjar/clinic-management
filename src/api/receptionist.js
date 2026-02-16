import { db } from "../firebase";
import { addDoc, collection, doc, getDocs, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { generateToken } from "../utils/helper";

export const receptionistDashboardLoader = async () => {
  try {

    const patientsQuery = query(
      collection(db, "patients"),
      orderBy("createdAt", "desc")
    );

    const doctorsQuery = query(
      collection(db, "users"),
      where("role", "==", "doctor")
    );

    const [patientsData, doctorsData] = await Promise.all([
      getDocs(patientsQuery),
      getDocs(doctorsQuery),
    ]);


    return {
      patients: patientsData.docs.map(d => ({ id: d.id, ...d.data() })),
      doctors: doctorsData.docs.map(d => ({ uid: d.id, ...d.data() })),
    };
  } catch (error) {
    console.log("👌 ~ receptionistDashboardLoader ~ error:", error)
    return { patients: [], doctors: [] };
  }
};

export const addPatient = async ({ name, age, createdByReceptionistId, assignedDoctorId, token }) => {

  if (!name || !age || Number(age) <= 0) {
    throw new Error("Invalid patient data");
  }

  if (!assignedDoctorId) {
    throw new Error("Doctor must be assigned");
  }

  const patientsRef = collection(db, "patients");

  if (token) {
    const patientExist = query(
      patientsRef,
      where("name", "==", name),
      where("age", "==", Number(age))
    );

    const existingData = await getDocs(patientExist);

    if (!existingData.empty) {
      const existingDoc = existingData.docs[0];

      await updateDoc(doc(db, "patients", existingDoc.id), {
        assignedDoctorId,
        visitDate: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return {
        reused: true,
        patientId: existingDoc.id,
      };
    }
  }


  const newPatient = await addDoc(patientsRef, {
    name: name.trim(),
    age: Number(age),
    token: generateToken(),
    createdByReceptionistId,
    assignedDoctorId,
    visitDate: serverTimestamp(),
    createdAt: serverTimestamp(),
  });

  return {
    reused: false,
    patientId: newPatient.id,
  };

};