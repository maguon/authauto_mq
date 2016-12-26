/**
 * Created by lingxue on 2016/12/8.
 */
var listOfValue = require('../util/ListOfValue.js');
var baseUtil = require('../util/BaseUtil.js');
var encrypt = require('../util/Encrypt.js');
var mailUtil = require('../util/MailUtil.js');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('Invite.js');
var supplierDAO = require('../dao/SupplierDAO.js');
var Seq = require('seq');

function sendInviteEmail(message ,callback){
    var value = message.value;
    var msgObj = baseUtil.String2Json(value);
    if(msgObj && msgObj.email && msgObj.supplierId){
        var code = encrypt.createActiveCode(msgObj.email,msgObj.supplierId);
        Seq().seq(function(){
            var that = this;
            supplierDAO.getSupplier({supplierId:msgObj.supplierId},function(error,rows){
                if(error){
                    logger.error("sendInviteEmail " + error.message);
                    callback(error,null)
                }else{
                    if(rows && rows.length>0){
                        msgObj.bizName = rows[0].biz_name;
                        msgObj.contact = rows[0].contact;
                        that();
                    }else{
                        logger.warn('sendInviteEmail  get supplier info error' )
                        callback(null,{success:false});
                    }
                }
            })
        }).seq(function(){
            mailUtil.sendInviteSupplierEmail(code,msgObj,function(error,result){
                callback(error,result);
            })
        })

    }else{
        logger.warn('send invite email params error : ' +message.value);
        callback(null,{success:false})
    }

}


module.exports = {
    sendInviteEmail : sendInviteEmail
}