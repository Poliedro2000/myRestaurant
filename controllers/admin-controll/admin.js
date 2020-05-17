'use strict';

const models = require('../../models');
const {
   encode
} = require('../../middlewares/index')
const bcrypt = require('bcrypt');
const getSalt = 10;

module.exports = {
   createAdministrator: async (req, res) => {
      try {
         var params = req.body;
         var objAdm = {
            firstName: params.firstName,
            lastName: params.lastName,
            nickName: params.nickName,
            email: params.email,
            password: await bcrypt.hash(params.password, getSalt),
            cellphone: params.cellphone,
            profile: params.profile
         }
         var dataInfo = await models.Administrator.create(objAdm);

         if (!dataInfo) {
            return res.status(202).json({
               code: 202,
               msg: 'Hubo un error al ingresar los datos. Intente de nuevo.'
            });
         }
         return res.status(200).json({
            dataInfo,
            code: 200,
            msg: 'Personal creado.'
         });

      } catch (error) {
         console.log('createAdministrator');
         console.log(error);
         return res.status(500).json({
            code: 500,
            msg: 'Al parecer, el servicio no está disponible en estos momentos.'
         });
      }
   },
   loginAdministrator: async (req, res) => {
      try {
         var params = req.body;
         var pass = params.password;
         var email = params.email;
         var setWhere = {
            where: {
               email: email
            }
         };
         var infoAdmin = await models.Administrator.findAll(setWhere);
         if (!infoAdmin) {
            return res.status(404).json({
               code: 404,
               msg: 'Este correo no está registrado. Pruebe con otro.'
            });
         } else {
            var _pass = infoAdmin.password;
            var checkPass = await bcrypt.compare(pass, _pass);
            if (!checkPass) {
               return res.status(404).json({
                  code: 404,
                  msg: 'Esta contraseña es invalida.'
               });
            } else {
               var data = infoAdmin;
               var nick = infoAdmin.nickName;
               infoAdmin.genericNickName = nick;
               var token = encode(infoAdmin);
               return res.status(200).json({
                  data,
                  code: 200,
                  token: token,
                  msg: '¡Ha iniciado sesión correctamente!'
               });
            }
         }
      } catch (error) {
         console.log('loginAdministrator');
         console.log(error);
         return res.status(500).json({
            code: 500,
            msg: 'Al parecer, el servicio no está disponible en estos momentos.'
         });
      }
   },
   updateAdministrator: async (req, res) => {
      try {
         var idAdm = req.params.id;
         var setWhere = {
            plain: true,
            where: {
               id: idAdm
            },
            returning: true
         };
         var objAdm = {
            firstName: params.firstName,
            lastName: params.lastName,
            nickName: params.nickName,
            email: params.email,
            password: await bcrypt.hash(params.password, getSalt),
            cellphone: params.cellphone,
            profile: params.profile
         }
         var dataInfo = await models.Administrator.update(objAdm, setWhere);
         if (!dataInfo) {
            return res.status(202).json({
               code: 202,
               msg: 'Hubo un error en actualizar los datos. Intente de nuevo.'
            });
         }
         return res.status(200).json({
            dataInfo,
            code: 200,
            msg: 'Personal actualizado.'
         });

      } catch (error) {
         console.log('updateAdministrator');
         console.log(error);
         return res.status(500).json({
            code: 500,
            msg: 'Al parecer, el servicio no está disponible en estos momentos.'
         });
      }
   },
   listAdministrator: async (req, res) => {
      try {
         var dataInfo;
         var setBySearch = req.params.search;
         
         if (!setBySearch) {
            dataInfo = await models.Administrator.findAll();
         } else {
            var setWhere = {
               where: {
                  profile: setBySearch
               }
            };
            dataInfo = await models.Administrator.findAll(setWhere);
         }

         if (!dataInfo) {
            return res.status(202).json({
               code: 202,
               msg: 'Hubo un error en actualizar los datos. Intente de nuevo.'
            });
         }
         return res.status(200).json({
            dataInfo,
            code: 200,
            msg: 'Personal actualizado.'
         });

      } catch (error) {
         console.log('listAdministrator');
         console.log(error);
         return res.status(500).json({
            code: 500,
            msg: 'Al parecer, el servicio no está disponible en estos momentos.'
         });
      }
   }
}