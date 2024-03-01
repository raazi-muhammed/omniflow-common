import { IUser } from "../lib/token";

type IToken = {
    sign: (data: IUser) => string;
    verify: (token: string) => Promise<IUser | null>;
    validate: (auth: string) => boolean;
};

export default IToken;
