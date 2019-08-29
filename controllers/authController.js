const getDb = require("../util/db").getDb
const bcrypt = require('bcrypt');
const saltRounds = 10;
let db;


exports.getLogin = (req, res, next) => {
    // db = getDb();
    // db.collection("movuseies").find().toArray()
    //     .then(movies => {
    //         console.log(movies)
    //         res.render("users/allMovies", { movies: movies, title: "user page" })
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    let login = req.session.isloggedin
    res.render("auth/login", {login: login})
}

exports.createLogin = (req, res, next)=>{
    let admin = {
        username : req.body.username
    }
    bcrypt.hash(req.body.password, saltRounds)
    .then(password =>{
        admin.password = password
        db = getDb()
      return  db.collection('admin').insertOne(admin)
    })
    .then(result=>{
            res.send(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

exports.postLogin = (req, res, next)=>{
    let admin = {
        username: req.body.username,
        password: req.body.password,
    }
    db = getDb()
    db.collection('admin').find({username : admin.username})
    .next()
    .then(user=>{
        if(!user){
            return user
        }
        return bcrypt.compare(admin.password, user.password)
    })
    .then(password=>{
        if (password) {
            req.session.isloggedin = true
            console.log(req.session)
            res.redirect("/admin/allMovies")
        } else {
            let login = req.session.isloggedin
            console.log(req.session)
            res.render('auth/login', { login: login })
        }
    })
    .catch(err=>{
        console.log(err)
    })
}

exports.logout = (req, res, next)=>{
    req.session.destroy((err)=>{
        let login = req.session
        console.log(login)
        res.render("auth/login", {login: login })
    })
}
