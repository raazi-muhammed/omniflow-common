import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

function sign(data: Object) {
    if (!ACCESS_TOKEN_SECRET) throw new Error("No salt found for jwt");

    const jsonData = JSON.parse(JSON.stringify(data));
    return jwt.sign(jsonData, ACCESS_TOKEN_SECRET);
}

async function verify<T>(token: string): Promise<T | null> {
    if (!ACCESS_TOKEN_SECRET) throw new Error("No salt found for jwt");

    const tokenData = token.split(" ")[1];

    return new Promise<T | null>((resolve) => {
        jwt.verify(tokenData, ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) resolve(null);
            else resolve(user as T);
        });
    });
}

function validate(auth: string) {
    if (!auth) throw new Error("No token found");

    const token = auth.split(" ")[1];
    if (!token) throw new Error("Invalid token");
    return true;
}

export const token = Object.freeze({
    sign,
    verify,
    validate,
});
