'use strict';

const models = require('../../models');
const amq = require('amqplib/callback_api');
const set = require('../../set-ups/setting');

module.exports = {
   createAttending: async (req, res) => {
      try {
         var params = req.body;
         params.waiterId = req.users.id;
         var objOrder = await buildCreateAttending(params);
         var info = await models.AttendingWaiters.create(objOrder);;

         if (!info) {
            return res.status(202).json({
               code: 402,
               msg: 'Hubo un error al ingresar los datos. Intente de nuevo.'
            });
         }

         var data = {
            orders: info.orders,
            tableId: info.tableId,
            dateAttending: info.dateAttending,
            actualTableAttending: info.actualTableAttending,
         }
         await sendQueue(data);
         return res.status(200).json({
            info,
            code: 200,
            msg: 'Mesa ocupada.'
         });


      } catch (error) {
         console.log('createAttending');
         console.log(error);
         return res.status(500).json({
            code: 500,
            msg: 'Al parecer, el servicio no está disponible en estos momentos.'
         });
      }
   },
   listAttendByWaiter: async (req, res) => {
      try {
         var setWhere = {
            where: {
               waiterId: req.params.waiterId
            }
         };
         var info = await models.AttendingWaiters.findAll(setWhere);

         if (!info) {
            return res.status(202).json({
               code: 202,
               msg: 'No ha atendido a nadie.'
            });
         }
         return res.status(200).json({
            info,
            code: 200,
            msg: 'Sus atenciones.'
         });

      } catch (error) {
         console.log('listAttendByWaiter');
         console.log(error);
         return res.status(500).json({
            code: 500,
            msg: 'Al parecer, el servicio no está disponible en estos momentos.'
         });
      }
   },
   changesStatusAttending: async (req, res) => {
      try {
         var setWhere = {
            plain: true,
            where: {
               id: req.params.id
            },
            returning: true,
            paranoid: true
         };
         var stmt = {
            statusAttending: false,
            rates: req.body.rates
         };
         var info = await models.AttendingWaiters.update(stmt, setWhere);

         if (!info) {
            return res.status(202).json({
               code: 202,
               msg: 'No se cambió el estado. Intente de nuevo.'
            });
         }
         return res.status(200).json({
            info,
            code: 200,
            msg: 'Servicio hecho.'
         });
      } catch (error) {
         console.log('listAttendByWaiter');
         console.log(error);
         return res.status(500).json({
            code: 500,
            msg: 'Al parecer, el servicio no está disponible en estos momentos.'
         });
      }
   },
   paymentConsume: async (req, res) => {
      try {
         var tableId = req.params.tableId;
         var setWhere = {
            where: {
               tableId: tableId
            }
         };
         var info = await models.AttendingWaiters.findOne(setWhere);

         if (!info) {
            return res.status(202).json({
               code: 202,
               msg: 'En esta mesa no se ha pagado.'
            });
         }
         return res.status(200).json({
            info,
            code: 200,
            msg: 'En esta mesa se pagó.'
         });

      } catch (error) {
         console.log('paymentConsume');
         console.log(error);
         return res.status(500).json({
            code: 500,
            msg: 'Al parecer, el servicio no está disponible en estos momentos.'
         });
      }
   },
   changeStateTable: async (req, res) => {
      try {
         var setWhere = {
            where: {
               statusAttending: true
            },
            attributes: ['id', 'statusAttending']
         };

         var info = await models.AttendingWaiters.findAll(setWhere);
         info.map(function (value, index) {
            let status = info[index].statusAttending
            if (status !== true) {
               return;
            }
            let _id = info[index].id;
            models.AttendingWaiters.update({
               statusAttending: false
            }, {
               where: {
                  id: _id
               }
            });

         });

      } catch (error) {
         console.log('changeStateTable');
         console.log(error);
         return res.status(500).json({
            code: 500,
            msg: 'Al parecer, el servicio no está disponible en estos momentos.'
         });
      }
   },
}

async function sendQueue(objData) {
   amq.connect(set.rabbit, function (err, conn) {
      if (err != null) {
         throw err;
      }
      conn.createChannel(function (err, channel) {
         if (err != null) {
            throw err;
         }
         objData = JSON.stringify(objData);
         channel.assertQueue(set.memorydb);
         channel.sendToQueue(set.memorydb, Buffer.from(objData), {
            persistent: true
         });
      });
   });
}

async function buildCreateAttending(params) {
   return {
      waiterId: params.waiterId, //debería ser por medio del payload
      actualTableAttending: params.actualTableAttending,
      prices: params.prices,
      orders: params.orders,
      waiterId: params.waiterId,
      tableId: params.tableId,
      dateAttending: await setHour(),
      statusAttending: true
   }
}

async function setHour() {
   var date = new Date();
   return date.setHours(date.getHours() - 5);
}