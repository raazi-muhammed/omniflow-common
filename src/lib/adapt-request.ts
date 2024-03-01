import { Request } from "express";

type UserType = {
    _id: string;
    email: string;
    name: string;
    username: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    iat: number;
};

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserType;
        }
    }
}

export function adaptRequest(req: Request) {
    return Object.freeze({
        path: req.path,
        method: req.method,
        params: req.params,
        query: req.query,
        body: req.body,
        headers: req.headers,
        cookies: req.cookies,
        currentUser: req.currentUser,
    });
}

export type IRequest = ReturnType<typeof adaptRequest>;
