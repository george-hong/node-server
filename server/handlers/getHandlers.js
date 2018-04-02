var url = require('url'); 

var getHandlers = {};

getHandlers = function(req, res) {
  var path = url.parse(req.url);
  res.send(path);
};

module.exports = getHandlers;