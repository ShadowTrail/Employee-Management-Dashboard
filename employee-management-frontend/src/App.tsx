// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/Homepage';
import AddEmployeeRecordPage from './pages/AddEmployeeRecordPage';
import UpdateEmployeeRecordPage from './pages/UpdateEmployeeRecordPage';
import LoginPage from './pages/LoginPage';
const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddEmployeeRecordPage />} />
        <Route path="/edit/:id" element={<UpdateEmployeeRecordPage />} />
      </Routes>
    </Router>
  );
};

export default App;
