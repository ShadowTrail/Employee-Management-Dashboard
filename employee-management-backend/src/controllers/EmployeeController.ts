// controllers/EmployeeController.ts
// Contains MySQL queries logic

import { Request, Response } from "express";
import connection from "../config/DB";
import { RowDataPacket, ResultSetHeader } from "mysql2";

// Retrieve all Employees
export const getEmployeesRecord = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const [rows] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM employees"
    );
    res.json(rows); // Return the response directly
  } catch (error) {
    console.error("Error fetching Employees' record:", error);
    res.status(500).json({ message: "Error fetching Employees' record.", error });
  }
};

// Get a single Employee record by ID
export const getEmployeeRecordById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const [rows] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM employees WHERE id = ?",
      [id]
    );
    if (rows.length === 0) {
      res.status(404).json({ message: "Employee record not found." });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching Employee record:", error);
    res
      .status(500)
      .json({ message: "Error fetching Employee record.", error });
  }
};

// Create a new Employee record
export const createEmployeeRecord = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, phone, position, department, salary } = req.body;
  try {
    const [result] = await connection.query<ResultSetHeader>(
      "INSERT INTO employees (name, email, phone, position, department, salary) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, phone, position, department, salary]
    );
    res.json({
      message: "Employee record created",
      EmployeeId: result.insertId,
    });
  } catch (error) {
    console.error("Error creating Employee record:", error);
    res
      .status(500)
      .json({ message: "Error creating Employee record.", error });
  }
};

// Update an existing Employee record
export const updateEmployeeRecord = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { name, email, phone, position, department, salary } = req.body;
  try {
    const [result] = await connection.query<ResultSetHeader>(
      "UPDATE employees SET name = ?, email = ?, phone = ?, position = ? , department = ?, salary = ? WHERE id = ?",
      [name, email, phone, position, department, salary, id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Employee record not found" });
    }
    res.json({ message: "Employee record updated" });
  } catch (error) {
    console.error("Error updating Employee record:", error);
    res
      .status(500)
      .json({ message: "Error updating Employee record.", error });
  }
};

// Delete an Employee record
export const deleteEmployeeRecord = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const [result] = await connection.query<ResultSetHeader>(
      "DELETE FROM employees WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Employee record not found" });
    }
    res.json({ message: "Employee record deleted" });
  } catch (error) {
    console.error("Error deleting Employee record:", error);
    res
      .status(500)
      .json({ message: "Error deleting Employee record.", error });
  }
};