/**
 * Created by lingxue on 2016/12/7.
 */
var mysqlConnectOptions ={
    user: 'auto',
    password: 'auth',
    database:'auto_plan',
    host: '127.0.0.1' ,
    charset : 'utf8mb4',
    //,dateStrings : 'DATETIME'
};


var logLevel = 'DEBUG';
var loggerConfig = {
    appenders: [
        { type: 'console' },
        {
            "type": "file",
            "filename": "../mq.log",
            "maxLogSize": 2048000,
            "backups": 10
        }
    ]
}

function getMysqlConnectOptions (){
    return mysqlConnectOptions;
}

var zookeeperUrl = '127.0.0.1:2181';

var topicObj ={
    inviteTopic : 'invite',
    procureTopic : 'procure'
}

var authautoConsumerOptions = {
    groupId:'authauto-consumer',
    autoCommit: true,
    fetchMaxWaitMs: 1000,
    fetchMaxBytes: 1024 * 1024
}

var systemMailConfig = {
    fromEmail : 'service@myxxjs.com',
    smtp : 'SMTP',
    options : {
        host: 'smtp.zoho.com',
        port: 465,
        pool: true,
        auth: {
            user: 'service@myxxjs.com',
            pass: "mingyuan2016"
        },
        tls:{
            rejectUnauthorized: false
        },
        logger: true
    }
}

var smtpOptions ={
    host: 'smtp.zoho.com',
    port: 465,
    pool: true,
    auth: {
        user: 'service@myxxjs.com',
        pass: "mingyuan2016"
    },
    tls:{
        rejectUnauthorized: false
    },
    logger: true
};
function getServerUrl(){
    return 'http://authauto.com';
}
module.exports = {
    getMysqlConnectOptions : getMysqlConnectOptions,
    loggerConfig : loggerConfig,
    logLevel : logLevel ,
    zookeeperUrl : zookeeperUrl ,
    topicObj : topicObj ,
    authautoConsumerOptions : authautoConsumerOptions ,
    systemMailConfig  : systemMailConfig ,
    getServerUrl  : getServerUrl
}