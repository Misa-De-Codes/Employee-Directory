// You can use node js default Error object but I prefer it as I think I'll do it as i like my own Api response 

class ApiResponse {
    constructor(statusCode, message, data = null){
        this.status = statusCode >= 400 ? 'error' : 'success';
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}

export default ApiResponse;