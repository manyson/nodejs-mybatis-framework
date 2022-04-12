// module import
const {RESPONSE_FIELD}  = require('./ResponseConst');
const ResponseBase      = require('./ResponseBase');
const {SUCCESS_CODE}    = require('./ResponseConst');

// 응답 객체(정보, 수정, 삭제용 응답 객체)
class ResponseData extends ResponseBase{

  constructor(requestData = null, code = SUCCESS_CODE){

    // 응답 객체 생성
    super({
      [RESPONSE_FIELD.CODE]   : code  ,
      [RESPONSE_FIELD.MSG]    : ''    ,
      [RESPONSE_FIELD.ROWS]   : 0     ,
      [RESPONSE_FIELD.DATA]   : {}    ,
    }, requestData);
  }
}

module.exports = ResponseData ;
