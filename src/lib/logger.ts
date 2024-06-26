import winston from "winston";
import { loadEnv } from "./load-env";
import { addColors } from "winston/lib/winston/config";
import LokiTransport from "winston-loki";

const { combine, printf, timestamp, label, colorize } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const { SERVER_NAME, LOGGER_URL } = loadEnv(["SERVER_NAME", "LOGGER_URL"]);

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
    transports: [
        new LokiTransport({
            host: LOGGER_URL,
        }),
    ],
});

if (process.env.NODE_ENV !== "production") {
    logger.add(new winston.transports.Console());
    logger.add(
        new winston.transports.Console({
            level: "error",
            format: combine(timestamp(), myFormat),
        })
    );
}
