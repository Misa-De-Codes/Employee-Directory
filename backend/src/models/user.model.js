import mongoose  from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
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
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "admin"
    },
    refreshToken: {
        type: String
    },
}, {timestamps: true})

// Encrypting the password 
userSchema.pre('save', async function(next) {
    if (!this.isModified("password")) next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})
userSchema.methods.comparePassword = async function(inputPassword) {
    return await bcrypt.compare(inputPassword, this.password)
}

// Access token
userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        _id: this._id,
        role: this.role
    }, 
    process.env.ACCESS_TOKEN_SECRET ,
    {expiresIn: process.env.ACCESS_TOKEN_EXPIRE})
}
// Refresh token
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
        _id: this._id
    }, 
    process.env.REFRESH_TOKEN_SECRET ,
    {expiresIn: process.env.REFRESH_TOKEN_EXPIRE})
}

export const User = mongoose.model('User', userSchema)

