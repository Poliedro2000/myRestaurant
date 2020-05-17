'use strict';

const express = require('express');
const rWaiter = express();
const {
   decode
} = require('../../middlewares/index');
const {
   WaiterControll
} = require('../../controllers/index');

rWaiter.route('/waiter-create/', decode.authMethod).post(WaiterControll.createWaiter);
rWaiter.route('/waiter-list/', decode.authMethod).get(WaiterControll.listAllWaiter);
rWaiter.route('/waiter-view/:_id', decode.authMethod).get(WaiterControll.viewWaiterDetail);
rWaiter.route('/waiter-access/').post(WaiterControll.accessWaiter);
rWaiter.route('/waiter-upinf/:_id', decode.authMethod).put(WaiterControll.updateInfoWaiter);

module.exports = rWaiter;