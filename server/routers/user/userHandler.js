var mongodbHandler = require('../../common/mongodbHandler.js');
var config = require('../../config.js');
var ObjectId = require('mongodb').ObjectID;

var userHandler = {
  login,
  sign,
  checkUserName,
  userDetail
};

function login(data) {
  return new Promise((resolve, reject) => {
    var dataModified = {
      'userName': data.userName
    };
    mongodbHandler.findOne(dataModified, config.userDatabaseName).then(dataFromDb => {
      var responseDate = {
        _id: ''
      };
      if (dataFromDb === null) {
        responseDate.status = 1;
        resolve(responseDate); //用户不存在
      } else {
        if (dataFromDb.password !== data.password) {
          responseDate.status = 2;
          resolve(responseDate); // 密码错误
        } else {
          responseDate.status = 0;
          responseDate._id = dataFromDb._id;
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
      userName: data.userName,
      nickName: data.nickName,
      password: data.password,
      userGroup:  config.defaultUserGroup
    };
    mongodbHandler.insert(dataModified, config.userDatabaseName).then(dataFromDb => {
      resolve(dataFromDb);
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
        resolve({ code: 1 }); //用户名可用
      } else {
        resolve({ code: 0 }); //用户名不可用
      }
    }, (err) => {
      reject(err);
    });
  });
}

function userDetail(data) {
  var dataModified = {
    _id: ObjectId(data.userId)
  };
  return new Promise((resolve, reject) => {
    mongodbHandler.findOne(dataModified, config.userDatabaseName).then(dataFromDb => {
      if (dataFromDb) {
        var dataOfResponse = {
          userName: dataFromDb.userName,
          nickName: dataFromDb.nickName,
          password: dataFromDb.password,
          userGroup: dataFromDb.userGroup
        };
        resolve(dataOfResponse);
      } else {
        resolve(null);
      }
    }, err => {
      reject(err);
    });
  });
}

module.exports = userHandler;