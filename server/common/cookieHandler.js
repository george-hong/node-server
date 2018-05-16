var router = require('express').Router();

var cookieHandler = router.use('/', cookieHandlerFunc);

function cookieHandlerFunc(req, res, next) {
  var cookie = req.headers.cookie;

  next();
}

module.exports = cookieHandler;