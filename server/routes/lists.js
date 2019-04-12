var express = require('express');
var router = express.Router();
const listController = require('../controllers/listController');

router.get('/lists', listController.index);
router.post('/lists/create', listController.create);

module.exports = router;
