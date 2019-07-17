var mongodbHandler = require('../../common/mongodbHandler.js');
var config = require('../../config.js');
var ObjectId = require('mongodb').ObjectID;

var userHandler = {
  login,
  sign,
  checkAccount,
  userDetail
};

function login(data) {
  return new Promise((resolve, reject) => {
    var dataModified = {
      account: data.account
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
          responseDate.nickName = dataFromDb.nickName;
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
      account: data.account,
      nickName: data.nickName || 'user',
      password: data.password,
      userGroup: config.defaultUserGroup
    };
    mongodbHandler.insert(dataModified, config.userDatabaseName).then(dataFromDb => {
      resolve(dataFromDb);
    }, err => {
      reject(err);
    });
  });
}

function checkAccount(data) {
  return new Promise((resolve, reject) => {
    var dataModified = {
      account: data.account
    };
    mongodbHandler.findOne(dataModified, config.userDatabaseName).then((result) => {
      if (result === null) {
        resolve({ usable: 'usable' }); //用户名可用
      } else {
        resolve({ usable: 'disabled' }); //用户名不可用
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
          account: dataFromDb.account,
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