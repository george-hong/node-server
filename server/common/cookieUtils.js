var serverUtils = require('./serverUtils.js');
var CONFIG = require('../config.js');
var mongodbHandler = require('./mongodbHandler.js');

var cookieUtils = {
  setCookie,
  checkCookie
};

function setCookie(res, userId) {
  return new Promise((resolve, reject) => {
    var sessionId = Date.now() + serverUtils.creatSessionId(30);
    var endTime = Date.now() + CONFIG.cookieSurvivalTime;
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

function checkCookie(req, res, next) {
  return new Promise((resolve, reject) => {
    if (req.headers.cookie) {
      resolve();
    } else {
      reject();
    }
  });
}

function setCookieInDateBase(data) {
  return new Promise((resolve, reject) => {
    mongodbHandler.insert(data, CONFIG.cookieFormName).then(result => {
      resolve(result);
    }, err => {
      reject(err);
    })
  });
}

module.exports = cookieUtils;