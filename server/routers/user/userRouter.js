var userRouter = require('express').Router();
var userHandler = require('./userHandler.js');

function createResponseData(status, result) {
  var dealStatus;
  if (status === 0) {
    dealStatus = 'error';
  } else if (status === 1) {
    dealStatus = 'success';
  } else {
    dealStatus = status;
  }
  return {
    'status': dealStatus,
    'result': result
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
    res.send(createResponseData(1, result));
  }, err => {
    res.send(createResponseData(0, 0));
  })
})

userRouter.post('/login', function (req, res, next) {
  var data = req.body;
  userHandler.login(data).then(result => {
    if (result === 1) {
      res.send(createResponseData(1, {
        'message': 'account unlive',
        'code': result
      }));
    } else if (result === 2) {
      res.send(createResponseData(1, {
        'message': 'password error',
        'code': result
      }));
    } else {
      res.send(createResponseData(1, {
        'message': 'login success',
        'code': result
      }));
    }
  }, (err) => {
    res.send(createResponseData(0, {
      'message': 'server error',
      'code': 3
    }));
  });
});

userRouter.post('/sign', function (req, res, next) {
  var data = req.body
  userHandler.sign(data).then(result => {
    res.send(createResponseData(1, {
      'message': 'sign success',
      'code': 0
    }));
  }, err => {
    res.send(createResponseData(0 , {
      'message': 'sign fail',
      'code': 1
    }));
  });
});

module.exports = userRouter;