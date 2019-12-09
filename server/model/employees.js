const { log, sendResponse } = require('../utils');

const query = require('../database');

const employees = {
  getAll (params, res) {
    let { pageSize = 10, pageNum = 1, orderBy = 'name', order = '' } = params;
    const offset = pageSize * (pageNum - 1);
    switch (orderBy) {
      case 'name':
        orderBy = 'e_name.name'
        break;
    }
    switch (order) {
      case 'ascending':
        order = 'asc'
        break;
      case 'descending':
        order = 'desc'
        break;
    }
    const str = `select e.employee_id,e_name.name,e.first_name,e.last_name, email,  phone_number,  job_title, salary,commission_pct,  ifnull(department_name,"") as department_name, m.name as manager, date_format(hiredate,"%Y-%m-%d") as hiredate from employees e left join jobs j on e.job_id = j.job_id left join departments d on e.department_id = d.department_id left join employees_name e_name on e_name.employee_id=e.employee_id left join managers m on e.manager_id=m.employee_id where e.isDel=0 order by ${orderBy} ${order} limit ${pageSize} offset ${offset}; select count(*) as total from employees where isDel=0;`;
    query(str).then((rows) => {
      sendResponse.success(res, { rows: rows[0], ...rows[1][0] })
    }, (err) => {
      sendResponse.error(res, err, { rows: [], total: 0 });
    })
  },
  getOne (id, res) {
    const str = `select e.employee_id,e.first_name,e.last_name, email,  phone_number,  job_title, salary,commission_pct,  ifnull(department_name,"") as department_name, m.name as manager, date_format(hiredate,"%Y-%m-%d") as hiredate from employees e left join jobs j on e.job_id = j.job_id left join departments d on e.department_id = d.department_id left join employees_name e_name on e_name.employee_id=e.employee_id left join managers m on e.manager_id=m.employee_id where e.isDel=0 and e.employee_id=${id}`;
    query(str).then((rows) => {
      sendResponse.success(res, rows[0])
    }, (err) => {
      sendResponse.error(res, err, {});
    })
  },
  delete (id, res) {
    const str = `update employees set isDel=1 where employee_id=${id}`;
    query(str).then((rows) => {
      sendResponse.success(res, rows);
    }, (err) => {
      sendResponse.error(res, err, {});
    })
  },
  add (params, res) {
    console.log('add');
    console.log(params);
  },
  modify (params, res) {
    console.log('modify');
    console.log(params);
  }
}

module.exports = employees;
