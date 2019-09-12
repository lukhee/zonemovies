const authController = require("../controllers/authController")

const route = require("express").Router()

route.get('/login', authController.getLogin)

route.post('/createAdmin', authController.createLogin)

route.post('/login', authController.postLogin)

route.post('/logout', authController.logout)

module.exports = route