import { Box, Paper, Typography, Grid, Divider, Chip, Avatar, Stack, } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import InfoIcon from "@mui/icons-material/Info";

export const UserDashboard = () => {
  return (
    <Box sx={{ px: { xs: .5, sm: 4 } }}>
      <Paper
        sx={{
          p: { xs: 1.5, sm: 3, md: 4 },
          mb: 4,
          borderRadius: 3,
          background: "linear-gradient(135deg,#1976d2,#42a5f5)",
          color: "white",
        }}
      >
        <Stack direction="row" spacing={1.2} alignItems="center">
          <Avatar sx={{ bgcolor: "white", color: "#1976d2" }}> <LocalHospitalIcon /></Avatar>
          <Box>
            <Typography variant="h5">Welcome to Clinic Management System</Typography>
            <Typography variant="body2">Please wait until the admin assigns your role.</Typography>
          </Box>
        </Stack>
      </Paper>

      <Grid container spacing={4}>
        <Grid>
          <Paper sx={{ p: 4, borderRadius: 3, width: 250, height: 240 }} >
            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTimeIcon color="primary" />
              <Typography variant="h6">Working Hours</Typography>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Typography>Monday - Saturday</Typography>
            <Typography>9:00 AM - 6:00 PM</Typography>
            <Chip
              label="Closed on Sunday"
              size="small"
              sx={{ mt: 2 }}
            />
          </Paper>
        </Grid>

        <Grid>
          <Paper sx={{ p: 4, borderRadius: 3, width: 250, height: 240 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <InfoIcon color="primary" />
              <Typography variant="h6">Departments</Typography>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography>• General Medicine</Typography>
            <Typography>• Pediatrics</Typography>
            <Typography>• Orthopedics</Typography>
            <Typography>• Cardiology</Typography>
            <Typography>• Neurology</Typography>
          </Paper>
        </Grid>

        <Grid>
          <Paper sx={{ p: 4, borderRadius: 3, width: 250, height: 240 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <SupportAgentIcon color="primary" />
              <Typography variant="h6">Support</Typography>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography>Email: support@clinic.com</Typography>
            <Typography>Phone: +91 98765 43210</Typography>

            <Chip
              label="24/7 Emergency Available"
              color="error"
              size="small"
              sx={{ mt: 2 }}
            />
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 4, mt: 4, borderRadius: 3, }}>
        <Typography variant="h6" gutterBottom>About Our Clinic</Typography>

        <Divider sx={{ mb: 2.2 }} />

        <Typography variant="body1">
          Our clinic management system is designed to streamline patient registration, doctor assignments, prescription management, and administrative workflows.
        </Typography>

        <Typography variant="body1" mt={2}>
          Once your role is assigned by the administrator, you will gain access to features relevant to your responsibilities.
        </Typography>
      </Paper>
    </Box>
  );
};
