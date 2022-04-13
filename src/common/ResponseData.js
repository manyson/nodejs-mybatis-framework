// module import
const ResponseBase       = require('./ResponseBase');
const {RESPONSE_FIELD }  = require('./ResponseConst');
const {StatusCodes}      = require("http-status-codes");

// 응답 객체(정보, 수정, 삭제용 응답 객체)
class ResponseData extends ResponseBase{

  constructor(requestData = null, code = StatusCodes.OK){

    // 응답 객체 생성
    super({
      [RESPONSE_FIELD.CODE]   : code  ,
    }, requestData);
  }
}

module.exports = ResponseData ;
