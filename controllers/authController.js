const getDb = require("../util/db").getDb
const bcrypt = require('bcrypt')
const saltRounds = 10;
let db;


exports.getLogin = (req, res, next) => {
    let login = req.session.isloggedin
    res.render("auth/login", { login: login, errorMessage: false })
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
        const error = new Error(err)
        error.httpStatusCode = 500;
        // return next(error)
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
        console.log(user)
        console.log("user before here")
        if(!user){
            return user
        }
        return bcrypt.compare(admin.password, user.password)
    })
    .then(password=>{
        console.log(password)
        if (password) {
            req.session.isloggedin = true
            res.redirect("/admin/allMovies") 
        } else {
            let login = req.session.isloggedin
            res.render('auth/login', { login: login, errorMessage: "user not found!!!" })
        }
    })
    .catch(err=>{
        const error = new Error(err)
        error.httpStatusCode = 500;
        // return next(error)
    })
}

exports.logout = (req, res, next)=>{
    req.session.destroy((err)=>{
        let login = req.session
        res.render("auth/login", { login: login, errorMessage: false })
    })
}
