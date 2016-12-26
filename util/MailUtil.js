
var nodemailer = require("nodemailer");
var mailTemplateUtil = require('./MailTemplateUtil.js');
var serverLogger = require('./ServerLogger.js');
var logger = serverLogger.createLogger('MailUtil.js');
var sysConfig = require('../config/SystemConfig.js');



var activeMailTitle = "Welcome to use AuthAuto";
var resetPasswordTitle = "Reset your AuthAuto password" ;

var changeLoginMailTitle = "Revision to Your AuthAuto Account";



var fromEmail = sysConfig.systemMailConfig.fromEmail ;
var transport = nodemailer.createTransport(sysConfig.systemMailConfig.options,{from:sysConfig.systemMailConfig.fromEmail});

function sendActiveEmail(code,info){
    mailTemplateUtil.createActiveUserTemplate(code,info.bizName,function(error,data){
        transport.sendMail({
            from : fromEmail,
            to : info.email,
            subject: activeMailTitle,
            generateTextFromHTML : false,
            html : data
        }, function(error, response){
            //console.log("trying to send to email........");
            if(error){
                logger.error(' sendActiveEmail :'+ error.message);
                transport.close();
            }else{
                transport.close();
            }
        });
    });

}

function sendInviteSupplierEmail(code,info ,callback){
    mailTemplateUtil.createInviteSupplierTemplate(code,info.bizName,function(error,data){
        transport.sendMail({
            from : fromEmail,
            to : info.email,
            subject: activeMailTitle,
            html : data
        }, function(error, response){
            if(error){
                logger.error(' sendInviteSupplierEmail :'+ error.message);
                transport.close();
                callback(error,null)
            }else{
                transport.close();
                callback(null,{success:true});
            }
        });
    });

}


function sendResetPasswordMail(newPassword,email ){
    mailTemplateUtil.createResetPasswordTemplate(newPassword,function(error,data){
        transport.sendMail({
            from : fromEmail,
            to : email,
            subject: resetPasswordTitle,
            generateTextFromHTML : false,
            html : data
        }, function(error, response){
            if(error){
                logger.error(' sendResetPasswordMail :'+ error.message);
                transport.close();
            }else{
                transport.close();
            }

        });
    });
}

function sendMail(toMail ,mailTitle ,mailContent,callback){
    transport.sendMail({
        //secureConnection: true,
        from : fromEmail,
        to : toMail,
        subject: mailTitle,
        generateTextFromHTML : true,
        html : mailContent
    }, function(error, response){
        if(error){
            logger.error(' sendMail :'+ error.message);
            transport.close();
        }else{
            transport.close();
        }
        callback(error,response);

    });
}

function sendChangeAccountEmail(params){
    mailTemplateUtil.createChangeAccountMailTpl(params,function(error,data){
        var mailParams = {
            from : fromEmail,
            to : params.newEmail,
            subject: changeLoginMailTitle,
            generateTextFromHTML : false,
            html : data
        } ;

        transport.sendMail(mailParams, function(error, response){
            if(error){
                logger.error(' sendChangeAccountEmail :'+ error.message);
                transport.close();
            }else{
                logger.info(' sendChangeAccountEmail :'+ 'success');
                transport.close();
            }

        });
    });
}

module.exports = {
    sendMail : sendMail,
    sendActiveEmail :sendActiveEmail,
    sendResetPasswordMail : sendResetPasswordMail,
    sendChangeAccountEmail : sendChangeAccountEmail ,
    sendInviteSupplierEmail : sendInviteSupplierEmail
}