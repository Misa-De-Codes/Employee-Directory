import express from "express";
import { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee, exportEmployee } from "../controllers/admin.controller.js"

const router = express.Router()

//  CRUD Operations for both Admin & Employees
router.get('/employees', getAllEmployees)   
router.get('/employees/:id', getEmployeeById)   

//  Admin Operations
router.post('/employees', createEmployee)  
router.put('/employees/:id', updateEmployee)  
router.delete('/employees/:id', deleteEmployee)  
router.get('/employees/export', exportEmployee)  

export default router;



/*
○ POST /employees: Add a new employee.
○ GET /employees: Retrieve a list of all employees.
○ GET /employees/:id: Retrieve details of a specific employee.
○ PUT /employees/:id: Update an employee’s information.
○ DELETE /employees/:id: Remove an employee from the directory.
*/