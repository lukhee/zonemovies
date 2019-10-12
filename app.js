const express = require("express")
const helmet = require("helmet")
const compression = require("compression")
const bodyParser = require("body-parser")
const adminRoute = require("./routes/adminRoute")
const userRoute = require("./routes/userRoute")
// const authRoute = require("./routes/authRoute")
const errorRoute = require("./routes/errorRoute")
var multer = require('multer')
const request = require('request');
const mongo = require('mongodb').MongoClient
var session = require('express-session')
const mongoStore = require("connect-mongodb-session")(session)
const mongoConnect = require('./util/db').mongoConnect
const db = require('./util/db').getDb
const ObjectID = require("mongodb").ObjectID
const bcrypt = require('bcrypt');
// const { initializePayment, verifyPayment } = require('./config/paystack')(request);
const app = express()

app.use(helmet());
app.use(compression());

console.log(process.env.NODE_ENV)

const PORT = process.env.PORT || 2023;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
var fileFilter = (req, file, cb)=>{
    if(
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/png"
        ){
            cb(null, true)
        }else{
            cb(null, false)
        }
}
const upload = multer({ storage: storage, fileFilter: fileFilter })

app.use(express.static('public'))
app.use('/uploads', express.static('uploads'))
app.set('view engine', 'ejs');
const store = new mongoStore({
    uri: `mongodb+srv://${process.env.MONGO_USER}:Balogun007.@cluster0-u8yjf.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    collection: "sessionStore"
})

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: store, 
    cookie: {
        maxAge: 1000 * 60 * 60 
    },
}))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(upload.single('image'))

app.get("/error500", (req, res, next) => {
    let login = req.session
    res.render("errorPages/error500", { login: login })
})

app.use('/admin', adminRoute)
// app.use('/auth', authRoute)
app.use('/', userRoute)

// app.use((req, res, next) => {
//     res.send("error 404 page not found")
// })

// app.use((error, req, res, next)=>{
//     console.log("error found in error route")
//     res.redirect("/error500")
// })

mongoConnect(mongo, ()=>{
    bcrypt.hash("password", 10)
        .then(password => {
            return db().collection("admin").findOneAndUpdate(
                { username: "admin" },
                {
                    $setOnInsert: { username: "admin", password: password },
                },
                {
                    returnOriginal: false,
                    upsert: true,
                }
            )
        })
        .then(result=>{
            // console.log("result")
        })
    console.log("connection successful!!")
})


app.listen(PORT, ()=>{
    console.log(`app listen at port ${PORT}`)
})