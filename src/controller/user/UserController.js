/**
 *  사용자 관련 요청 컨트롤러
 *  @module       controller/user/UserController
 *  @author       김정현 <artjung77@gmail.com>
 *  @version      1.0
 */

// 공통 라이브러리
const Logger                            = require('../../lib/logger');
const JWT                               = require('../../lib/jwt');
const Util                              = require('../../lib/util');

// jwt에 사용할 토큰 object
const PayloadData                       = require('../../common/PayloadData');

// 요청, 응답 데이터
const RequestData                       = require('../../common/RequestData');
const ResponseData                      = require('../../common/ResponseData');

// 상수
const {DB_FIELD_NAME, DATA_FIELD_NAME}  = require('../../common/Constant');
const { RESPONSE_CODE, RESPONSE_FIELD } = require('../../common/ResponseConst');

// 모델
const UserModel                         = require('../../model/user/UserModel');

/**
 * 회원 가입
 * @param {Object} req Express Request 객체
 * @param {Object} res Express Response 객체
 * @returns {ResponseData} 응답 데이터
 */
const signUp = async (req, res) => {

  /**  요청 데이터  */
  let   requestData     =  new RequestData(req.body);

  /**  응답 데이터  */
  let   responseData    =  new ResponseData(requestData);

  try {

    /** 필수 입력 필드 체크 */
    const fieldList = [
      DB_FIELD_NAME.USER_ID,
      DB_FIELD_NAME.PASSWORD,
      DB_FIELD_NAME.USER_NAME,
    ];

    if (!requestData.hasAllMandatoryFields(fieldList)) {
      return responseData.setResponseCode(RESPONSE_CODE.REQUIRED_FIELD);
    }

    /**  트랜젝션 여부 셋팅   */
    await requestData.start(true);

    /**  데이터가 있는지 체크    */
    const userInfo              = await UserModel.selectUser(requestData);

    /**  사용자 정보가 있는 경우  */
    if (userInfo) {
      return responseData.setResponseCode(RESPONSE_CODE.ID_DUPLICATE);
    }

    /** 비밀번호  */
    let   password    = requestData.getDataValue(DB_FIELD_NAME.PASSWORD);

    /** 개인 salt 만들기  */
    const salt       =  await Util.createSalt();

    /** 입력 받은 비밀번호 암호화 */
    password = await Util.makePasswordHashed(password, salt);
    requestData.setDataValue(DB_FIELD_NAME.PASSWORD, password);
    requestData.setDataValue(DB_FIELD_NAME.SALT, salt);

    /**  사용자 생성     */
    const result              = await UserModel.insertUser(requestData);
    if(result){
      responseData.setResponseCode(RESPONSE_CODE.SUCCESS);
    }
    else {
      responseData.setResponseCode(RESPONSE_CODE.DB_ERROR);
    }
  }
  catch (e) {
    Logger.error(e.stack);
    /** 트랜잭션 롤백  */
    await requestData.error();
    responseData.setResponseCode(RESPONSE_CODE.CONTACT_ADMIN);
  }
  finally {
    /** 트랜잭션 종료 */
    await requestData.end(responseData.isSuccess());
    /** 데이터 응답 */
    res.send(responseData);
  }
};

/**
 * 로그인
 * @param {Object} req Express Request 객체
 * @param {Object} res Express Response 객체
 * @returns {ResponseData} 응답 데이터
 */
const login = async (req, res) => {

  /**  요청 데이터  */
  let   requestData     =  new RequestData(req.body);

  /**  응답 데이터  */
  let   responseData    =  new ResponseData(requestData);

  try {

    /** 필수 입력 필드 체크 */
    const fieldList = [
      DB_FIELD_NAME.USER_ID,
      DB_FIELD_NAME.PASSWORD,
    ];

    if (!requestData.hasAllMandatoryFields(fieldList)) {
      return responseData.setResponseCode(RESPONSE_CODE.REQUIRED_FIELD);
    }

    /**  트랜젝션 여부 셋팅   */
    await requestData.start(false);

    /**  로그인 정보 조회    */
    const userInfo              = await UserModel.selectUser(requestData);

    /**  사용자 정보가 없는 경우  */
    if (userInfo == null) {
      return responseData.setResponseCode(RESPONSE_CODE.WRONG_ACCOUNT);
    }

    /** 비밀번호 체크 */
    let   password    = requestData.getDataValue(DB_FIELD_NAME.PASSWORD);

    const dbPassword  = userInfo[DB_FIELD_NAME.PASSWORD];
    const salt        = userInfo[DB_FIELD_NAME.SALT];

    /** 입력 받은 비밀번호 암호화 */
    password = await Util.makePasswordHashed(password, salt);

    /** 비밀번호와 다른 경우 */
    if(password !== dbPassword) {
      return  responseData.setResponseCode(RESPONSE_CODE.WRONG_PASSWORD);
    }

    /** 응답 객체 생성 */
    let payload = new PayloadData();
    payload.loadObject(userInfo);

    const payloadObject = payload.getObject();
    const token = JWT.getJWTToken(payloadObject);

    responseData.setDataValue(RESPONSE_FIELD.DATA, token);
  }
  catch (e) {
    Logger.error(e.stack);
    /** 트랜잭션 롤백  */
    await requestData.error();
    responseData.setResponseCode(RESPONSE_CODE.CONTACT_ADMIN);
  }
  finally {
    /** 트랜잭션 종료 */
    await requestData.end(responseData.isSuccess());
    /** 데이터 응답 */
    res.send(responseData);
  }
};

/**
 * 내정보 보기
 * @param {Object} req Express Request 객체
 * @param {Object} res Express Response 객체
 * @returns {ResponseData} 응답 데이터
 */
const info = async (req, res) => {

  /**  요청 데이터  */
  let   requestData     =  new RequestData({...req.body, ...req[DATA_FIELD_NAME.PAYLOAD]});

  /**  응답 데이터  */
  let   responseData    =  new ResponseData(requestData);

  try {

    /** 필수 입력 필드 체크 */
    const fieldList = [
      DB_FIELD_NAME.USER_ID,
    ];

    if (!requestData.hasAllMandatoryFields(fieldList)) {
      return responseData.setResponseCode(RESPONSE_CODE.REQUIRED_FIELD);
    }

    /**  트랜젝션 여부 셋팅   */
    await requestData.start(false);

    /**  로그인 정보 조회    */
    const userInfo              = await UserModel.selectUser(requestData);

    /**  사용자 정보가 없는 경우  */
    if (userInfo == null) {
      return responseData.setResponseCode(RESPONSE_CODE.WRONG_ACCOUNT);
    }

    /** 응답 객체 생성 */
    const data = {
      [DB_FIELD_NAME.USER_ID]   : userInfo[DB_FIELD_NAME.USER_ID],
      [DB_FIELD_NAME.USER_NAME] : userInfo[DB_FIELD_NAME.USER_NAME]
    };

    responseData.setDataValue(RESPONSE_FIELD.DATA, data);
  }
  catch (e) {
    Logger.error(e.stack);
    /** 트랜잭션 롤백  */
    await requestData.error();
    responseData.setResponseCode(RESPONSE_CODE.CONTACT_ADMIN);
  }
  finally {
    /** 트랜잭션 종료 */
    await requestData.end(responseData.isSuccess());
    /** 데이터 응답 */
    res.send(responseData);
  }
};

/**
 * 내 정보 수정
 * @param {Object} req Express Request 객체
 * @param {Object} res Express Response 객체
 * @returns {ResponseData} 응답 데이터
 */
const change = async (req, res) => {

  /**  요청 데이터  */
  let   requestData     =  new RequestData(req.body);


  /**  응답 데이터  */
  let   responseData    =  new ResponseData(requestData);

  try {

    /**  payload에 있는 user data  */
    let userData        = new PayloadData();
    userData.loadObject(req[DATA_FIELD_NAME.PAYLOAD]);
    requestData.setDataValue(DB_FIELD_NAME.USER_ID, userData.getUserID());

    /** 필수 입력 필드 체크 */
    const fieldList = [
      DB_FIELD_NAME.USER_ID,
    ];

    if (!requestData.hasAllMandatoryFields(fieldList)) {
      return responseData.setResponseCode(RESPONSE_CODE.REQUIRED_FIELD);
    }

    /**  트랜젝션 여부 셋팅   */
    await requestData.start(false);

    /**  로그인 정보 조회    */
    const userInfo              = await UserModel.selectUser(requestData);

    /**  사용자 정보가 없는 경우  */
    if (userInfo == null) {
      return responseData.setResponseCode(RESPONSE_CODE.WRONG_ACCOUNT);
    }

    /** 데이터 변경 parameter  */
    let params = {
      [DB_FIELD_NAME.USER_ID] : requestData.getDataValue(DB_FIELD_NAME.USER_ID)
    };

    /** 비밀번호 체크 */
    if(requestData.isExist(DB_FIELD_NAME.PASSWORD)){

      let  password  = requestData.getDataValue(DB_FIELD_NAME.PASSWORD);
      const salt     = userInfo[DB_FIELD_NAME.SALT];

      /** 입력 받은 비밀번호 암호화 */
      password = await Util.makePasswordHashed(password, salt);
      params[DB_FIELD_NAME.PASSWORD] = password ;
    }

    /** 이름 변경 */
    if(requestData.isExist(DB_FIELD_NAME.USER_NAME)){
      let  userName  = requestData.getDataValue(DB_FIELD_NAME.USER_NAME);
      params[DB_FIELD_NAME.USER_NAME] = userName ;
    }

    /**  사용자 변경     */
    const result  = await UserModel.updateUser(requestData, params);

    if(result){
      responseData.setResponseCode(RESPONSE_CODE.SUCCESS);
    }
    else {
      responseData.setResponseCode(RESPONSE_CODE.DB_ERROR);
    }
  }
  catch (e) {
    Logger.error(e.stack);
    /** 트랜잭션 롤백  */
    await requestData.error();
    responseData.setResponseCode(RESPONSE_CODE.CONTACT_ADMIN);
  }
  finally {
    /** 트랜잭션 종료 */
    await requestData.end(responseData.isSuccess());
    /** 데이터 응답 */
    res.send(responseData);
  }
};

module.exports = {
  signUp  ,
  login   ,
  info    ,
  change  ,
};
