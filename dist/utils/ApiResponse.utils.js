"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiResponse {
    success;
    message;
    data;
    statusCode;
    constructor(statusCode, data, message = "Success") {
        this.success = statusCode < 400;
        this.message = "";
        this.data = data;
        this.statusCode = statusCode < 400;
    }
}
exports.default = ApiResponse;
//# sourceMappingURL=ApiResponse.utils.js.map