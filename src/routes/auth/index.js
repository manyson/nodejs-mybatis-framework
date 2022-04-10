const express = require('express');
const router = express.Router();

const authRouter = require('authRouter');

// auth 처리
router.use('/' ,authRouter);

module.exports = router;
