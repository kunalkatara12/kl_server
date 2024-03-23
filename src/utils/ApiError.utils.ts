class ApiError extends Error {
    statusCode: number;
    errors: Array<Error>;
    success: boolean;
    data: any;

    constructor(
        statusCode: number,
        message: string = "Something went wrong",
        errors: Array<Error> = [],
        stack: string = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.success = false;
        this.data = null;
        this.message = message;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };
