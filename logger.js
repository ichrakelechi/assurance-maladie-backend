var winston = require('winston');

if (process.env.NODE_ENV === 'production') {
    var options = {
        console: {
            level: 'warn',
            handleExceptions: true,
            json: false,
            colorize: true,
            format: winston.format.simple(),
        },
    };

}else{
    // define the custom settings for each transport (file, console)
    var options = {
        console: {
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true,
        },
    };
}

// instantiate a new Winston Logger with the settings defined above
var logger = new winston.createLogger({
    transports: [
        new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
});



module.exports = logger;