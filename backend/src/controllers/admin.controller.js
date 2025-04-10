import { Employee } from "../models/employee.model.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"

// Create a new employee
const createEmployee = async (req, res, next) => {
    try {
        const { employeeID, fullName, email, phoneNumber, department, position, joiningDate } = req.body;

        if ([employeeID, fullName, email, phoneNumber, department, position].some(field => !field?.trim()) || !joiningDate) {
            return next(new ApiError(400, "All fields are required!"));
        }

        const isEmployee = await Employee.findOne({
            $or: [{ email }, { phoneNumber }]
        });

        if (isEmployee) {
            return next(new ApiError(409, "Employee already exists!"));
        }

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
        );
    } catch (error) {
        console.error("Error creating employee:", error); 
        next(
            error instanceof ApiError
                ? error
                : new ApiError(500, "Server error while creating employee")
        );
    }
};

// Get all employees
const getAllEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.find().lean();

        if (!employees.length) {
            return res.status(404).json(
                new ApiResponse(404, "No employees found", [])
            );
        }

        return res.status(200).json(
            new ApiResponse(200, "Employees retrieved successfully", employees)
        );
    } catch (error) {
        console.error("Error retrieving employees:", error); 
        next(new ApiError(500, "Server error while retrieving employees"));
    }
};

// Get a specific employee by ID
const getEmployeeById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            return next(new ApiError(400, "A valid numeric Employee ID is required"));
        }

        const employee = await Employee.findOne({ employeeID: id }).lean();

        if (!employee) {
            return next(new ApiError(404, "Employee not found"));
        }

        return res.status(200).json(
            new ApiResponse(200, "Employee retrieved successfully", employee)
        );
    } catch (error) {
        console.error("Error fetching employee by ID:", error); 
        next(
            error instanceof ApiError
                ? error
                : new ApiError(500, "Server error while retrieving employee")
        );
    }
};

// Update an employee
const updateEmployee = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        const updateData = req.body;

        if (isNaN(id)) {
            return next(new ApiError(400, "A valid numeric Employee ID is required"));
        }

        if (!updateData || Object.keys(updateData).length === 0) {
            return next(new ApiError(400, "Update data is required"));
        }

        const updatedEmployee = await Employee.findOneAndUpdate(
            { employeeID: id },
            updateData,
            { new: true, runValidators: true }
        ).lean();

        if (!updatedEmployee) {
            return next(new ApiError(404, "Employee not found"));
        }

        return res.status(200).json(
            new ApiResponse(200, "Employee updated successfully", updatedEmployee)
        );
    } catch (error) {
        console.error("Error updating employee:", error); 
        next(
            error instanceof ApiError
                ? error
                : new ApiError(500, "Server error while updating employee")
        );
    }
};

// Delete an employee
const deleteEmployee = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            return next(new ApiError(400, "A valid numeric Employee ID is required"));
        }

        const result = await Employee.deleteOne({ employeeID: id });

        if (result.deletedCount === 0) {
            return next(new ApiError(404, "Employee not found"));
        }

        return res.status(200).json(
            new ApiResponse(200, "Employee deleted successfully", result)
        );
    } catch (error) {
        console.error("Error deleting employee:", error);
        next(
            error instanceof ApiError
                ? error
                : new ApiError(500, "Server error while deleting employee")
        );
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