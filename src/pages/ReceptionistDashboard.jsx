import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { addPatient, getPatients } from "../api/patient";

export const ReceptionistDashboard = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [patients, setPatients] = useState([]);

  const loadPatients = async () => {
    const data = await getPatients();
    setPatients(data);
  };

  const handleAdd = async () => {
    if (!name || !age) return;
    await addPatient(name, age);
    setName("");
    setAge("");
    loadPatients();
  };

  useEffect(() => {
    loadPatients();
  }, []);

  return (
    <Box>
      {/* ADD PATIENT */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Add Patient
        </Typography>

        <TextField
          label="Patient Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label="Age"
          fullWidth
          margin="normal"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <Button variant="contained" onClick={handleAdd}>
          Generate Token
        </Button>
      </Paper>

      {/* PATIENT TABLE */}

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Patient List
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow hover>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Age</b></TableCell>
                <TableCell><b>Token</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {patients.map((p) => (
                <TableRow key={p.id} hover>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.age}</TableCell>
                  <TableCell>{p.token}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
