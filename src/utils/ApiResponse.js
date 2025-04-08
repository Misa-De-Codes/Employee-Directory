// You can use node js default Error object but I prefer it as I think I'll do it as i like my own Api response 

class ApiResponse {
    constructor(ststusCode, message, data = null){
        this.status = ststusCode >= 400 ? 'error' : 'success';
        this.ststusCode = ststusCode;
        this.message = message;
        this.data = data;
    }
}

export default ApiResponse;