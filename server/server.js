const http = require('http');

const config = require('./config/config');
const { log } = require('./utils/utils');
const router = require('./router/router');

const allowedOrigins = ['http://172.16.100.176:8081', 'http://127.0.0.1:8081', 'http://localhost:8081'];

const server = http.createServer(async function (req, res) {
  const origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
  if (req.url === '/favicon.ico' || req.method === 'OPTIONS') {
    return res.end('');
  }
  req.url = req.url.replace('/' + config.version, '');
  router(req, res);
})

server.listen({ port: config.server.port }, function (err) {
  if (err) throw new Error(err);
  log(`server is running on port ${config.server.port}`)
});
