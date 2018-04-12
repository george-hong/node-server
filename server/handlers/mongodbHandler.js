var MongoClient = require('mongodb').MongoClient;
var DB_CONNECT_STR = "mongodb://localhost:27017/";
var DATABASE_NAME_DEFAULT = 'blog';
var _undefined = undefined;

function handlerErrorAndData(err, data, callback) {
  if (err) {
    callback && callback(err, _undefined);
  } else {
    callback && callback(_undefined, data);
  }
}

function connectClient(callback) {
  MongoClient.connect(DB_CONNECT_STR, function (err, client) {
    if (err) {
      callback && callback(err, _undefined);
    } else {
      callback && callback(_undefined, client);
    }
  });
}

function connectDB (dbName, callback) {
  connectClient(function (err, client) {
    if (err) {
      callback && callback(err, _undefined);
    } else {
      callback && callback(_undefined, client.db(dbName));
      client.close();
    }
  })
}

function insert(data, collectionName, callback) {
  connectDB('blog', function (err, db) {
    if (err) {
      callback && callback(err, _undefined);
    } else {
      db.collection(collectionName).insert(data, function (err, result) {
        if (err) {
          callback && callback(err, _undefined);
        } else {
          callback && callback(_undefined, result);
        }
      });
    }
  });
}

function findOne(data, collectionName, callback) {
  connectDB('blog', function (err, db) {
    if (err) {
      callback && callback(err, _undefined);
    } else {
      db.collection(collectionName).findOne(data, function (err, result) {
        if (err) {
          callback && callback(err, _undefined);
        } else {
          callback && callback(_undefined, result);
        }
      });
    }
  });
}

function findAll(data, collectionName, callback) {
  connectDB('blog', function (err, db) {
    if (err) {
      callback && callback(err, _undefined);
    } else {
      db.collection(collectionName).findAll(data, function (err, result) {
        if (err) {
          callback && callback(err, _undefined);
        } else {
          callback && callback(_undefined, result);
        }
      });
    }
  });
}



var mongodbHandler = {
  'insert': insert,
  'findOne': findOne,
  'findAll': findAll
};
module.exports = mongodbHandler;
