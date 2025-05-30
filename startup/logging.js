const winston = require('winston');
// require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
    const logger = winston.createLogger({
        transports: [
            new winston.transports.Console({ colorize: true, prettyPrint: true }),
            new winston.transports.File({ filename: 'error.log' }),
            // new winston.transports.MongoDB({ 
            //     db: 'mongodb://localhost/vidly', 
            //     level: 'error'
            // })
        ]
    });

    process.on('uncaughtException', (ex) => {
        logger.error(ex.message, ex);
        process.exit(1);
    });
    
    process.on('uncaughtRejection', (ex) => {
        logger.error(ex.message, ex);
        process.exit(1);
    });
}