import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../services/authService"; // Create this service

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserDetails();
        setUsername(user.name); // Assuming the API returns a name
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Container sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4">Welcome, {username || "User"}!</Typography>
      <Box mt={3}>
        <Button onClick={() => navigate("/groups")} variant="contained" sx={{ mr: 2 }}>
          Manage Groups
        </Button>
        <Button onClick={logout} variant="contained" color="secondary">
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
