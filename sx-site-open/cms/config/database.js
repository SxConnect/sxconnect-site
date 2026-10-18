const mysql = require('mysql2/promise');
const config = require('./index');

const pool = mysql.createPool(config.db);

pool.getConnection()
  .then(conn => {
    console.log('MySQL conectado com sucesso.');
    conn.release();
  })
  .catch(err => {
    console.error('Erro ao conectar no MySQL:', err.message);
  });

module.exports = pool;
