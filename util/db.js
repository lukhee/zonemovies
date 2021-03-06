const url =`mongodb+srv://${process.env.MONGO_USER}:Balogun007.@cluster0-u8yjf.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
27017
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