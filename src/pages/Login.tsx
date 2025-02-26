import React from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", data);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Email" {...register("email")} fullWidth />
        <TextField label="Password" type="password" {...register("password")} fullWidth />
        <Button type="submit" variant="contained" color="primary">Login</Button>
      </form>
    </Container>
  );
};

export default Login;
