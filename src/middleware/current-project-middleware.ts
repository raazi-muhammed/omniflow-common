import { NextFunction, Request, Response } from "express";
import { IRequest, adaptRequest } from "../lib/adapt-request";
import { IToken } from "../interfaces/token.interface";
import { IProject } from "../interfaces/entity.interface";

export default function buildVerifyProjectMiddleware({
    token,
}: {
    token: IToken<IProject>;
}) {
    return async (expressReq: Request, res: Response, next: NextFunction) => {
        try {
            const req: IRequest = adaptRequest(expressReq);

            const tokenData = `Bearer ${req.cookies["__omniflow-project-token"]}`;
            if (!tokenData) throw new Error("Not token found");

            token.validate(tokenData);

            const decodedTokenData = await token.verify(tokenData);

            if (!decodedTokenData) throw new Error("Invalid token data");

            // @ts-ignore
            expressReq.currentProject = decodedTokenData
                ? decodedTokenData
                : undefined;

            next();
        } catch (error) {
            next(error);
        }
    };
}
