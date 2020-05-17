'use strict';

const express = require('express');
const rCategory = express();
const { decode } = require('../../middlewares/index');
const { CategoryControll } = require('../../controllers/index');

rCategory.route('/cat-create/', decode.authMethod).post(CategoryControll.createCategory);
rCategory.route('/cat-list/', decode.authMethod).get(CategoryControll.listCategories);
rCategory.route('/cat-show/:_id', decode.authMethod).put(CategoryControll.changesCatergoryShow);

module.exports = rCategory;