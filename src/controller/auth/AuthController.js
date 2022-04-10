// auth.auth.control.js

// 요청 데이터
const RequestData                       = require('../../common/RequestData');

// 응답 데이터
const ResponseData                      = require('../../common/ResponseData');

const Logger = require('../../lib/logger');

// 상수 관련 define
const {DB_FIELD_NAME}                   = require('../../common/Constant');
const {DATA_FIELD_NAME}                   = require('../../common/Constant');
const {DB_RESULT}                       = require('../../common/Constant');
const {NUMERIC}                         = require('../../common/Constant');

// 응답 관련 define
const {   RESPONSE_CODE
  , RESPONSE_FIELD
  , SUCCESS_CODE}                       = require('../../common/ResponseConst');

// 공통 함수
const Util                              = require('../../lib/util');
const {v4}                              = require('uuid');

// 모델
const AuthModel                         = require('../../models/auth/AuthModel');

// Redis
const Redis                             = require('../../lib/redis');

// 로그인
const postAuth = async (req, res) => {

  /**  요청 데이터  */
  let   requestData     =  new RequestData(req.body);

  /**  응답 데이터  */
  let   responseData    =  new ResponseData(requestData);

  try {

    // Authorization 데이터
    let authData = {};

    /**Engine 요청에 대한 인증 처리**/
    // Engine 에서 온 요청인지 판별 별수
    let isEngineCall = false;

    if(requestData.isExist("ENGINE")){
      if(requestData.isExist(DB_FIELD_NAME.ACCOUNT_ID) && requestData.isExist(DB_FIELD_NAME.PASSWORD)) {
        // ID, password 일치 하는 경우 인증 절차 통과
        if(requestData.getDataValue(DB_FIELD_NAME.ACCOUNT_ID) === process.env.DATA_ENGINE_ID && requestData.getDataValue(DB_FIELD_NAME.PASSWORD) === process.env.DATA_ENGINE_PWD) {
          isEngineCall = true;

          authData = {
            [DATA_FIELD_NAME.ACCESS_TOKEN]    : v4()                                                   ,
            [DB_FIELD_NAME.ID]                : requestData.getDataValue(DB_FIELD_NAME.ACCOUNT_ID)     ,
            [DB_FIELD_NAME.ACCOUNT_ID]        : requestData.getDataValue(DB_FIELD_NAME.ACCOUNT_ID)     ,
            [DB_FIELD_NAME.TRAINING_COMPLETE] : NUMERIC.ONE                                            ,
            [DB_FIELD_NAME.STATE]             : NUMERIC.ONE                                            ,
            [DB_FIELD_NAME.FIRST_LOGIN]       : NUMERIC.ZERO                                           ,
            [DB_FIELD_NAME.AGREEMENT_MUST]    : NUMERIC.ONE
          }
        }
      }
      else{
        return responseData.setResponseCode(RESPONSE_CODE.CHECK_AUTH);
      }
    }
    /**Engine 요청에 대한 인증 처리**/

    if(isEngineCall === false) {
      // check ID, Password exist
      if ( Util.isEmpty(requestData.getDataValue(DB_FIELD_NAME.ACCOUNT_ID))
        || Util.isEmpty(requestData.getDataValue(DB_FIELD_NAME.PASSWORD))) {

        // id 또는 password 가 없는 경우
        return responseData.setResponseCode(RESPONSE_CODE.REQUIRED_FIELD);
      }

      /**  트랜젝션 여부 셋팅 */
      await requestData.start(false);

      // 로그인 처리
      const authInfo              = await AuthModel.selectAuth(requestData);

      // 인증 정보가 잘 못 되었을 경우
      if (authInfo == null) {
        return responseData.setResponseCode(RESPONSE_CODE.CHECK_AUTH);
      }

      if(authInfo["isPasswordCorrect"] === false){
        // loginFailCount over
        let count = authInfo[DB_FIELD_NAME.LOGIN_FAIL_COUNT];
        if(Number(authInfo[DB_FIELD_NAME.LOGIN_FAIL_COUNT]) >= NUMERIC.ONE &&
          Number(authInfo[DB_FIELD_NAME.LOGIN_FAIL_COUNT]) <=  NUMERIC.FOUR) {
          return responseData.setResponseCode(RESPONSE_CODE.PASSWORD_ERROR_MEG, authInfo[DB_FIELD_NAME.LOGIN_FAIL_COUNT]);
        }
        return responseData.setResponseCode(RESPONSE_CODE.LOGIN_FAIL_OVER);
      }

      // Lock 또는 Delete 된 계정인 경우
      if (authInfo[DB_FIELD_NAME.STATE] !== NUMERIC.ONE) {
        return responseData.setResponseCode(RESPONSE_CODE.NO_VALID);
      }

      // 중복 로그인 여부
      await Redis.getDuplication(requestData);

      // User ID 세팅
      requestData.setDataValue(DB_FIELD_NAME.USER_ID, authInfo[DB_FIELD_NAME.ID]);

      // 모든 Training 완료 여부  조회
      const trainingCompleted    = await AuthModel.selectTrainingComplete(requestData);

      // 에러 처리
      if(trainingCompleted == null || trainingCompleted === false) {
        return responseData.setResponseCode(RESPONSE_CODE.DB_ERROR);
      }

      // 트레이닝 완료 여부 (0 = 미완료, 1= 완료)
      let trainingCompleteCheck = NUMERIC.ZERO;

      // 모든 트레이닝 목록을 수료 하였는지 확인
      if(trainingCompleted.length > NUMERIC.ZERO) {
        // complete === undefined --> 완료 하지 않은 트레이닝 찾지 못함 --> 모든 항목 완료
        trainingCompleteCheck = trainingCompleted.find(state => state[DB_FIELD_NAME.STATE] !== NUMERIC.TWO);
      }

      // 모든 트레이닝 완료 시 또는 등록된 트레이닝이 없는 경우
      if(trainingCompleteCheck === undefined || trainingCompleted.length === NUMERIC.ZERO) {
        authInfo[DB_FIELD_NAME.TRAINING_COMPLETE] = NUMERIC.ONE;
      }
      else {
        authInfo[DB_FIELD_NAME.TRAINING_COMPLETE] = NUMERIC.ZERO;
      }

      // 파트너명 조회
      const partnerName    = await AuthModel.selectPartnerName(requestData);

      //Now Date
      const NOW_DATE = new Date(getToday());

      // set return data object
      authData = {
        [DATA_FIELD_NAME.ACCESS_TOKEN]    : v4()                                             ,
        [DB_FIELD_NAME.ID]                : authInfo[DB_FIELD_NAME.ID]                       ,
        [DB_FIELD_NAME.ACCOUNT_ID]        : authInfo[DB_FIELD_NAME.ACCOUNT_ID]               ,
        [DB_FIELD_NAME.NAME]              : authInfo[DB_FIELD_NAME.NAME]                     ,
        [DB_FIELD_NAME.PARTNER_ID]        : authInfo[DB_FIELD_NAME.PARTNER_ID]               ,
        [DB_FIELD_NAME.PARTNER]           : partnerName[DB_FIELD_NAME.NAME]                  ,
        [DB_FIELD_NAME.ROLE]              : authInfo[DB_FIELD_NAME.ROLE]                     ,
        [DB_FIELD_NAME.TIME_ZONE]         : authInfo[DB_FIELD_NAME.TIME_ZONE]                ,
        [DB_FIELD_NAME.LANGUAGE]          : authInfo[DB_FIELD_NAME.LANGUAGE]                 ,
        [DB_FIELD_NAME.PASSWORD_EXPIRE]   : NOW_DATE > authInfo[DB_FIELD_NAME.PASSWORD_EXPIRE] ? 1 : 0         ,
        [DB_FIELD_NAME.TRAINING_COMPLETE] : authInfo[DB_FIELD_NAME.TRAINING_COMPLETE]        ,
        [DB_FIELD_NAME.STATE]             : authInfo[DB_FIELD_NAME.STATE]                    ,
        [DB_FIELD_NAME.FIRST_LOGIN]       : authInfo[DB_FIELD_NAME.FIRST_LOGIN]              ,
        [DB_FIELD_NAME.AGREEMENT_MUST]    : authInfo[DB_FIELD_NAME.AGREEMENT_MUST]
      }
    }

    // Redis 키 생성
    const createRedisKey = await Redis.setRedis(authData);

    // 키 생성 성공 시
    if(createRedisKey.getResponseCode() === SUCCESS_CODE) {
      // 응답 코드 셋팅
      responseData.setResponseCode(RESPONSE_CODE.SUCCESS)                       ;

      // 응답 데이터 셋팅
      responseData.setDataValue(RESPONSE_FIELD.ROWS          , NUMERIC.ONE )    ;
      return responseData.setDataValue(RESPONSE_FIELD.DATA   , authData )       ;
    }
  }
  catch (e) {
    Logger.error(e.stack);
    // 트랜잭션 롤백
    await requestData.error();
    responseData.setResponseCode(RESPONSE_CODE.CONTACT_ADMIN);
  }
  finally {
    // 트랜잭션 종료
    await requestData.end(responseData.isSuccess());
    // 데이터 응답
    res.send(responseData);
  }
};

// Today Date
function getToday(){
  let date = new Date();
  let year = date.getFullYear();
  let month = ("0" + (1 + date.getMonth())).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
};

// 세션 확인
const getAuth = async (req, res) => {

  /*  요청 데이터  */
  let   requestData     =  new RequestData(req.headers, req.user);

  /*  응답 데이터  */
  let   responseData    =  new ResponseData();

  try {

    // 제대로 처리되었는지 여부
    let complete = false ;

    /*  트랜젝션 여부 셋팅 */
    await requestData.start(true);

    // 데이터 조회
    const response = await AuthModel.selectAuthCheck(requestData);

    // 정상 처리 되었을 때
    if(response){
      complete = true;

      // 응답값에 맞게 셋팅
      // 응답 코드 셋팅
      responseData.setResponseCode(RESPONSE_CODE.SUCCESS);

      // 응답 데이터 셋팅
      responseData.setDataValue(RESPONSE_FIELD.ROWS   , NUMERIC.ONE );
      responseData.setDataValue(RESPONSE_FIELD.DATA   , response );
    }

    /*
    *  commit
    */
    await requestData.end(complete);

  }
  catch (e) {
    console.log(`Error ${e}`);
    await requestData.error(); // 롤백
  }

  res.send(responseData);
  return;
};

// 로그아웃
const putAuth = async (req, res) => {

  /*  요청 데이터  */
  let   requestData     =  new RequestData(req.headers);

  /*  응답 데이터  */
  let   responseData    =  new ResponseData();

  try {

    // 제대로 처리되었는지 여부
    let complete = false ;

    /*  트랜젝션 여부 셋팅 */
    await requestData.start(true);

    // 데이터 조회
    const response = await Redis.delRedis(requestData);

    // 정상 처리 되었을 때
    if(response){
      complete = true;

      // 응답값에 맞게 셋팅
      // 응답 코드 셋팅
      responseData.setResponseCode(RESPONSE_CODE.SUCCESS);

      // 응답 데이터 셋팅
      responseData.setDataValue(RESPONSE_FIELD.ROWS   , 1 );

    }

    /*
    *  commit
    */
    await requestData.end(complete);

  }
  catch (e) {
    console.log(`Error ${e}`);
    await requestData.error(); // 롤백
  }

  res.send(responseData);
};

/**
 * 세션 갱신
 * param req {Object} HTTP 요청 객체
 * param res {Object} HTTP 응답 객체
 * returns {ResponseData} 응답 데이터
 */
const putAuthExpireExtend = async (req, res) => {
  // 요청, 응답 데이터
  const requestData   = new RequestData(req.headers, req.user);
  const responseData  = new ResponseData(requestData);

  try {
    // 트랜잭션
    await requestData.start(false);

    // 데이터 조회 // getAuth 와 동일한 작업
    const response = await AuthModel.selectAuthCheck(requestData);
    if (!response) {
      return responseData.setResponseCode(RESPONSE_CODE.AUTH_ERROR);
    }

    // Redis 만료시간 초기화
    if (!await Redis.refreshRedis(requestData)) {
      // 초기화에 실패하면 에러
      return responseData.setResponseCode(RESPONSE_CODE.INVALID_TOKEN);
    }

    // 응답 데이터 설정
    responseData.setDataValue(RESPONSE_FIELD.ROWS, DB_RESULT.ONE);
    responseData.setDataValue(RESPONSE_FIELD.DATA, response);
    // 정상 종료
    return responseData.setResponseCode(RESPONSE_CODE.SUCCESS);
  }
  catch (e) {
    Logger.error(e.stack);
    // 트랜잭션 롤백
    await requestData.error();
    responseData.setResponseCode(RESPONSE_CODE.DB_ERROR);
  }
  finally {
    // 트랜잭션 종료
    await requestData.end(responseData.isSuccess());
    // 데이터 응답
    res.send(responseData);
  }
};

module.exports = {
  postAuth,
  getAuth,
  putAuth,
  putAuthExpireExtend
};
