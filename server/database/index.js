const config = require('../config');
const { log } = require('../utils');

const mysql = require('mysql');

const pool = mysql.createPool(config.database);

const query = (str) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      log('connecting database...')
      if (err) {
        log('connecting database error!', err);
        reject(err);
      } else {
        log('database connected!', 'start querying...', 'the query is:', str)
        connection.query(str, (err, rows) => {
          if (err) {
            log('query error:\n\r', JSON.stringify(err));
            return reject(err);
          } else {
            log('query success:\n\r', JSON.stringify(rows));
            resolve(rows)
          }
        })
      }
      connection.release();
      log('database connection released')
    })
  })
}

module.exports = query;
