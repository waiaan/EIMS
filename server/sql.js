const mysql = require('./db');

const createViewQuery = 'select e.employee_id,e_name.name, email,  phone_number,  job_title,  (e.salary*12+e.salary*ifnull(commission_pct,0)) as salary,  ifnull(department_name,"") as department_name, m.name as manager, date_format(hiredate,"%Y-%m-%d") as hiredate from employees e left join jobs j on e.job_id = j.job_id left join departments d on e.department_id = d.department_id left join employees_name e_name on e_name.employee_id=e.employee_id left join managers m on e.manager_id=m.employee_id where e.isDel=0 ';

let pageSize = 10, pageNum = 1, offset = 0;
let orderBy = 'order by e_name.name';

const apis = {
  find: {
    query: createViewQuery,
    handleParams (params) {
      return this.query + `${orderBy} limit ${pageSize} offset ${offset}`;
    }
  },
  getTotal: {
    query: 'select count(*) as total from employees where isDel=0'
  },
  delete: {
    query: 'update employees set isDel=1 where employee_id=',
    handleParams (params) {
      const { id } = params;
      return this.query + `${id}`;
    }
  },
  getJobs: {
    query: 'select * from jobs order by job_title'
  },
  getManagers: {
    query: 'select * from managers order by name'
  },
  getDepartments: {
    query: 'select * from departments order by department_name'
  }
}

const sqlQuery = (apiType, params) => {
  const api = apis[apiType];
  let { query } = api;
  if ('handleParams' in api) {
    if ('pageSize' in params) {
      pageSize = params.pageSize;
    }
    if ('pageNum' in params) {
      pageNum = params.pageNum;
    }
    offset = pageSize * (pageNum - 1);
    query = api.handleParams(params);
  }
  return new Promise((resolve, reject) => {
    mysql.query(query, (err, results, fields) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(results);
    })
  })
}

module.exports = sqlQuery
