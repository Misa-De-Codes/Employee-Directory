

export default async(req, res, next) => {
    try{
        const role = req.user.role

        if ( role === "admin" )



        next();

    } catch (error) {
        console.log(`Error: ${error.message}`)
       return res.status(500).json({error: "Token validation failed."})
    }
}