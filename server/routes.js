const { UrlParser } = require('./utils');
const sqlQuery = require('./sql');

const routes = (req, params) => {
  if (params.trim() !== '') {
    params = JSON.parse(params);
  } else {
    params = {};
  }
  console.log('request params is: ', JSON.stringify(params));
  const url = new UrlParser(req.url);
  return new Promise((resolve, reject) => {
    sqlQuery(url.api, params).then((results) => {
      resolve(results);
    }, (err) => {
      console.log(err);
      reject(err);
    });
  })
}

module.exports = routes
