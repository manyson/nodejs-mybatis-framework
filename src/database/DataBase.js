const mysql   = require('mysql2/promise');

/**
 *  database connection pool 생성
 */
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

/**
 *  database connection pool 에서 connect 된 객체가 발생 했을 때
 */
pool.on('acquire', (connection) => {
  console.log(`Connection ${connection.threadId} acquired`);
});

/**
 *  database connection pool 의 connection 객체를 대기
 */
pool.on('enqueue',() => {
  console.log('Waiting for available connection slot');
});

/**
 *  database connection pool 의 connection 이 해제 되었을 때
 */
pool.on('release', (connection) => {
  console.log(`Connection ${connection.threadId} released`);
});

/**
 *  database connection pool 이 만들어 졌을 때
 */
pool.on('connection', () => {
  console.log(`Connection pool created`);
});

/**
 * connection 객체 구하기
 * @returns {Object} connection 객체
 */
const getPoolConnection = async () => {
  const connection = await pool.getConnection(async conn => conn);
  return connection;
}

module.exports = getPoolConnection;