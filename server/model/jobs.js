const { log, sendResponse } = require('../utils');

const query = require('../database');

const employees = {
  getAll: (params, res) => {
    const str = 'select * from jobs order by job_title';
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
  }
}

module.exports = employees;
