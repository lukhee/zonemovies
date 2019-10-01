const route = require("express").Router()
const adminController = require("../controllers/adminController")
const auth = require("../controllers/authMiddlewareController")

route.get('/allMovies', auth, adminController.getAllMovies)

route.get('/movie', auth, adminController.getOneMovie)

route.get('/createMovie', auth, adminController.createMovie)

route.post('/createMovie/:category', adminController.postCreateMovie)

route.get('/editMovie/:id', auth, adminController.editMovie)

route.post('/editMovie/:id', adminController.postEditMovie)

route.post('/deleteMovie', adminController.deleteMovie)

module.exports = route