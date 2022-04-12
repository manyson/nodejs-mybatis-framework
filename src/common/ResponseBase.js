// module import
const {SUCCESS_CODE}    = require("./ResponseConst");
const {RESPONSE_FIELD}  = require('./ResponseConst');

// 응답 객체
class ResponseBase {

  constructor(data, requestData){

    // secure 설정
    this.secure = false ;

    // property 설정
    this.data         = data  ;

    // 요청 데이터
    this.requestData  = requestData ;
  }

  // 코드 데이터 설정
  setResponseCode(responseCode){

    for (const key in responseCode) {
      this.data[key] = responseCode[key];
    }
  }

  setResponseCode(responseCode, count){

    for (const key in responseCode) {
      this.data[key] = key === "msg" ? responseCode[key].replace("$n", count).replace("$s", count > 1 ? 's': '') : responseCode[key];
    }
  }

  // 코드 응답
  getResponseCode(){
    return this.getDataValue(RESPONSE_FIELD.CODE);
  }

  // 정상 응답인지
  isSuccess () {
    return this.getResponseCode() === SUCCESS_CODE ;
  }

  setData(data){

    if(data instanceof ResponseBase){

      const responseData = data.getData();

      for (const key in responseData) {
        // property 에 있는 경우에 셋팅
        // eslint-disable-next-line no-prototype-builtins
        if(this.data.hasOwnProperty(key) === true){
          if(responseData[key]){
            this.data[key] = responseData[key];
          }
        }
      }
    }
    else{
      for (const key in data) {
        // property 에 있는 경우에 셋팅
        // eslint-disable-next-line no-prototype-builtins
        if(this.data.hasOwnProperty(key) === true){
          if(data[key]){
            this.data[key] = data[key];
          }
        }
      }
    }
  }

  // 응답 객체에 특정한 값 셋팅
  setDataValue(key, value){

    // 응답 데이터의 해당 키가 있을 경우 setting
    // eslint-disable-next-line no-prototype-builtins
    if(this.data.hasOwnProperty(key) === true){
      this.data[key] = value;
    }
  }

  // 현재 설정된 응답 객체
  getData(){
    return this.data;
  }

  // 응답 객체에서 특정 값 응답
  getDataValue(key){

    // eslint-disable-next-line no-prototype-builtins
    if(this.data.hasOwnProperty(key) === true) {
      return this.data[key];
    }
    return null ;
  }

  // json string 응답
  getJsonString(){

    // 데이터가 있는 경우
    if(this.data){
      return JSON.stringify(this.data);
    }
    return null ;
  }

  // 암호화로 설정
  setSecure() {
    this.secure = true ;
  }

  // 암호 여부 체크
  getSecure(){
    return this.secure;
  }

  // 요청 데이터
  getRequestData(){
    return this.requestData;
  }

}

module.exports = ResponseBase;
