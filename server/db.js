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


module.exports = connection;
