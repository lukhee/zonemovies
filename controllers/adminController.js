const getDb = require("../util/db").getDb
ObjectID = require('mongodb').ObjectID;

let db;
let login

exports.getAllMovies = (req, res, next)=>{
    login = req.session.isloggedin
    db = getDb()
    db.collection("movies")
    .find().toArray()
    .then(movies=>{
        res.render("admins/homePage", { movies: movies, title: "admin HomePage", login: login})
    })
    .catch(err=>{
        console.log(err)
        const error = new Error(err)
        error.httpStatusCode = 500;
        return next(error)
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
    db = getDb()
    let movieDetails = {
        title: req.body.title,
        description: req.body.description,
        releasedDate: req.body.releasedDate,
        certificate: req.body.certificate,
        genre: req.body.genre,
        price: req.body.price,
        time: [req.body.movieTime1, req.body.movieTime2, req.body.movieTime3, req.body.movieTime4, req.body.movieTime5, req.body.movieTime6],
        imageURL: req.body.imageURL,
        download: req.file,
        altImageName: req.body.altImageName,
        imageURL2: req.body.imageURL2
    }


    if(!req.file){
        delete movieDetails.download
    } else {
        movieDetails.download = req.file.path
    }
        db.collection("movies")
            .insertOne(movieDetails)
            .then(result => {
                console.log("created movie successfully")
                res.redirect('/admin/allMovies')
            })
            .catch(err => {
                console.log(err)
                const error = new Error(err)
                error.httpStatusCode = 500;
                return next(error)
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
        console.log(err)
        const error = new Error(err)
        error.httpStatusCode = 500;
        return next(error)
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
        alt: req.body.alt
    }

    db = getDb()
    db.collection("movies").updateOne(
        {'_id': new ObjectID(id)},
        {$set : movieDetails})
    .then(update=>{
        console.log("update successful")
        res.redirect("/admin/allMovies")
    })
    .catch(err=>{
        console.log(err)
        const error = new Error(err)
        error.httpStatusCode = 500;
        return next(error)
    })
}

exports.deleteMovie = (req, res, next) => {
    let id = req.body.id;
    db = getDb()
    db.collection('movies')
    .deleteOne({'_id' : new ObjectID(id)})
    .then(result=>{
        console.log("movie deleted successfully")
        res.redirect("/admin/allMovies")
    })
    .catch(err => {
        console.log(err)
        const error = new Error(err)
        error.httpStatusCode = 500;
        return next(error)
    })
}

exports.checkBookedMovie = (req, res, next) => {
    res.send("ticket page")
}