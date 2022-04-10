const moment                = require('moment-timezone');
const { DB_FIELD_NAME }     = require("../common/Constant");
const { VALUE_SEPARATOR }   = require("../common/Constant");
const { DB_PROCESS_TYPE }   = require("../common/Constant");
const { REGEX_PATTERN }     = require("../common/Constant");
const { NUMERIC }           = require("../common/Constant");
const { CHAR_SYMBOL }       = require("../common/Constant");
const { DATA_FIELD_NAME }   = require("../common/Constant");
const { ES_FIELDS }         = require("../common/Constant");
const { LOG_VIEW_CODE }     = require("../common/DataLogConst");
const { LOG_ACTION_CODE }   = require("../common/DataLogConst");

/**
 * namespace lib
 * property {module:lib/util} util - 공통 처리 utility library
 */

/**
 *  공통 처리 utility library
 *  module       lib/util
 *  author       김정현
 *  version      1.0, 작업 내용
 */

/**
 *  빈 값 체크
 *  param  {any}      value    -  값이 있는 여부를 체크하기 위한 변수
 *  return {boolean}           - 값 존재 여부를 리턴
 */
const isEmpty = (value) => {
  if ( typeof value == "undefined"
    || value == null
    || value === ""
    || value === "null"
    || (value != null && typeof value === "object" && !Object.keys(value).length)
    || (value != null && Array.isArray(value) && value.length === 0)) {
    return true;
  }
  else {
    return false;
  }
};

/**
 * Case -insensitive Property Getter
 * param {Object} obj 대상 객체
 * param {string} targetKey 프로퍼티 이름
 * returns {null|*} 해당 프로퍼티 값
 */
const findProp = (obj, targetKey) => {
  const t = String(targetKey).toLowerCase();
  for (const objectKey in obj) {
    if (obj.hasOwnProperty(objectKey)) {
      const o = String(objectKey).toLowerCase();
      if (o === t && !isEmpty(obj[objectKey]))
        return obj[objectKey];
    }
  }
  return null;
}

/**
 *  객체 깊은 복사
 *  param     {object | array} inObject  - object 또는 array
 *  returns   {object | array} 복사한 오브젝트
 */
const copyObject = (inObject) =>{

  if(typeof inObject !== "object" || inObject === null) {
    return inObject;
  }

  let outObject = Array.isArray(inObject) ? [] : {}
  for (const key in inObject) {
    const value = inObject[key] ;
    outObject[key] = (typeof value === "object" && value !== null) ? copyObject(value) : value ;
  }

  return outObject ;
}

/**
 *  배열로 부터 구분자로 이이진 문자열 구하기
 *  param  {array}   value   -  문자열을 구하기 위한 배열
 *  return {string}          -  구분자로 이어진 문자열
 */
const getStringFromArray = (dataArray) =>{
  return dataArray.join(VALUE_SEPARATOR);
};


/**
 *  쿼리 처리 객체를 일반 객체로 변환
 *  param  {object}   responseObject   -  쿼리 실행으로 받은 응답 객체
 *  return {object}                    -  일반 json 객체
 */
const getResponseQueryObject = (responseObject) =>{
  return Object.assign({}, responseObject);
}


/**
 *  객체 차이 데이터 반환
 *  param  {object}   prev         -  비교 하기 위한 이전 값이 있는 객체
 *  param  {object}   now          -  비교 하기 위한 현재 값이 있는 객체
 *  param  {array}    keyData      -  비교에서 포함 대상이 되는 key 배열(테이블 primary 키등)
 *  return {object}                -  비교 후 다른 값이 포함된 객체
 */
const getDifferObject =( prev , now , keyData=[] ) => {

  let differObject = {};

  // 비교할 키 들
  const keys = Object.keys(prev);

  for (const key of keys) {

    // 비교에서 포함 되는 key 일 때는
    if(keyData.includes(key)){
      differObject[key] = prev[key];
      continue;
    }

    // 이전 값과 지금의 값이 다를 경우 현재 값을 추가
    if(prev[key] != now[key] ){
      differObject[key] = now[key];
    }
  }
  return differObject ;
}

/**
 *  배열 차이 데이터 반환
 *  param  {array}    prev         -  비교 하기 위한 이전 값이 있는 배열
 *  param  {array}    now          -  비교 하기 위한 현재 값이 있는 배열
 *  param  {array}    keyData      -  비교에서 포함 대상이 되는 key 배열(테이블 primary 키등)
 *  return {array}                 -  비교 후 다른 값이 포함된 배열
 */
const getDifferArray =( prev , now , keyData=[] ) => {

  // 차이나는 배열
  let differArray = [];

  // 현재 값 기준
  let idx ;

  for (idx = 0 ; idx < now.length ; idx++) {

    // update 대상
    if(idx < prev.length){

      // update 대상
      let differObject      = getDifferObject(prev[idx], now[idx], keyData);

      const objectKeyLength = Object.keys(differObject).length;

      // 비교 대상 정보가 없는 경우 (기존 유지)
      if( objectKeyLength === 0 || objectKeyLength === keyData.length){
        let copyData = copyObject(differObject);
        copyData[DB_PROCESS_TYPE.TYPE]     = DB_PROCESS_TYPE.HOLD  ;
        differArray.push(copyData)  ;
      }
      // update 처리
      else{
        differObject[DB_PROCESS_TYPE.TYPE] = DB_PROCESS_TYPE.UPDATE;
        differArray.push(differObject);
      }
    }
    else{

      // insert 대상
      let copyData = copyObject(now[idx]);
      copyData[DB_PROCESS_TYPE.TYPE]     = DB_PROCESS_TYPE.INSERT  ;
      differArray.push(copyData)  ;
    }
  }

  // 삭제 대상
  for (let i = idx ; i < prev.length ; i++) {
    let copyData = copyObject(prev[i]);
    copyData[DB_PROCESS_TYPE.TYPE]     = DB_PROCESS_TYPE.DELETE  ;
    differArray.push(copyData)  ;
  }

  return differArray ;
}


/**
 *  ID 배열 차이 데이터 반환
 *  param  {array}    prev         -  비교 하기 위한 이전 ID가 있는 배열
 *  param  {string}   prevKey      -  비교 하기 위한 이전 ID의 key
 *  param  {array}    now          -  비교 하기 위한 현재 ID가 있는 배열
 *  param  {string}   nowKey       -  비교 하기 위한 현재 ID의 key
 *  return {array}                 -  비교 후 다른 값이 포함된 배열
 */
const getDifferIDList =( prev, prevKey, now , nowKey) => {

  // 차이나는 배열
  let differArray   = [];

  // 이전 데이터의 key 모음
  let prevKeyArray  = [];

  // 현재 데이터의 key 모음
  let nowKeyArray   = [];

  // 이전 키를 모음
  for (const prevRow  of prev) {
    prevKeyArray.push(prevRow[prevKey]);
  }

  // 현재 키의 모음
  for (const nowRow of now) {
    nowKeyArray.push(nowRow[nowKey]);
  }

  // 삭제 대상
  for (let idx = 0 ; idx < prev.length ; idx++) {

    const prevRow         = prev[idx] ;

    const prevKeyValue    = prevRow[prevKey] ;

    // 이전의 데이터가 현재는 없는 경우
    if (nowKeyArray.includes(prevKeyValue) === false) {

      // 삭제 대상
      let itemData = {
        ...prevRow,
        [DB_PROCESS_TYPE.TYPE]  : DB_PROCESS_TYPE.DELETE
      }

      differArray.push(itemData)  ;
    }
  }

  // 현재 데이터를 기준으로 입력, 수정 관련 정보 수집
  for (let idx = 0 ; idx < now.length ; idx++) {

    const nowRow        = now[idx] ;

    const nowKeyValue   = nowRow[nowKey] ;

    // 데이터 입력
    let itemData = {
      ...nowRow
    };

    // 이전 ID 가 있는 경우
    if (prevKeyArray.includes(nowKeyValue)) {
      // 그대로 유지
      itemData[DB_PROCESS_TYPE.TYPE] = DB_PROCESS_TYPE.HOLD;
    }
    // 없는 경우는 추가
    else {
      // 추가 대상
      itemData[DB_PROCESS_TYPE.TYPE] = DB_PROCESS_TYPE.INSERT;
    }

    differArray.push(itemData);
  }

  return differArray ;
}

/**
 *  객체 차이 데이터 반환
 *  param  {object}    dbData       -  비교 하기 위한 이전(db) 값이 있는 객체
 *  param  {object}    reqData      -  비교 하기 위한 현재 값이 있는 객체
 *  param  {array}    compareField -  비교하기 위한 key 배열
 *  param  {array}    includeField -  비교에서 포함 대상이 되는 key 배열(테이블 primary 키등)
 *  return {object}                -  비교 후 다른 값이 포함된 객체
 */
const getDifferDataObject =( dbData , reqData , compareField, includeField = [] ) => {

  let differObject = {};

  // 업데이트 시 포함 되는 key 일 때는
  for(const key of includeField){
    differObject[key] = dbData[key];
  }

  // key 값 비교
  for (const key of compareField) {

    // 이전 값과 지금의 값이 다를 경우 현재 값을 추가
    if(dbData[key] !== reqData[key] ){
      differObject[key] = reqData[key];
    }
  }

  return differObject ;

};

/**
 *  배열 차이 데이터 반환
 *  param  {array}    dbData       -  비교 하기 위한 이전(db) 값이 있는 배열
 *  param  {array}    reqData      -  비교 하기 위한 현재 값이 있는 배열
 *  param  {string}   idField      -  id 비교를 위한 키 값
 *  param  {array}    compareField -  비교하기 위한 key 배열
 *  param  {array}    includeField -  비교에서 포함 대상이 되는 key 배열(테이블 primary 키등)
 *  return {array}                 -  비교 후 다른 값이 포함된 배열
 */
const getDifferDataArray =( dbData , reqData , idField, compareField, includeField = [] ) => {

  // 차이나는 배열
  let differArray = [];

  // 요청 데이터들 ID
  let reqIDArray  = [];

  // 요청 하는 데이터 배열
  for (const req of reqData) {

    reqIDArray.push(req[idField]);

    // db 에 데이터를 찾기
    const findObject    = dbData.find((dbRow)=> dbRow[idField] === req[idField]);

    // 찾은 경우 (update)
    if(findObject !== undefined){

      const differObject = getDifferDataObject(findObject, req, compareField, includeField);

      const objectKeyLength = Object.keys(differObject).length;

      // 비교 대상 정보가 없는 경우 (기존 유지)
      if( objectKeyLength === 0 || objectKeyLength === includeField.length){
        let copyData = copyObject(findObject);
        copyData[DB_PROCESS_TYPE.TYPE]     = DB_PROCESS_TYPE.HOLD  ;
        differArray.push(copyData)  ;
      }
      // update 처리
      else{
        differObject[DB_PROCESS_TYPE.TYPE] = DB_PROCESS_TYPE.UPDATE;
        differArray.push(differObject);
      }
    }
    // 없은 경우 (insert)
    else{

      // insert 대상
      let copyData = copyObject(req);
      copyData[DB_PROCESS_TYPE.TYPE]     = DB_PROCESS_TYPE.INSERT  ;
      differArray.push(copyData)  ;
    }
  }

  // db를 기준으로 없어진 사항 -> 삭제 관련
  for (const dbRow of dbData) {
    const dbDataKey = dbRow[idField];

    // id 에 포함되어 있는 않을 때
    if(reqIDArray.includes(dbDataKey) === false){
      let copyData = copyObject(dbRow);
      copyData[DB_PROCESS_TYPE.TYPE]     = DB_PROCESS_TYPE.DELETE  ;
      differArray.push(copyData)  ;
    }
  }

  return differArray ;
}


/**
 *  초기 비밀번호 생성 함수
 *  return {string}                 -  소문자, 대문자, 숫자, 특수기호를 포함하는 무작위 문자열
 */
const generatePassword = () => {
  // 길이값 지정
  const length        = NUMERIC.TEN;
  // 문자열 초기화
  let retVal = '';
  // 랜덤 문자열 조합
  for (let i = 0, n   = REGEX_PATTERN.RANDOM_CHAR.length; i < length; ++i) {
    retVal           += REGEX_PATTERN.RANDOM_CHAR.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

/**
 *  목록 날짜 검색
 *  param  {string}   timezone     -  time을 적용하기 위한 timezone
 *  param  {string}   start        -  검색 시작 날짜 (yyyy-mm-dd)
 *  param  {any}      end          -  검색 종료 날짜 (yyyy-mm-dd)
 *  return {object}                -  시작 시각과 종료 시각을 가지고 있는 객체
 */
const getSearchTime = (timezone, start, end= undefined ) => {

  // 서버시간과 사용자 TimeZone과의 Offset in Minutes
  const offSet = moment.tz.zone(timezone).utcOffset(Date.now());
  // 동일 날짜 검색 시 +24시간
  //       start 2020-10-05
  //       end 2020-10-05
  //       TimeZone Asia/Seoul -->
  // 2020-10-04T15:00:00.000Z ~ 2020-10-05T15:00:00.000Z
  // if (+new Date(start) === +new Date(end)) {
  //   end = +new Date(end) + (1000 * 60 * 60 * 24);
  // }

  // 종료 날짜를 지정 하지 않았을 경우
  if(end === undefined){
    end = Number(new Date(start)) + (1000 * 60 * 60 * 24);
  }

  // 시작 시각
  let startTime = new Date(Number(new Date(start)) + offSet * 1000 * 60) ;

  // 종료 시각
  let endTime   = new Date(Number(new Date(end)) + offSet * 1000 * 60) ;

  // offset * 1000 * 60 --> Minutes
  return {
    [DB_FIELD_NAME.START_TIME]  : moment(startTime).format("YYYY-MM-DD HH:mm:ss"),
    [DB_FIELD_NAME.END_TIME]    : moment(endTime).format("YYYY-MM-DD HH:mm:ss")
  }
};

const extractProps = (...keyPairs) => obj => {
  const res = {};
  for (const keyPair of keyPairs) {
    const from = Array.isArray(keyPair) ? keyPair[0] : keyPair;
    const to   = Array.isArray(keyPair) ? keyPair[1] : keyPair;
    res[to] = obj.hasOwnProperty(from) ? obj[from] : "";
  }
  return res;
}

/**
 *  특수문자 정규식 Escape
 *  return {string}   - escape 처리 된 정규식
 */
const escapeSpecialChar = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

/**
 *  파일 확장자 추출
 *  return {string}   - 확장자명
 */
const getFileExt = (fileName) => {

  let fileExt = CHAR_SYMBOL.EMPTY;

  // .tar.gz 인 경우
  if(fileName.match(REGEX_PATTERN.TAR)) {
    fileExt = DATA_FIELD_NAME.TAR;
  }
  else {
    fileExt = CHAR_SYMBOL.DOT + fileName.split(CHAR_SYMBOL.DOT).pop();
  }

  return fileExt;
}

/**
 *  목록 날짜 검색
 *  param  {number}   num          -  number
 *  param  {string}   unit         -  unit
 *  return {String}                -  unit의 단수, 복수형
 */
const getMultipleUnit = (num, unit) => {

  if(num > 1){
    return `${unit}s`;
  }
  else{
    return unit;
  }
};

/**
 *  API 요청 시간
 *  param  {string}   timezone     -  time을 적용하기 위한 timezone
 *  return {object}                -  timezone 의 시각을 가지고 있는 객체
 */
const getRequestTime = (timezone = DATA_FIELD_NAME.DEFAULT_TIME_ZONE) => {

  moment.tz.setDefault(timezone);
  return moment().format("YYYY-MM-DD HH:mm:ss");

};

/**
 *  Get Log Action Code & Menu Name
 *  param {string}     viewCode       - Log viewCode
 *  return {object}                   - Log Action Code and Menu Name
 */
const getLogMenuAction = (viewCode) => {

  let action = CHAR_SYMBOL.EMPTY;

  switch(viewCode) {

    /** Study **/
    case LOG_VIEW_CODE.ST1A0001:
      //'Study > Study > 목록';
      break;
    case LOG_VIEW_CODE.ST1A0002:
      //'Study > Study > 목록 > 생성';
      action = LOG_ACTION_CODE.INSERT;
      break;
    case LOG_VIEW_CODE.ST1A0003:
      //'Study > Study > 목록 > Study lock/unlock';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.ST1A0101:
      //'Study > Study > 상세 > Study Information';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.ST1A0201:
      //'Study > Study > 생성 > User Rights Management';
      action = LOG_ACTION_CODE.INSERT;
      break;
    /** Study **/

    /** Design **/
    case LOG_VIEW_CODE.DE1A0001:
      //'Design > Design > 목록';
      break;
    case LOG_VIEW_CODE.DE1A0002:
      //'Design > Design > 목록 > 생성';
      action = LOG_ACTION_CODE.INSERT;
      break;
    case LOG_VIEW_CODE.DE1A0003:
      //'Design > Design > 목록 > 상세';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.DE1A0101:
      //'Design > Design > Concept > Objective&Endpoint';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.DE1A0102:
      //'Design > Design > Concept > Design';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.DE1A0103:
      //'Design > Design > Concept > IP';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.DE1A0104:
      //'Design > Design > Concept > Schema';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.DE1A0105:
      //'Design > Design > Concept > Criteria';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.DE1A0201:
      //'Design > Design > SoA > Study Event';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.DE1A0202:
      //'Design > Design > SoA > TA Map';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.DE1A0203:
      //'Design > Design > SoA > Assessment';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.DE1A0204:
      //'Design > Design > SoA > Timepoint';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.DE1A0301:
      //'Design > Design > PRM > Arm';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.DE1A0302:
      //'Design > Design > PRM > Cell';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.DE1A0303:
      //'Design > Design > PRM > Segment';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.DE1A0401:
      //'Design > Design > CRF > 목록';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.DE1A0402:
      //'Design > Design > CRF > 상세 > Setup';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.DE1A0403:
      //'Design > Design > CRF > 상세 > Form';
      break;
    case LOG_VIEW_CODE.DE1A0404:
      //'Design > Design > CRF > 상세 > Spec';
      break;
    case LOG_VIEW_CODE.DE1A0405:
      //'Design > Design > CRF > 상세 > Module Edit';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    /** Design **/

    /** DCI **/
    case LOG_VIEW_CODE.DC1A0001:
      //'DCI > EDC > 목록';
      break;
    case LOG_VIEW_CODE.DC1A0101:
      //'DCI > EDC > 상세';
      break;
    /** DCI **/

    /** SDTM **/
    case LOG_VIEW_CODE.SD1A0001:
      //'SDTM > My SDTM Package > 목록';
      break;
    case LOG_VIEW_CODE.SD1A0002:
      //'SDTM > My SDTM Package > 목록 > 생성';
      action = LOG_ACTION_CODE.INSERT;
      break;
    case LOG_VIEW_CODE.SD1A0101:
      //'SDTM > My SDTM Package > 상세 > SDTM Package Information';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.SD1A0201:
      //'SDTM > My SDTM Package > 상세 > Define.xml';
      break;
    case LOG_VIEW_CODE.SD1A0301:
      //'SDTM > My SDTM Package > 상세 > SDRG';
      action = LOG_ACTION_CODE.INSERT;
      break;
    case LOG_VIEW_CODE.SD2A0001:
      //'SDTM > Mapping > 목록';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.SD2A0002:
      //'SDTM > Mapping > 목록 > 생성';
      action = LOG_ACTION_CODE.INSERT;
      break;
    case LOG_VIEW_CODE.SD2A0101:
      //'SDTM > Mapping > 상세 > Summary';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.SD2A0201:
      //'SDTM > Mapping > 상세 > Detail';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.SD2A0301:
      //'SDTM > Mapping > 상세 > RELREC';
      break;
    case LOG_VIEW_CODE.SD2A0302:
      //'SDTM > Mapping > 상세 > RELREC - 생성';
      action = LOG_ACTION_CODE.INSERT;
      break;
    case LOG_VIEW_CODE.SD2A0303:
      //'SDTM > Mapping > 상세 > RELREC - 상세';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.SD2A0401:
      //'SDTM > Mapping > 상세 > Define.xml';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.SD3A0001:
      //'SDTM > Clinical Data > 목록';
      break;
    case LOG_VIEW_CODE.SD3A0002:
      //'SDTM > Clinical Data > 목록 > 생성';
      action = LOG_ACTION_CODE.INSERT;
      break;
    case LOG_VIEW_CODE.SD3A0101:
      //'SDTM > Clinical Data > 상세 > Information';
      break;
    case LOG_VIEW_CODE.SD4A0001:
      //'SDTM > Engine';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    /** SDTM **/

    /** Master **/
    case LOG_VIEW_CODE.MA1A0001:
      //'Master > Partner > 목록';
      break;
    case LOG_VIEW_CODE.MA1A0002:
      //'Master > Partner > 목록 > 생성';
      action = LOG_ACTION_CODE.INSERT;
      break;
    case LOG_VIEW_CODE.MA1A0101:
      //'Master > Partner > 상세 > Information';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.MA2A0001:
      //'Master > User > 목록';
      break;
    case LOG_VIEW_CODE.MA2A0002:
      //'Master > User > 목록 > 생성';
      action = LOG_ACTION_CODE.INSERT;
      break;
    case LOG_VIEW_CODE.MA2A0101:
      //'Master > User > 상세 > Information';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.MA3A0001:
      //'Master > Support-Notice > 목록';
      break;
    case LOG_VIEW_CODE.MA3A0002:
      //'Master > Support-Notice > 목록 > 생성';
      action = LOG_ACTION_CODE.INSERT;
      break;
    case LOG_VIEW_CODE.MA3A0101:
      //'Master > Support-Notice > 상세 > Information';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.MA4A0001:
      //'Master > Log > 목록';
      break;
    case LOG_VIEW_CODE.MA5A0001:
      //'Master > Training > 목록';
      break;
    case LOG_VIEW_CODE.MA5A0002:
      //'Master > Training > 목록 > 생성';
      action = LOG_ACTION_CODE.INSERT;
      break;
    case LOG_VIEW_CODE.MA5A0101:
      //'Master > Training > 상세 > Information';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.MA5A0201:
      //'Master > Training > 상세 > Page';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.MA5A0301:
      //'Master > Training > 상세 > Question';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.MA6A0001:
      //'Master > Map-TA Map > 목록';
      break;
    case LOG_VIEW_CODE.MA6A0002:
      //'Master > Map-TA Map > 목록 > 생성';
      action = LOG_ACTION_CODE.INSERT;
      break;
    case LOG_VIEW_CODE.MA6A0101:
      //'Master > Map-TA Map > 상세 > Information';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.MA6A0201:
      //'Master > Map-TA Map > 상세 > View';
      break;
    case LOG_VIEW_CODE.MA6A0202:
      //'Master > Map-TA Map > 상세 > View-Activity';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.MA6A0203:
      //'Master > Map-TA Map > 상세 > View-Assessment Concept';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.MA6A0301:
      //'Master > Map-TA Map > 상세 > Matrix';
      break;
    case LOG_VIEW_CODE.MA6B0001:
      //'Master > Map-Concept Map > 목록';
      action = LOG_ACTION_CODE.INSERT;
      break;
    case LOG_VIEW_CODE.MA6B0002:
      //'Master > Map-Concept Map > 목록 > 생성';
      action = LOG_ACTION_CODE.INSERT;
      break;
    case LOG_VIEW_CODE.MA6B0101:
      //'Master > Map-Concept Map > 상세 > Information';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.MA6B0201:
      //'Master > Map-Concept Map > 상세 > View';
      break;
    case LOG_VIEW_CODE.MA6B0202:
      //'Master > Map-Concept Map > 상세 > View-Element';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.MA6B0203:
      //'Master > Map-Concept Map > 상세 > View-Terminology';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.MA6B0301:
      //'Master > Map-Concept Map > 상세 > Matrix-List';
      break;
    case LOG_VIEW_CODE.MA6B0302:
      //'Master > Map-Concept Map > 상세 > Matrix-Detail';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.MA6C0001:
      //'Master > Map-Design Map > 목록';
      break;
    case LOG_VIEW_CODE.MA6C0002:
      //'Master > Map-Design Map > 목록 > 생성';
      action = LOG_ACTION_CODE.INSERT;
      break;
    case LOG_VIEW_CODE.MA6C0101:
      //'Master > Map-Design Map > 상세 > Information';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.MA6C0201:
      //'Master > Map-Design Map > 상세 > View';
      break;
    case LOG_VIEW_CODE.MA6C0202:
      //'Master > Map-Design Map > 상세 > View-Objective';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.MA6C0203:
      //'Master > Map-Design Map > 상세 > View-Endpoint';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.MA6C0301:
      //'Master > Map-Design Map > 상세 > Matrix';
      break;
    case LOG_VIEW_CODE.MA7A0001:
      //'Master > MetaData-TA > 목록';
      break;
    case LOG_VIEW_CODE.MA7A0002:
      //'Master > MetaData-TA > 목록 > 생성';
      action = LOG_ACTION_CODE.INSERT;
      break;
    case LOG_VIEW_CODE.MA7A0101:
      //'Master > MetaData-TA > 상세';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.MA7B0001:
      //'Master > MetaData-Indication > 목록';
      break;
    case LOG_VIEW_CODE.MA7B0002:
      //'Master > MetaData-Indication > 목록 > 생성';
      action = LOG_ACTION_CODE.INSERT;
      break;
    case LOG_VIEW_CODE.MA7B0101:
      //'Master > MetaData-Indication > 상세';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.MA7C0001:
      //'Master > MetaData-Activity > 목록';
      break;
    case LOG_VIEW_CODE.MA7C0002:
      //'Master > MetaData-Activity > 목록 > 생성';
      action = LOG_ACTION_CODE.INSERT;
      break;
    case LOG_VIEW_CODE.MA7C0101:
      //'Master > MetaData-Activity > 상세';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.MA7D0001:
      //'Master > MetaData-Assessment > 목록';
      break;
    case LOG_VIEW_CODE.MA7D0002:
      //'Master > MetaData-Assessment > 목록 > 생성';
      action = LOG_ACTION_CODE.INSERT;
      break;
    case LOG_VIEW_CODE.MA7D0101:
      //'Master > MetaData-Assessment > 상세';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.MA7E0001:
      //'Master > MetaData-SDTM Function > 목록';
      break;
    case LOG_VIEW_CODE.MA7E0002:
      //'Master > MetaData-SDTM Function > 목록 > 생성';
      action = LOG_ACTION_CODE.INSERT;
      break;
    case LOG_VIEW_CODE.MA7E0101:
      //'Master > MetaData-SDTM Function > 상세';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.MA7F0001:
      //'Master > MetaData-Objective > 목록';
      break;
    case LOG_VIEW_CODE.MA7F0002:
      //'Master > MetaData-Objective > 목록 > 생성';
      action = LOG_ACTION_CODE.INSERT;
      break;
    case LOG_VIEW_CODE.MA7F0101:
      //'Master > MetaData-Objective > 상세';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.MA7G0001:
      //'Master > MetaData-Endpoint > 목록';
      break;
    case LOG_VIEW_CODE.MA7G0002:
      //'Master > MetaData-Endpoint > 목록 > 생성';
      action = LOG_ACTION_CODE.INSERT;
      break;
    case LOG_VIEW_CODE.MA7G0101:
      //'Master > MetaData-Endpoint > 상세';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.MA7H0001:
      //'Master > MetaData-Criteria > 목록';
      break;
    case LOG_VIEW_CODE.MA7H0002:
      //'Master > MetaData-Criteria > 목록 > 생성';
      action = LOG_ACTION_CODE.INSERT;
      break;
    case LOG_VIEW_CODE.MA7H0101:
      //'Master > MetaData-Criteria > 상세';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.MA8A0001:
      //'Master > Standard-CDASH IG > 목록';
      break;
    case LOG_VIEW_CODE.MA8A0002:
      //'Master > Standard-CDASH IG > 목록 > 생성';
      action = LOG_ACTION_CODE.INSERT;
      break;
    case LOG_VIEW_CODE.MA8A0101:
      //'Master > Standard-CDASH IG > 상세 > Information';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.MA8A0102:
      //'Master > Standard-CDASH IG > 상세 > Variable';
      action = LOG_ACTION_CODE.INSERT;
      break;
    case LOG_VIEW_CODE.MA8A0103:
      //'Master > Standard-CDASH IG > 상세 > Variable Detail';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.MA8B0001:
      //'Master > Standard-SDTM IG > 목록';
      break;
    case LOG_VIEW_CODE.MA8B0101:
      //'Master > Standard-SDTM IG > 목록 > 상세 > Information';
      break;
    case LOG_VIEW_CODE.MA8B0102:
      //'Master > Standard-SDTM IG > 목록 > 상세 > Variable';
      break;
    case LOG_VIEW_CODE.MA8C0001:
      //'Master > Standard-Terminology > 목록';
      break;
    case LOG_VIEW_CODE.MA8C0002:
      //'Master > Standard-Terminology > 목록 > 생성';
      action = LOG_ACTION_CODE.INSERT;
      break;
    case LOG_VIEW_CODE.MA8C0101:
      //'Master > Standard-Terminology > 상세';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.MA8D0001:
      //'Master > Standard-Codelist > 목록';
      break;
    case LOG_VIEW_CODE.MA8D0101:
      //'Master > Standard-Codelist > 목록 > 상세';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.MA8E0001:
      //'Master > Standard-Custom Codelist > 목록';
      break;
    case LOG_VIEW_CODE.MA8E0002:
      //'Master > Standard-Custom Codelist > 목록 > 생성';
      action = LOG_ACTION_CODE.INSERT;
      break;
    case LOG_VIEW_CODE.MA8E0101:
      //'Master > Standard-Custom Codelist > 목록 > 상세';
      break;
    case LOG_VIEW_CODE.MA9A0001:
      //'Master > Reference-User Guide > 목록';
      break;
    case LOG_VIEW_CODE.MA9A0002:
      //'Master > Reference-User Guide > 목록 > 생성';
      action = LOG_ACTION_CODE.INSERT;
      break;
    case LOG_VIEW_CODE.MA9A0101:
      //'Master > Reference-User Guide > 목록 > 상세';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    /** Master **/

    /** Admin **/
    case LOG_VIEW_CODE.AD1A0001:
      //'Admin > User > 목록';
      break;
    case LOG_VIEW_CODE.AD1A0002:
      //'Admin > User > 목록 > 생성';
      action = LOG_ACTION_CODE.INSERT;
      break;
    case LOG_VIEW_CODE.AD1A0101:
      //'Admin > User > 목록 > 상세';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.AD2A0001:
      //'Admin > Log > 목록';
      break;
    /** Admin **/

    /** User **/
    case LOG_VIEW_CODE.US1A0001:
      //'User > My Info > Information';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.US2A0001:
      //'User > My Password > Information';
      action = LOG_ACTION_CODE.UPDATE;
      break;
    case LOG_VIEW_CODE.US3A0001:
      //'User > Training > 목록';
      break;
    case LOG_VIEW_CODE.US3A0101:
      //'User > My Info > 목록 > 상세 > Page';
      break;
    case LOG_VIEW_CODE.US3A0102:
      //'User > My Info > 목록 > 상세 > Question';
      action = LOG_ACTION_CODE.INSERT;
      break;
    case LOG_VIEW_CODE.US4A0001:
      //'User > Support > 목록';
      break;
    case LOG_VIEW_CODE.US4A0101:
      //'User > Support > 목록 > 상세';
      break;
    /** User **/
  }

  // return Log Object
  return {
    [DATA_FIELD_NAME.ACTION]  : action  ,
    [ES_FIELDS.MENU]          : CHAR_SYMBOL.EMPTY
  };
}

module.exports = {
  isEmpty                 ,
  findProp                ,
  extractProps            ,
  copyObject              ,
  getStringFromArray      ,
  getResponseQueryObject  ,
  getDifferObject         ,
  getDifferArray          ,
  getDifferIDList         ,
  generatePassword        ,
  getSearchTime           ,
  getDifferDataArray      ,
  getDifferDataObject     ,
  escapeSpecialChar       ,
  getFileExt              ,
  getMultipleUnit         ,
  getRequestTime          ,
  getLogMenuAction        ,
};
