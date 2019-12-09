const { log, sendResponse } = require('../utils');

const query = require('../database');

const employees = {
  getAll: (params, res) => {
    let { sortProp, sortOrder } = params;
    let order = 'asc';
    if (!sortProp) {
      sortProp = 'department_name';
    }
    if (sortOrder === 'ascending') {
      order = 'asc'
    } else if (sortOrder === 'descending') {
      order = 'desc'
    }
    const str = `select d.department_id,department_name,city,d.location_id,concat(first_name," ",last_name) as manager_name,d.manager_id,l.city,l.street_address,l.postal_code,l.state_province,l.country_id from departments d left join locations l on d.location_id=l.location_id left join employees e on e.employee_id=d.manager_id order by ${sortProp} ${order}`;
    query(str).then((rows) => {
      sendResponse.success(res, rows)
    }, (err) => {
      sendResponse.error(res, err, [])
    })
  }
}

module.exports = employees;
