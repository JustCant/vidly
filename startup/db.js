const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

module.exports = function() {
    const logger = winston.createLogger({
        level: 'info',
        transports: [
            new winston.transports.File({ filename: 'db-info.log' }),
        ]
    });
    const db = config.get('db');
    
    mongoose.connect(db)
        .then(() => logger.info(`Connected to ${db}...`));
}
