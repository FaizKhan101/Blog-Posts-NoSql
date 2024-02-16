const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient

let _db;

const connectToDb = async () => {
    const client = await MongoClient.connect("mongodb://localhost:27017")
    _db = client.db("blog")
    return "Connected."
}

const getDb = () => {
    if (!_db) {
        throw "Connection failed!"
    }
    return _db
}
exports.connectToDb = connectToDb
exports.getDb = getDb