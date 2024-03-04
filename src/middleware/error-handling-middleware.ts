import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../lib/error-handler";

export const ErrorHandlingMiddleware = (
    err: ErrorHandler,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || "Something went wrong";
    res.status(errStatus).json({
        success: false,
        message: errMsg,
    });
};
