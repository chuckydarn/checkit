var express = require('express');
var router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/items', itemController.index);
router.post('/items/create', itemController.create);
router.post('/items/:id/check', itemController.check);
router.post('/items/:id/update', itemController.update);
router.post('/items/destroy', itemController.destroy);

module.exports = router;
