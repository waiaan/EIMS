const { log } = require('../utils');

const query = require('../database');

const employees = {
  getAll: (params, res) => {
    query((connection) => {
      const str = 'select d.department_id,department_name,city,d.location_id,concat(first_name," ",last_name) as manager_name,d.manager_id from departments d left join locations l on d.location_id=l.location_id left join employees e on e.employee_id=d.manager_id';
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
