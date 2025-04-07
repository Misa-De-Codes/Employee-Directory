import mongoose from "mongoose"

const employeeSchema = new mongoose.Schema({
    employeeID: {
        type: Number,
        unique: true,
        required: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email']
    },
    phoneNumber: {
        type: String,
        required: true
    },
    department: {
        type: String,
        enum: ["Engineering", "Marketing", "HR", "Finance"],
        required: true
    },
    position: {
        type: String,
        enum: ["Software Engineer", "Marketing Manager", "HR Specialist", "Accountant"],
        required: true
    },
    joiningDate: {
        type: Date,
        required: true
    },

}, {timestamps: true})

export const Employee = mongoose.model('Employee', employeeSchema)