/**  인증을 거치지 않는 API 정의 */
const RequestAuthPass = [
  { METHOD : 'POST' , URL : '/user/login'  },
  { METHOD : 'GET'  , URL : '/favicon'  },
];

module.exports = {
  RequestAuthPass    : RequestAuthPass  ,
};