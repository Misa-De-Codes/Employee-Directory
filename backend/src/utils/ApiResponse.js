class ApiResponse {
    constructor(statusCode, message, data = null){
        this.status = statusCode >= 400 ? 'error' : 'success';
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}

export default ApiResponse;