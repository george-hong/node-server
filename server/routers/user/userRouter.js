var userRouter = require('express').Router();
var serverUtils = require('../../common/serverUtils.js');
var cookieUtils = require('../../common/cookieUtils.js');
var userHandler = require('./userHandler.js');

userRouter.get('/checkUserName', (req, res, next) => {
  var data = {
    'userName': req.query.userName
  };
  userHandler.checkUserName(data).then(result => {
    res.send(serverUtils.createResponseData(1, result));
  }, err => {
    res.send(serverUtils.createResponseData(0, 0));
  })
});

userRouter.post('/login', (req, res, next) => {
  var data = req.body;
  userHandler.login(data).then(responseData => {
    if (responseData.status === 1) {
      res.send(serverUtils.createResponseData(1, {
        'message': 'account unlive',
        'code': 1,
        'userId': ''
      }));
    } else if (responseData.status === 2) {
      res.send(serverUtils.createResponseData(1, {
        'message': 'password error',
        'code': 2,
        'userId': ''
      }));
    } else {
      cookieUtils.setCookie(res, responseData._id).then(result => {
        res.send(serverUtils.createResponseData(1, {
          'message': 'login success',
          'code': 0,
          'userId': responseData._id
        }));
      }, err => {
        res.send(serverUtils.createResponseData(0, {
          'message': 'server error',
          'code': 3,
          'userId': ''
        }));
      });
    }
  }, (err) => {
    res.send(serverUtils.createResponseData(0, {
      'message': 'server error',
      'code': 3
    }));
  });
});

userRouter.post('/sign', (req, res, next) => {
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

userRouter.get('/userDetail', (req, res, next) => {
  cookieUtils.checkCookie(req, res, next).then(result => {
    console.log(result)
    res.send('321321111');
  }, msg => {
    res.send(serverUtils.createResponseData(4, null));
  })
});

module.exports = userRouter;