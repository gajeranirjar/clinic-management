import { db, auth } from "../firebase";
import { collection, getDocs, query, where, doc, getDoc, addDoc, Timestamp, } from "firebase/firestore";
import { waitForAuth } from "../utils/waitForAuth";

export const doctorDashboardLoader = async () => {
  try {
    await waitForAuth();
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Response("Unauthorized", { status: 401 });

    const patientsQuery = query(
      collection(db, "patients"),
      where("assignedDoctorId", "==", currentUser.uid)
    );

    const prescriptionsQuery = query(
      collection(db, "prescriptions"),
      where("doctorId", "==", currentUser.uid)
    );

    const [patientsData, prescriptionsData] = await Promise.all([
      getDocs(patientsQuery),
      getDocs(prescriptionsQuery),
    ]);

    const patients = patientsData.docs.map((docRef) => ({
      id: docRef.id,
      ...docRef.data(),
    }));

    const patientLookup = Object.fromEntries(
      patients.map((p) => [p.id, p])
    );

    const prescriptions = prescriptionsData.docs.map((docRef) => {
      const data = docRef.data();
      const patient = patientLookup[data.patientId];

      return {
        id: docRef.id,
        ...data,
        patientName: patient?.name ?? "Unknown",
        patientAge: patient?.age ?? "-",
        patientToken: patient?.token ?? "0000"
      };
    });

    return { patients, prescriptions };
  } catch (error) {
    console.log("👌 ~ doctorDashboardLoader ~ error:", error)
    throw new Response("Failed to load doctor dashboard", { status: 500 });
  }
};

export const doctorPatientDetailsLoader = async ({ params }) => {
  await waitForAuth();
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Response("Unauthorized", { status: 401 });

  const { patientId } = params;
  if (!patientId) {
    throw new Response("Invalid patient", { status: 400 });
  }

  const patientRef = doc(db, "patients", patientId);
  const patientDoc = await getDoc(patientRef);

  if (!patientDoc.exists()) {
    throw new Response("Patient not found", { status: 404 });
  }

  const patient = { id: patientDoc.id, ...patientDoc.data() };

  if (patient.assignedDoctorId !== currentUser.uid) {
    throw new Response("Forbidden", { status: 403 });
  }

  const prescriptionsQuery = query(
    collection(db, "prescriptions"),
    where("patientId", "==", patientId),
    where("doctorId", "==", currentUser.uid)
  );

  const prescriptionsData = await getDocs(prescriptionsQuery);

  const prescriptions = prescriptionsData.docs.map((docRef) => ({
    id: docRef.id,
    ...docRef.data(),
  }));

  return { patient, prescriptions };
};

export const addPrescription = async ({ patientId, doctorId, notes }) => {
  if (!patientId || !doctorId || !notes?.trim()) {
    throw new Error("Invalid prescription data");
  }

  await addDoc(collection(db, "prescriptions"), {
    patientId,
    doctorId,
    notes: notes.trim(),
    createdAt: Timestamp.now(),
  });
}