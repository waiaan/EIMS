const { log } = require('../utils')
const controller = require('../controller')

const router = (req, res) => {
  const { method } = req;
  log('request url is: ', `${req.url}`);
  const urlReg = /\/([^/?]+)+/g;
  const [pathname, id] = req.url.match(urlReg);
  const type = pathname.replace(/^\//, '');
  if (method === 'GET') {
    if (id) {
      controller.getOne(type, req, res);
    } else {
      controller.getAll(type, req, res);
    }
  } else if (method === 'DELETE') {
    controller.delete(type, req, res)
  } else {
    log('router did not find any match')
  }
}

module.exports = router
