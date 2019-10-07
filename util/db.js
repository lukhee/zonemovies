// const url = 'mongodb://localhost:27017/beastCinemal'
const url = "mongodb://balogun:Balogun007.@cluster0-shard-00-00-u8yjf.mongodb.net:27017,cluster0-shard-00-01-u8yjf.mongodb.net:27017,cluster0-shard-00-02-u8yjf.mongodb.net:27017/beastCinema?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"

let db

const mongoConnect = (mongo, cb) => {
    mongo.connect(
        url, 
        { useNewUrlParser: true },
        { useUnifiedTopology: true  }
        ).then(client => {
        db = client.db()
        console.log(client)
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