const express = require("express")
const bodyParser = require("body-parser")
const adminRoute = require("./routes/adminRoute")
const userRoute = require("./routes/userRoute")
const authRoute = require("./routes/authRoute")
var multer = require('multer')
const mongo = require('mongodb').MongoClient
var session = require('express-session')
const mongoStore = require("connect-mongodb-session")(session)
const mongoConnect = require('./util/db').mongoConnect
const app = express()


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
    uri: 'mongodb://localhost:27017/beastCinemal',
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

app.use('/admin', adminRoute)
app.use('/auth', authRoute)
app.use('/', userRoute)

app.use((req, res, next) => {
    res.send("error 404 page not found")
})

mongoConnect(mongo, ()=>{
console.log("mongodb connected")
})

app.listen(PORT, ()=>{
    console.log(`app listen at port ${PORT}`)
})