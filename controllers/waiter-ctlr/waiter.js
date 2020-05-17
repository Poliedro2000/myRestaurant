'use strict';

const models = require('../../models');
const saltRounds = 10;
var path = require('path');
const bcrypt = require('bcrypt');
const {
   encode
} = require('../../middlewares/index')

module.exports = {
   createWaiter: async (req, res) => {
      try {
         var params = req.body;
         var infoWaiter = await toDoNewWaiter(params);
         var dataInfo = await models.Waiters.create(infoWaiter);

         if (!dataInfo) {
            return res.status(202).json({
               code: 202,
               msg: 'No se pudo procesar el ingreso. Intenet de nuevo.'
            });
         }

         return res.status(200).json({
            dataInfo,
            code: 200,
            msg: '¡Se ha creado un nuevo empleado!'
         });

      } catch (error) {
         console.log('createWaiter')
         console.log(error)
         return res.status(500).json({
            code: 500,
            msg: 'Al parecer, el servicio no está disponible en estos momentos.'
         });

      }
   },
   listAllWaiter: async (req, res) => {
      try {
         var dataInfo = await models.Waiters.findAll();

         if (!dataInfo) {
            return res.status(404).json({
               code: 404,
               msg: 'No ha regitstrado a un mesero.'
            });
         }
         return res.status(200).json({
            dataInfo,
            code: 200,
            msg: 'Listado de todos los meseros'
         });

      } catch (error) {
         console.log('listAllWaiter')
         console.log(error)
         return res.status(500).json({
            code: 500,
            msg: 'Al parecer, el servicio no está disponible en estos momentos.'
         });
      }
   },
   viewWaiterDetail: async (req, res) => {
      try {
         var idWtr = {
            where: {
               id: req.params.id
            }
         };
         var dataInfo = await models.Waiters.findAll(idWtr);
         if (!dataInfo) {
            return res.status(404).json({
               code: 404,
               msg: 'Esa persona no existe en sus registros.'
            });
         }
         return res.status(200).json({
            dataInfo,
            code: 200,
            msg: 'Información del mesero.'
         });

      } catch (error) {
         console.log('viewWaiterDetail')
         console.log(error)
         return res.status(500).json({
            code: 500,
            msg: 'Al parecer, el servicio no está disponible en estos momentos.'
         });
      }
   },
   accessWaiter: async (req, res) => { //Considerar una Google para acceder
      try {
         var waiterImage = req.body.waiterName;
         var waiterName = {
            where: {
               waiterName: waiterImage
            }
         };
         var pass = req.body.password;
         var infoWaiter = await models.Waiters.findAll(waiterName);

         if (infoWaiter == null || infoWaiter.lenght <= 0) {
            return res.status(404).json({
               code: 404,
               msg: 'Este nickname no está registrado.'
            });
         } else {
            var validPass = await bcrypt.compare(pass, infoWaiter.password);
            if (!validPass) {
               return res.status(404).json({
                  code: 404,
                  msg: 'Contraseña incorrecta.'
               });
            } else {
               var data = infoWaiter;
               var nick = infoWaiter.waiterName;
               infoWaiter.genericNickName = nick;
               var token = encode(infoWaiter);
               return res.status(200).json({
                  data,
                  code: 200,
                  token:token,
                  msg: '¡Usted ha iniciado sesión!'
               });
            }
         }
      } catch (error) {
         console.log('accessWaiter')
         console.log(error)
         return res.status(500).json({
            code: 500,
            msg: 'Al parecer, el servicio no está disponible en estos momentos.'
         });
      }
   },
   uploadImageWaiter: async (req, res) => {
      try {
         var idWaiter = {
            plain: true,
            where: {
               id: req.params.id
            },
            returning: true
         };
         var file = req.files;
         if (!file) {
            return res.status(404).json({
               code: 404,
               msg: 'Debe asignar una imagen.'
            });

         } else {
            let avatar = file.avatar;
            var objWtr = {
               waiterImage: avatar.name
            };
            var dataInfo = await models.Waiters.update(objWtr, idWaiter);

            if (!dataInfo) {
               return res.status(403).json({
                  code: 403,
                  msg: 'No se alamcenó el dato de la imagen.'
               });
            } else {
               var pathImg = './waiters-imgs/';
               var moveImg = pathImg + avatar.name;
               var imgWaiter = dataInfo.waiterImage
               await avatar.mv(moveImg);
               var img = path.resolve(pathImg + imgWaiter);
               return res.sendFile(img);
            }
         }
      } catch (error) {
         console.log('uploadImageWaiter');
         console.log(error)
         return res.status(500).json({
            code: 500,
            msg: 'Al parecer, el servicio no está disponible en estos momentos.'
         });
      }
   },
   updateInfoWaiter: async (req, res) => {
      try {
         var idWaiter = {
            plain: true,
            where: {
               id: req.params.id
            },
            returning: true
         };
         var params = req.body;
         var objWtr = {
            firstName: params.firstName,
            lastName: params.lastName,
            password: await bcrypt.hash(params.password, saltRounds),
            cellphone: params.cellphone,
            sex: params.sex,
            waiterName: params.waiterName,
            address1: params.address,
            salary: params.salary,
         }
         var dataInfo = await models.Waiters.update(objWtr, idWaiter);

         if (!dataInfo) {
            return res.status(404).json({
               code: 404,
               msg: 'No existe el mesero a modificar.'
            });
         }
         return res.status(200).json({
            dataInfo,
            code: 200,
            msg: 'Información modificada con éxito.'
         });
      } catch (error) {
         console.log('updateInfoWaiter');
         console.log(error)
         return res.status(500).json({
            code: 500,
            msg: 'Al parecer, el servicio no está disponible en estos momentos.'
         });
      }
   }
}

async function toDoNewWaiter(params) {
   var info = {
      firstName: params.firstName,
      lastName: params.lastName,
      password: await bcrypt.hash(params.password, saltRounds),
      cellphone: params.cellphone,
      sex: params.sex,
      waiterName: params.waiterName,
      address: params.address,
      salary: params.salary,
   };
   return info;
}