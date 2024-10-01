class ApiResponse {
    constructor(status, statusCode, message = 'Success', result = null) {
        this.status = status;
        this.statusCode = statusCode;
        this.message = message;
        this.result = result;
        this.success = statusCode < 400;
    }
}

module.exports = ApiResponse;
