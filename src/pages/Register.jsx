import { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Alert, CircularProgress, } from "@mui/material";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ email: "", password: "", });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormValues = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleRegister = async () => {
    setErrorMessage("");

    if (!formValues.email || formValues.password.length < 6) {
      setErrorMessage("Valid email and password (minimum 6 characters) required");
      return;
    }

    try {
      setIsSubmitting(true);
      await registerUser(
        formValues.email,
        formValues.password
      );
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={8}>
      <Paper sx={{ p: { xs: 2, sm: 4 } , width: 380, height: 380 }} >
        <Typography variant="h5" gutterBottom>Register</Typography>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }} >
            {errorMessage}
          </Alert>
        )}

        <TextField
          name="email"
          label="Email"
          autoComplete="off"
          fullWidth
          margin="normal"
          value={formValues.email}
          onChange={handleFormValues}
        />

        <TextField
          name="password"
          label="Password"
          autoComplete="off"
          type="password"
          fullWidth
          margin="normal"
          value={formValues.password}
          onChange={handleFormValues}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 4 }}
          disabled={isSubmitting}
          onClick={handleRegister}
        >
          {isSubmitting ? (
            <CircularProgress size={22} />
          ) : (
            "Register"
          )}
        </Button>
      </Paper>
    </Box>
  );
};
