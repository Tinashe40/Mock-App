import React from "react";
import {  Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Groups from "./pages/CreateGroup";
import ProtectedRoute from "./components/ProtectedRoute"; // 🔒 Import Protected Route
import NotFound from "./pages/NotFound"; // ❌ 404 Page
import Layout from "./components/Layout"; // 📌 Common layout for Dashboard

const App: React.FC = () => {
  return (
    
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/groups" element={<Layout><Groups /></Layout>} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    
  );
};

export default App;
