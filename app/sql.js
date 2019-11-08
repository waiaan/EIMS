const db = require('./db');

const queryStr = 'select concat(first_name," ",last_name) as name, email,  phone_number,  job_title,  salary,  commission_pct,  department_name, hiredate from employees e left join jobs j on e.job_id = j.job_id left join departments d on e.department_id = d.department_id'

const find = (query) => {
  return new Promise((resolve, reject) => {
    if (Object.keys(query).length < 1) {
      db(queryStr).then((results) => {
        resolve(results);
      })
    }
  })
}

module.exports = {
  find
}
