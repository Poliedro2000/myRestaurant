'use strict';

const express = require('express');
const rAdmin = express();
const {
   decode
} = require('../../middlewares/index');
const { AdminControll } = require('../../controllers/index');

rAdmin.route('/admin-create/', decode.authMethod).post(AdminControll.createAdministrator);
rAdmin.route('/admin-lists/', decode.authMethod).get(AdminControll.listAdministrator);
rAdmin.route('/admin-access/').post(AdminControll.loginAdministrator);
rAdmin.route('/admin-update/', decode.authMethod).put(AdminControll.updateAdministrator);

module.exports = rAdmin;