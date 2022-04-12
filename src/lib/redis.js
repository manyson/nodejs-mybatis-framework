// lib.redis.js

const RequestData                       = require('../common/RequestData');
const ResponseData                      = require('../common/ResponseData');

// 상수 관련 define
const {DATA_FIELD_NAME}                 = require('../common/Constant');
const {DB_FIELD_NAME}                   = require('../common/Constant');
const {NUMERIC}                         = require('../common/Constant');

// 응답 관련 define
const { RESPONSE_CODE
  , RESPONSE_FIELD
  , SUCCESS_CODE
  , SUCCESS_MSG}                        = require('../common/ResponseConst');

// Redis
const RedisClient                       = require('../database/Redis');

// 유저 정보
const UserInfo                          = require("../common/UserInfo");

// 공통 함수
const Util                              = require("../lib/util");

const MasterUserModel                   = require('../models/master/UserModel');

// Redis 인증 및 연결
const connectRedis = async (complete, responseData) => {

  const cashPwd                           = process.env.DB_CASH_PASS || "";

  try {

    // Redis 접속 인증 확인
    if(!Util.isEmpty(cashPwd)) {
      RedisClient.auth(cashPwd, (e)=> {
        if (e) {
          console.log(`Error ${e}`);
          responseData.setResponseCode(RESPONSE_CODE.VERIFY_FAIL);
          complete = false;
        }
      });
    }

    // Redis 접속 에러
    RedisClient.on("error", (e) => {
      if(e) {
        console.log(`Error ${e}`);
        responseData.setResponseCode(RESPONSE_CODE.BAD_CONNECTION);
        complete = false;
      }
    });

  }
  catch (e) {
    console.log(`Error ${e}`);
    responseData.setResponseCode(RESPONSE_CODE.PROCESS_ERROR);
    complete = false;
  }

  return complete;
}

// Redis 키 : 객체 설정
const setRedis = async (redisObject) => {

  /**  응답 데이터  */
  let   responseData    =  new ResponseData();

  try {

   let complete = await connectRedis(true, responseData);

    if(complete) {
      //  '키 AT: uuid', 'user 객체' 설정
      const setRedisKey                     = await RedisClient.hmset(DATA_FIELD_NAME.KEY_PREFIX + redisObject[DATA_FIELD_NAME.ACCESS_TOKEN], redisObject);
      // 만료시간 설정
      const setRedisTime                    = await RedisClient.expire(DATA_FIELD_NAME.KEY_PREFIX + redisObject[DATA_FIELD_NAME.ACCESS_TOKEN], Number(process.env.DB_CASH_TTL));

      //  'UT:accountID' : 'uuid' 설정
      /* 중복 로그인 방지를 위한 키
      * 가장 마지막 로그인한 토큰값을 갖고 있다
      */
      const setRedisKeyForPreventDuplicate  = await RedisClient.set(DATA_FIELD_NAME.UNIQUE_KEY_PREFIX + redisObject[DB_FIELD_NAME.ACCOUNT_ID], redisObject[DATA_FIELD_NAME.ACCESS_TOKEN]);

      if(setRedisKey === SUCCESS_MSG && setRedisTime === SUCCESS_CODE && setRedisKeyForPreventDuplicate === SUCCESS_MSG) {
        // 응답 코드 셋팅
        responseData.setResponseCode(RESPONSE_CODE.SUCCESS);

        // 응답 데이터 셋팅
        responseData.setDataValue(RESPONSE_FIELD.ROWS, 1);
        responseData.setDataValue(RESPONSE_FIELD.DATA, RedisClient.hgetall(DATA_FIELD_NAME.KEY_PREFIX + redisObject[DATA_FIELD_NAME.ACCESS_TOKEN]));
      }
      else {
        responseData.setResponseCode(RESPONSE_CODE.DB_ERROR);
      }
    }
  }
  catch (e) {
    console.log(`Error ${e}`);
    responseData.setResponseCode(RESPONSE_CODE.PROCESS_ERROR);
  }

  return responseData;
};

/**
 * Redis 값 가져오기
 * @description (HTTP 요청에 포함된 Token 으로) Redis 에서 사용자 정보를 찾아 현재 요청(`req.user`)에 설정한다
 * @param {Object} req HTTP 요청 객체
 * @returns {ResponseData} 응답 데이터
 */
const getRedis = async (req) => {
  // 요청 데이터
  const requestData =   new RequestData(req.headers);
  // 응답 데이터
  const responseData =  new ResponseData();

  try {
    // Redis 인증 및 연결
    let complete = await connectRedis(true, responseData);

    if (complete) {
      // header 의 authorization 존재 여부 체크
      if (requestData.isExist(DATA_FIELD_NAME.AUTHORIZATION)) {
        const redisKey = _getRedisKeyFromRequest(requestData);

        // 키가 존재 하는 경우
        if (await RedisClient.exists(redisKey)) {
          // Redis hash 가져오기
          const redisObj = await RedisClient.hgetall(redisKey);

          // 빈 값이 아닌 경우 (검증이 정상인 경우)
          if(!Util.isEmpty(redisObj)) {
            // request 에 user 정보 객체 설정
            req.user = new UserInfo(
              redisObj[DB_FIELD_NAME.ID]                    ,
              redisObj[DB_FIELD_NAME.ACCOUNT_ID]            ,
              redisObj[DB_FIELD_NAME.NAME]                  ,
              redisObj[DB_FIELD_NAME.PARTNER_ID]            ,
              redisObj[DB_FIELD_NAME.PARTNER]               ,
              redisObj[DB_FIELD_NAME.ROLE]                  ,
              redisObj[DB_FIELD_NAME.TIME_ZONE]             ,
              redisObj[DB_FIELD_NAME.LANGUAGE]              ,
              redisObj[DB_FIELD_NAME.PASSWORD_EXPIRE]       ,
              redisObj[DB_FIELD_NAME.TRAINING_COMPLETE]     ,
              redisObj[DB_FIELD_NAME.STATE]                 ,
              redisObj[DB_FIELD_NAME.FIRST_LOGIN]           ,
              redisObj[DB_FIELD_NAME.AGREEMENT_MUST]
            );

            // 만료시간 재설정
            await RedisClient.expire(redisKey, Number(process.env.DB_CASH_TTL));

            // 응답 코드 셋팅
            responseData.setResponseCode(RESPONSE_CODE.SUCCESS);
          }
          else {
            responseData.setResponseCode(RESPONSE_CODE.NO_DATA);
          }
        }
        // 중복 로그인으로 인한 키 제거로 인해 토큰을 찾을 수 없는 경우
        else {
          responseData.setResponseCode(RESPONSE_CODE.DOUBLE_CONNECTION);
        }
      }
      // header 의 authorization 존재하지 않을 때
      else {
        responseData.setResponseCode(RESPONSE_CODE.NO_TOKEN);
      }
    }
    else {
      responseData.setResponseCode(RESPONSE_CODE.BAD_CONNECTION);
    }
  }
  catch (e) {
    console.log(`Error ${e}`);
    responseData.setResponseCode(RESPONSE_CODE.PROCESS_ERROR);
  }

  return responseData;
};

// Redis 키 삭제
const delRedis = async (req) => {

  /**  요청 데이터  */
  let   requestData     =  new RequestData(req.data);

  /**  응답 데이터  */
  let   responseData    =  new ResponseData();

  try {

    let complete = await connectRedis(true, responseData);

    if(complete) {

      let redisObject = '';

      // header 의 authorization 존재 여부 체크
      if (requestData.isExist(DATA_FIELD_NAME.AUTHORIZATION)  === true) {

        // header 의 authorization 값 구하기
        redisObject = requestData.getDataValue(DATA_FIELD_NAME.AUTHORIZATION);

        // bearer token 에서 access token 구하기
        if (redisObject.substr(0, DATA_FIELD_NAME.BEARER_TOKEN.length) === DATA_FIELD_NAME.BEARER_TOKEN) {
          redisObject = redisObject.substr(DATA_FIELD_NAME.BEARER_TOKEN.length);
        }

        // 키 존재 여부 확인
        const value = await RedisClient.exists(DATA_FIELD_NAME.KEY_PREFIX + redisObject);

        if(value > 0) {

          // Redis Key 삭제
          const delRedisKey = await RedisClient.del(DATA_FIELD_NAME.KEY_PREFIX + redisObject);

          if(delRedisKey === SUCCESS_CODE) {
            // 응답 코드 셋팅
            responseData.setResponseCode(RESPONSE_CODE.SUCCESS);
          }
          else {
            responseData.setResponseCode(RESPONSE_CODE.NO_CHANGE);
          }
        }
        else {
          responseData.setResponseCode(RESPONSE_CODE.NO_DATA);
        }
      }
      // header 의 authorization 존재하지 않을 때
      else {
        responseData.setResponseCode(RESPONSE_CODE.NO_TOKEN);
      }
    }
  }
  catch (e) {
    console.log(`Error ${e}`);
    responseData.setResponseCode(RESPONSE_CODE.PROCESS_ERROR);
  }

  return responseData;
};

/**
 * DB - 캐시 DB 사용자 정보 동기화
 * @param requestData {RequestData} 요청 데이터
 * @returns {Promise<Object|null>} 캐시 DB 사용자 객체
 */
const syncRedis = async (requestData) => {
  const redisKey = _getRedisKeyFromRequest(requestData);

  // 키 존재 여부 확인
  if (!await RedisClient.exists(redisKey)) {
    return;
  }

  // 캐시 DB 의 사용자 정보
  const cacheUser = await RedisClient.hgetall(redisKey)

  // DB 의 사용자 정보
  requestData.setDataValue(DB_FIELD_NAME.USER_ID, requestData.getUserValue(DB_FIELD_NAME.ID));
  let [ dbUser ] = await MasterUserModel.selectUserInfo(requestData);
  if (!dbUser) {
    return;
  }

  // DB 의 사용자 정보로 업데이트
  for (const prop in cacheUser) {
    if (cacheUser.hasOwnProperty(prop) && dbUser.hasOwnProperty(prop)) {
      cacheUser[prop] = dbUser[prop]
    }
  }
  // TODO 필요한 작업인지 확인. Login 응답과 동일하게 설정
  cacheUser[DB_FIELD_NAME.TRAINING_COMPLETE]  = Number(cacheUser[DB_FIELD_NAME.TRAINING_COMPLETE]);
  cacheUser[DB_FIELD_NAME.FIRST_LOGIN]        = Number(cacheUser[DB_FIELD_NAME.FIRST_LOGIN]);

  // 업데이트 된 사용자 정보 캐시 DB 에 저장
  await RedisClient.hmset(redisKey, cacheUser);
  // 만료시간 재설정
  await RedisClient.expire(redisKey, Number(process.env.DB_CASH_TTL));
  // 현재 요청의 유저 정보 업데이트
  requestData.setUser(cacheUser);

  return cacheUser;
};

/**
 * 캐시 DB 사용자 정보 만료시간 초기화
 * @param requestData {RequestData} 요청 데이터
 * @returns {boolean} 만료시간 설정 여부
 * @description `requestData` 에 `authorization` 값이 담겨있어야 함
 */
const refreshRedis = async (requestData) => {
  const redisKey = _getRedisKeyFromRequest(requestData);

  // 만료시간 초기화
  const res = await RedisClient.expire(redisKey, Number(process.env.DB_CASH_TTL));

  return Boolean(res);
};

/**
 * 요청에 대한 RedisKey 구하기
 * @param {RequestData} requestData 요청 데이터
 * @returns {string|undefined} Redis Key. 형식: `AT:<TOKEN>`
 */
const _getRedisKeyFromRequest = (requestData) => {
  // Authorization 값이 있는지 확인
  let authString = requestData.getDataValue(DATA_FIELD_NAME.AUTHORIZATION);
  if (!authString) {
    return;
  }

  // Access Token 구하기
  // Bearer Token 처리
  if (authString.startsWith(DATA_FIELD_NAME.BEARER_TOKEN)) {
    authString = authString.substr(DATA_FIELD_NAME.BEARER_TOKEN.length);
  }

  // Redis Key 형식: 'AT:<TOKEN>'
  return DATA_FIELD_NAME.KEY_PREFIX + authString;
}

// AccountID 로 중복 토큰 제거
const getDuplication = async (requestData) => {

  /**  응답 데이터  */
  let   responseData    =  new ResponseData();

  try {

    // Redis 접속
    let complete = await connectRedis(true, responseData);

    // 접속 실패 시
    if(complete === false) {
      return responseData.setResponseCode(RESPONSE_CODE.PROCESS_ERROR);
    }

    // 중복 키 조회
    const getDuplicateKey  = await RedisClient.get(DATA_FIELD_NAME.UNIQUE_KEY_PREFIX + requestData.getDataValue(DB_FIELD_NAME.ACCOUNT_ID));

    if(getDuplicateKey) {
      const keyExist = await RedisClient.exists(DATA_FIELD_NAME.KEY_PREFIX + getDuplicateKey);

      if(keyExist > NUMERIC.ZERO) {
        // Redis Key 삭제
        const deleteKey = await RedisClient.del(DATA_FIELD_NAME.KEY_PREFIX + getDuplicateKey);

        // 삭제 실패 시
        if(deleteKey !== NUMERIC.ONE) {
          responseData.setResponseCode(RESPONSE_CODE.DB_ERROR);
        }
      }
    }
  }
  catch (e) {
    console.log(`Error ${e}`);
    responseData.setResponseCode(RESPONSE_CODE.PROCESS_ERROR);
  }

  return responseData;
};

module.exports = {
  setRedis            ,
  getRedis            ,
   delRedis            ,
  syncRedis           ,
  refreshRedis        ,
  getDuplication
};
