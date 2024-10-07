// src/App.tsx

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Homepage";
import AddEmployeeRecordPage from "./pages/AddEmployeeRecordPage";
import UpdateEmployeeRecordPage from "./pages/UpdateEmployeeRecordPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoutes";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Route for the login page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddEmployeeRecordPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <UpdateEmployeeRecordPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
