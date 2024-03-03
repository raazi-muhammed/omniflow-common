import { createTransport } from "nodemailer";
import { loadEnv } from "../lib/load-env";

const { SMPT_HOST, SMPT_PORT, SMPT_SERVICE, SMPT_MAIL, SMPT_PASSWORD } =
    loadEnv([
        "SMPT_HOST",
        "SMPT_PORT",
        "SMPT_SERVICE",
        "SMPT_MAIL",
        "SMPT_PASSWORD",
    ]);

export const sendMail = async (options: {
    email: string;
    subject: string;
    message: string;
    html: string;
}) => {
    const transporter = createTransport({
        // @ts-ignore
        host: SMPT_HOST,
        port: SMPT_PORT,
        service: SMPT_SERVICE,
        secure: true,
        auth: {
            user: SMPT_MAIL,
            pass: SMPT_PASSWORD,
        },
    });
    const mailOptions = {
        from: SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html,
    };
    await transporter.sendMail(mailOptions);
};
