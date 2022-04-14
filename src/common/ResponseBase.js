// module import
const {RESPONSE_FIELD}  = require("./ResponseConst");
const {StatusCodes}     = require("http-status-codes");

/**
 *  @summary
 *  기본 응답 객체
 *
 *  @author 김정현 <artjung77@gmail.com>
 *  @version 1.0,
 *  @see None
 */
class ResponseBase {

  constructor(data, requestData){

    // secure 설정
    this.secure = false ;

    // 응답 실 데이터
    this.data         = data  ;

    // 요청 데이터
    this.requestData  = requestData ;
  }

  /**
   * 응답 코드 객체의 내용을 설정
   * @param {object} 응답 코드 객체
   */
  setResponseCode(responseCode){
    for (const key in responseCode) {
      this.data[key] = responseCode[key];
    }
  }

  /**
   * 응답객체의 응답 코드를 조회
   * @returns {number} 응답 코드
   */
  getResponseCode(){
    return this.getDataValue(RESPONSE_FIELD.CODE);
  }

  /**
   * 정상 응답인지 체크
   * @returns {boolean} 정상 처리 응답 여부
   */
  isSuccess () {
    return this.getResponseCode() === StatusCodes.OK ;
  }

  /**
   * 응답 데이터 설정
   * @param {object} 응답 데이터에 사용할 객체
   */
  setData(data){
    this.data = data;
  }

  /**
   * 응답 데이터에 특정한 값 셋팅
   * @param {string} 응답 데이터 설정할 키
   * @param {any}    응답 데이터 설정할 값
   */
  setDataValue(key, value){
      this.data[key] = value;
  }

  /**
   * 응답 데이터 객체 조회
   * @returns {object} 응답 데이터
   */
  getData(){
    return this.data;
  }

  /**
   * 응답 데이터에 특정 값 조회
   * @param {string} 응답 데이터 설정할 키
   * @returns {any} 키에 해당하는 값
   */
  getDataValue(key){

    // eslint-disable-next-line no-prototype-builtins
    if(this.data.hasOwnProperty(key) === true) {
      return this.data[key];
    }
    return null ;
  }

  // 암호화로 설정
  setSecure() {
    this.secure = true ;
  }

  /**
   * 암호화 여부 조회
   * @returns {boolean} 암호화 여부
   */
  getSecure(){
    return this.secure;
  }

  /**
   * 요청 데이터 조회
   * @returns {object} 요청 데이터
   */
  getRequestData(){
    return this.requestData;
  }
}

module.exports = ResponseBase;
