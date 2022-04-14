/**
 *  데이터 베이스 필드명
 *  @constant {object}
 */
const DB_FIELD_NAME = {
  USER_ID       :     'user_id'   ,
  USER_NAME     :     'user_name' ,
  PASSWORD      :     'password'  ,
  SALT          :     'salt'      ,
};

/**
 *  database query 결과 정보
 *  @constant {object}
 */
const DB_RESULT       = {
  ROW_FIRST       :  0   ,              // 첫번째 레코드
  AFFECTED_ROWS   : 'affectedRows'  ,   // 영향을 받은 record
  INSERT_ID       : 'insertId'      ,   // insert id
  WARNING_STATUS  : 'warningStatus' ,   // warning
  ONE             : 1               ,   // 결과 1건
};

/**
 *  데이터 상태 정보
 *  @constant {object}
 */
const DB_STATE       = {
  CLOSE        :  0    ,          // Close
  OPEN         :  1    ,          // 정상
  LOCK         :  2    ,          // 잠김
  DELETE       :  3    ,          // 삭제

  YES          : 'Y'   ,
  NO           : 'N'   ,
};

/**
 *  숫자 상수
 *  @constant {object}
 */
const NUMERIC          = {
  ZERO                          : 0   ,
  ONE                           : 1   ,
  TWO                           : 2   ,
};

/**
 *  local data 에서 사용하는 필드 상수
 *  @constant {object}
 */
const DATA_FIELD_NAME = {
  AUTHORIZATION       : 'authorization'         ,
  BEARER              : 'Bearer '               ,
  JWT_DECODE          : 'jwtDecode'             ,
  TOKEN               : 'token'                 ,
  PAGE                : 'page'                  ,
  PAGE_SIZE           : 'pageSize'              ,
  SKIP                : 'pageSkip'              ,

  PAYLOAD             : 'payload'               ,
  DATA                : 'data'                  ,
  BODY                : 'body'                  ,
};


/**
 *  design sql mapper 를 사용하기 위한  namespace
 *  @constant {object}
 */
const NAMESPACE = {
  USER                :   'USER'                ,
};

/**
 *  페이징 default value
 *  @constant {object}
 */
const PAGING_DEFAULT = {
  [DATA_FIELD_NAME.PAGE]      : 1 ,
  [DATA_FIELD_NAME.PAGE_SIZE] : 10,
};

/**
 * 시간 형태
 *  @constant {object}
 */
const DATE_FORMAT = {
  YYYY_MM_DD          : 'YYYY-MM-DD',
  YYYY_MM_DD_H_MM_SS  : 'YYYY-MM-DD h:mm:ss',
}

/**
 *  HTTP 요청 객체 정보 상수
 *  @constant {object}
 */
const HTTP_REQUEST = {
  METHOD  : 'METHOD'  ,     /** 요청 메소드    */
  URL     : 'URL'     ,     /** 요청 URL      */
};

module.exports = {
  DB_FIELD_NAME      ,
  DATA_FIELD_NAME    ,
  DB_RESULT          ,
  NUMERIC            ,
  DB_STATE           ,
  NAMESPACE          ,
  PAGING_DEFAULT     ,
  DATE_FORMAT        ,
  HTTP_REQUEST       ,
};
