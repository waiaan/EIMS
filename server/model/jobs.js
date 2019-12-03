const { log, sendResponse } = require('../utils');

const query = require('../database');

const employees = {
  getAll: (params, res) => {
    query((connection) => {
      const str = 'select * from jobs order by job_title';
      connection.query(str, function (err, rows) {
        if (err) {
          return sendResponse(res, err, { rows: [] });
        }
        res.end(JSON.stringify({ rows: rows }));
        sendResponse(res, { rows });
      })
    })
  }
}

module.exports = employees;
