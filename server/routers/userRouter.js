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
  userHandler.checkUserName(data).then(result => {
    res.send(createSucData(result));
  }, err => {
    res.send(createErrData());
  })
})

userRouter.post('/login', function (req, res, next) {
  var data = req.body;
  userHandler.login(data).then(result => {
    if (result === 1) {
      res.send(createSucData({
        'message': 'account unlive',
        'code': result
      }));
    } else if (result === 2) {
      res.send(createSucData({
        'message': 'password error',
        'code': result
      }));
    } else {
      res.send(createSucData({
        'message': 'login success',
        'code': result
      }));
    }
  }, (err) => {
    res.send(createErrData());
  });
});

userRouter.post('/sign', function (req, res, next) {
  var data = req.body
  userHandler.sign(data).then(result => {
    res.send(createSucData({
      'message': 'sign success',
      'code': 0
    }));
  }, err => {
    res.send(createErrData(err));
  });
});

module.exports = userRouter;