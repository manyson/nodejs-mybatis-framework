/**
 *  사용자 데이터 처리
 *  @module       model/user/UserModel
 *  @author       김정현 <artjung77@gmail.com>
 *  @version      1.0
 */

const Logger            = require('../../lib/logger');

// myBatis
const Query             = require('../../database/Mybatis');

// 상수 관련 define
const { NAMESPACE, DB_RESULT, DB_FIELD_NAME } = require('../../common/Constant');

/**
 * 사용자 조회
 * description 사용자 ID로 사용자 조회
 * param {RequestData} requestData 요청 데이터
 * param {String} 사용자 아이디
 * returns {Object|undefined} 사용자 정보 객체
 */
const selectUser = async (requestData, ID = null) => {
  try {

    let userID    = null ;

    /**  입력받은 아이디로 사용한다면 받은 아이디로 사용하고 */
    if(ID !== null){
      userID = ID;
    }
    else{
      userID = requestData.getUserID();
    }

    /**  sql parameter 설정  */
    const params = {
      [DB_FIELD_NAME.USER_ID] :  userID ,
    };

    /**  connection 객체  */
    const connection = requestData.getConnection();

    /**  query 문장       */
    const queryString = Query(NAMESPACE.USER,'selectUser', params);

    /**  query 실행       */
    const [dataSet] = await connection.query(queryString);

    /**  첫번째 레코드     */
    return dataSet[DB_RESULT.ROW_FIRST];
  }
  catch (e) {
    Logger.error(e.stack);
    throw e;
  }
};

/**
 *  사용자 입력
 * @description 사용자 정보로 회원 가입 처리
 * @param {RequestData} requestData 요청 데이터
 * @returns {boolean} 성공 여부
 */
const insertUser = async (requestData) => {

  try {
    /**  입력받은 정보    */
    const userID    = requestData.getBodyValue(DB_FIELD_NAME.USER_ID);
    const password  = requestData.getBodyValue(DB_FIELD_NAME.PASSWORD);
    const userName  = requestData.getBodyValue(DB_FIELD_NAME.USER_NAME);
    const salt      = requestData.getBodyValue(DB_FIELD_NAME.SALT);

    /** SQL parameter   */
    const params = {
      [DB_FIELD_NAME.USER_ID]   : userID,
      [DB_FIELD_NAME.PASSWORD]  : password,
      [DB_FIELD_NAME.USER_NAME] : userName,
      [DB_FIELD_NAME.SALT]      : salt,
    };

    /**  connection 객체  */
    const connection = requestData.getConnection();

    /**  query 문장       */
    const statement = Query(NAMESPACE.USER,'insertUser', params);
    const res = await connection.query(statement);

    return res[DB_RESULT.ROW_FIRST][DB_RESULT.AFFECTED_ROWS] === DB_RESULT.ONE;
  }
  catch (e) {
    Logger.error(e.stack);
    throw e;
  }
};


/**
 *  사용자 데이터 변경 하기
 *  @param {RequestData} requestData  -  요청 데이터
 *  @param  {Object} params           -  변경 정보가 있는 객체
 *  @return {boolean}                 -  업데이트 정상 처리 여부
 */
const updateUser = async (requestData, params) => {

  try {

    const userID = requestData.getUserID();
    params[DB_FIELD_NAME.USER_ID]= userID;

    /**  connection 객체  */
    const connection = requestData.getConnection();

    /**  query 문장       */
    const statement = Query(NAMESPACE.USER,'updateUser', params);
    const res = await connection.query(statement);

    return res[DB_RESULT.ROW_FIRST][DB_RESULT.AFFECTED_ROWS] === DB_RESULT.ONE;
  }
  catch (e) {
    Logger.error(e.stack);
    throw e;
  }
};

/**
 *  사용자 데이터 삭제
 *  @param {RequestData} requestData  -  요청 데이터
 *  @param  {Object} params           -  삭제 정보가 있는 객체
 *  @return {boolean}                 -  삭제 정상 처리 여부
 */
const deleteUser = async (requestData) => {

  try {

    /**  입력받은 정보    */
    const userID    = requestData.getUserID();

    /**  connection 객체  */
    const connection = requestData.getConnection();

    /** SQL parameter   */
    const params = {
      [DB_FIELD_NAME.USER_ID]   : userID,
    };

    /**  query 문장       */
    const statement = Query(NAMESPACE.USER,'deleteUser', params);
    const res = await connection.query(statement);

    return res[DB_RESULT.ROW_FIRST][DB_RESULT.AFFECTED_ROWS] === DB_RESULT.ONE;
  }
  catch (e) {
    Logger.error(e.stack);
    throw e;
  }
};

module.exports = {
  selectUser    ,
  insertUser    ,
  updateUser    ,
  deleteUser    ,
};