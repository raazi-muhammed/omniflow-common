import { Request } from "express";
import { IProject, IUser } from "../interfaces/entity.interface";

type CustomRequest<T, Y, K> = Request & {
    currentUser?: T;
    currentProject?: Y;
    file: K;
};
export function adaptRequest(req: CustomRequest<IUser, IProject, any>) {
    return {
        path: req.path,
        method: req.method,
        params: req.params,
        query: req.query,
        body: req.body,
        headers: req.headers,
        cookies: req.cookies,
        currentUser: req.currentUser,
        currentProject: req.currentProject,
        file: req.file,
    };
}

export type IRequest = ReturnType<typeof adaptRequest>;
