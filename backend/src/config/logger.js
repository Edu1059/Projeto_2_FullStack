const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.splat(),
        format.json(),
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new transports.File({ filename: 'events.log' }),
        new transports.Console()
    ],    
});

const errorLogger = createLogger({
    level: 'error',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.splat(),
        format.json(),
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new transports.File({ filename: 'errors.log' }),
        new transports.Console()
    ], 
})

module.exports = {logger, errorLogger};