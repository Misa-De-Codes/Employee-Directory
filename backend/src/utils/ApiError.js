class ApiError extends Error {
    constructor(statusCode, message){
        super(message);
        this.statusCode = statusCode 
        this.status = 'error'
        this.success = false

        Error.captureStackTrace(this, this.constructor);
    }
}

export default ApiError;