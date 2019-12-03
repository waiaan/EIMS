const { log } = require('../utils');

const query = require('../database');

const employees = {
  getAll: (params, res) => {
    query((connection) => {
      const str = 'select * from locations';
      connection.query(str, function (err, rows) {
        if (err) {
          return log(err);
        }
        res.end(JSON.stringify({ rows: rows }));
      })
    })
  }
}

module.exports = employees;
