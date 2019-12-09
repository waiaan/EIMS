const { log, sendResponse } = require('../utils');

const query = require('../database');

const employees = {
  getAll: (params, res) => {
    let { sortProp, sortOrder } = params;
    let order = 'asc';
    if (!sortProp) {
      sortProp = 'job_title';
    }
    if (sortOrder === 'ascending') {
      order = 'asc'
    } else if (sortOrder === 'descending') {
      order = 'desc'
    }
    const str = `select * from jobs order by ${sortProp} ${order}`;
    query(str).then((rows) => {
      sendResponse.success(res, rows);
    }, (err) => {
      sendResponse.error(res, err, []);
    })
  },
  modify (params, res) {
    const { job_id, job_title, min_salary, max_salary } = params;
    let str = `update jobs set job_title='${job_title}',min_salary=${min_salary},max_salary=${max_salary} where job_id='${job_id}'`;
    query(str).then((rows) => {
      sendResponse.success(res, rows);
    }, (err) => {
      sendResponse.error(res, err, {});
    })
  },
  async add (params, res) {
    const { job_id, job_title, min_salary, max_salary } = params;
    query(`
    select count(*) as count from jobs where job_id='${job_id}';
    select count(*) as count from jobs where job_title='${job_title}';
    `).then((rows) => {
      if (rows[0][0].count > 0 || rows[1][0].count > 0) {
        sendResponse.error(res, 'job_id or job_title is already exist');
      } else {
        query(`insert into jobs (job_id,job_title,min_salary,max_salary) values('${job_id}','${job_title}',${min_salary},${max_salary})`).then((rows) => {
          sendResponse.success(res, rows);
        }, (err) => {
          sendResponse.error(res, err, {});
        })
      }
    }, (err) => {
      sendResponse.error(res, err, {});
    })
  },
  delete (id, res) {
    const str = `delete from jobs where job_id='${id}'`;
    query(str).then((rows) => {
      sendResponse.success(res, rows);
    }, (err) => {
      sendResponse.error(res, err, {});
    })
  }
}

module.exports = employees;
