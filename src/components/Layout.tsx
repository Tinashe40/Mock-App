import React from "react";
import { Container, AppBar, Toolbar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={() => navigate("/dashboard")}>Dashboard</Button>
          <Button color="inherit" onClick={() => navigate("/groups")}>Groups</Button>
          <Button color="inherit" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 5 }}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
