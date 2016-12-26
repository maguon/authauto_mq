'use strict';

var kafka = require('kafka-node');
var Consumer = kafka.Consumer;
var Offset = kafka.Offset;
var Client = kafka.Client;
var systemConfig = require('../../config/SystemConfig.js')
var listOfValue = require('../../util/ListOfValue.js');
var baseUtil = require('../../util/BaseUtil.js');
var serverLogger = require('../../util/ServerLogger.js');
var logger = serverLogger.createLogger('Consumer.js');
var inviteMail = require('../InviteMail.js');
var client = new Client(systemConfig.zookeeperUrl);
var topics = listOfValue.TOPIC_ARRAY_AUTHAUTO;
var options = systemConfig.authautoConsumerOptions;

var consumer = new Consumer(client, topics, options);
var offset = new Offset(client);


consumer.on('message', function (message) {

    if(message == null){
        logger.warn("Message type error : "+ message);
    }else if(message.topic == listOfValue.TOPIC_INVITE){
        inviteMail.sendInviteEmail(message,function(error,result){
            if(error){
                logger.error("sendInviteEmail " + error.message);
            }else{
                if(result.success){
                    logger.info("sendInviteEmail  success " + message);
                }else{
                    logger.info('sendInviteEmail failed ');
                }
            }
        })
    }else if(message.topic == listOfValue.TOPIC_PROCURE){
        logger.info("Procure Message get");
    }else{
        logger.warn("Message topic error " + message)
    }
});

consumer.on('error', function (err) {
    console.log('error', err);
});

/*
 * If consumer get `offsetOutOfRange` event, fetch data from the smallest(oldest) offset
 */
consumer.on('offsetOutOfRange', function (topic) {
    topic.maxNum = 2;
    offset.fetch([topic], function (err, offsets) {
        if (err) {
            return console.error(err);
        }
        var min = Math.min(offsets[topic.topic][topic.partition]);
        consumer.setOffset(topic.topic, topic.partition, min);
    });
});