// src\routes\EmployeeRoutes.ts


import { Router } from "express";
import {
  getEmployeesRecord,
  getEmployeeRecordById,
  createEmployeeRecord,
  updateEmployeeRecord,
  deleteEmployeeRecord,
} from "../controllers/EmployeeController";

const router = Router();

router.get("/", getEmployeesRecord);
router.get("/:id", getEmployeeRecordById);
router.post("/", createEmployeeRecord);
router.put("/:id", updateEmployeeRecord);
router.delete("/:id", deleteEmployeeRecord);

export default router;