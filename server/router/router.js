const url = require('url');

const { log } = require('../utils/utils')
const { employees } = require('../controller')

const router = (req, res) => {
  const { pathname } = url.parse(req.url);
  const { method } = req;
  log(`request url is ${req.url}`);
  if (pathname === '/employees') {
    if (method === 'GET') {
      employees.getAll(req, res);
    }
  } else if (/\/employees\/S+/.test) {
    employees.getOne(req, res);
  }
}

module.exports = router
