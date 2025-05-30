const winston = require('winston');
// require('winston-mongodb');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log' }),
    // new winston.transports.MongoDB({ 
    //   db: 'mongodb://localhost/vidly', 
    //   level: 'error'
    // })
  ]
});

module.exports = function(err, req, res, next) {
    // error
    // warn
    // info
    // verbose
    // debug
    // silly
    logger.error(err.message, err);

    res.status(500).send('Something failed.')
}