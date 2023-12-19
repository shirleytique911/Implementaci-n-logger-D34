
const winston = require("winston");

const devLogger = winston.createLogger({
  level: "silly",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console()],
});

const prodLogger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "INFO.log" }),
    new winston.transports.File({ filename: "ERRORS.log", level: "error" }),
  ],
});

// Utiliza process.env.NODE_ENV para verificar el entorno
const logger = process.env.NODE_ENV === "production" ? prodLogger : devLogger;

logger.info(`Winston ENV: ${process.env.NODE_ENV}`);

module.exports = logger;
