'use strict';

var moment = require('moment');
const models = require('../../models');
var jwt = require('jwt-simple');
const models = require('../../models');
const objConf = require('../../set-ups/setting');

exports.authMethod = async (req, res, next) => {
   if (!req.headers.authorization)
      return res.status(403).json({
         message: 'La peticion no tiene la cabecera de autenticacion'
      });

   /*var t = req.headers.authorization.token();
   console.log(t);*/

   var token = req.headers.authorization.replace(/['"]+/g, '');
   try {
      var payload = jwt.decode(token, objConf.secret, true);
      if (payload.exp <= moment().unix) {
         var objBkl = {
            unableToken: token
         }
         var findToken = await models.BlackListToken.findAll(objBkl);
         if (!findToken) {
            await models.BlackListToken.create(objBkl);
         }
         return res.status(403).json({
            message: 'El token ha expirado'
         });
      }
      var auxObj = {
         idWaiter: payload.id,
         entryWork: new Date(),
         nickName: payload.genericNickName
      };
      await models.TrackingLogin.create(auxObj);

   } catch (error) {
      console.log(error)
      return res.status(403).json({
         message: 'token no valido'
      });
   }

   req.users = payload;
   next();
}