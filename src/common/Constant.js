/**
 *  데이터 베이스 필드명
 *  @constant {object}
 */
const DB_FIELD_NAME = {
  USER_ID       :     'user_id'   ,
  PASSWORD      :     'password'  ,
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
 *  local data에서 사용하는 필드 상수
 *  @constant {object}
 */
const DATA_FIELD_NAME = {
  AUTHORIZATION       : 'authorization'         ,
  JWT_DECODE          : 'jwtDecode'             ,
};


/**
 *  design sql mapper 를 사용하기 위한  namespace
 *  @constant {object}
 */
const NAMESPACE = {
  AUTH                :   'AUTH'                ,
};


/**
 * 시간 형태
 *  @constant {object}
 */
const DATE_FORMAT = {
  YYYY_MM_DD          : 'YYYY-MM-DD',
  YYYY_MM_DD_H_MM_SS  : 'YYYY-MM-DD h:mm:ss',
}

module.exports = {
  DB_FIELD_NAME             ,
  DATA_FIELD_NAME           ,
  DB_RESULT                 ,
  NUMERIC                   ,
  DB_STATE                  ,
  NAMESPACE                 ,
  DATE_FORMAT               ,
};
