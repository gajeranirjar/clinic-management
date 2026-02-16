import { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Alert, CircularProgress, } from "@mui/material";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCredentials = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async () => {
    setErrorMessage("");

    try {
      setIsSubmitting(true);
      const user = await loginUser(
        credentials.email,
        credentials.password
      );

      const roleRoutes = {
        admin: "/admin",
        doctor: "/doctor",
        receptionist: "/receptionist",
        user: "/user",
      };

      navigate(roleRoutes[user.role] || "/");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={8}>
      <Paper sx={{ p: { xs: 3, sm: 5 }, width: 380 }}>
        <Typography variant="h5" gutterBottom>Clinic Login</Typography>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <TextField
          name="email"
          autoComplete="off"
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={credentials.email}
          onChange={handleCredentials}
        />

        <TextField
          name="password"
          label="Password"
          autoComplete="off"
          type="password"
          fullWidth
          margin="normal"
          value={credentials.password}
          onChange={handleCredentials}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={isSubmitting}
          onClick={handleLogin}
        >
          {isSubmitting ? (
            <CircularProgress size={22} />
          ) : (
            "Login"
          )}
        </Button>
      </Paper>
    </Box>
  );
};
