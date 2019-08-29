const url = 'mongodb://localhost:27017/beastCinemal'

let db

const mongoConnect = (mongo, cb) => {
    mongo.connect(
        url, 
        { useNewUrlParser: true },
        { useUnifiedTopology: true  }
        ).then(client => {
        db = client.db()
        cb()
    }).catch(err => {
        console.log(err)
    })
}

const getDb = ()=>{
    if (db) {
        return db
    }
    throw "db not found"
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb