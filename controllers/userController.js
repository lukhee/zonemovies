const getDb = require("../util/db").getDb
const Object = require("mongodb").ObjectID

let db;
let login

exports.getAllMovies = (req, res, next)=>{
    login = req.session.isloggedin
    let carousel = [],
    db = getDb();
    db.collection("movies").find().toArray()
    .then(movies=>{
        movies.forEach(image=>{
            carousel.push(image.imageURL)
        })
        console.log(movies)
        res.render("users/allMovies", { movies: movies, time: movies.time, carousel: carousel, title: "user page", login: login})
    })
    .catch(err=>{
        console.log(err)
    })
}

exports.getOneMovie = (req, res, next) => {
    let id = req.params.id
    console.log(id)
    db = getDb();
    db.collection("movies").find({_id : new Object(id)})
    .next()
    .then(movie=>{
    res.render("users/oneMovie", { login: login, movie: movie})
    })
    .catch(err=>{
        console.log(err)
    })
}

exports.bookedMovie = (req, res, next) => {
    login = req.session.isloggedin
    db = getDb();
    let id = req.params.id
    db.collection("movies").find({_id : new Object(id)})
    .next()
    .then(movie => {
        res.render("users/book", { login: login, movie: movie })
    })
    .catch(err=>{
        console.log(err)
    })
    
}

exports.postBookedMovie = (req, res, next) => {
    let ticketInfo = {
        day: req.body.day,
        time: req.body.time,
        quantity: req.body.quantity,
        name: req.body.name,
        phoneNo: req.body.phoneNo,
        email: req.body.email,
        price: req.body.price
    }
    res.send(ticketInfo)
}