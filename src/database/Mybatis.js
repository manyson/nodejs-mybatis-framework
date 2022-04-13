const path          = require('path');
const mybatisMapper = require('mybatis-mapper');

// create the myBatisMapper from xml file
mybatisMapper.createMapper([
  path.resolve(__dirname, "mapper/user/user.xml"),
]);

// get query statement
const Query = (nameSpace, sqlID, params) =>{
  return mybatisMapper.getStatement(nameSpace, sqlID, params, {language: 'sql', indent: '  '});
};

module.exports = Query;
