import { Button, Container, TextField, Typography, Alert, CircularProgress, Box } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface LoginForm {
  email: string;
  password: string;
}

// Fetch API URL from environment variables
const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log("BASE_URL:", BASE_URL);

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginForm) => {
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, data);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Invalid credentials");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>Login</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField 
          label="Email" 
          {...register("email", { required: true })} 
          fullWidth 
          margin="normal"
        />
        <TextField 
          label="Password" 
          type="password" 
          {...register("password", { required: true })} 
          fullWidth 
          margin="normal"
        />
        
        <Box mt={2}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            disabled={loading} 
            fullWidth
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Login;
