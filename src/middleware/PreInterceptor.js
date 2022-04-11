// API 호출 이전 middleware

// Redis
const Redis                   = require('../lib/redis')                 ;

// 응답 관련 define
const { SUCCESS_CODE }        = require('../common/ResponseConst')      ;

/** 인증 예외  API */
const { RequestAuthPass }     = require('../common/RequestAuthPass')    ;

const PreInterceptor = async (req, res, next) =>{

  try {

    /** 인증 예외  API 를 확인 , method 와 요청 URL 체크 */
    if (RequestAuthPass.some(api => req.method === api['METHOD'] && req.originalUrl === api['URL'])) {
      return next();
    }

    /** 인증 체크  */
    const authCheck = await Redis.getRedis(req);

    // 인증 체크에 성공하였을 때
    if (authCheck.getResponseCode() === SUCCESS_CODE) {
      return next();
    }

    res.send(authCheck.getData());
  }
  catch (e) {
    console.log(`Error ${e}`);
    return null ;
  }

};

module.exports = PreInterceptor;
