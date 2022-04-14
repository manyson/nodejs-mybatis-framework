const {DB_FIELD_NAME} = require('../common/Constant');

/**
 *  @summary
 *  JWT의 payload 관련 데이터를 다루는 class
 *
 *  @author 김정현 <artjung77@gmail.com>
 *  @version 1.0,
 *  @see None
 */
class PayloadData {

  constructor(){
    this.userID   = null;
    this.userName = null ;
  }

  /**
   * object 형을 입력 받아서 클래스 필드에 설정
   * @param {object} 입력 object 형
   */
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

  /**
   * 클래스의 필드들을 object 형으로 반환
   * @returns {object} 필드들이 포함된 오브젝트
   */
  getObject(){
    const payload = {
      [DB_FIELD_NAME.USER_ID]   : this.userID   ,
      [DB_FIELD_NAME.USER_NAME] : this.userName
    };
    return payload;
  }

  /**
   * userID 조회
   * @returns {string} 유저 아이디
   */
  getUserID(){
    return this.userID;
  }
}

module.exports = PayloadData ;