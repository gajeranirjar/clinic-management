import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material";
import {
  addPrescription,
  getPrescriptions,
} from "../api/prescription";

export const DoctorDashboard = () => {
  const [patientId, setPatientId] = useState("");
  const [notes, setNotes] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);

  const loadPrescriptions = async () => {
    const data = await getPrescriptions();
    setPrescriptions(data);
  };

  const handleAdd = async () => {
    if (!patientId || !notes) return;
    await addPrescription(patientId, notes);
    setPatientId("");
    setNotes("");
    loadPrescriptions();
  };

  useEffect(() => {
    loadPrescriptions();
  }, []);

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6">Add Prescription</Typography>

        <TextField
          label="Patient ID"
          fullWidth
          margin="normal"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        />

        <TextField
          label="Prescription Notes"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <Button variant="contained" onClick={handleAdd}>
          Save
        </Button>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">Prescription History</Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Patient ID</b></TableCell>
                <TableCell><b>Notes</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {prescriptions.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.patientId}</TableCell>
                  <TableCell>{p.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
