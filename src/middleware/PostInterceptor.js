const Logger           = require('../lib/logger')          ;
const {RESPONSE_FIELD} = require("../common/ResponseConst");

/**
 * namespace middleware
 * property {module:middleware/PostInterceptor} PostInterceptor - 후처리 interceptor
 */

/**
 *  후처리 interceptor
 *  module       middleware/PostInterceptor
 *  author       김정현
 *  version      1.0, 작업 내용
 */

const PostInterceptor = async (req, res, next) =>{

  const oldSend = res.send;

  // response overriding
  res.send = async (responseData) => {

    console.log(`res.send`);
    console.log(responseData);

    /** object 형태가 아닌 경우 응답 객체를 바로 응답  */
    if(typeof responseData !== 'object'){
      res.send = oldSend ;
      return res.send(responseData);
    }

    // 암호화 여부 체크
    const secure      = responseData.getSecure();

    // 요청 데이터
    const requestData = responseData.getRequestData();

    // 응답 데이터
    const data        = responseData.getData();

    // http status code  설정
    if(data.hasOwnProperty(RESPONSE_FIELD.CODE)){
      res.status(data[RESPONSE_FIELD.CODE]);
      delete data[RESPONSE_FIELD.CODE];
    }

    // 요청 데이터가 있는 경우
    if(requestData){

      const isConnected = requestData.isConnected();

      // 연결 상태인 경우
      if(isConnected === true){
        Logger.error(`No Database released ${req.originalUrl} method ${req.method}`);
        requestData.end(responseData.isSuccess());
      }
    }
    /** todo
     *  암호화 기능 추가
     */
    if(secure === true){

    }

    // 기존 send function 을 변경
    res.send = oldSend ;
    return res.send(data);
  }

  next();
}                                   ;

module.exports = PostInterceptor    ;
