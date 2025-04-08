export default function(req, res, next) {
    try {
        const role = req.user.role
        if (role === "admin") {
            return res.json({message: "user"}) 
            }
        next();

    } catch (error) {
        return req.json({message: error.message})
    }
}