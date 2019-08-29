const userController = require("../controllers/userController")

const route = require("express").Router()

route.get('/allMovies', userController.getAllMovies)

route.get('/movie/:id', userController.getOneMovie)

route.get('/bookedMovie', userController.bookedMovie)

module.exports = route