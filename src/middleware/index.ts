import buildVerifyUserMiddleware from "./current-user-middleware";
import { token } from "../lib/token";

export const verifyUserMiddleware = buildVerifyUserMiddleware({ token });

export type IVerifyUserMiddleware = ReturnType<
    typeof buildVerifyUserMiddleware
>;
