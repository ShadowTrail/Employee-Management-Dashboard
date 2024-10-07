import axios from "axios";
import { Employee } from "../types/Employee";

const API_URL = "http://localhost:5000/api/employees";

export const getEmployeesRecord = async (): Promise<Employee[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getEmployeesRecordByID = async (id: Number): Promise<Employee[]> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createEmployeeRecord = async (employee: Employee): Promise<Employee> => {
  const response = await axios.post(API_URL, employee);
  return response.data;
};

export const updateEmployeeRecord = async (
  id: number,
  employee: Employee
): Promise<Employee> => {
  const response = await axios.put(`${API_URL}/${id}`, employee);
  return response.data;
};

export const deleteEmployeeRecord = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
