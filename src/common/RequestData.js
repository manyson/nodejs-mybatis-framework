// module import
const getPoolConnection = require("../database/DataBase");
const {copyObject}    = require('../lib/util');
const UserInfo        = require("../common/UserInfo");

const Util              = require('../lib/util');
const {DEFVAL_QUERYSTRING} = require("./Constant");
const {NUMERIC} = require("./Constant");
const {DATA_FIELD_NAME} = require("./Constant");

// 상수 관련 define
const {DB_FIELD_NAME} = require('../common/Constant');
const DataLog = require("./DataLog");
const DataLogUnit = require("./DataLogUnit");

// 요청 객체(요청된 값, db connect 정보)
class RequestData{

  constructor(requestData = {}, userData = {}, viewCode = null){

    //  connection  정보 초기화
    this.connection  = null  ;

    // 입력된 값 설정
    this.setData(requestData);

    // User 정보 설정
    this.setUser(userData);

    // 커넥션을 가지고 있는지
    this.connected  = false ;

    // 로그 정보
    if(viewCode !== null){
      this.logData = new DataLog(userData, viewCode);
    }
    else{
      this.logData    = null  ;
    }
  }

  // 데이터 셋팅
  setData = (data) =>{
    // 입력된 값
    this.data       = copyObject(data);
  }

  // 전체 데이터 get
  getData = () =>{
    return this.data ;
  }

  // key 로 데이터 세팅
  setDataValue = (key, value)=> {
    this.data[key] = copyObject(value);
  }

  // 주어진 key로 데이터 구하기
  getDataValue = (key, defaultValue = null) =>{
    if(this.data.hasOwnProperty(key)){
      return this.data[key];
    }
    return defaultValue ;
  }

  // 사용자 정보 셋팅
  setUser = (user) =>{
    // 입력된 값
    this.user       = new UserInfo(
                          user[DB_FIELD_NAME.ID]                ,
                          user[DB_FIELD_NAME.ACCOUNT_ID]        ,
                          user[DB_FIELD_NAME.NAME]              ,
                          user[DB_FIELD_NAME.PARTNER_ID]        ,
                          user[DB_FIELD_NAME.PARTNER]           ,
                          user[DB_FIELD_NAME.ROLE]              ,
                          user[DB_FIELD_NAME.TIME_ZONE]         ,
                          user[DB_FIELD_NAME.LANGUAGE]          ,
                          user[DB_FIELD_NAME.PASSWORD_EXPIRE]   ,
                          user[DB_FIELD_NAME.TRAINING_COMPLETE] ,
                          user[DB_FIELD_NAME.STATE]             ,
                          user[DB_FIELD_NAME.FIRST_LOGIN]       ,
                          user[DB_FIELD_NAME.AGREEMENT_MUST]
                      );
  }

  getUser = () =>{
    return this.user ;
  }

  // 주어진 키로 user data 구하기
  getUserValue = (key) => {
    if (this.user.hasOwnProperty(key)) {
      return this.user[key];
    }
    return null;
  }

  // 키에 해당 하는 값이 존재하는 지 체크
  isExist = (key) => {
    return this.data.hasOwnProperty(key);
  }

  /**
   * 필수 입력 필드 확인
   * @param {Array<string>} fieldList 필드 이름 배열
   * @returns {boolean} 누락된 필드가 있으면 `false`
   */
  hasAllMandatoryFields = (fieldList) => {
    let result = true;
    fieldList.forEach(fieldName => {
      if (result)
        result = result && (Util.findProp(this.getData(), fieldName) != null);
    });
    return result;
  }

  // paging 처리
  /**
   * Pagination
   * @returns {number} 현재 페이지 번호
   * @description 요청받은 URI의 Query String 중,
   *              `page`와 `pageSize`를 가지고 `pageSkip`을 계산해서 요청 데이터에 저장한다.
   *              `page`를 리턴한다.
   */
  paginate = () => {

    const DFN_PAGE = DATA_FIELD_NAME.PAGE;
    const DFN_SIZE = DATA_FIELD_NAME.PAGE_SIZE;
    const DFN_SKIP = DATA_FIELD_NAME.SKIP;

    const page      = Number(this.getDataValue(DFN_PAGE) || DEFVAL_QUERYSTRING[DFN_PAGE]);
    const pageSize  = Number(this.getDataValue(DFN_SIZE) || DEFVAL_QUERYSTRING[DFN_SIZE]);
    const pageSkip  = pageSize * (page > NUMERIC.ONE ? page - NUMERIC.ONE : NUMERIC.ZERO);

    // Model에서 사용할 Pagination 관련 값 설정
    this.setDataValue(DFN_SIZE, pageSize);
    this.setDataValue(DFN_SKIP, pageSkip);
    this.setDataValue(DFN_PAGE, page);

    return page;
  };

  // connection 객체 응답
  getConnection = () =>{
    return this.connection;
  }

  // connect 여부
  isConnected = () => {
    return this.connected ;
  };

  // 로그 데이터가 있는 경우
  isLogData = () => {
    return this.logData !== null;
  };

  // 로그 데이터 추가
  addLogData = (tableName, actionCode, fields) => {
    const logDataUnit = new DataLogUnit(tableName, actionCode, fields);
    this.logData.addDataLog(logDataUnit);
  };

  // 로그 데이터 구하기
  getLogString = () => {
    return this.logData.toString();
  };


  // 시작 시 처리
  start = async (transaction = false) =>{

    //  트랜잭션 여부
    this.transaction  = transaction ;

    this.connection   = await getPoolConnection();
    this.connected    = this.connection !== null ? true : false ;

    if(this.transaction === true){
      await this.beginTransaction();
    }
  }

  // 종료시 처리
  end = async (complete = true) =>{

    if(this.isConnected() === true) {
      if (this.transaction === true) {
        if (complete === true) {
          await this.commit();
        } else {
          await this.rollback();
        }
      } else {
        await this.release();
      }
    }
  }

  // error 처리
  error = async () =>{
    if(this.transaction === true){
      await this.rollback();
    }

    if(this.logData !== null){
      this.logData = null ;
    }
  }

  // 트랙잭션
  beginTransaction = async () =>{
    await this.connection.beginTransaction();
  }

  // commit
  commit = async () => {
    console.log(`commit ^^^^^`);
    await this.connection.commit();
    await this.release();
  }

  // rollback
  rollback = async () => {
    console.log(`rollback ㅠㅠㅠㅠㅠ`);
    await this.connection.rollback();
    await this.release();
  }

  release = async () =>{
    await this.connection.release();
    this.connected = false ;
  }
}

module.exports = RequestData ;
