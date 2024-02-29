export default function validateBody(obj: Object, keys: string[]) {
    for (let i = 0; i < keys.length; i++) {
        // @ts-ignore
        if (!obj[keys[i]]) {
            throw new Error(`Invalid data ${keys[i]}`);
        }
    }
    return true;
}
