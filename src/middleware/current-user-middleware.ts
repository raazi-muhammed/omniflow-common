import { NextFunction, Request, Response } from "express";
import { adaptRequest } from "../lib/adapt-request";
import IToken from "../interfaces/token.interface";

export default function buildVerifyUserMiddleware({
    token,
}: {
    token: IToken;
}) {
    return async (expressReq: Request, res: Response, next: NextFunction) => {
        const req = adaptRequest(expressReq);

        const tokenData = `Bearer ${req.cookies["__omniflow-user-token"]}`;

        token.validate(tokenData);

        const decodedTokenData = await token.verify(tokenData);

        if (!decodedTokenData) new Error("Invalid token data");

        req.body.currentUser = decodedTokenData;

        next();
    };
}
