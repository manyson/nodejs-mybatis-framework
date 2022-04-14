const express   = require('express');
const router    = express.Router();

/**  유저 관련 router */
const user      = require('./user');

/** 운영 이외의 환경인 경우. Console 에 HTTP Request 로그 */
if (process.env.NODE_ENV !== 'production') {
  const morgan = require('morgan');
  router.use(morgan('dev'));
}

router.use('/user'    , user      );

module.exports = router;
