export class SuccessResponse {
    constructor(status_code, message, data = null) {
        this.status_code = status_code;
        this.success = true;
        this.message = message;
        this.data = data;
    }
}

export class ErrorResponse extends Error {
    constructor(status_code, error_code, message) {
        super(message);
        this.status_code = status_code;
        this.success = false;
        this.error_code = error_code;
        this.message = message;
    }
    toJSON() {
        return {
            status_code: this.status_code,
            success: this.success,
            error_code: this.error_code,
            message: this.message,
        };
    }
}

export function errorReponseHandler(err, req, res, next) {
    if (err instanceof ErrorResponse) {
        res.status(err.status_code).json(err.toJSON());
    } else {
        res.status(500).json({
            status_code: 500,
            success: false,
            error_code: 9000,
            message: "Internal server error",
        });
        console.log(err)
    }
    return next();
}
