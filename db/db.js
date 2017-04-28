const mongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;
const url = "mongodb://localhost:27017/usersdb";

let state = {
  db: null
};

exports.connect = function (callback) {
  if (state.db) {
    return callback();
  }

  mongoClient.connect(url, (err, db) => {
    if (err) {
      return callback(err);
    }
    state.db = db;
    callback();
  })
};

exports.get = function () {
  return state.db
};