var getopt = require('posix-getopt');
var sysConfig = require('./config/SystemConfig.js')
var serverLogger = require('./util/ServerLogger.js');
var logger = serverLogger.createLogger('main.js');
var NAME = 'mingyuan';

// In true UNIX fashion, debug messages go to stderr, and audit records go

function parseOptions() {
    var option;
    var opts = {}
    var parser = new getopt.BasicParser(':h:p:(port)', process.argv);

    while ((option = parser.getopt()) !== undefined) {
        switch (option.option) {
            case 'p':
                opts.port = parseInt(option.optarg, 10);
                break;
            case 'h':
                usage();
                break;

            default:
                usage('invalid option: ' + option.option);
                break;
        }
    }

    return (opts);
}


function usage(msg) {
    if (msg)
        console.error(msg);

    var str = 'usage: ' +
        NAME +
        '[-p port] [-h]';
    console.error(str);
    process.exit(msg ? 1 : 0);
}


(function main() {
    var opt=parseOptions();
    var consumer = require('./bl/consumer/Consumer.js');
    logger.info('Common-kafka server has been  started .');

})();