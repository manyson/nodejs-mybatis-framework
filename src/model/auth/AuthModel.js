// auth.auth.model.js

const Logger                            = require('../../lib/logger')           ;

// myBatis
const Query         = require('../../database/Mybatis');
const { NAMESPACE } = require('../../common/Constant');
const { DB_RESULT } = require('../../common/Constant');
const { NUMERIC   } = require('../../common/Constant');

// 유틸리티
const crypto  = require('crypto');

// 상수 관련 define
const { DB_FIELD_NAME } = require('../../common/Constant');

/**
 * 인증 확인
 * description 사용자명과 비밀번호가 일치하는 사용자 레코드가 있으면 해당 정보 반환
 * param {RequestData} requestData 요청 데이터
 * returns {Object|null} 사용자 정보 객체
 */
const selectAuth = async (requestData) => {
  try {

    /**  입력받은 계정, 비밀번호  */
    const accountID = requestData.getDataValue(DB_FIELD_NAME.ACCOUNT_ID);
    const password  = requestData.getDataValue(DB_FIELD_NAME.PASSWORD);

    // sql parameter setting
    const params = {
      [DB_FIELD_NAME.USER_ID] :  accountID ,
    };

    // connection 객체
    const connection = requestData.getConnection();

    // query
    const queryString = Query(NAMESPACE.DESIGN,'selectUser', params);

    // execute sql
    const dataSet = await connection.query(queryString);

    // 사용자 조회
    const statement = Query(NAMESPACE.AUTH, 'selectUser', params);

    const [user] = await requestData.getConnection().query(statement);

    // 사용자 정보가 없으면 에러
    if (!user) {
      return null;
    }

    //loginFailCount over
    if(Number(user[DB_FIELD_NAME.LOGIN_FAIL_COUNT]) >= NUMERIC.FIVE || user[DB_FIELD_NAME.STATE] === NUMERIC.TWO){
      user["isPasswordCorrect"] = false;
      return user;
    }

    // TODO SALT 존재 여부와 관계 없이 무조건 해시된 값과 비교.
    //      _현재_ 는 (계정에 SALT 값이 없을 수 있으므로) 조건부 비교
    const isPasswordCorrect = user[DB_FIELD_NAME.SALT]  // SALT 가 있으면 (비밀번호가 해시값이므로)
      // 입력받은 비밀번호를 SALT 로 해시한 후 비교
      ? user[DB_FIELD_NAME.PASSWORD] === await makePasswordHashed(password, user[DB_FIELD_NAME.SALT])
      // 그렇지 않으면, 그대로 비교
      : user[DB_FIELD_NAME.PASSWORD] === password;

    //update loginFailCount
    let loginFailCount;
    let state;
    let flag = false;
    if(isPasswordCorrect == false){

      user[DB_FIELD_NAME.LOGIN_FAIL_COUNT] = loginFailCount = Number(user[DB_FIELD_NAME.LOGIN_FAIL_COUNT] + NUMERIC.ONE);
      user[DB_FIELD_NAME.STATE] = state = Number(loginFailCount === NUMERIC.FIVE ? NUMERIC.TWO : NUMERIC.ONE);
      user["isPasswordCorrect"] = false;
      flag = true;

    }else{

      user["isPasswordCorrect"] = true;

      if(user[DB_FIELD_NAME.LOGIN_FAIL_COUNT] >= NUMERIC.ONE){
        user[DB_FIELD_NAME.LOGIN_FAIL_COUNT] = loginFailCount = NUMERIC.ZERO;
        user[DB_FIELD_NAME.STATE] = state = NUMERIC.ONE;
        flag = true;
      }
    }

    if(flag){
      //update
      const params = {
        [DB_FIELD_NAME.ACCOUNT_ID]: accountID,
        [DB_FIELD_NAME.LOGIN_FAIL_COUNT]: loginFailCount,
        [DB_FIELD_NAME.STATE]: state
      };

      const st = Query(NAMESPACE.AUTH, 'updateLoginFailCount', params);
      const result = await requestData.getConnection().query(st);
    }

    return user;
  }
  catch (e) {
    Logger.error(e.stack);
    throw e;
  }
};

// 인증 확인 테스트
const selectAuthCheck = async (requestData) =>{

  try{

    // 응답 데이터
    let response = null ;

    // 사용자 정보
    const userInfo = requestData.getUser();

    // sql parameter
    const params = {
      [DB_FIELD_NAME.ACCOUNT_ID]  : userInfo[DB_FIELD_NAME.ACCOUNT_ID]
    };

    // connection 객체
    const connection = requestData.getConnection();

    // query
    const queryString = Query(NAMESPACE.AUTH,'user', params);

    response = await connection.query(queryString);

    return response[DB_RESULT.ROW_FIRST];
  }
    // 정상적으로 처리가 되지 않았을 경우
  catch (e){
    Logger.error(e.stack);
    throw e;
  }

};

/**
 *  Training Complete 여부 확인하기
 *  param  {RequestData} requestData -  요청 객체
 *  return {string | object}  response - Training Complete 여부 단일 정보
 */
const selectTrainingComplete = async (requestData) => {

  // 응답 데이터
  let response             = false ;

  try {

    // connection 객체
    const connection = requestData.getConnection();

    // set parameter
    const params = {

      [DB_FIELD_NAME.USER_ID]: requestData.getDataValue(DB_FIELD_NAME.USER_ID)
    }

    // query
    const queryString = Query(NAMESPACE.AUTH,'selectTrainingComplete', params);

    // execute sql
    const queryData = await connection.query(queryString);

    if(queryData !== null) {
      response = queryData;
    }

  }
  catch (e) {
    // 예외 발생 시 처리 사항
    Logger.error(e.stack);
    throw new Error(e.message);
  }

  return response;
};

/**
 *  파트너명 조회하기
 *  param  {RequestData} requestData -  요청 객체
 *  return {string | object}  response - Reference 단일 정보
 */
const selectPartnerName = async (requestData) => {

  // 응답 데이터
  let response             = false ;

  try {

    // connection 객체
    const connection = requestData.getConnection();

    // set parameter
    const params = {
      [DB_FIELD_NAME.USER_ID]: requestData.getDataValue(DB_FIELD_NAME.USER_ID)
    }

    // query
    const queryString = Query(NAMESPACE.AUTH,'selectPartnerName', params)     ;

    // execute sql
    const dataSet     = await connection.query(queryString)                         ;
    response          = dataSet[DB_RESULT.ROW_FIRST]                                ;

  }
  catch (e) {
    // 예외 발생 시 처리 사항
    Logger.error(e.stack);
    throw new Error(e.message);
  }

  return response;
};

/**
 * 비밀번호 확인
 * param requestData {RequestData} 요청 데이터
 * returns {boolean} 일치 여부
 */
/*
const _isPasswordValid = async (requestData) => {
  try {
    const connection = requestData.getConnection();

    // 입력받은 계정, 비밀번호
    const reqAccountID = requestData.getDataValue(DB_FIELD_NAME.ACCOUNT_ID);
    const reqPassword = requestData.getDataValue(DB_FIELD_NAME.PASSWORD);

    // 파라메터
    const params = {
      accountIDs : [ reqAccountID ]
    };

    // 사용자 조회
    const statement = Query(NAMESPACE.AUTH, 'selectUser', params);
    const [ user ] = await connection.query(statement);

    // TODO SALT 존재 여부와 관계 없이 무조건 해시된 값과 비교.
    //      현재는 (계정에 SALT 값이 없을 수 있으므로) 조건부 비교
    return user[DB_FIELD_NAME.SALT]
      ? user[DB_FIELD_NAME.PASSWORD] === await makePasswordHashed(reqPassword, user[DB_FIELD_NAME.SALT])
      : user[DB_FIELD_NAME.PASSWORD] === reqPassword;
  }
  catch (e) {
    Logger.error(e.stack);
    throw e;
  }
};
//*/
/**
 * *새 비밀번호* 해시값 만들기
 * param {string} plainPassword 비밀번호
 * returns {Promise<{ password: string, salt: string}>} Salt 와 비밀번호 해시값
 */
const createHashedPassword = (plainPassword) => {
  return new Promise(async (resolve, reject) => {
    const salt = await createSalt();
    crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
      if (err) reject(err);
      resolve({ password: key.toString('base64'), salt });
    });
  });
};

/**
 * *비밀번호* 해시값
 * param plainPassword {string} 비밀번호
 * param salt {string} salt
 * returns {Promise<string>}
 */
const makePasswordHashed = (plainPassword, salt) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
      if (err) reject(err);
      resolve(key.toString('base64'));
    });
  });
};

/**
 * 해시를 위한 Salt 문자열 만들기
 * returns {Promise<string>} Salt
 */
const createSalt = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) reject(err);
      resolve(buf.toString('base64'));
    });
  });
};


module.exports = {
  selectAuth                ,
  selectAuthCheck           ,
  selectTrainingComplete    ,
  selectPartnerName         ,

  createHashedPassword      ,
  makePasswordHashed        ,
};
