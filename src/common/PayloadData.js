const {DB_FIELD_NAME} = require('../common/Constant');

class PayloadData {

  constructor(){
    this.userID   = null;
    this.userName = null ;
  }

  // payload 설정
  setUserData(userID, userName){
    this.userID     = userID    ;
    this.userName   = userName  ;
  }

  // load PayloadData
  loadObject(payload){

    /** 아이디가 있는 경우  */
    if(payload.hasOwnProperty(DB_FIELD_NAME.USER_ID)){
      this.userID = payload[DB_FIELD_NAME.USER_ID];
    }

    /** 이름이 있는 경우  */
    if(payload.hasOwnProperty(DB_FIELD_NAME.USER_NAME)){
      this.userName = payload[DB_FIELD_NAME.USER_NAME];
    }
  }

  getObject(){
    const payload = {
      [DB_FIELD_NAME.USER_ID]   : this.userID   ,
      [DB_FIELD_NAME.USER_NAME] : this.userName
    };
    return payload;
  }
}

module.exports = PayloadData ;