'use strict';

const express = require('express');
const rTable = express();
const {
    decode
} = require('../../middlewares/index');
const {
    TableControll
} = require('../../controllers/index');

rTable.route('/table-create/', decode.authMethod).post(TableControll.createTable);
rTable.route('/table-list/', decode.authMethod).get(TableControll.listTable);

module.exports = rTable;