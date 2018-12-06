var {
    MongoClient
} = require("mongodb");

var CONN_DB_STR = "mongodb://106.14.201.102:27017/hdhd";
// var CONN_DB_STR = "mongodb://localhost:27017/hdhd";


function conn (callback) {
    MongoClient.connect(CONN_DB_STR, (err, db) => {
        if (err) {
            console.log(err);
            callback(err, null);
        } else {
            callback(null, db);
        }
    })
}

exports.conn = conn;