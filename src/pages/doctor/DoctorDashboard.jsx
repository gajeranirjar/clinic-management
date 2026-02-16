import { Box, Paper, Typography, Grid, Table, TableHead, TableRow, TableCell, TableBody, Button, TablePagination, } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { formatDate, visitDate } from "../../utils/helper";

const DoctorDashboard = () => {
  const { patients = [], prescriptions = [] } = useLoaderData();
  const navigate = useNavigate();

  const [patientPage, setPatientPage] = useState(0);
  const [patientRows, setPatientRows] = useState(10);
  const [prescriptionPage, setPrescriptionPage] = useState(0);
  const [prescriptionRows, setPrescriptionRows] = useState(10);

  const todayPatients = useMemo(() => {
    const today = new Date();
    return patients
      .filter((p) => {
        if (!p.visitDate?.seconds) return false;
        const visit = new Date(p.visitDate.seconds * 1000);
        return (
          visit.getDate() === today.getDate() &&
          visit.getMonth() === today.getMonth() &&
          visit.getFullYear() === today.getFullYear()
        );
      })
      .sort(
        (a, b) =>
          b.visitDate.seconds - a.visitDate.seconds
      );
  }, [patients]);

  const sortedPrescriptions = useMemo(() => {
    return [...prescriptions].sort(
      (a, b) =>
        b.createdAt?.seconds - a.createdAt?.seconds
    );
  }, [prescriptions]);

  return (
    <Box>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Today Patients</Typography>
            <Typography variant="h4">{todayPatients.length}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Total Prescriptions</Typography>
            <Typography variant="h4">{prescriptions.length}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Today Assigned Patients</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Visit Time</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Token</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {todayPatients.slice(patientPage * patientRows, patientPage * patientRows + patientRows)
              .map((p) => {
                return <TableRow key={p.id}>
                  <TableCell>{visitDate(p.visitDate.seconds)}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.age}</TableCell>
                  <TableCell>{p.token}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() =>
                        navigate(
                          `/doctor/patient/${p.id}`
                        )
                      }
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>;
              })}

            {todayPatients.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                >
                  No patients today.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={todayPatients.length}
          page={patientPage}
          onPageChange={(e, newPage) =>
            setPatientPage(newPage)
          }
          rowsPerPage={patientRows}
          onRowsPerPageChange={(e) => {
            setPatientRows(
              parseInt(e.target.value, 10)
            );
            setPatientPage(0);
          }}
        />
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Recent Prescriptions</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Token</TableCell>
              <TableCell>Notes</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedPrescriptions.slice(prescriptionPage * prescriptionRows, prescriptionPage * prescriptionRows + prescriptionRows)
              .map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    {formatDate(p.createdAt)}
                  </TableCell>
                  <TableCell>
                    {p.patientName}
                  </TableCell>
                  <TableCell>
                    {p.patientAge}
                  </TableCell>
                  <TableCell>
                    {p.patientToken}
                  </TableCell>
                  <TableCell>{p.notes}</TableCell>
                </TableRow>
              ))}

            {sortedPrescriptions.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">No prescriptions yet.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={sortedPrescriptions.length}
          page={prescriptionPage}
          onPageChange={(e, newPage) =>
            setPrescriptionPage(newPage)
          }
          rowsPerPage={prescriptionRows}
          onRowsPerPageChange={(e) => {
            setPrescriptionRows(
              parseInt(e.target.value, 10)
            );
            setPrescriptionPage(0);
          }}
        />
      </Paper>
    </Box>
  );
};

export default DoctorDashboard;
