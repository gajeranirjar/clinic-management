import { Box, Paper, Typography, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { formatDate } from "../../utils/helper";
import { useRevalidator } from "react-router-dom";
import { addPrescription } from "../../api/doctor";


const DoctorPatientDetails = () => {
  const { patient, prescriptions } = useLoaderData();
  const { user } = useAuth();
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);


  const revalidator = useRevalidator();

  const handleAdd = async () => {
    try {
      setSaving(true);
      await addPrescription({
        patientId: patient.id,
        doctorId: user.uid,
        notes,
      });
      setNotes("");
      revalidator.revalidate();
    } catch (error) {
      console.log("👌 ~ handleAdd ~ error:", error)
    } finally {
      setSaving(false);
    }

  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6">{patient.name}</Typography>
        <Typography>Age: {patient.age}</Typography>
        <Typography>Token: {patient.token}</Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6">Add Prescription</Typography>

        <TextField
          fullWidth
          multiline
          rows={3}
          margin="normal"
          label="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <Button disabled={saving} variant="contained" onClick={handleAdd}>
          {saving ? "Saving..." : "Save"}
        </Button>

      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">Prescription History</Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Notes</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {prescriptions.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  {formatDate(p.createdAt)}
                </TableCell>
                <TableCell>{p.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default DoctorPatientDetails;
