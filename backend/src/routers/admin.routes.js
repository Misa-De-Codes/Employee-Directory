import express from "express";
import { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee, exportEmployee } from "../controllers/admin.controller.js"
import verifyAccess from "../middleware/verifyAccess.middleware.js";
import verifyAdmin from "../middleware/verifyAdmin.middleware.js";

const router = express.Router()

//  CRUD Operations for both Admin & Employees
router.get('/', verifyAccess , getAllEmployees)   
router.get('/:id', verifyAccess, getEmployeeById)   

//  Admin Operations
router.post('/', verifyAccess, verifyAdmin, createEmployee)  
router.put('/:id', verifyAccess, verifyAdmin, updateEmployee)  
router.delete('/:id', verifyAccess, verifyAdmin, deleteEmployee)  
router.get('/export', verifyAccess, verifyAdmin, exportEmployee)  

export default router; 