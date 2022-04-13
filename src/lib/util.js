const crypto = require("crypto");

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
 * 비밀번호 해시값
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
  isEmpty             ,
  findProp            ,
  copyObject          ,
  getDifferObject     ,
  makePasswordHashed  ,
  createSalt          ,
};
