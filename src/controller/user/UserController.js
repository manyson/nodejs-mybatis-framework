// user.user.control.js

// log
const Logger                            = require('../../lib/logger');

// 요청 데이터
const RequestData                       = require('../../common/RequestData');

// 응답 데이터
const ResponseData                      = require('../../common/ResponseData');

// jwt에 사용할 토큰 object
const PayloadData                       = require('../../common/PayloadData');

// jwt
const JWT                               = require('../../lib/jwt');

// 상수 관련 define
const {DB_FIELD_NAME}                   = require('../../common/Constant');

// 응답 관련 define
const { RESPONSE_CODE, RESPONSE_FIELD } = require('../../common/ResponseConst');

// 공통 함수
const Util                              = require('../../lib/util');

// 모델
const UserModel                         = require('../../model/user/UserModel');


// 로그인
const login = async (req, res) => {

  /**  요청 데이터  */
  let   requestData     =  new RequestData(req.body);

  /**  응답 데이터  */
  let   responseData    =  new ResponseData(requestData);

  try {

    /** 필수 입력 필드 체크 */
    const fieldList = [
      DB_FIELD_NAME.USER_ID,
      DB_FIELD_NAME.PASSWORD,
    ];

    if (!requestData.hasAllMandatoryFields(fieldList)) {
      return responseData.setResponseCode(RESPONSE_CODE.REQUIRED_FIELD);
    }

    /** 입력 데이터 validation */
    if ( Util.isEmpty(requestData.getDataValue(DB_FIELD_NAME.USER_ID))
      || Util.isEmpty(requestData.getDataValue(DB_FIELD_NAME.PASSWORD))) {

      // id 또는 password 가 없는 경우
      return responseData.setResponseCode(RESPONSE_CODE.REQUIRED_FIELD);
    }

    /**  트랜젝션 여부 셋팅   */
    await requestData.start(false);

    /**  로그인 정보 조회    */
    const userInfo              = await UserModel.selectAuth(requestData);

    /**  사용자 정보가 없는 경우  */
    if (userInfo == null) {
      return responseData.setResponseCode(RESPONSE_CODE.WRONG_ACCOUNT);
    }

    /** 비밀번호 체크 */
    let   password    = requestData.getDataValue(DB_FIELD_NAME.PASSWORD);

    const dbPassword  = userInfo[DB_FIELD_NAME.PASSWORD];
    const salt        = userInfo[DB_FIELD_NAME.SALT];

    /** 입력 받은 비밀번호 암호화 */
    password = await Util.makePasswordHashed(password, salt);

    /** 비밀번호와 다른 경우 */
    if(password !== dbPassword) {
      return  responseData.setResponseCode(RESPONSE_CODE.WRONG_PASSWORD);
    }

    /** 응답 객체 생성 */
    let payload = new PayloadData();
    payload.loadObject(userInfo);

    const payloadObject = payload.getObject();
    const token = JWT.getJWTToken(payloadObject);

    responseData.setDataValue(RESPONSE_FIELD.DATA, token);
  }
  catch (e) {
    Logger.error(e.stack);
    // 트랜잭션 롤백
    await requestData.error();
    responseData.setResponseCode(RESPONSE_CODE.CONTACT_ADMIN);
  }
  finally {
    // 트랜잭션 종료
    await requestData.end(responseData.isSuccess());
    // 데이터 응답
    res.send(responseData);
  }
};

module.exports = {
  login,
};
