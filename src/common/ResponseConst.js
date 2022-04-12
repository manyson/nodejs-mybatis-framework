// 응답 데이터 field 정의
const RESPONSE_FIELD = {
  CODE  : 'code'    ,     // 응답 코드
  MSG   : 'msg'     ,     // 응답 메시지
  DATA  : 'data'    ,     // 응답 데이터

  ROWS  : 'rows'    ,     // 응답 row 수
  TOTAL : 'total'   ,     // total row 수
  PAGE  : 'page'    ,     // 현재 page

  TYPE  : 'type'    ,     // 응답 데이터 타입
  ID    : 'ID'      ,     // 응답 데이터 ID
  DESCRIPTION : 'description' , // description
};

// 응답 Type 값
const RESPONSE_TYPE = {
  NEW     : 'new',
  UPDATE  : 'update',
  DELETE  : 'delete',
};

// 응답 코드 테이블
const RESPONSE_CODE = {
  // 정상 응답 값
  SUCCESS           : { [RESPONSE_FIELD.CODE] : 1     , [RESPONSE_FIELD.MSG] : 'ok' },
  HELLO             : { [RESPONSE_FIELD.CODE] : 1     , [RESPONSE_FIELD.MSG] : 'Hello' },
  PWD_CHANGED       : { [RESPONSE_FIELD.CODE] : 1     , [RESPONSE_FIELD.MSG] : 'Your password has been successfully changed' },
  LOGOUT            : { [RESPONSE_FIELD.CODE] : 1     , [RESPONSE_FIELD.MSG] : 'You have successfully logged out' },

  // Custom 에러
  NO_DATA           : { [RESPONSE_FIELD.CODE] : 0     , [RESPONSE_FIELD.MSG] : 'No data' },
  CONTACT_ADMIN     : { [RESPONSE_FIELD.CODE] : -1    , [RESPONSE_FIELD.MSG] : 'Please contact the administrator' },
  CANNOT_CHANGE     : { [RESPONSE_FIELD.CODE] : -2    , [RESPONSE_FIELD.MSG] : 'Cannot Change' },
  NO_PERMISSION     : { [RESPONSE_FIELD.CODE] : -3    , [RESPONSE_FIELD.MSG] : 'No Permission' },
  LOCKED            : { [RESPONSE_FIELD.CODE] : -4    , [RESPONSE_FIELD.MSG] : 'Locked' },
  NO_FILE           : { [RESPONSE_FIELD.CODE] : -5    , [RESPONSE_FIELD.MSG] : 'No File' },
  NO_SHEET          : { [RESPONSE_FIELD.CODE] : -6    , [RESPONSE_FIELD.MSG] : 'No Sheet' },
  REQUIRED_FIELD    : { [RESPONSE_FIELD.CODE] : -7    , [RESPONSE_FIELD.MSG] : 'Please fill the required field' },
  REQUIRED_FIELDS   : { [RESPONSE_FIELD.CODE] : -7    , [RESPONSE_FIELD.MSG] : 'Please fill in all required fields in the previous steps' },
  FILE_RENAME       : { [RESPONSE_FIELD.CODE] : -8    , [RESPONSE_FIELD.MSG] : 'File Rename Error' },
  PARSE_ERROR       : { [RESPONSE_FIELD.CODE] : -9    , [RESPONSE_FIELD.MSG] : 'Parse Error' },
  ALREADY_EXISTS    : { [RESPONSE_FIELD.CODE] : -10   , [RESPONSE_FIELD.MSG] : 'This item already exists' },
  NO_METADATA       : { [RESPONSE_FIELD.CODE] : -11   , [RESPONSE_FIELD.MSG] : 'No metadata' },
  NO_SELECT_ITEM    : { [RESPONSE_FIELD.CODE] : -12   , [RESPONSE_FIELD.MSG] : 'Please select at least one list item' },
  CHECK_AUTH        : { [RESPONSE_FIELD.CODE] : -13   , [RESPONSE_FIELD.MSG] : 'Please check your Email Account or Password' },
  AUTH_ERROR        : { [RESPONSE_FIELD.CODE] : -100  , [RESPONSE_FIELD.MSG] : 'Auth Error' },
  WRONG_ACCOUNT     : { [RESPONSE_FIELD.CODE] : -101  , [RESPONSE_FIELD.MSG] : 'The email account is incorrect' },
  NO_PARAMETER      : { [RESPONSE_FIELD.CODE] : -102  , [RESPONSE_FIELD.MSG] : 'No Parameter' },



  WRONG_PASSWORD    : { [RESPONSE_FIELD.CODE] : -107  , [RESPONSE_FIELD.MSG] : 'The current password is incorrect' },
  NO_VALID          : { [RESPONSE_FIELD.CODE] : -108  , [RESPONSE_FIELD.MSG] : 'The account has expired and is no longer valid' },
  USER_EXISTS       : { [RESPONSE_FIELD.CODE] : -109  , [RESPONSE_FIELD.MSG] : 'This user already exists' },
  ACCOUNT_LOCKED    : { [RESPONSE_FIELD.CODE] : -110  , [RESPONSE_FIELD.MSG] : 'Account Locked' },
  DOUBLE_CONNECTION : { [RESPONSE_FIELD.CODE] : -111  , [RESPONSE_FIELD.MSG] : 'You have been signed out of our Service because someone has logged into your account from another location' },
  TYPE_ERROR        : { [RESPONSE_FIELD.CODE] : -112  , [RESPONSE_FIELD.MSG] : 'Control Type is not Active' },
  MKDIR_FAIL        : { [RESPONSE_FIELD.CODE] : -113  , [RESPONSE_FIELD.MSG] : 'Making a file directory unexpectedly terminated' },
  READ_ERROR        : { [RESPONSE_FIELD.CODE] : -114  , [RESPONSE_FIELD.MSG] : 'File system has been unexpectedly terminated, while reading' },
  WRITE_ERROR       : { [RESPONSE_FIELD.CODE] : -115  , [RESPONSE_FIELD.MSG] : 'File system has been unexpectedly terminated, while writing' },
  API_ERROR         : { [RESPONSE_FIELD.CODE] : -116  , [RESPONSE_FIELD.MSG] : 'API Error' },
  DOWNLOAD_ERROR    : { [RESPONSE_FIELD.CODE] : -117  , [RESPONSE_FIELD.MSG] : 'Download Failed' },
  NOT_EXCEL         : { [RESPONSE_FIELD.CODE] : -118  , [RESPONSE_FIELD.MSG] : 'Please upload Excel Files' },
  RAVE_ERROR        : { [RESPONSE_FIELD.CODE] : -119  , [RESPONSE_FIELD.MSG] : 'Please check your API Account/Password or URL' },
  TRAINING_ERROR    : { [RESPONSE_FIELD.CODE] : -120  , [RESPONSE_FIELD.MSG] : 'Please complete the training first' },
  COMPLETED_ERROR   : { [RESPONSE_FIELD.CODE] : -121  , [RESPONSE_FIELD.MSG] : 'This training has already been completed' },
  INVALID_PASSWORD  : { [RESPONSE_FIELD.CODE] : -122  , [RESPONSE_FIELD.MSG] : 'Your password must be at least 10 characters long, which contains at least one lowercase letter, one uppercase letter, one numeric digit, and one special character' },
  USED_PASSWORD     : { [RESPONSE_FIELD.CODE] : -123  , [RESPONSE_FIELD.MSG] : 'Your new password is too similar to your current password. Please try another password.' },
  WRONG_NAME        : { [RESPONSE_FIELD.CODE] : -124  , [RESPONSE_FIELD.MSG] : 'The user is incorrect' },
  COLUMN_UNMATCH    : { [RESPONSE_FIELD.CODE] : -125  , [RESPONSE_FIELD.MSG] : 'Please do not alter or add any column name in your files' },
  SHEET_UNMATCH     : { [RESPONSE_FIELD.CODE] : -126  , [RESPONSE_FIELD.MSG] : 'Please do not alter or add any sheet name in your files' },
  DELETE_ERROR      : { [RESPONSE_FIELD.CODE] : -127  , [RESPONSE_FIELD.MSG] : 'File system has been unexpectedly terminated, while deleting' },
  LOGIN_FAIL_OVER   : { [RESPONSE_FIELD.CODE] : -128  , [RESPONSE_FIELD.MSG] : 'Please contact the administrator' },
  PASSWORD_ERROR_MEG: { [RESPONSE_FIELD.CODE] : -129  , [RESPONSE_FIELD.MSG] : 'You entered an incorrect password $n time$s' },
  PACKAGE_FAILED    : { [RESPONSE_FIELD.CODE] : -130  , [RESPONSE_FIELD.MSG] : 'There is error in packaging file. Please try again.' },
  INVALID_FILE      : { [RESPONSE_FIELD.CODE] : -131  , [RESPONSE_FIELD.MSG] : 'Invalid File Error' },
  NON_NUMERIC       : { [RESPONSE_FIELD.CODE] : -132  , [RESPONSE_FIELD.MSG] : 'Non-Numeric Data in a Numeric Field' },

  PROCESSING        : { [RESPONSE_FIELD.CODE] : -200  , [RESPONSE_FIELD.MSG] : 'Processing' },

  // DB 에러
  DB_ERROR          : { [RESPONSE_FIELD.CODE] : -1000 , [RESPONSE_FIELD.MSG] : 'DB Error' },
  NO_CHANGE         : { [RESPONSE_FIELD.CODE] : -1001 , [RESPONSE_FIELD.MSG] : 'No changed data' },
  PROCESS_ERROR     : { [RESPONSE_FIELD.CODE] : -1002 , [RESPONSE_FIELD.MSG] : 'Data Process Error' },
  BAD_CONNECTION    : { [RESPONSE_FIELD.CODE] : -1003 , [RESPONSE_FIELD.MSG] : 'DB connection failed' },

  // Http 에러
  BAD_REQUEST       : { [RESPONSE_FIELD.CODE] : 400   , [RESPONSE_FIELD.MSG] : 'Bad Request' },
  UNAUTHORIZED      : { [RESPONSE_FIELD.CODE] : 401   , [RESPONSE_FIELD.MSG] : 'Unauthorized' },
  FORBIDDEN         : { [RESPONSE_FIELD.CODE] : 403   , [RESPONSE_FIELD.MSG] : 'Forbidden' },
  NOT_FOUND         : { [RESPONSE_FIELD.CODE] : 404   , [RESPONSE_FIELD.MSG] : 'Not Found' },
  NOT_ALLOWED       : { [RESPONSE_FIELD.CODE] : 405   , [RESPONSE_FIELD.MSG] : 'Method Not Allowed' },
  NOT_ACCEPTABLE    : { [RESPONSE_FIELD.CODE] : 406   , [RESPONSE_FIELD.MSG] : 'Not Acceptable' },
  PROXY_AUTH        : { [RESPONSE_FIELD.CODE] : 407   , [RESPONSE_FIELD.MSG] : 'Proxy Authentication Required' },
  REQUEST_TIMEOUT   : { [RESPONSE_FIELD.CODE] : 408   , [RESPONSE_FIELD.MSG] : 'Request Timeout' },
  CONFLICT          : { [RESPONSE_FIELD.CODE] : 409   , [RESPONSE_FIELD.MSG] : 'Conflict' },
  GONE              : { [RESPONSE_FIELD.CODE] : 410   , [RESPONSE_FIELD.MSG] : 'Gone' },
  LENGTH_REQUIRED   : { [RESPONSE_FIELD.CODE] : 411   , [RESPONSE_FIELD.MSG] : 'Length Required' },
  PRECONDITION_FAIL : { [RESPONSE_FIELD.CODE] : 412   , [RESPONSE_FIELD.MSG] : 'Precondition Failed' },
  TOO_LARGE         : { [RESPONSE_FIELD.CODE] : 413   , [RESPONSE_FIELD.MSG] : 'Payload Too Large' },
  TOO_LONG          : { [RESPONSE_FIELD.CODE] : 414   , [RESPONSE_FIELD.MSG] : 'URI Too Long' },
  MEDIA_TYPE        : { [RESPONSE_FIELD.CODE] : 415   , [RESPONSE_FIELD.MSG] : 'Unsupported Media Type' },
  NOT_SATISFIABLE   : { [RESPONSE_FIELD.CODE] : 416   , [RESPONSE_FIELD.MSG] : 'Requested Range Not Satisfiable' },
  EXPECT_FAIL       : { [RESPONSE_FIELD.CODE] : 417   , [RESPONSE_FIELD.MSG] : 'Expectation Failed' },
  TEAPOT            : { [RESPONSE_FIELD.CODE] : 418   , [RESPONSE_FIELD.MSG] : "I'm a teapot" },
  MISDIRECT         : { [RESPONSE_FIELD.CODE] : 421   , [RESPONSE_FIELD.MSG] : 'Misdirected Request' },
  UNPROCESSABLE     : { [RESPONSE_FIELD.CODE] : 422   , [RESPONSE_FIELD.MSG] : 'Unprocessable Entity' },
  LOCKED_RESOURCE   : { [RESPONSE_FIELD.CODE] : 423   , [RESPONSE_FIELD.MSG] : 'Locked' },
  DEPENDENCY_FAIL   : { [RESPONSE_FIELD.CODE] : 424   , [RESPONSE_FIELD.MSG] : 'Failed Dependency' },
  UPGRADE_REQUIRED  : { [RESPONSE_FIELD.CODE] : 426   , [RESPONSE_FIELD.MSG] : 'Upgrade Required' },
  PRECOND_REQUIRED  : { [RESPONSE_FIELD.CODE] : 428   , [RESPONSE_FIELD.MSG] : 'Precondition Required' },
  TOO_MANY          : { [RESPONSE_FIELD.CODE] : 429   , [RESPONSE_FIELD.MSG] : 'Too Many Requests' },
  TOO_LARGE_HEAD    : { [RESPONSE_FIELD.CODE] : 431   , [RESPONSE_FIELD.MSG] : 'Request Header Fields Too Large' },
  LEGAL_REASON      : { [RESPONSE_FIELD.CODE] : 451   , [RESPONSE_FIELD.MSG] : 'Unavailable For Legal Reasons' },

  INTERNAL_SERVER   : { [RESPONSE_FIELD.CODE] : 500   , [RESPONSE_FIELD.MSG] : 'Internal Server Error' },
  NOT_IMPLEMENTED   : { [RESPONSE_FIELD.CODE] : 501   , [RESPONSE_FIELD.MSG] : 'Not Implemented' },
  BAD_GATEWAY       : { [RESPONSE_FIELD.CODE] : 502   , [RESPONSE_FIELD.MSG] : 'Bad Gateway' },
  UNAVAILABLE       : { [RESPONSE_FIELD.CODE] : 503   , [RESPONSE_FIELD.MSG] : 'Service Unavailable' },
  GATEWAY_TIMEOUT   : { [RESPONSE_FIELD.CODE] : 504   , [RESPONSE_FIELD.MSG] : 'Gateway Timeout' },
  HTTP_VERSION      : { [RESPONSE_FIELD.CODE] : 505   , [RESPONSE_FIELD.MSG] : 'HTTP Version Not Supported' },
  NEGOTIATE         : { [RESPONSE_FIELD.CODE] : 506   , [RESPONSE_FIELD.MSG] : 'Variant Also Negotiates' },
  SHORT_STORAGE     : { [RESPONSE_FIELD.CODE] : 507   , [RESPONSE_FIELD.MSG] : 'Insufficient Storage' },
  LOOP_DETECTED     : { [RESPONSE_FIELD.CODE] : 508   , [RESPONSE_FIELD.MSG] : 'Loop Detected' },
  NOT_EXTENDED      : { [RESPONSE_FIELD.CODE] : 510   , [RESPONSE_FIELD.MSG] : 'Not Extended' },
  AUTH_REQUIRED     : { [RESPONSE_FIELD.CODE] : 511   , [RESPONSE_FIELD.MSG] : 'Network Authentication Required' },

  NO_TOKEN            : { [RESPONSE_FIELD.CODE] : -103  , [RESPONSE_FIELD.MSG] : 'No Token' },
  TOKEN_EXPIRED       : { [RESPONSE_FIELD.CODE] : -104  , [RESPONSE_FIELD.MSG] : 'TokenExpiredError: jwt expired' },
  INVALID_TOKEN       : { [RESPONSE_FIELD.CODE] : -105  , [RESPONSE_FIELD.MSG] : 'Invalid Token' },
  VERIFY_TOKEN_FAIL   : { [RESPONSE_FIELD.CODE] : -106  , [RESPONSE_FIELD.MSG] : 'Verify Token fail' },

};

// 응답 코드 응답
const getResCode = (responseCode) =>{

  // eslint-disable-next-line no-prototype-builtins
  if(RESPONSE_CODE.hasOwnProperty(responseCode) === true){
    return RESPONSE_CODE[responseCode][RESPONSE_FIELD.CODE];
  }
  return undefined;
}

// 정상 응답 코드
const SUCCESS_CODE =  RESPONSE_CODE['SUCCESS'][RESPONSE_FIELD.CODE]             ;
const SUCCESS_MSG  =  RESPONSE_CODE['SUCCESS'][RESPONSE_FIELD.MSG].toUpperCase();

module.exports = {
  RESPONSE_FIELD  : RESPONSE_FIELD,
  RESPONSE_TYPE   : RESPONSE_TYPE ,
  RESPONSE_CODE   : RESPONSE_CODE ,
  getResCode      : getResCode    ,
  SUCCESS_CODE    : SUCCESS_CODE  ,
  SUCCESS_MSG     : SUCCESS_MSG   ,
};
