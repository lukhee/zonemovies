const nodeMailer = require("nodemailer")
const sendgridTransport = require("nodemailer-sendgrid-transport")
const getDb = require("../util/db").getDb
const Object = require("mongodb").ObjectID
const request = require("request")
const { initializePayment, verifyPayment } = require('../config/payment')(request)

const transport = nodeMailer.createTransport(sendgridTransport({
    auth:{
        // api_key: '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'
        api_key: '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'
    }
}))

let db;
let login

exports.getAllMovies = (req, res, next)=>{
    login = req.session.isloggedin
    let carousel = [],
    db = getDb();
    let movies
    db.collection("movies").find({ category: "nowShowing" }).toArray()
    .then(nowShowing=>{
        nowShowing.forEach(image=>{
            carousel.push(image.imageURL)
        })
        movies = nowShowing
        return db.collection("movies").find({ category: "comingSoon" }).limit(8).toArray()
        })
        .then(comingSoon=>{
            res.render("users/allMovies", { movies: movies, comingSoon: comingSoon, time: movies.time, carousel: carousel, title: "user page", login: login })
    })
    .catch(err=>{
        console.log(err)
        const error = new Error(err)
        error.httpStatusCode = 500;
        // return next(error)
    })
}

exports.getOneMovie = (req, res, next) => {
    let id = req.params.id
    let movie
    db = getDb();
    db.collection("movies").find({ _id: new Object(id) })
        .next()
        .then(movieResult => {
            movie = movieResult
            return db.collection("movies").find({ category: "comingSoon" }).limit(8).toArray()
        })
        .then(comingSoon => {
            res.render("users/oneMovie", { login: login, movie: movie, comingSoon: comingSoon })
        })
        .catch(err => {
            const error = new Error(err)
            error.httpStatusCode = 500;
            // return next(error)
        })
}

exports.getAllMoviesByDays = (req, res, next) => {
    let days = req.params.day 
    login = req.session.isloggedin
    let carousel = []
    let comingSoon
        db = getDb();
    db.collection("movies").find({ category: "comingSoon" }).limit(8).toArray()
    .then(result=>{
        comingSoon = result
        return db.collection("movies").find({ days: days, category: "nowShowing" }).toArray()
    })
        .then(movies => {
            movies.forEach(image => {
                carousel.push(image.imageURL)
            })
            res.render("users/allMovies", { movies: movies, time: movies.time, comingSoon: comingSoon, carousel: carousel, title: "user page", login: login })
        })
        .catch(err => {
            const error = new Error(err)
            error.httpStatusCode = 500;
            // return next(error)
        })
}

exports.bookedMovie = (req, res, next) => {
    login = req.session.isloggedin
    db = getDb();
    let id = req.params.id
    db.collection("movies").find({_id : new Object(id)})
    .next()
    .then(movie => {
        res.render("users/book", { login: login, movie: movie})
    })
    .catch(err=>{
        // const error = new n
    })
    
}

exports.checkBookedPage = (req, res, next)=>{
    let login = req.session.isloggedin
    res.render("users/ticketConfirmation", { login: login, verify: false, tickets: false })
}

exports.verifyTicket = (req, res, next)=>{
    let token = Number(req.body.tokenId)
    let login = req.session.isloggedin
    db = getDb()
    db.collection('tickets').find({ movieCode: token}).toArray()
    .then(result=>{
        if(result.length >= 1){
            return res.render("users/ticketConfirmation", { login: login, verify: true, user: result[0], tickets: false})
        } else{
            return res.render("users/ticketConfirmation", { login: login, verify: true, tickets: false, user: false, errorMessage: `no user found for ID : ${req.body.tokenId}`})
        }
    })
    .catch(error=>{
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
                return db.collection("movies").find({ _id: new Object(ticketInfo.movieId) }).next()
            }
        }).then(result=>{
            ticketInfo.movieTitle = result.title
             res.render('users/bookingInfo', { login: login, ticket: ticketInfo })
             return transport.sendMail({
                 to: [ticketInfo.email, 'o.balogun@ymail.com'],
                 from: "lukheebalo@gmail.com.com",
                 subject: "BeastCinema ticket Info",
                 html: `
                    <h3> Hello ${ticketInfo.name}, </h3>
                    <p> Movie Info is shown below </p>
                    <h4> id: ${ticketInfo.movieCode} </h4>
                    <h4> Movie title: ${ ticketInfo.movieTitle} </h4>
                    <h4> show day: ${ticketInfo.day}, Show Time: ${ticketInfo.time}  </h4>
                `
             })
             .then(res => console.log('rez: ', res))
             .catch(err=>{
                 console.log(err)
             })
        })
        .catch(err => {
        })
}

exports.viewTickets = (req, res, next)=>{
    let db = getDb()
    login = req.session.isloggedin
    let ticketLimit = Number(req.body.ticketLimit)
    db.collection("tickets").find().limit(ticketLimit).toArray()
        .then(tickets => {
            res.render("users/ticketConfirmation", { login: login, verify: false, tickets : tickets })
    })
    .catch(err=>{
    })
}

exports.deleteTicket = (req, res, next)=>{
    let db = getDb()
    login = req.session.isloggedin
    let id = req.body.id
    db.collection("tickets").deleteOne({_id : new ObjectID(id)})
        .then(deletedTicket => {
            return db.collection("tickets").find().toArray()
        }).then(tickets=>{
            res.render("users/ticketConfirmation", { login: login, verify: false, tickets: tickets })
        })
        .catch(err => {
        })
}
