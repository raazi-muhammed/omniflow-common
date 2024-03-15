import winston from "winston";
import { loadEnv } from "./load-env";
import { addColors } from "winston/lib/winston/config";
const { combine, printf, timestamp, label, colorize } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const { SERVER_NAME } = loadEnv(["SERVER_NAME"]);

addColors({
    http: "italic gray",
});

export const logger = winston.createLogger({
    level: "silly",
    format: combine(
        colorize(),
        label({ label: SERVER_NAME }),
        timestamp({ format: "HH:mm:ss" }),
        myFormat
    ),
    transports: [],
});

if (process.env.NODE_ENV !== "production") {
    logger.add(new winston.transports.Console());
}
