import { Box, Paper, Typography, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, Grid, Alert, TablePagination, List, ListItemButton, ListItemText, } from "@mui/material";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { addPatient } from "../api/receptionist";

const ReceptionistDashboard = () => {
  const { patients = [], doctors = [] } = useLoaderData();
  const { user } = useAuth();
  const revalidator = useRevalidator();

  const [formValues, setFormValues] = useState({ name: "", age: "", doctorId: "", token: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const matchedPatients = useMemo(() => {
    if (!formValues.name.trim()) return [];

    return patients.filter((p) =>
      p.name
        .toLowerCase()
        .includes(formValues.name.trim().toLowerCase())
    );
  }, [formValues.name, patients]);

  const handleExistingPatient = (patient) => {
    setFormValues({
      name: patient.name,
      age: patient.age,
      doctorId: patient.assignedDoctorId || "",
      token: patient.token
    });
  };

  const handlePatients = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await addPatient({
        name: formValues.name,
        age: formValues.age,
        createdByReceptionistId: user.uid,
        assignedDoctorId: formValues.doctorId,
        token: formValues?.token
      });

      setSuccessMessage("Patient processed successfully.");
      setFormValues({ name: "", age: "", doctorId: "", token: "" });
      revalidator.revalidate();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Register / Assign Patient</Typography>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Patient Name"
              fullWidth
              value={formValues.name}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  name: e.target.value,
                  token: ""
                })
              }
            />

            {matchedPatients.length > 0 && (
              <Paper
                sx={{
                  maxHeight: 200,
                  overflow: "auto",
                  mt: 1,
                }}
              >
                <List dense>
                  {matchedPatients.map((p) => (
                    <ListItemButton
                      key={p.id}
                      onClick={() =>
                        handleExistingPatient(p)
                      }
                    >
                      <ListItemText
                        primary={`${p.name} | Age: ${p.age}`}
                        secondary={`ID: ${p.id} | Token: ${p.token}`}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Paper>
            )}
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField
              label="Age"
              type="number"
              fullWidth
              value={formValues.age}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  age: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Select
              fullWidth
              displayEmpty
              value={formValues.doctorId}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  doctorId: e.target.value,
                })
              }
            >
              <MenuItem value="">Assign Doctor</MenuItem>

              {doctors.map((doctor) => (
                <MenuItem
                  key={doctor.uid}
                  value={doctor.uid}
                >
                  {doctor.email}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              fullWidth
              sx={{ height: "56px" }}
              onClick={handlePatients}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>All Patients</Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date And Visit Time</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Patient ID</TableCell>
              <TableCell>Token</TableCell>
              <TableCell>Doctor</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {patients
              .slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
              .map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    {p.visitDate?.seconds
                      ? new Date(
                        p.visitDate.seconds * 1000
                      ).toLocaleString()
                      : "-"}
                  </TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.age}</TableCell>
                  <TableCell>{p.id}</TableCell>
                  <TableCell>{p.token}</TableCell>
                  <TableCell>
                    {
                      doctors.find(
                        (d) =>
                          d.uid ===
                          p.assignedDoctorId
                      )?.email || "-"
                    }
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={patients.length}
          page={page}
          onPageChange={(e, newPage) =>
            setPage(newPage)
          }
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(
              parseInt(e.target.value, 10)
            );
            setPage(0);
          }}
        />
      </Paper>
    </Box>
  );
};

export default ReceptionistDashboard;
