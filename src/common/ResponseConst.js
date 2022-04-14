const {StatusCodes} = require('http-status-codes');

/**
 *  응답 데이터 field 정의
 *  @constant {object}
 */
const RESPONSE_FIELD = {
  CODE  : 'code'      ,     // 응답 코드
  MSG   : 'message'   ,     // 응답 메시지
  DATA  : 'data'      ,      // 응답 데이터

  ROWS  : 'rows'      ,     // 응답 row 수
  TOTAL : 'total'     ,     // total row 수
  PAGE  : 'page'      ,     // 현재 page
};


/**
 *  응답 코드 테이블
 *  @constant {object}
 */
const RESPONSE_CODE = {

  // 정상 응답 값
  SUCCESS             : { [RESPONSE_FIELD.CODE] : StatusCodes.OK , [RESPONSE_FIELD.MSG] : 'Success' },
  CONTACT_ADMIN       : { [RESPONSE_FIELD.CODE] : StatusCodes.INTERNAL_SERVER_ERROR , [RESPONSE_FIELD.MSG] : 'Please contact the administrator' },

  // validation
  REQUIRED_FIELD      : { [RESPONSE_FIELD.CODE] : StatusCodes.BAD_REQUEST  , [RESPONSE_FIELD.MSG] : 'Please fill the required field' },

  // 토큰 관련
  NO_TOKEN            : { [RESPONSE_FIELD.CODE] : StatusCodes.BAD_REQUEST  , [RESPONSE_FIELD.MSG] : 'No Token' },
  TOKEN_EXPIRED       : { [RESPONSE_FIELD.CODE] : StatusCodes.UNAUTHORIZED , [RESPONSE_FIELD.MSG] : 'TokenExpiredError: jwt expired' },
  INVALID_TOKEN       : { [RESPONSE_FIELD.CODE] : StatusCodes.UNAUTHORIZED , [RESPONSE_FIELD.MSG] : 'Invalid Token' },
  VERIFY_TOKEN_FAIL   : { [RESPONSE_FIELD.CODE] : StatusCodes.UNAUTHORIZED , [RESPONSE_FIELD.MSG] : 'Verify Token fail' },

  // 인증 체크
  WRONG_ACCOUNT     : { [RESPONSE_FIELD.CODE] : StatusCodes.UNAUTHORIZED  , [RESPONSE_FIELD.MSG] : 'The account is incorrect' },
  WRONG_PASSWORD    : { [RESPONSE_FIELD.CODE] : StatusCodes.UNAUTHORIZED  , [RESPONSE_FIELD.MSG] : 'The current password is incorrect' },

  // 아이디 중복
  ID_DUPLICATE      : { [RESPONSE_FIELD.CODE] : StatusCodes.CONFLICT      , [RESPONSE_FIELD.MSG] : 'The user ID is duplicated' },

  // Custom 에러
  NO_DATA           : { [RESPONSE_FIELD.CODE] : StatusCodes.NO_CONTENT     , [RESPONSE_FIELD.MSG] : 'No data' },

  // DB 에러
  DB_ERROR          : { [RESPONSE_FIELD.CODE] : StatusCodes.INTERNAL_SERVER_ERROR , [RESPONSE_FIELD.MSG] : 'Database processing Error' },
};


module.exports = {
  RESPONSE_FIELD  : RESPONSE_FIELD,
  RESPONSE_CODE   : RESPONSE_CODE ,
};
