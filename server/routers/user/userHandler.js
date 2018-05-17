var mongodbHandler = require('../../common/mongodbHandler.js');
var config = require('../../config.js');

var userHandler = {
  'login': login,
  'sign': sign,
  'checkUserName': checkUserName
};

function login(data) {
  return new Promise((resolve, reject) => {
    var dataModified = {
      'userName': data.userName
    };
    mongodbHandler.findOne(dataModified, config.userDatabaseName).then(result => {
      var responseDate = {
        _id: ''
      };
      if (result === null) {
        responseDate.status = 1;
        resolve(responseDate); //用户不存在
      } else {
        if (result.password !== data.password) {
          responseDate.status = 2;
          resolve(responseDate); // 密码错误
        } else {
          responseDate.status = 0;
          responseDate._id = result._id;
          resolve(responseDate); // 登录成功
        }
      }
    }, err => {
      reject(err);
    })
  });
}

function sign(data) {
  return new Promise((resolve, reject) => {
    var dataModified = {
      'userName': data.userName,
      'nickName': data.nickName,
      'password': data.password
    };
    mongodbHandler.insert(dataModified, config.userDatabaseName).then(result => {
      resolve(result);
    }, err => {
      reject(err);
    });
  });
}

function checkUserName(data) {
  return new Promise((resolve, reject) => {
    var dataModified = {
      'userName': data.userName
    };
    mongodbHandler.findOne(dataModified, config.userDatabaseName).then((result) => {
      if (result === null) {
        resolve(1); //用户名可用
      } else {
        resolve(0); //用户名不可用
      }
    }, (err) => {
      reject(err);
    });
  });
}

module.exports = userHandler;