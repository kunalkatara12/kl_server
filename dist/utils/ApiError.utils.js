"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    statusCode;
    errors;
    success;
    data;
    constructor(statusCode, message = "Something went wrong", errors = [], stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.success = false;
        this.data = null;
        this.message = message;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = ApiError;
//# sourceMappingURL=ApiError.utils.js.map