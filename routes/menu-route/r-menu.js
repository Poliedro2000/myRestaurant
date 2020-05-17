'use strict';

const express = require('express');
const rMenu = express();
const {
    decode
} = require('../../middlewares/index');
const {
    MenuControll
} = require('../../controllers/index');

rMenu.route('/menu-create/', decode.authMethod).post(MenuControll.createMenues);
rMenu.route('/menu-list-ctgry/:idCat', decode.authMethod).get(MenuControll.listMenuByCategory);
rMenu.route('/menu-view/:_id', decode.authMethod).get(MenuControll.viewDetailMenu);
rMenu.route('/menu-update/:id', decode.authMethod).put(MenuControll.editMenue);
rMenu.route('/menu-del/:id', decode.authMethod).delete(MenuControll.deleteMenu);

module.exports = rMenu;