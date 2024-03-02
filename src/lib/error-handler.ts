export class ErrorHandler extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class BadRequestError extends ErrorHandler {
    constructor(message: string = "Bad request") {
        super(message, 400);
    }
}

export class ConflictError extends ErrorHandler {
    constructor(message: string = "Conflict error") {
        super(message, 409);
    }
}

export class InternalServerError extends ErrorHandler {
    constructor(message: string = "Internal Server Error") {
        super(message, 500);
    }
}

export class NotFoundError extends ErrorHandler {
    constructor(message: string = "Not found") {
        super(message, 404);
    }
}

export class UnauthorizedError extends ErrorHandler {
    constructor(message: string = "Unauthorized") {
        super(message, 401);
    }
}
