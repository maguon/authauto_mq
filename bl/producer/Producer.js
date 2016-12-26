/**
 * Created by lingxue on 2016/12/7.
 */
var kafka = require('kafka-node');
var Producer = kafka.Producer;
var KeyedMessage = kafka.KeyedMessage;
var Client = kafka.Client;
var systemConfig = require('../../config/SystemConfig.js');
var client = new Client(systemConfig.zookeeperUrl);
var topic =  'topic2';
var p = 0;
var a = 0;
var producer = new Producer(client, { requireAcks: 1 });

producer.on('ready', function (error,con) {
    console.log('Producer is ready .');
    console.log(error||con);
    var message = 'a message';
    var keyedMessage = new KeyedMessage('keyed', new Date().toLocaleString());
    //producer.createTopics([topic]);
    producer.send([
        { topic: topic, partition: 0, messages: [message, keyedMessage] }
    ], function (err, result) {
        console.log(err || result);
    });
});

producer.on('error', function (err) {
    console.log('error', err);
});