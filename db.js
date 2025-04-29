const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '07Akhil09@',
  database: 'result_system'
});

module.exports = db;
