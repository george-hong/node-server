var MongoClient = require('mongodb').MongoClient;
var DB_CONNECT_STR = "mongodb://localhost:27017/";
var DATABASE_NAME_DEFAULT = 'blog';
var error = undefined;
var mongodbHandler = {
  'connectCollection': connectCollection,
  'insert': insert
};

function connectDataBase() {
  var promise = new Promise(function (resolve, reject) {
    MongoClient.connect(DB_CONNECT_STR, function (err, db) {
      if (err) {
        reject(err);
      } else {
        resolve(db);
      }
    });
  });
  return promise;
}

function connectCollection(collectionName, connectDataBaseName) {
  var dataBaseName = connectDataBaseName || DATABASE_NAME_DEFAULT;
  var promise = new Promise(function (resolve, reject) {
    connectDataBase()
      .then(function (db) {
        var dataBase = db.db(dataBaseName);
        dataBase.collection(collectionName).find().toArray(function (err, result) {
          if (err) {
            reject(err);
          } else {
            db.close();
            resolve(result);
          }
        });
      }, function (err) {
        reject(err);
      });
  });
  return promise;
}

function insert() {
  
}

module.exports = mongodbHandler;

