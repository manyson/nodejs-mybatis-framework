const mybatisMapper = require('mybatis-mapper');

// create the myBatisMapper from xml file
mybatisMapper.createMapper([
  './database/mapper/auth/auth.xml'               ,
  './database/mapper/common/common.xml'           ,
]);

// get query statement
const Query = (nameSpace, sqlID, params) =>{
  return mybatisMapper.getStatement(nameSpace, sqlID, params, {language: 'sql', indent: '  '});
};

module.exports = Query;
