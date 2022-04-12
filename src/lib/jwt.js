const jwt = require('jsonwebtoken');
const RequestData = require("../common/RequestData");
const ResponseData = require("../common/ResponseData");
const {DATA_FIELD_NAME} = require("../common/Constant");
const {RESPONSE_CODE} = require("../common/ResponseConst");
const SECRET_KEY = 'MY-SECRET-KEY';


/**
 * JWT 토큰 값으로 decode 된 객체를 구하는 함수
 * @description 헤터에 토큰 값을 찾아서 검증 후 응답
 * @param {Object} req HTTP 요청 객체
 * @returns {ResponseData} 응답 데이터
 */
const getDecodingToken = async (req) => {

  // 요청 데이터
  const requestData   = new RequestData(req.headers);
  // 응답 데이터
  const responseData  = new ResponseData();

  /**  header에서  authorization 데이터 존재 여부 체크  */
  if (requestData.isExist(DATA_FIELD_NAME.AUTHORIZATION)) {

    // 토큰 (req.headers.authorization)
    const authorization = requestData.getDataValue(DATA_FIELD_NAME.AUTHORIZATION);

    try {
      // 토큰을 키를 사용하여 decode
      const data = jwt.verify(authorization, SECRET_KEY);

      // 정상적으로 decode 된 데이터 설정
      responseData.setData(data);
    }
    /** error 구간  */
    catch (error) {
      // token expired
      if (error.message === 'jwt expired') {
        responseData.setResponseCode(RESPONSE_CODE.TOKEN_EXPIRED);
      } else if (error.name === 'invalid token') {
        responseData.setResponseCode(RESPONSE_CODE.INVALID_TOKEN)
      } else {
        responseData.setResponseCode(RESPONSE_CODE.VERIFY_TOKEN_FAIL);
      }
    }
  }
  /**  header 의 authorization 존재하지 않을 때  */
  else {
    responseData.setResponseCode(RESPONSE_CODE.NO_TOKEN);
  }
  return responseData;
}

module.exports = {
  getDecodingToken    ,
};