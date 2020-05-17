'use strict';

const models = require('../../models');

module.exports = {
   createCategory: async (req, res) => {
      try {
         var params = req.body;
         var dataInfo = await models.Categories.create({
            nameCategory: params.nameCategory
         });

         if (!dataInfo) {
            return res.status(202).json({
               code: 202,
               msg: 'Hubo un error al ingresar los datos. Intente de nuevo.'
            });
         }
         return res.status(200).json({
            dataInfo,
            code: 200,
            msg: 'Categoría agregada.'
         });

      } catch (error) {
         console.log('createCategory');
         console.log(error);
         return res.status(500).json({
            code: 500,
            msg: 'Al parecer, el servicio no está disponible en estos momentos.'
         });
      }
   },
   listCategories: async (req, res) => {
      try {
         var dataInfo = await models.Categories.findAll();
         if (!dataInfo) {
            return res.status(403).json({
               code: 403,
               msg: 'Hubo un error al listar los datos. Intente de nuevo.'
            });
         }
         return res.status(200).json({
            dataInfo,
            code: 200,
            msg: 'Listado de las categorías.'
         });

      } catch (error) {
         console.log('listCategories');
         console.log(error);
         return res.status(500).json({
            code: 500,
            msg: 'Al parecer, el servicio no está disponible en estos momentos.'
         });
      }
   },
   changesCatergoryShow: async (req, res) => {
      try {
         var stmt = {
            show: false
         };
         var setData = {
            plain:true,
            where: {
               id: req.params.id
            },
            returning:true
         };
         var dataInfo = await models.Categories.update(stmt, setData);

         if (!dataInfo) {
            return res.status(403).json({
               code: 403,
               msg: 'Esa categoría no está registrada.'
            });
         }
         return res.status(200).json({
            code: 200,
            msg: 'Cambio de estado para no mostrar la categoría.'
         });


      } catch (error) {
         console.log('changesCatShow');
         console.log(error);
         return res.status(500).json({
            code: 500,
            msg: 'Al parecer, el servicio no está disponible en estos momentos.'
         });
      }
   }
}