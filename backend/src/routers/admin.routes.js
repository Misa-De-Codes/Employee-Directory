import express from "express";
import { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee, exportEmployee } from "../controllers/admin.controller.js"
import verifyAccess from "../middleware/verifyAccess.middleware.js";
import verifyAdmin from "../middleware/verifyAdmin.middleware.js";

const router = express.Router()

// damn I i finallly needed this to move to the top
router.get('/export', exportEmployee)

//  CRUD Operations for both Admin & Employees
router.get('/', verifyAccess , getAllEmployees)   //fine
router.get('/:id', verifyAccess, getEmployeeById)   //fine

//  Admin Operations
router.post('/', verifyAccess, verifyAdmin, createEmployee) //fine  
router.put('/:id', verifyAccess, verifyAdmin, updateEmployee)  //fine
router.delete('/:id', verifyAccess, verifyAdmin, deleteEmployee)  //fine
  

export default router; 