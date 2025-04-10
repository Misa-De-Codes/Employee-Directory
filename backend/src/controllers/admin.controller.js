import { Employee } from "../models/employee.model.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"

// Create a new employee
const createEmployee = async (req, res) => {
    try {
        const { employeeID, fullName, email, phoneNumber, department, position, joiningDate } = req.body

        // validate inputs
        if([employeeID, fullName, email, phoneNumber, department, position].some((field) => field?.trim() === "") || !joiningDate) {
            throw new ApiError(400, "All fields are required!")
        }

        // checking if user already exists
        const isEmployee = await Employee.findOne({
            $or: [{ email, phoneNumber }]
        })
        if (isEmployee) {
            throw new ApiError(409, "Employee already exists!")
        }

        // Creating new employee
        const employee = await Employee.create({
            employeeID,
            fullName,
            email,
            phoneNumber,
            department,
            position,
            joiningDate
        });

        return res.status(201).json(
            new ApiResponse(201, "Employee created successfully", employee)
        )
        
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(500, "Server error while creating employee")
    }
};

// Get all employees
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({})
        return res.status(200).json(
            new ApiResponse(200, "Employees retrieved successfully", employees)
        )
    } catch (error) {
        throw new ApiError(500, "Server error while retrieving employees")
    }
};

// Get a specific employee by ID
const getEmployeeById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (!id) {
            throw new ApiError(400, "Employee ID is required")
        }

        const employee = await Employee.findOne({ employeeID: id });
        
        if (!employee) {
            throw new ApiError(404, "Employee not found")
        }

        return res.status(200).json(
            new ApiResponse(200, "Employee retrieved successfully", employee)
        )
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(500, "Server error while retrieving employee")
    }
};

// Update an employee
const updateEmployee = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updateData = req.body;

        if (!id) {
            throw new ApiError(400, "Employee ID is required")
        }

        const employee = await Employee.findOneAndUpdate(
            { employeeID: id },
            updateData,
            { new: true }
        );

        if (!employee) {
            throw new ApiError(404, "Employee not found")
        }

        return res.status(200).json(
            new ApiResponse(200, "Employee updated successfully", employee)
        )
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(500, "Server error while updating employee")
    }
};

// Delete an employee
const deleteEmployee = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (!id) {
            throw new ApiError(400, "Employee ID is required")
        }

        const result = await Employee.deleteOne({ employeeID: id });
        
        if (result.deletedCount === 0) {
            throw new ApiError(404, "Employee not found")
        }

        return res.status(200).json(
            new ApiResponse(200, "Employee deleted successfully", result)
        )
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(500, "Server error while deleting employee")
    }
};

// Export employee data
const exportEmployee = async (req, res) => {
    try {
        const employees = await Employee.find({});
        // TODO: Add export logic here
        
        return res.status(200).json(
            new ApiResponse(200, "Employee data exported successfully", employees)
        )
    } catch (error) {
        throw new ApiError(500, "Server error while exporting employee data")
    }
};

export { 
    createEmployee, 
    getAllEmployees, 
    getEmployeeById, 
    updateEmployee, 
    deleteEmployee, 
    exportEmployee 
}