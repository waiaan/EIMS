const config = require('./config');

const mysql = require('mysql');

const connection = mysql.createConnection(config.database);

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
})

const dbQuery = (query, escape) => {
  return new Promise((resolve, reject) => {
    if (escape) {
      connection.query(query, escape, (err, results, fields) => {
        if (err) return reject(err);
        resolve(results);
      });
    } else {
      connection.query(query, (err, results, fields) => {
        if (err) return reject(err);
        resolve(results);
      })
    }
  })
}


module.exports = dbQuery;
