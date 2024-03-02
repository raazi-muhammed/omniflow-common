import { BadRequestError } from "./error-handler";

export function validateBody(obj: Object, keys: string[]) {
    for (let i = 0; i < keys.length; i++) {
        // @ts-ignore
        if (obj[keys[i]] === undefined || obj[keys[i]] === null) {
            throw new BadRequestError(`Invalid data ${keys[i]}`);
        }
    }
    return true;
}
