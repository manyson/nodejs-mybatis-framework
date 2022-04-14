const path          = require('path');
const mybatisMapper = require('mybatis-mapper');

/**
 * 트랜젝션 종료 시 처리
 * mybatis 에서 사용하는 mapper 파일 등록
 */
mybatisMapper.createMapper([
  path.resolve(__dirname, "mapper/user/user.xml"),
]);

/**
 * get query statement
 */
const Query = (nameSpace, sqlID, params) =>{
  return mybatisMapper.getStatement(nameSpace, sqlID, params, {language: 'sql', indent: '  '});
};

module.exports = Query;
