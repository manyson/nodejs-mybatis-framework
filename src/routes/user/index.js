const express     = require('express');
const router      = express.Router();

const userRouter = require('./userRouter');

// user 처리
router.use('/' ,userRouter);

module.exports = router;
