var path = require('path');
var mongodbHandler = require('./mongodbHandler.js');
var config = require(path.join(__dirname, '../config.js'));

var userHandler = {
  'login': login,
  'sign': sign
};

function login(data, callback) {
  var dataModified = {
    'userName': data.userName
  };
  mongodbHandler.findOne(dataModified, config.userDatabaseName, function(err, result) {
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
  mongodbHandler.insert(data, config.userDatabaseName, callback);
}

module.exports = userHandler;