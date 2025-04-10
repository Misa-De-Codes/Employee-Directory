import { User } from "../models/user.model.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"

const generateTokens = async function(_id){
    try {
        const user = await User.findById(_id)
        if(!user) {
            throw new ApiError(404, "User not found")
        }
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})
     
        return { accessToken, refreshToken }

    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(500, "Failed to generate tokens")
    }
}

const registerUser = async function(req, res) {
    try{
        const { fullName, email, password } = req.body

        if([fullName, email, password].some((field) => field?.trim() === "")) {
            throw new ApiError(400, "All fields are required")
        }

        const isUser = await User.findOne({email})
        if (isUser) {
            throw new ApiError(409, "User already exists")
        }

        await User.create({
            fullName: fullName,
            email: email,
            password: password
        });

        const createdUser = await User.findOne({ email })
        const { accessToken, refreshToken } = await generateTokens(createdUser._id)

        const options = {
            httpOnly: true,
            secure: process.env.COOKIE_SECURE === 'true'
        }

        return res.status(201)
            .cookie('accessToken', accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(201, "User registered successfully", { fullName, email }))

    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(500, "Error while registering user")
    }
}

const loginUser = async function(req, res) {
    try{
        const { email, password } = req.body

        if ( [email, password].some((field) => field?.trim() === "") ) {
            throw new ApiError(400, "Both email and password are required")
        }

        const isUser = await User.findOne({ email })
        if(!isUser) {
            throw new ApiError(400, "User doesn't exist")
        }

        const isCorrect = await isUser.comparePassword(password)
        if (!isCorrect) {
            throw new ApiError(404, "Incorrect password")
        }

        const { accessToken, refreshToken} = await generateTokens(isUser._id)

        const options = {
            httpOnly: true,
            secure: process.env.COOKIE_SECURE === 'true'
        }
        return res.status(201)
            .cookie('accessToken', accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(201, "User logged in successfully"))

    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(500, "Error while logging in user")
    }
}

const logoutUser = async function(req, res) {
    try{
        await User.findByIdAndUpdate(
            req.user._id,
            { 
                $set: { refreshToken: ""}
            }
        )   

        const options = {
            httpOnly: true,
            secure: process.env.COOKIE_SECURE === 'true'
        }

        return res.status(202)
            .cookie('accessToken', options)
            .cookie('refreshToken', options)
            .json(new ApiResponse(202, "User logged out successfully"))

    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(500, "Error while logging out user")
    }
}

const rotateToken = async function(req, res) {
    try{
        const { accessToken, refreshToken } = await generateTokens(req.user._id)

        const options = {
            httpOnly: true,
            secure: process.env.COOKIE_SECURE === 'true'
        }
        return res.status(201)
            .cookie('accessToken', accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(201, "Token rotation successful"))

    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(500, "Error while rotating tokens")
    }
}

export { registerUser, loginUser, logoutUser, rotateToken }