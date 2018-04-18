var config = require('./config.js');
var express = require('express');
var path = require('path');
var router = require('./routers/mainRouter.js');
var app = express();

app.use(router);
app.use(express.static(path.join(__dirname, '../app')));  // 静态资源

var server = app.listen(config.port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('server running at port', host, port);
});