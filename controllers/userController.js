const getDb = require("../util/db").getDb
const Object = require("mongodb").ObjectID
const request = require("request")
const { initializePayment, verifyPayment } = require('../config/payment')(request)

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
        const error = new Error(err)
        error.httpStatusCode = 500;
        return next(error)
    })
}

exports.getAllMoviesByCategory = (req, res, next) => {
    res.send("working on route, will update when we redefine the table and route wont be necessesray for this")
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
        const error = new Error(err)
        error.httpStatusCode = 500;
        return next(error)
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
        // const error = new n
    })
    
}

exports.postBookedMovie = (req, res, next) => {
    let db = getDb()
    login = req.session.isloggedin
    let ticketInfo = {
        movieId: req.params.id,
        day: req.body.day,
        time: req.body.time,
        orderedDate: new Date(),
        movieCode: Math.floor(Math.random() * 40021),
        quantity: req.body.quantity,
        name: req.body.name,
        phoneNo: req.body.phoneNo,
        email: req.body.email,
        price: req.body.price
    }
    db.collection("tickets")
        .insertOne(ticketInfo)
        .then(ticket => {
            if(ticket){
                console.log(ticketInfo)
                return res.render('users/bookingInfo', {login: login, ticketInfo: ticketInfo})
            }
        })
        .catch(err => {
            console.log(err)
        })
}
