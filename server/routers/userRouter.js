var path = require('path');
var userRouter = require('express').Router();
var userHandler = require(path.join(__dirname, '../handlers/userHandler.js'));

function createErrData(status) {
  var dealStatus = status || 'error';
  return {
    'status': dealStatus,
    'result': null
  }
}

function createSucData(result) {
  var dealResult = result === undefined ? null : result ;
  return {
    'status': 'success',
    'result': dealResult
  }
}

userRouter.get('/checkUserName', function (req, res, next) {
  var data = {
    'userName': req.query.userName
  };
  userHandler.checkUserName(data, function (err, result) {
    if (err) {
      res.send(createErrData());
    } else {
      res.send(createSucData(result));
    }
  });
})

userRouter.post('/login', function (req, res, next) {
  var data = req.body;
  userHandler.login(data, function (err, result) {
    if (err) {
      res.send(createErrData());
    } else if (result === 'success') {
      res.send(createSucData());
    } else {
      res.send(createErrData(result));
    }
  });
});

userRouter.post('/sign', function (req, res, next) {
  var data = req.body
  userHandler.sign(data, function (err, result) {
    if (err) {
      res.send(createErrData());
    } else {
      res.send(createSucData());
    }
  })
});

module.exports = userRouter;