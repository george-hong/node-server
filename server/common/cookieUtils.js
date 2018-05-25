var serverUtils = require('./serverUtils.js');
var config = require('../config.js');
var mongodbHandler = require('./mongodbHandler.js');

var cookieUtils = {
  setCookie,
  checkCookie
};

function setCookie(res, userId) {
  return new Promise((resolve, reject) => {
    var sessionId = Date.now() + serverUtils.creatSessionId(30);
    var endTime = Date.now() + config.cookieSurvivalTime;
    var data = {
      sessionId,
      endTime,
      userId
    };
    setCookieInDateBase(data).then(result => {
      res.cookie('sessionId', sessionId, { expires: new Date(endTime) });
      resolve(result);
    }, err => {
      console.log('database set cookie error')
      reject(err);
    })
  });
}

//校验cookie,如cookie存在且在有效期内则resolve,否则reject
function checkCookie(req, res, next) {
  return new Promise((resolve, reject) => {
    var cookie = req.headers.cookie;
    if (cookie) {
      var data = { sessionId: cookie.slice(10) };
      mongodbHandler.findOne(data, config.cookieFormName).then(dataFromDb => {
        var currentTime = Date.now();
        if (dataFromDb && currentTime <= dataFromDb.endTime) {
          resolve(dataFromDb);
        } else {
          reject();
        }
      }, err => {
        reject(err);
      });
    } else {
      reject();
    }
  });
}

function setCookieInDateBase(data) {
  return new Promise((resolve, reject) => {
    mongodbHandler.insert(data, config.cookieFormName).then(result => {
      resolve(result);
    }, err => {
      reject(err);
    })
  });
}

module.exports = cookieUtils;