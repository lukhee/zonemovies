const getDb = require("../util/db").getDb
ObjectID = require('mongodb').ObjectID;

let db;
let login

exports.getAllMovies = (req, res, next)=>{
    let movies = []
    let comingSoon = [];
    login = req.session.isloggedin
    db = getDb()
    db.collection("movies")
    .find().toArray()
    .then(result=>{
        result.forEach(movie => {
            if(movie.category == "nowShowing"){
                movies.push(movie)
            }else{
                comingSoon.push(movie)
             }
        });
        res.render("admins/homePage", { movies: movies, comingSoon:comingSoon, title: "admin HomePage", login: login})
    })
    .catch(err=>{
        const error = new Error(err)
        error.httpStatusCode = 500;
        // return next(error)
    })
}

exports.getOneMovie = (req, res, next) => {
    res.send("movie with id")
}

exports.createMovie = (req, res, next) => {
    login = req.session.isloggedin
    res.render("admins/createMovie", {login: login})
}

exports.postCreateMovie = ( req, res, next ) => {
    let category = req.params.category
    db = getDb()
    let movieDetails = {
        category : category,
        title: req.body.title,
        description: req.body.description,
        releasedDate: req.body.releasedDate,
        certificate: req.body.certificate,
        genre: req.body.genre,
        price: req.body.price,
        time: [req.body.movieTime1, req.body.movieTime2, req.body.movieTime3, req.body.movieTime4, req.body.movieTime5, req.body.movieTime6],
        days: req.body.movieDay1,
        imageURL: req.body.imageURL,
        download: req.file,
        altImageName: req.body.altImageName,
        imageURL2: req.body.imageURL2

    }

    if (!req.file) {
                delete movieDetails.download
            } else {
                movieDetails.download = req.file.path
            }
    if (category == "comingSoon") {
            delete movieDetails.price;
            delete movieDetails.time
            delete movieDetails.altImageName
            delete movieDetails.imageURL2
        }
    db.collection ("movies")
        .insertOne(movieDetails)
        .then(result => {
            res.redirect('/admin/allMovies')
        })
    .catch(err => {
        console.log(err)
        const error = new Error(err)
        error.httpStatusCode = 500;
        // return next(error)
    })
}

exports.editMovie = (req, res, next) => {
    login = req.session.isloggedin
    let id = req.params.id
    db = getDb()
    db.collection("movies").find({"_id": new ObjectID(id)})
    .next()
    .then(movie=>{
        res.render("admins/editMovie", { movie: movie, title: "admin movie", login: login})
    })
    .catch(err=>{
        const error = new Error(err)
        error.httpStatusCode = 500;
        // return next(error)
    })
}

exports.postEditMovie = (req, res, next)=>{
    let id = req.params.id
    console.log(id)
    let movieDetails = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imageURL: req.body.imageURL,
        alt: req.body.alt,
        days: ["monday", "wednesday", "thursday"]
    }

    db = getDb()
    db.collection("movies").updateOne(
        {'_id': new ObjectID(id)},
        {$set : movieDetails})
    .then(update=>{
        res.redirect("/admin/allMovies")
    })
    .catch(err=>{
        const error = new Error(err)
        error.httpStatusCode = 500;
        // return next(error)
    })
}

exports.deleteMovie = (req, res, next) => {
    let id = req.body.id;
    db = getDb()
    db.collection('movies')
    .deleteOne({'_id' : new ObjectID(id)})
    .then(result=>{
        res.redirect("/admin/allMovies")
    })
    .catch(err => {
        const error = new Error(err)
        error.httpStatusCode = 500;
        // return next(error)
    })
}

exports.checkBookedMovie = (req, res, next) => {
    res.send("ticket page")
}