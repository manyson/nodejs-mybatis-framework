/** constant          */
const {HTTP_REQUEST}          = require('../common/Constant')           ;

/** 인증 예외  API     */
const { RequestAuthPass }     = require('../common/RequestAuthPass')    ;

const {getPayload}            = require('../lib/jwt')                   ;
const {DATA_FIELD_NAME}       = require("../common/Constant")           ;
const {StatusCodes}           = require("http-status-codes")            ;
const {RESPONSE_FIELD}        = require("../common/ResponseConst")      ;

/**
 * namespace middleware
 * property {module:middleware/PreInterceptor} PreInterceptor - 선처리 interceptor
 */

/**
 *  선처리 interceptor
 *  module       middleware/PreInterceptor
 *  author       김정현
 *  version      1.0, 작업 내용
 */

const PreInterceptor = async (req, res, next) =>{

  /** swagger  */
  if(req.originalUrl.startsWith("/api-docs")) {
    return next();
  }

  /** 인증 예외  API 를 확인, method 와 요청 URL 체크 */
  if (RequestAuthPass.some(api => req.method === api[HTTP_REQUEST.METHOD] && req.originalUrl === api[HTTP_REQUEST.URL])) {
    return next();
  }

  /** 토큰 체크  */
  const responseData = getPayload(req);

  /** 인증 체크에 성공하였을 때 데이터 셋탕하고 다음 단계  */
  if (responseData.getResponseCode() === StatusCodes.OK) {

    const payload = responseData.getDataValue(DATA_FIELD_NAME.PAYLOAD);

    // jwt decode 값을 request 객체에 보관
    req[DATA_FIELD_NAME.PAYLOAD] = payload;
    return next();
  }
  else{
    /** 에러 응답 */
    const data = responseData.getData();

    if(data.hasOwnProperty(RESPONSE_FIELD.CODE)){
      res.status(data[RESPONSE_FIELD.CODE]);
      delete data[RESPONSE_FIELD.CODE];
    }

    res.send(data);
  }
};

module.exports = PreInterceptor;
