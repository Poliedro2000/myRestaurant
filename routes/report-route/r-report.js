'use strict';

const express = require('express');
const rReprot = express();
const {
    decode
} = require('../../middlewares/index');
const {
    ReportControll
} = require('../../controllers/index');

rReprot.route('/reprotby-date/', decode.authMethod).get(ReportControll.viewProfits);
rReprot.route('/reprot-waiter/:id', decode.authMethod).get(ReportControll.soldByWaiter);

module.exports = rReprot;