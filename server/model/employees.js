const { log } = require('../utils');

const query = require('../database');

const employees = {
  getAll: (params, res) => {
    const { pageSize, pageNum } = params;
    const offset = pageSize * (pageNum - 1);
    query((connection) => {
      connection.query(`select e.employee_id,e_name.name, email,  phone_number,  job_title, salary,commission_pct,  ifnull(department_name,"") as department_name, m.name as manager, date_format(hiredate,"%Y-%m-%d") as hiredate from employees e left join jobs j on e.job_id = j.job_id left join departments d on e.department_id = d.department_id left join employees_name e_name on e_name.employee_id=e.employee_id left join managers m on e.manager_id=m.employee_id where e.isDel=0 order by e_name.name limit ${pageSize} offset ${offset}; select count(*) as total from employees where isDel=0;`, function (err, rows) {
        if (err) {
          return log(err);
        }
        res.end(JSON.stringify({ rows: rows[0], ...rows[1][0] }));
      })
    })
  }
}

module.exports = employees;
