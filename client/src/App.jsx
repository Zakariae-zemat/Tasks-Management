import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Dashboard from './pages/dashboard';
import TaskBoard from './pages/TaskBoard';

const App = () => {
  const token = localStorage.getItem("token"); 

  const Layout = ({ children }) => {
      const location = useLocation();
      const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

      return (
          <div className="min-h-screen bg-gray-100">
              <Header title="Tasks Management App" />
              {!hideNavbar && <Navbar />}
              {children}
          </div>
      );
  };

  return (
      <Router>
          <Layout>
              <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
                    <Route path="//tasks" element={token ? <TaskBoard /> : <Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
              </Routes>
          </Layout>
      </Router>
  );
};

export default App;
