import { User } from "../models/user.model.js"

// Generating Tokens to store and give to the user
const generateTokens = async function(_id){
    try {
        // Find the user by ID
        const user = await User.findById(_id)
        if( !user) {
            throw new Error("Couldn't find the user!")
        }
        // Generate tokens
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        // Save the refresh token in the database
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})
     
        // Return the tokensNai 
        return { accessToken, refreshToken }

    } catch (error) {
        console.error(`❌ Error while generating tokens: ${error.message}`);
        throw new Error("Failed to generate tokens.");
    }
}

// Registration Controler
const registerUser = async function(req, res) {
    try{console.log("register controller")
        const { fullName, email, password } = req.body

        if(req.body == {} ) {
            return res.status(404).json({error: "Please fill the details."})
        }

        // validate inputs
        if(!fullName || !email || !password) {
            return res.status(400).json({ error: "All fields are required!" })
        }

        // checking if user already exists
        const isUser = await User.findOne({email})
        if (isUser) {
            return res.status(409).json({error: "User already exists!"})
        }

        // Creating new user
        await User.create({
            fullName: fullName,
            email: email,
            password: password
        });

        // Creating and saving tokens
        const createdUser = await User.findOne({ email })
        const { accessToken, refreshToken } = await generateTokens(createdUser._id)

        // Cookies
        const options = {
            httpOnly: true,
            secure: process.env.COOKIE_SECURE === 'true'
        }

        res.status(201)
        .cookie('accessToken', accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({ message: "User registered successfully."})

    } catch (error) {
        console.error(`❌ Error while registering the user: ${error.message}`);
        return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
}

// Login Controller
const loginUser = async function(req, res) {
    try{console.log("login controller")
        const { email, password } = req.body

        // Checking user cradintials
        if ( !email || !password ) {
            return res.status(400).json({ error: "Both email and password are required!" });
        }

        // checking if user exists
        const isUser = await User.findOne({ email })
        if(!isUser) {
            return res.status(400).json({ error: "User doesn't exist!" })
        }

        // checking if password is Incorrect
        const isCorrect = await isUser.comparePassword(password)
        if (!isCorrect) {
            return res.status(404).json({ error: "Incorrect password!" })
        }

        // Generating tokens
        const { accessToken, refreshToken} = await generateTokens(isUser._id)

        // Cookies
        const options = {
            httpOnly: true,
            secure: process.env.COOKIE_SECURE === 'true'
        }
        res.status(201)
        .cookie('accessToken', accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({ message: "User loggedin successfully."})

    } catch (error) {
        console.log('Error: ', error.message)
        return res.status(500).json({ error: `Server was busy.`})           
    }

}

// Loogout Controller
const logoutUser = async function(req, res) {
    try{
        await User.findByIdAndUpdate(
            req.user._id,
            { 
                $set: { refreshToken: ""}
            }
        )   

        // Cookies
        const options = {
            httpOnly: true,
            secure: process.env.COOKIE_SECURE === 'true'
        }

        res.status(202)
        .cookie('accessToken', options)
        .cookie('refreshToken', options)
        .json({message: "User logout successfully."})

    } catch (error) {
        return res.status(404).json({message: "User logout Unsuccessfull"})
    }
}

// Rotate Tokens
const rotateToken = async function(req, res) {
    try{
        // Generating tokens
        const { accessToken, refreshToken } = await generateTokens(req.user._id)

        // Cookies
        const options = {
            httpOnly: true,
            secure: process.env.COOKIE_SECURE === 'true'
        }
        res.status(201)
        .cookie('accessToken', accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({ message: "Token rotation successfull."})

    } catch (error) {
        console.log(error.message)
        return res.status(404).json({message: "Token rotation unsuccessfull!"})
    }
}


export { registerUser, loginUser, logoutUser, rotateToken }