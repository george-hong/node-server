var userRouter = require('express').Router();
var userHandler = require('./userHandler.js');
var serverUtils = require('../../common/serverUtils.js');
var CONFIG = require('../../config.js');

userRouter.get('/checkUserName', function (req, res, next) {
  var data = {
    'userName': req.query.userName
  };
  userHandler.checkUserName(data).then(result => {
    res.send(serverUtils.createResponseData(1, result));
  }, err => {
    res.send(serverUtils.createResponseData(0, 0));
  })
})

userRouter.post('/login', function (req, res, next) {
  var data = req.body;
  userHandler.login(data).then(result => {
    if (result === 1) {
      res.send(serverUtils.createResponseData(1, {
        'message': 'account unlive',
        'code': result
      }));
    } else if (result === 2) {
      res.send(serverUtils.createResponseData(1, {
        'message': 'password error',
        'code': result
      }));
    } else {
      var sessionId = serverUtils.creatSessionId(30);
      res.cookie('sessionId', sessionId, { expires: new Date(Date.now() + CONFIG.cookieSurvivalTime) });
      res.send(serverUtils.createResponseData(1, {
        'message': 'login success',
        'code': result
      }));
    }
  }, (err) => {
    res.send(serverUtils.createResponseData(0, {
      'message': 'server error',
      'code': 3
    }));
  });
});

userRouter.post('/sign', function (req, res, next) {
  var data = req.body
  userHandler.sign(data).then(result => {
    res.send(serverUtils.createResponseData(1, {
      'message': 'sign success',
      'code': 0,
      'id': result.ops[0]._id
    }));
  }, err => {
    res.send(serverUtils.createResponseData(0 , {
      'message': 'sign fail',
      'code': 1,
      'id': ''
    }));
  });
});

module.exports = userRouter;