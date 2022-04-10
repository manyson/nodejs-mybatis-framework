const express     = require('express');
const router      = express.Router();

// controller
const controller  = require('../../controller/auth/AuthController');

// /auth 요청에 대한 처리

// 로그인
router.post('/'        , controller.postAuth);

// 로그아웃
router.put('/'         , controller.putAuth);

// 인증 확인
router.get('/'         , controller.getAuth);

// 세션 갱신
router.put('/session'  , controller.putAuthExpireExtend)

module.exports = router;
