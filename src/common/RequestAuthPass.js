/**
 *  @constant RequestAuthPass
 *  @type {array}
 *  @description  인증을 거치지 않는 API 정의
 */
const RequestAuthPass = [

  { METHOD : 'POST' , URL : '/user/signUp'  },   /** 회원 가입        */
  { METHOD : 'POST' , URL : '/user/login'   },   /** 로그인          */

  { METHOD : 'GET'  , URL : '/favicon'      },   /** favicon        */
];

module.exports = {
  RequestAuthPass    : RequestAuthPass  ,
};