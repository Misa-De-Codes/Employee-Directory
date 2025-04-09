export default function(req, res, next) {
    try {
        const role = req.user.role
        if (role === "user") {
            return res.json({message: "Users are not allowed to create new employes."}) 
            }
        next();

    } catch (error) {
        return req.json({message: error.message})
    }
}