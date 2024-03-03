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

const send = async (options: {
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

async function sendVerificationCodeMail({
    name,
    email,
    code,
}: {
    name: string;
    email: string;
    code: number;
}) {
    send({
        email: email,
        subject:
            "Omniflow Account Verification - Your Verification Code Inside",
        message: `Dear ${name},

Welcome to Omniflow, your all-in-one SaaS solution! We're thrilled to have you on board. To ensure the security of your Omniflow account, we need to verify your email address.

Please use the following verification code to complete the process: ${code}

${code}

If you haven't initiated this verification or encounter any issues, please reach out to our support team at Support Email. We're here to help.

Thank you for choosing Omniflow!

Best regards,
Omniflow
`,
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Omniflow Account Verification</title>
    <style>
      html {
      background: #0A102A;
      color: white;
      margin: 0;
      padding: 0;
      height: 100%;
      }
        body {
            font-family: Arial, sans-serif;
      height: 100%;       
            background-color: #0A102A;
      color: white;
        background-repeat: repeat;
      background : url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232343D8' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")


        }

        .container {
            max-width: 600px;
            margin: 0 auto;
        }

        .verification-code {
            background-color: #09122D;
      		border: 1px solid #23346C;
            padding: 10px;
            font-weight: bold;
            font-size: 18px;
      		border-radius: 0.5rem;
      		color: white;
		    text-align: center;
        }

        .contact-info {
            margin-top: 20px;
        }
      .header{
                  font-weight: bold;
      font-size: 20px;
      text-align: center;
      color: #2A59F5;
      padding: 1px;
      }
    </style>
</head>
<body>
        <div class="header">
              <div class="container">
        <p>Omniflow</p>
          </div>

      </div>
    <div class="container">

        <p>Dear ${name},</p>
        <p>Welcome to Omniflow, your all-in-one SaaS solution! We're thrilled to have you on board. To ensure the security of your Omniflow account, we need to verify your email address.</p>
<br/>
            <p>Please use the following verification code to complete the process:</p>
        <div class="verification-code">

            <p>${code}</p>
        </div>
      <br/>
        <p>If you haven't initiated this verification or encounter any issues, please reach out. We're here to help.</p>


        <p>Thank you for choosing Omniflow!</p>

        <div class="contact-info">
            <p>- Omniflow</p>
        </div>
      <br/>
      <br/>
      <br/>
    </div>
</body>
</html>
`,
    });
}

export const mailService = Object.freeze({
    sendVerificationCodeMail,
});

export type IMailService = typeof mailService;
