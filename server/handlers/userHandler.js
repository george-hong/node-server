var path = require('path');
var mongodbHandler = require('./mongodbHandler.js');
var config = require(path.join(__dirname, '../config.js'));

var userHandler = {
  'login': login,
  'sign': sign,
  'checkUserName': checkUserName
};

function login(data, callback) {
  var dataModified = {
    'userName': data.userName
  };
  mongodbHandler.findOne(dataModified, config.userDatabaseName, function (err, result) {
    if (err) {
      callback && callback('db error', undefined);
    } else if (result === null) {
      callback && callback(undefined, 'account is unlive');
    } else {
      if (result.password !== data.password) {
        callback && callback(undefined, 'password error');
      } else {
        callback && callback(undefined, 'success');
      }
    }
  });
}

function sign(data, callback) {
  var dataModified = {
    'userName': data.userName,
    'nickName': data.nickName,
    'password': data.password
  };
  mongodbHandler.insert(dataModified, config.userDatabaseName, function (err, result) {
    if (err) {
      callback && callback('db error', undefined);
    } else {
      callback && callback(undefined, 'success');
    }
  });
}

function checkUserName(data, callback) {
  var dataModified = {
    'userName': data.userName
  };
  mongodbHandler.findOne(dataModified, config.userDatabaseName, function (err, result) {
    if (err) {
      callback && callback('db error', undefined);
    } else {
      if (result === null) {
        callback && callback(undefined, 1); //用户名可用
      } else {
        callback && callback(undefined, 0); //用户名不可用
      }
    }
  });
}

module.exports = userHandler;