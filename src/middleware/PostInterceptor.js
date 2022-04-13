// 후처리 interceptor
const Logger              = require('../lib/logger')          ;

const { S3 }              = require("../common/Constant")     ;
const { CHAR_SYMBOL}      = require("../common/Constant")     ;
const { DATA_FIELD_NAME } = require("../common/Constant")     ;
const { DATE_FORMAT }     = require("../common/Constant")     ;
const { REGEX_PATTERN }   = require("../common/Constant")     ;
const { ENVIRONMENT }     = require("../common/Constant")     ;
const {RESPONSE_FIELD} = require("../common/ResponseConst");


const PostInterceptor = async (req, res, next) =>{

  const oldSend = res.send;

  // response overriding
  res.send = async (responseData) => {

    console.log(`res.send`);
    console.log(responseData);

    // 여기 부터
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

    if(data.hasOwnProperty(RESPONSE_FIELD.CODE)){
      res.status(data[RESPONSE_FIELD.CODE]);
      delete data[RESPONSE_FIELD.CODE];
    }

    // res.status(406);

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
    else{

    }
    // 기존 send function을 변경
    res.send = oldSend              ;
    return res.send(data)           ;
  }

  next()                            ;
}                                   ;

module.exports = PostInterceptor    ;
