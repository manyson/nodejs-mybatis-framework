const express     = require('express');
const router      = express.Router();

// controller
const controller  = require('../../controller/user/UserController');

// user 요청에 대한 처리
router.post('/login'        , controller.login);

module.exports = router;
