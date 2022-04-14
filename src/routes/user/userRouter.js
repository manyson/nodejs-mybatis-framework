const express     = require('express');
const router      = express.Router();

// controller
const controller  = require('../../controller/user/UserController');

/** 회원 가입 */
router.post('/signUp'       , controller.signUp);

/** 로그인  */
router.post('/login'        , controller.login);

/** 사용자 정보 조회 */
router.get('/info'          , controller.userInfo);

/** 사용자 정보 수정 */
router.put('/info'          , controller.userUpdate);

/** 사용자 정보 삭제 */
router.delete('/info'       , controller.userDelete);

module.exports = router;
