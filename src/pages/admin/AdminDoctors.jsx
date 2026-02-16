import { Paper, Typography, List, ListItem, ListItemText, Avatar, Stack, Divider, } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const AdminDoctors = ({ users }) => {
  const doctors = users
    .filter((u) => u.role === "doctor")
    .sort((a, b) => a.email.localeCompare(b.email));

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" gutterBottom>
        Doctors
      </Typography>

      {doctors.length === 0 && (
        <Typography>No doctors found.</Typography>
      )}

      <List>
        {doctors.map((d) => (
          <div key={d.uid}>
            <ListItem>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar>
                  <LocalHospitalIcon />
                </Avatar>
                <ListItemText primary={d.email} />
              </Stack>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Paper>
  );
};

export default AdminDoctors;
