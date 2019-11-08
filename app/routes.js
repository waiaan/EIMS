const { UrlParser } = require('./utils');
const sql = require('./sql');

const routes = (reqUrl) => {
  const url = new UrlParser(reqUrl);
  return new Promise((resolve, reject) => {
    if (url.api === 'find') {
      sql.find(url.query).then((results) => {
        resolve(results);
      })
    }
  })
}

module.exports = routes
