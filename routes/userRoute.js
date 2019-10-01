const userController = require("../controllers/userController")

const route = require("express").Router()

route.get('/allMovies', userController.getAllMovies)

route.get('/allMovies/:day', userController.getAllMoviesByDays)

// route.get('/allMovies/:category', userController.getAllMoviesByCategory)

route.get('/movie/:id', userController.getOneMovie)

route.get('/ticketConfirmation', userController.checkBookedPage)

route.post('/ticketVerification', userController.verifyTicket)

route.post("/viewTickets", userController.viewTickets)

route.post("/ticket/deleteMovie", userController.deleteTicket)

route.get("/movie/:id/booked", userController.bookedMovie)

route.post("/movie/:id/booked", userController.postBookedMovie)

module.exports = route