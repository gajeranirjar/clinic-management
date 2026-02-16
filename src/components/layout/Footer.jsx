import { Box, Typography } from "@mui/material"

export const Footer = () => (
  <Box textAlign="center" p={2} bgcolor="#f1f1f1">
    <Typography variant="caption">
      © {new Date().getFullYear()} Clinic Management System
    </Typography>
  </Box>
);