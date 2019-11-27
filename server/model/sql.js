const mysql = require('./db');

const createViewQuery = ' ';

let pageSize = 10, pageNum = 1, offset = 0;
let orderBy = 'order by e_name.name';

const apis = {
  getTotal: {
    query: ``,
    handleParams (params) {
      return this.query + `${createViewQuery} ${orderBy} limit ${pageSize} offset ${offset};select count(*) as total from employees where isDel=0;`;
    }
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
