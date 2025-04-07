import express from "express";
import { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee, exportEmployee } from "../controllers/admin.controller.js"
import verifyAccess from "../middleware/verifyAccess.middleware.js";
import verifyAdmin from "../middleware/admin.middleware.js";

const router = express.Router()

//  CRUD Operations for both Admin & Employees
router.get('/', getAllEmployees)   
router.get('/:id', getEmployeeById)   

//  Admin Operations
router.post('/', verifyAccess, verifyAdmin, createEmployee)  
router.put('/:id', verifyAccess, verifyAdmin, updateEmployee)  
router.delete('/:id', verifyAccess, verifyAdmin, deleteEmployee)  
router.get('/export', verifyAccess, verifyAdmin, exportEmployee)  

export default router;



/*
○ POST /employees: Add a new employee.
○ GET /employees: Retrieve a list of all employees.
○ GET /employees/:id: Retrieve details of a specific employee.
○ PUT /employees/:id: Update an employee’s information.
○ DELETE /employees/:id: Remove an employee from the directory.
*/