import { Employee } from "../models/employee.model.js"

// Create a new employee
const createEmployee = async (req, res) => {
    try {
        const { employeeID, fullName, email, phoneNumber, department, position, joiningDate } = req.body

        if(req.body == {} ) {
            return res.status(404).json({error: "Please fill the details."})
        }

        // validate inputs
        if(!employeeID || !fullName || !email || !phoneNumber || !department || !position || !joiningDate) {
            return res.status(400).json({ error: "All fields are required!" })
        }
        
        // checking if user already exists
        const isEmployee = await Employee.findOne({
            $or: [{ email, phoneNumber }]
        })
        if (isEmployee) {
            return res.status(409).json({error: "Employee already exists!"})
        }

        // Creating new user
        await Employee.create({
            employeeID: employeeID,
            fullName: fullName,
            email: email,
            phoneNumber: phoneNumber,
            department: department,
            position: position,
            joiningDate: joiningDate
          });

        return res.send('New Employee added.')
        
    } catch (error) {
        console.error("name:", error.name);
        console.error("message:", error.message);
        res.status(500).json({ message: "Server error while creating employee." });
    }
};

// Get all employees
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({}) 

        res.status(202).json({ message: "these are the employes", data: employees })

    } catch (error) {
        console.error(error.message, "name: ", error.name);
        res.status(500).json({ message: "Server error while retrieving employees." });
    }
};

// Get a specific employee by ID
const getEmployeeById = async (req, res) => {
    try {
        const employees = await Employee.find({}) 

        res.status(200).json({ message: "these are the employes", data: employees })


        // TODO: Add logic to fetch one employee by ID
    } catch (error) {
        console.error("❌ Error in getEmployeeById:", error.message);
        res.status(500).json({ message: "Server error while retrieving employee." });
    }
};

// Update an employee
const updateEmployee = async (req, res) => {
    try {
        // TODO: Add logic to update employee details
    } catch (error) {
        console.error("❌ Error in updateEmployee:", error.message);
        res.status(500).json({ message: "Server error while updating employee." });
    }
};

// Delete an employee
const deleteEmployee = async (req, res) => {
    try {
        // TODO: Add logic to delete an employee
    } catch (error) {
        console.error("❌ Error in deleteEmployee:", error.message);
        res.status(500).json({ message: "Server error while deleting employee." });
    }
};

// Export an employee
const exportEmployee = async (req, res) => {
    try {
        // TODO: Add logic to export employee data (e.g., to a CSV or Excel file)
    } catch (error) {
        console.error("❌ Error in exportEmployee:", error.message);
        res.status(500).json({ message: "Server error while exporting employee data." });
    }
};

export { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee, exportEmployee }