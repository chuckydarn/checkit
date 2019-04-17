var express = require('express');
var router = express.Router();
const userController = require("../controllers/userController")

router.get("/users/:id", userController.index);
router.post("/users", userController.create);
router.post("/users/signin", userController.signIn);

module.exports = router;
