import { Request } from "express";
import { IUser } from "../interfaces/entity.interface";

type CustomRequest<T> = Request & { currentUser?: T };
export function adaptRequest(req: CustomRequest<IUser>) {
    return {
        path: req.path,
        method: req.method,
        params: req.params,
        query: req.query,
        body: req.body,
        headers: req.headers,
        cookies: req.cookies,
        currentUser: req.currentUser,
    };
}

export type IRequest = ReturnType<typeof adaptRequest>;
