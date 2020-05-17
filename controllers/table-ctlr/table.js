'use strict';

const models = require('../../models');
module.exports = {
   createTable: async (req, res) => {
      try {
         var params = req.body;
         var dataInfo = await models.Tables.create({
            tableSitting:params.tableSitting
         });

         if (!dataInfo) {
            return res.status(202).json({
               code: 202,
               msg: 'No se pudo procesar el ingreso. Intenet de nuevo.'
            });
         }

         return res.status(200).json({
            dataInfo,
            code: 200,
            msg: '¡Mesa creada!'
         });

      } catch (error) {
         console.log('createTable');
         console.log(error)
         return res.status(500).json({
            code: 500,
            msg: 'Al parecer, el servicio no está disponible en estos momentos.'
         });
      }
   },
   listTable: async (req, res) => {
      try {
         var dataInfo = await models.Tables.findAll();

         if (!dataInfo) {
            return res.status(202).json({
               code: 202,
               msg: 'Al parecer, no registró mesas.'
            });
         }

         return res.status(200).json({
            dataInfo,
            code: 200,
            msg: '¡Mesas disponibles!'
         });

      } catch (error) {
         console.log('listTable');
         console.log(error)
         return res.status(500).json({
            code: 500,
            msg: 'Al parecer, el servicio no está disponible en estos momentos.'
         });
      }
   }
}