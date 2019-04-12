var express = require('express');
var router = express.Router();
const testController = require('../controllers/testController');

router.get('/testServer', testController.index);

module.exports = router;
