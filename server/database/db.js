const config = require('../config/config');
const { log } = require('../utils/utils');

const mysql = require('mysql');

const pool = mysql.createPool(config.database);

const query = (callback) => {
  pool.getConnection((err, connection) => {
    log('connecting database...')
    if (err) {
      log('connecting database error!');
      return log(err);
    } else {
      log('database connected!');
      callback(connection);
    }
    connection.release();
    log('database connection released')
  })
}

module.exports = query;
