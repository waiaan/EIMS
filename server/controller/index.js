const url = require('url');

const { parseQuery, log } = require('../utils')
const model = require('../model')

const controller = {
  getAll (type, req, res) {
    const { query } = url.parse(req.url);
    const params = (query && parseQuery(query)) || {};
    if (model[type]) {
      model[type].getAll(params, res);
    } else {
      log(`model ${type} does not exist`)
    }
  },
  getOne (type, req, res) {

  },
  delete (type, req, res) {
    const id = /^\/[^/]+\/(\S+)/.exec(req.url)[1];
    model[type].delete(id, res)
  }
}

module.exports = controller
