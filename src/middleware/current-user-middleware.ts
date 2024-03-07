import { NextFunction, Request, Response } from "express";
import { IRequest, adaptRequest } from "../lib/adapt-request";
import { IToken } from "../interfaces/token.interface";
import { IUser } from "../interfaces/entity.interface";
import { NotFoundError } from "../lib/error-handler";

export default function buildVerifyUserMiddleware({
    token,
}: {
    token: IToken<IUser>;
}) {
    return async (expressReq: Request, res: Response, next: NextFunction) => {
        try {
            const req: IRequest = adaptRequest(expressReq);

            const tokenData = req.headers.authorization;
            console.log(req.headers);
            console.log(tokenData);

            if (!tokenData) throw new NotFoundError("Token not found");

            token.validate(tokenData);

            const decodedTokenData = await token.verify(tokenData);

            console.log(decodedTokenData);

            if (!decodedTokenData) new Error("Invalid token data");

            // @ts-ignore
            expressReq.currentUser = decodedTokenData
                ? decodedTokenData
                : undefined;

            next();
        } catch (error) {
            next(error);
        }
    };
}
