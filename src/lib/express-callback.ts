import { Request, Response } from "express";
import { adaptRequest } from "./adapt-request.js";
import { IResponse } from "../interfaces/response.interface.js";
import { ErrorHandler } from "./error-handler.js";

export function makeCallback(controller: Function) {
    return async (req: Request, res: Response) => {
        const httpRequest = adaptRequest(req);
        try {
            const response = (await controller(httpRequest)) as IResponse;
            res.status(response.statusCode).header(response.headers).json({
                success: true,
                message: response.message,
                data: response.data,
            });
        } catch (error) {
            console.log("Error caught by make callback:", error);

            if (error instanceof ErrorHandler) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message || "Internal server error",
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: "Internal server error",
                });
            }
        }
    };
}
