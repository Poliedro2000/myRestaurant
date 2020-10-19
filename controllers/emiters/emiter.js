'use strict';use_env_variable

const amq = require('amqplib/callback_api');
const set = require('../../set-ups/setting');
var io = require('socket.io');
exports.sendDataToFront = function (serv) {
   io = io.listen(serv, {
      origins: '*:*'
   });
   io.on('connection', function (socket) {
      amq.connect(set.rabbit, function (err, conn) {
         conn.createChannel(function (err, channel) {
            channel.assertQueue('client', {
               durable: true
            });
            channel.consume(set.memorydb, function (data) {
               let auxSend = data.content.toString();
               //socket.broadcast.emit('order-view', auxSend);
               socket.emit('order-view', auxSend);
               channel.ack(data);
            });
         });
      });
   });
}