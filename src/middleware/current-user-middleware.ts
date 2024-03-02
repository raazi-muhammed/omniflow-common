import { NextFunction, Request, Response } from "express";
import { IRequest, adaptRequest } from "../lib/adapt-request";
import IToken from "../interfaces/token.interface";

export default function buildVerifyUserMiddleware({
    token,
}: {
    token: IToken;
}) {
    return async (expressReq: Request, res: Response, next: NextFunction) => {
        const req: IRequest = adaptRequest(expressReq);

        const tokenData = `Bearer ${req.cookies["__omniflow-user-token"]}`;

        token.validate(tokenData);

        const decodedTokenData = await token.verify(tokenData);

        if (!decodedTokenData) new Error("Invalid token data");

        req.currentUser = decodedTokenData ? decodedTokenData : undefined;

        next();
    };
}
