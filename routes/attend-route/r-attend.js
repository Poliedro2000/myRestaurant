'use strict';

const express = require('express');
const rAttend = express();
const { decode } = require('../../middlewares/index');
const { AttendControll } = require('../../controllers/index');

rAttend.route('/attend-create/', decode.authMethod).post(AttendControll.createAttending);
rAttend.route('/attend-list/:waiterId', decode.authMethod).get(AttendControll.listAttendByWaiter);
rAttend.route('/attend-free/:id', decode.authMethod).put(AttendControll.changesStatusAttending);

module.exports = rAttend;