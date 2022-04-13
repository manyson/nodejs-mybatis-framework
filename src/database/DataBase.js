const mysql   = require('mysql2/promise');

// pool 생성
let  pool = mysql.createPool({
    host      : process.env.DB_HOST ,
    port      : process.env.DB_PORT ,
    database  : process.env.DB_NAME ,
    user      : process.env.DB_USER ,
    password  : process.env.DB_PASS ,
    connectionLimit : process.env.DB_CONNECTION_LIMIT ,
    multipleStatements : true
  }
);

pool.on('acquire', (connection) => {
  console.log(`Connection ${connection.threadId} acquired`);
});

pool.on('enqueue',() => {
  console.log('Waiting for available connection slot');
});

pool.on('release', (connection) => {
  console.log(`Connection ${connection.threadId} released`);
});

pool.on('connection', () => {
  console.log(`Connection pool created`);
});

// connection 객체 구하기
const getPoolConnection = async () => {
  const connection = await pool.getConnection(async conn => conn);
  return connection;
}

module.exports = getPoolConnection;

