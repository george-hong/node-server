var router = require('express').Router();
var mongodbHandler = require('../handlers/mongodbHandler.js');

var apiRouter = router.get('/a', function (req, res, next) {
  mongodbHandler.connectCollection('user').then(function (result) {
    res.send(result);
  }, function(err) {
    res.send(err);
  });
});

module.exports = apiRouter;

