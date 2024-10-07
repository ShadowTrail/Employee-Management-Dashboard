// src/components/EmployeeForm.tsx

import React, { useState, useEffect, useCallback } from "react";
import { Employee } from "../types/Employee";
import { TextField, Button, Paper, Container, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EmployeeForm: React.FC = () => {
  const [employee, setEmployee] = useState<Employee>({
    id: 0,
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    salary: 0,
  });
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const fetchEmployee = useCallback(async () => {
    if (id) {
      try {
        console.log(`Fetching employee with ID: ${id}`);
        const response = await axios.get(
          `http://localhost:5000/api/employees/${id}`
        );
        console.log("Employee data fetched:", response.data);
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching Employee:", error);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchEmployee();
  }, [fetchEmployee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/employees/${id}`, employee);
      } else {
        await axios.post("http://localhost:5000/api/employees", employee);
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving Employee:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper sx={{ p: 3, margin: "auto" }}>
          <form onSubmit={handleSubmit}>
            <TextField
              name="name"
              label="Name"
              value={employee.name}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              name="email"
              label="Email"
              value={employee.email}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              name="phone"
              label="Phone"
              value={employee.phone}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              name="position"
              label="Position"
              value={employee.position}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              name="department"
              label="Department"
              value={employee.department}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              name="salary"
              label="Salary"
              value={employee.salary}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {id ? "Update Employee" : "Add Employee"}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default EmployeeForm;
