var MongoClient = require('mongodb').MongoClient;
var DB_CONNECT_STR = "mongodb://localhost:27017/";
var CONFIG = require('../config.js');
var _undefined = undefined;
var mongodbHandler = {
  'insert': insert,
  'remove': remove,
  'findOne': findOne,
  'findAll': findAll
};

function handlerDBError (err) {
  console.log('mongodb error');
}

function connectClient() {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(DB_CONNECT_STR, (err, client) => {
      if (err) {
        reject(err);
      } else {
        resolve(client);
      }
    });
  });
}

function connectDB (dbName, client) {
  return new Promise((resolve, reject) => {
    var database = {
      'db': client.db(dbName),
      'close': client.close
    };
    resolve(database);
  })
}

function insert(data, collectionName) {
  return new Promise((resolve, reject) => {
    connectClient()
      .then(client => {
        return connectDB(CONFIG.defaultDatabaseName, client);
      }, handlerDBError)
      .then(database => {
        database.db.collection(collectionName).insert(data, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      })
  });
}

function remove(data, collectionName) {
  return new Promise((resolve, reject) => {
    connectClient()
      .then(client => {
        return connectDB(CONFIG.defaultDatabaseName, client);
      }, handlerDBError)
      .then(database => {
        database.db.collection(collectionName).remove(data, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      })
  });
}

function findOne(data, collectionName) {
  return new Promise((resolve, reject) => {
    connectClient()
      .then(client => {
        return connectDB(CONFIG.defaultDatabaseName, client);
      }, handlerDBError)
      .then(database => {
        database.db.collection(collectionName).findOne(data, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      })
  });
}

function findAll(data, collectionName) {
  return new Promise((resolve, reject) => {
    connectClient()
      .then(client => {
        return connectDB(CONFIG.defaultDatabaseName, client);
      }, handlerDBError)
      .then(database => {
        database.db.collection(collectionName).findAll(data, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      })
  });
}

module.exports = mongodbHandler;