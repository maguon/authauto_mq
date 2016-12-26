/**
 * Created by ling xue on 14-4-11.
 * The file include the function of create html email template
 */
var fs = require('fs');
var systemConfig = require('../config/SystemConfig.js');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('MailTemplateUtil.js');
var lov = require('../util/ListOfValue.js')


function createActiveUserTemplate(activeCode,firstName,userId,callback){
    var emailContent = "" ;
    fs.readFile('./lib/util/emailTemplate/activeUser.html', 'utf8', function (err, data) {
        if (err) {
            logger.error(' createActiveUserTemplate :'+ err.message);
            throw err;
        }else{
            emailContent = data;
            //emailContent = emailContent.toString().replace("$activeUrl$",systemConfig.getActiveUserBaseUrl(userId,activeCode));
            //emailContent = emailContent.toString().replace("$activeUrl$",systemConfig.getActiveUserBaseUrl(userId,activeCode));
            emailContent = emailContent.toString().replace("$firstName$",firstName);
            emailContent = emailContent.toString().replace("$firstName$",firstName);
            emailContent = emailContent.toString().replace("$websiteUrl$",systemConfig.getServerUrl());
            emailContent = emailContent.toString().replace("$websiteUrl$",systemConfig.getServerUrl());
        }
        callback(err,emailContent);
    });

}

function createInviteSupplierTemplate(code,bizName,callback){
    var emailContent = "" ;
    fs.readFile('./util/emailTemplate/invite_supplier.html', 'utf8', function (err, data) {
        if (err) {
            logger.error(' createInviteSupplierTemplate :'+ err.message);
            throw err;
        }else{
            emailContent = data;
            emailContent = emailContent.toString().replace("$bizName$",bizName);
            emailContent = emailContent.toString().replace("$code$",code);
            emailContent = emailContent.toString().replace("$code$",code);
            emailContent = emailContent.toString().replace("$websiteUrl$",systemConfig.getServerUrl());
        }
        callback(err,emailContent);
    });

}

function createResetPasswordTemplate(newPassword , callback){
    var emailContent = "";
    fs.readFile('./lib/util/emailTemplate/resetPassword.html', 'utf8', function (err, data) {
        if (err) {
            logger.error(' createResetPasswordTemplate :'+ err.message);
            throw err;
        }else{
            emailContent = data;
            emailContent = emailContent.toString().replace("$randomPassword$",newPassword);
        }
        callback(err,emailContent);
    });
}

function createChangeAccountMailTpl (params,callback){
    var emailContent = "" ;
    fs.readFile('./lib/util/emailTemplate/changeAccount.html', 'utf8', function (err, data) {
        if (err) {
            logger.error(' createChangeAccountMailTpl :'+ err.message);
            throw err;
        }else{
            emailContent = data;
            emailContent = emailContent.toString().replace("$oldEmail$",params.email);
            emailContent = emailContent.toString().replace("$newEmail$",params.newEmail);
            emailContent = emailContent.toString().replace("$websiteUrl$",systemConfig.getServerUrl());

        }
        callback(err,emailContent);
    });
}

module.exports = {
    createActiveUserTemplate :createActiveUserTemplate ,
    createResetPasswordTemplate : createResetPasswordTemplate,
    createInviteSupplierTemplate :  createInviteSupplierTemplate,
    createChangeAccountMailTpl : createChangeAccountMailTpl
}
