var config = require('./config.js');
var express = require('express');
var path = require('path');
var router = require('./routers/mainRouter.js');
var app = express();

app.all('*',function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
      res.send(200);  //让options尝试请求快速结束
  else
      next();
})

app.use(router);
app.use(express.static(path.join(__dirname, '../app')));  // 静态资源

var server = app.listen(config.port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('server running at port', host, port);
});