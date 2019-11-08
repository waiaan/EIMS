const config = require('./config');
const routes = require('./routes');

const http = require('http');

const server = http.createServer(async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  let result = await routes(req.url);
  result = JSON.parse(JSON.stringify(result));
  res.end(JSON.stringify(result));
})

server.listen({ port: config.server.port }, function (err) {
  if (err) throw new Error(err);
  console.log(`server is running on port ${config.server.port}`)
});

module.exports = server;
