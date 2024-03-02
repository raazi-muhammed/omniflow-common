import buildVerifyUserMiddleware from "./current-user-middleware";
import { token } from "../lib/token";
import buildVerifyProjectMiddleware from "./current-project-middleware";

export const verifyUserMiddleware = buildVerifyUserMiddleware({ token });
export const verifyProjectMiddleware = buildVerifyProjectMiddleware({ token });

export type IVerifyUserMiddleware = ReturnType<
    typeof buildVerifyUserMiddleware
>;

export type IVerifyProjectMiddleware = ReturnType<
    typeof verifyProjectMiddleware
>;
