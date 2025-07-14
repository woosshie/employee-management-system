const mysql = require('mysql2');

// MySQL 연결 설정
const pool = mysql.createPool({
  host: 'localhost',      // MySQL 서버 호스트
  user: 'root',          // MySQL 사용자 이름
  password: 'TestGreen',    // MySQL 비밀번호
  database: 'device_mgr', // 데이터베이스 이름
  waitForConnections: true,
  connectionLimit: 10,    // 최대 연결 수
  queueLimit: 0
});

// Promise Wrapper를 사용하여 async/await 지원
const promisePool = pool.promise();

module.exports = promisePool;