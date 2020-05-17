'use strict';

require('dotenv').config();
module.exports = {
    username: process.env._USER_,
    password: process.env._PASS_,
    database: process.env._DBNAME_,
    host: process.env._HOST_,
    dialect: process.env._DIALECT_,
    dataurl: process.env.DATABASE_URL,
    secret: process.env._SECRETE_,
    rabbit: process.env._RABBIT_,
    memorydb: process.env._CACHEDB_
};