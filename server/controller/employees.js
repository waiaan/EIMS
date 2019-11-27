const url = require('url');

const { parseQuery } = require('../utils/utils')
const { employeesModel } = require('../model')

const employees = {
  getAll: (req, res) => {
    const { query } = url.parse(req.url);
    const params = parseQuery(query);
    const result = employeesModel.getAll(params, res);
  },
  getOne: (req, res) => {

  }
}

module.exports = employees;
