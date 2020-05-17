'use strict';

const models = require('../../models');
module.exports = {
   viewProfits: async (req, res) => {
      try {
         var dataInfo;
         var setWhere = {};
         var params = req.body;
         var _date = new Date(await setHour());

         if (params.toDay === '') {
            setWhere = {
               where: {
                  dateAttending: _date,
                  statusAttending: false
               },
               attributes: ['prices', 'orders']
            };
            dataInfo = await models.AttendingWaiters.findAll(setWhere);
         } else {
            setWhere = {
               where: {
                  dateAttending: params.toDay,
                  statusAttending: false
               },
               attributes: ['prices', 'orders']
            };
            dataInfo = await models.AttendingWaiters.findAll(setWhere);
         }

         if (!dataInfo || dataInfo.length <= 0) {
            return res.status(202).json({
               code: 202,
               msg: 'No hay pedidos cobrados bajo esa fecha.'
            });
         }
         var total = await Profit(dataInfo);
         return res.status(200).json({
            total: total[0],
            dataInfo,
            code: 200,
            msg: '.Reporte sobre ingresps'
         });

      } catch (error) {
         console.log('viewProfits');
         console.log(error);
         return res.status(500).json({
            code: 500,
            msg: 'Al parecer, el servicio no está disponible en estos momentos.'
         });
      }
   },
   soldByWaiter: async (req, res) => {
      try {
         var dataInfo;
         var setWhere = {};
         var params = req.body;

         if (params.toDay === '') {
            setWhere = {
               where: {
                  waiterId: req.params.id,
                  statusAttending: false
               },
               attributes: ['orders', 'rates','prices']
            };
            dataInfo = await models.AttendingWaiters.findAll(setWhere);
         } else {
            setWhere = {
               where: {
                  waiterId: req.params.id,
                  dateAttending: params.toDay,
                  statusAttending: false
               },
               attributes: ['orders', 'rates','prices']
            };
            dataInfo = await models.AttendingWaiters.findAll(setWhere);
         }

         if (!dataInfo || dataInfo.length <= 0) {
            return res.status(202).json({
               code: 202,
               msg: 'No hay pedidos cobrados bajo esa fecha.'
            });
         }
         var total = await Profit(dataInfo);
         return res.status(200).json({
            total:total[0],
            dataInfo,
            code: 200,
            msg: 'Reporte sobre ingresos'
         });

      } catch (error) {
         console.log('soldByWaiter');
         console.log(error);
         return res.status(500).json({
            code: 500,
            msg: 'Al parecer, el servicio no está disponible en estos momentos.'
         });
      }
   }
}

async function Profit(objecProfit) {
   return objecProfit.map(function (value, index) {
      var sum = 0;
      var auxData = objecProfit[index].prices;
      auxData.map(function (index) {
         sum += parseFloat(index);
      });
      return sum;
   });
}

async function setHour() {
   var date = new Date();
   return date.setHours(date.getHours() - 5);
}