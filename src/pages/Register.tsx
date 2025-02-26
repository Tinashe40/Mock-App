import React from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}
const BASE_URL = import.meta.env.VITE_BASE_URL;
const Register: React.FC = () => {
  const { register, handleSubmit } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    console.log("Sending Data:", data); // Debugging log
  
    try {
      const response = await axios.post(`${BASE_URL}`, data, {
        headers: {
          "Content-Type": "application/json",  // Ensure correct Content-Type
        },
      });
  
      console.log("✅ Registration successful", response.data);
    } catch (error: unknown) {  
      if (axios.isAxiosError(error)) {
        console.error("Registration failed", error.response?.data || error.message);
      } else {
        console.error("Unexpected error", error);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4">Register</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Name" {...register("name")} fullWidth />
        <TextField label="Email" {...register("email")} fullWidth />
        <TextField label="Password" type="password" {...register("password")} fullWidth />
        <Button type="submit" variant="contained" color="primary">Register</Button>
      </form>
    </Container>
  );
};

export default Register;
