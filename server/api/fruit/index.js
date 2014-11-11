'use strict';

var express = require('express');
var controller = require('./fruit.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.put('/add/:id', controller.add);
router.delete('/:id', controller.destroy);

module.exports = router;