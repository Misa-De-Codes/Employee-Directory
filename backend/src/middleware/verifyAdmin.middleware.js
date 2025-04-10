import ApiError from "../utils/ApiError.js"

export default function(req, res, next) {
    try {
        const role = req.user.role
        if (role === "user") {
            throw new ApiError(403, "Unauthorized access to admin route")
        }
        next();
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(500, "Error in admin verification")
    }
}