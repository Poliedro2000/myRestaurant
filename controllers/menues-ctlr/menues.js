'use strict';

const models = require('../../models');
var path = require('path');

module.exports = {
   createMenues: async (req, res) => {
      try {
         var params = req.body;
         var objMn = {
            category: params.category,
            nameMenu: params.nameMenu,
            priceMenu: params.priceMenu,
            imageMenu:params.imageMenu,
            ingredients: params.ingredients,
         }

         var dataInfo = await models.Menues.create(objMn);

         if (!dataInfo) {
            return res.status(202).json({
               code: 202,
               msg: 'No se pudo completar el registro. Intente nuevamente.'
            });
         }
         return res.status(200).json({
            dataInfo,
            code: 200,
            msg: 'Menu agregado con éxito.'
         });

      } catch (error) {
         console.log('createMenues');
         console.log(params);
         return res.status(500).json({
            code: 500,
            msg: 'Al parecer, el servicio no está disponible en estos momentos.'
         });
      }
   },
   listMenuByCategory: async (req, res) => {
      try {
         var idCat = {
            where: {
               category: req.params.idCat
            }
         };
         var dataInfo = await models.Menues.findAll(idCat);

         if (!dataInfo || dataInfo.length <= 0) {
            return res.status(404).json({
               code: 404,
               msg: 'No hay menues con esa categoría.'
            });
         }
         return res.status(200).json({
            dataInfo,
            code: 200,
            msg: 'Menu por su categoría.'
         });

      } catch (error) {
         console.log('listByCategory');
         console.log(error);
         return res.status(500).json({
            code: 500,
            msg: 'Al parecer, el servicio no está disponible en estos momentos.'
         });
      }
   },
   editMenue: async (req, res) => {
      try {
         var params = req.body;
         var idMenu = {
            plain: true,
            where: {
               id: req.params.id
            },
            returning: true
         };

         var objMn = {
            category: params.category,
            nameMenu: params.nameMenu,
            imageMenu:params.imageMenu,
            priceMenu: params.priceMenu,
            ingredients: params.ingredients,
         }
         var dataInfo = await models.Menues.update(objMn, idMenu);

         if (!dataInfo) {
            return res.status(404).json({
               code: 404,
               msg: 'No hay menues con esa categoría.'
            });
         }
         return res.status(200).json({
            dataInfo,
            code: 200,
            msg: 'Menu por su categoría.'
         });

      } catch (error) {
         console.log('editMenue');
         console.log(error);
         return res.status(500).json({
            code: 500,
            msg: 'Al parecer, el servicio no está disponible en estos momentos.'
         });
      }
   },
   deleteMenu: async (req, res) => {
      try {
         var idMenu = {
            where: {
               id: req.params.id
            },
            benchmark: true
         };
         var dataInfo = await models.Menues.destroy(idMenu);

         if (dataInfo <= 0) {
            return res.status(404).json({
               code: 404,
               msg: 'No existe tal menú con ese identidicador.'
            });
         }
         return res.status(200).json({
            code: 200,
            msg: 'Menu eliminado con éxito.'
         });

      } catch (error) {
         console.log('deleteMenu');
         console.log(error)
         return res.status(500).json({
            code: 500,
            msg: 'Al parecer, el servicio no está disponible en estos momentos.'
         });
      }
   },
   viewDetailMenu: async (req, res) => {
      try {
         var idMenu = {
            where: {
               id: req.params.id
            }
         };
         var dataInfo = await models.Menues.findAll(idMenu)
         if (!dataInfo) {
            return res.status(404).json({
               code: 404,
               msg: 'Este menú no existe.'
            });
         }
         return res.status(200).json({
            dataInfo,
            code: 200,
            msg: 'Detalles del menú.'
         });

      } catch (error) {
         console.log('viewDetailMenu');
         console.log(error);
         return res.status(500).json({
            code: 500,
            msg: 'Al parecer, el servicio no está disponible en estos momentos.'
         });
      }
   },
}