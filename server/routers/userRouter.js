var path = require('path');
var userRouter = require('express').Router();
var userHandler = require(path.join(__dirname, '../handlers/userHandler.js'));

userRouter.post('/login', function (req, res, next) {
  var data = req.body;
  userHandler.login(data, function (err, result) {
    if (err) {
      res.send(err);
    } else if (result === 'success') {
      res.send('login success');
    } else {
      res.send(result);
    }
  });
});

userRouter.post('/sign', function (req, res, next) {
  var data = req.body
  userHandler.sign(data, function () {
    res.send('sign ok');
  })
});

module.exports = userRouter;