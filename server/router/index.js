const { log } = require('../utils')
const controller = require('../controller')

const urlReg = /\/([^/?]+)+/g

const getHandler = (type, req, res, id) => {
  if (id) {
    controller.getOne(type, req, res);
  } else {
    controller.getAll(type, req, res);
  }
}

const deleteHandler = (type, req, res) => {
  controller.delete(type, req, res);
}

const putHandler = (type, req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  })
  req.on('end', () => {
    controller.modify(type, JSON.parse(body), res);
  })
}

const postHandler = (type, req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  })
  req.on('end', () => {
    controller.add(type, JSON.parse(body), res);
  })
}

const router = (req, res) => {
  const { method } = req;
  log('request is: ', `${method} ${req.url}`);
  const [pathname, id] = req.url.match(urlReg);
  const type = pathname.replace(/^\//, '');
  if (method === 'GET') {
    getHandler(type, req, res, id)
  } else if (method === 'DELETE') {
    deleteHandler(type, req, res);
  } else if (method === 'PUT') {
    putHandler(type, req, res)
  } else if (method === 'POST') {
    postHandler(type, req, res)
  } else {
    log('router did not find any match')
  }
}

module.exports = router
