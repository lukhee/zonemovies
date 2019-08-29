const getDb = require("../util/db").getDb

let db;
let login

exports.getAllMovies = (req, res, next)=>{
    login = req.session.isloggedin
    db = getDb();
    db.collection("movies").find().toArray()
    .then(movies=>{
        console.log(movies)
        res.render("users/allMovies", { movies: movies, time: movies.time, title: "user page", login: login})
    })
    .catch(err=>{
        console.log(err)
    })
}

exports.getOneMovie = (req, res, next) => {
    res.send("a movie from user model")
}

exports.bookedMovie = (req, res, next) => {
    res.send("booked a movie from")
}